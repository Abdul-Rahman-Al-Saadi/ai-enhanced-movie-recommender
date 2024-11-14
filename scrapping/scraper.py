import requests
import random
import time
import json
from fake_useragent import UserAgent
from lxml import etree

# Create a UserAgent instance
ua = UserAgent()

# Your ScraperAPI or Proxy service API Key
API_KEY = '5a9a0264a3afb8d21aa83f3f5ddd4a0c'  

# Headers with a random User-Agent and additional headers
headers = {
    "User-Agent": ua.random,
    "Referer": "https://www.pathe.fr",
    "Origin": "https://www.pathe.fr",
    "Accept-Language": "en-US,en;q=0.9",
    "Accept-Encoding": "gzip, deflate, br",
    "Connection": "keep-alive",
    "Upgrade-Insecure-Requests": "1",
    "TE": "Trailers"  
}

# URL of the sitemap
sitemap_url = "https://www.pathe.fr/sitemaps/sitemap.xml"

# Create a session
session = requests.Session() 

def fetch_with_proxy(url):
    # This function adds the proxy service to the URL
    proxy_url = f'http://api.scraperapi.com?api_key={API_KEY}&url={url}'  # Using ScraperAPI as an example
    response = session.get(proxy_url, headers=headers, timeout=10)
    return response

try:
    # Fetch the sitemap
    response = fetch_with_proxy(sitemap_url)
    response.raise_for_status()
    print(f"Fetched sitemap with status code: {response.status_code}")

    # Parse the XML content
    tree = etree.XML(response.content)
    namespaces = {'ns': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
    loc_tags = tree.xpath("//ns:loc[contains(text(), '/films/')]/text()", namespaces=namespaces)

    # Initialize a list to store movie data in JSON format
    movies_data = []

    if loc_tags:
        for loc in loc_tags:
            print(f"\nProcessing: {loc}")
            max_retries = 5

            for attempt in range(max_retries):
                try:
                    # Fetch the film page with an increased timeout using a proxy
                    film_response = fetch_with_proxy(loc)
                    film_response.raise_for_status()

                    # Parse the film page content
                    film_tree = etree.HTML(film_response.content)

                    # Extract specific data from the film page
                    title = film_tree.xpath("//div[@class='hero-film__content']/h1/text()")
                    info = film_tree.xpath("//div[@class='hero-film__subtitle f-inline f-ai-center f-wrap mb-md-2']/p[@class='ft-default ft-500 mb-0']/text()")
                    release_date = film_tree.xpath("//div[@class='f hero-film__body']/div/p[@class='ft-default c-white-70 mb-0 mb-md-0']/text()")
                    description = film_tree.xpath("//div[@class='f hero-film__body']/div/div[@class='mb-1']/p[@class='hero-film__desc ft-default c-white desktop-only']/text()")
                    cast = film_tree.xpath("//div[@class='col col-lg-12 col-lg-offset-2']/ul[@class='c-white-50 ft-default list mt-2']/li/strong/text()")
                    movie_banner = film_tree.xpath("//div[@class='f hero-film__body']/img/@src")
                    trailer = film_tree.xpath("//div[contains(@class, 'video-js')]/video/source/@src | //div[contains(@class, 'video-js')]/video/@src")

                    # Safely access elements if they exist
                    movie_data = {
                        "title": title[0] if title else "Title not found",
                        "duration": info[0] if len(info) > 0 else "Duration not found",
                        "genre": info[1] if len(info) > 1 else "Genre not found",
                        "release_date": release_date[0] if release_date else "Release date not found",
                        "description": description[0] if description else "Description not found",
                        "director": cast[0] if len(cast) > 0 else "Director not found",
                        "actors": cast[1] if len(cast) > 1 else "Actors not found",
                        "banner_url": movie_banner[0] if movie_banner else "Banner not found",
                        "trailer_url": trailer[0] if trailer else "Trailer not found"
                    }

                    # Add movie data to the list
                    movies_data.append(movie_data)
                    break  # Exit retry loop on success

                except requests.exceptions.RequestException as e:
                    print(f"Attempt {attempt + 1} failed for {loc}: {e}")
                    if attempt < max_retries - 1:
                        time.sleep(2 ** attempt)  # Exponential backoff (2, 4, 8 seconds, etc.)
                    else:
                        print(f"Max retries reached for {loc}. Skipping this link.")
            # Delay between requests to avoid overwhelming the server
            time.sleep(random.uniform(3, 5))

    else:
        print("No valid film URLs found in the sitemap.")

    # Print the final JSON data
    print(json.dumps(movies_data, indent=4, ensure_ascii=False))

except requests.exceptions.RequestException as e:
    print(f"Error occurred while fetching the sitemap: {e}")
except Exception as e:
    print(f"Unexpected error: {e}")