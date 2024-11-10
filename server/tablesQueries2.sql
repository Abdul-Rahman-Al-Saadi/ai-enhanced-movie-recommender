-- MySQL Script generated by MySQL Workbench
-- Sun Nov 10 20:24:19 2024
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema movies_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema movies_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `movies_db` DEFAULT CHARACTER SET utf8 ;
USE `movies_db` ;

-- -----------------------------------------------------
-- Table `movies_db`.`movies`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `movies_db`.`movies` (
  `movie_id` INT NOT NULL AUTO_INCREMENT,
  `movie_name` TINYTEXT NULL,
  `movie_summary` TEXT NULL,
  `movie_duration` TEXT NULL,
  `movie_date` TEXT NULL,
  `movie_cast` TEXT NULL,
  `movie_genre` TEXT NULL,
  `poster_url` TEXT NULL,
  PRIMARY KEY (`movie_id`),
  UNIQUE INDEX `movie_id_UNIQUE` (`movie_id` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `movies_db`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `movies_db`.`users` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `user_name` TEXT NULL,
  `user_email` TEXT NULL,
  `user_password` TEXT NULL,
  `user_type` ENUM("admin", "regular", "blocked") NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `movies_db`.`bookmarks`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `movies_db`.`bookmarks` (
  `bookmark_id` INT NOT NULL AUTO_INCREMENT,
  `movie_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`bookmark_id`),
  UNIQUE INDEX `bookmark_id_UNIQUE` (`bookmark_id` ASC) ,
  INDEX `fk_bookmarks_movies_idx` (`movie_id` ASC) ,
  INDEX `fk_bookmarks_users1_idx` (`user_id` ASC) ,
  CONSTRAINT `fk_bookmarks_movies`
    FOREIGN KEY (`movie_id`)
    REFERENCES `movies_db`.`movies` (`movie_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_bookmarks_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `movies_db`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `movies_db`.`ratings`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `movies_db`.`ratings` (
  `rating_id` INT NOT NULL AUTO_INCREMENT,
  `rating` INT NULL,
  `movie_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`rating_id`),
  UNIQUE INDEX `rating_id_UNIQUE` (`rating_id` ASC) ,
  INDEX `fk_ratings_movies1_idx` (`movie_id` ASC) ,
  INDEX `fk_ratings_users1_idx` (`user_id` ASC) ,
  CONSTRAINT `fk_ratings_movies1`
    FOREIGN KEY (`movie_id`)
    REFERENCES `movies_db`.`movies` (`movie_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ratings_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `movies_db`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `movies_db`.`user_activities`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `movies_db`.`user_activities` (
  `user_activity_id` INT NOT NULL AUTO_INCREMENT,
  `action` VARCHAR(45) NULL,
  `timestamp` TIMESTAMP(1) NULL,
  `time_spent` INT NULL,
  `movie_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`user_activity_id`),
  UNIQUE INDEX `user_activity_id_UNIQUE` (`user_activity_id` ASC) ,
  INDEX `fk_user_activities_movies1_idx` (`movie_id` ASC) ,
  INDEX `fk_user_activities_users1_idx` (`user_id` ASC) ,
  CONSTRAINT `fk_user_activities_movies1`
    FOREIGN KEY (`movie_id`)
    REFERENCES `movies_db`.`movies` (`movie_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_activities_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `movies_db`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
