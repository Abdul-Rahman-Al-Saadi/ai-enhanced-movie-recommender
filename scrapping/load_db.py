import json
import mysql.connector

with open('/Users/hamzahah/Documents/VS Code SE Factory/ai-enhanced-movie-recommender/scrapping/moviesdata.json', encoding='utf-8') as f:
    movies = json.load(f)

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="movies_db"
)
cursor = db.cursor()

insert_query = """ INSERT INTO movies (title, duration, genre, release_date, description, director, actors, banner_url, trailer_url)
VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s) """

for movie in movies:
    data = (
        movie["title"],
        movie["duration"],
        movie["genre"].strip(),
        movie["release_date"].replace(" Sortie : ", ""),
        movie["description"],
        movie["director"],
        movie["actors"],
        movie["banner_url"],
        movie["trailer_url"]
    )
    cursor.execute(insert_query, data)

db.commit()
cursor.close()
db.close()
print("Data inserted successfully.")