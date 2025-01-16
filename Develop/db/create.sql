DROP TABLE IF EXISTS participations;
DROP TABLE IF EXISTS notifications;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS images;
DROP TABLE IF EXISTS time_slots;
DROP TABLE IF EXISTS tournaments;
DROP TABLE IF EXISTS courts;
DROP TABLE IF EXISTS players;
DROP TABLE IF EXISTS owners;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS user_roles;
DROP TABLE IF EXISTS membership_price;

CREATE TABLE user_roles
(
  roleId SERIAL NOT NULL,
  roleName VARCHAR(20) NOT NULL,
  PRIMARY KEY (roleId),
  UNIQUE (roleName)
);

CREATE TABLE users
(
  userId SERIAL NOT NULL,
  email VARCHAR(50) NOT NULL,
  firstName VARCHAR(30),
  lastName VARCHAR(50),
  roleId INT NOT NULL,
  PRIMARY KEY (userId),
  FOREIGN KEY (roleId) REFERENCES user_roles(roleId),
  UNIQUE (email)
);

CREATE TABLE owners
(
  userId SERIAL NOT NULL,
  phoneNumber VARCHAR(50),
  membershipExpirationDate DATE,
  PRIMARY KEY (userId),
  FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE
);

CREATE TABLE players
(
  userId INT NOT NULL,
  isSubscribedToTournaments BOOLEAN NOT NULL DEFAULT FALSE,
  PRIMARY KEY (userId),
  FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE
);

CREATE TABLE courts
(
  courtId SERIAL NOT NULL,
  courtName VARCHAR(50) NOT NULL,
  location VARCHAR(50) NOT NULL,
  isIndoor BOOLEAN NOT NULL,
  image TEXT,
  userId INT NOT NULL,
  PRIMARY KEY (courtId),
  FOREIGN KEY (userId) REFERENCES owners(userId) ON DELETE CASCADE,
  UNIQUE (courtName)
);

CREATE TABLE tournaments
(
  tournamentId SERIAL NOT NULL,
  tournamentName VARCHAR(50) NOT NULL,
  date DATE NOT NULL,
  registrationFee NUMERIC(5, 2),
  reward NUMERIC(5, 2),
  playerLevel VARCHAR(20),
  description VARCHAR(500),
  isOpen BOOLEAN NOT NULL,
  results VARCHAR(10000),
  userId INT NOT NULL,
  courtId INT NOT NULL,
  PRIMARY KEY (tournamentId),
  FOREIGN KEY (userId) REFERENCES owners(userId) ON DELETE CASCADE,
  FOREIGN KEY (courtId) REFERENCES courts(courtId) ON DELETE CASCADE,
  UNIQUE (tournamentName)
);

CREATE TABLE time_slots
(
  timeSlotId SERIAL NOT NULL,
  startTimestamp TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
  endTimestamp TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
  price NUMERIC(5, 2) NOT NULL,
  courtId INT NOT NULL,
  userId INT,
  PRIMARY KEY (timeSlotId),
  FOREIGN KEY (courtId) REFERENCES courts(courtId) ON DELETE CASCADE,
  FOREIGN KEY (userId) REFERENCES players(userId) ON DELETE CASCADE
);

CREATE TABLE images
(
  imageId SERIAL NOT NULL,
  uploadTime TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  userId INT NOT NULL,
  tournamentId INT NOT NULL,
  imageContent TEXT NOT NULL,
  PRIMARY KEY (imageId),
  FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE,
  FOREIGN KEY (tournamentId) REFERENCES tournaments(tournamentId) ON DELETE CASCADE
);

CREATE TABLE comments
(
  commentId SERIAL NOT NULL,
  uploadTime TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  userId INT NOT NULL,
  tournamentId INT NOT NULL,
  commentText VARCHAR(1000) NOT NULL,
  PRIMARY KEY (commentId),
  FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE,
  FOREIGN KEY (tournamentId) REFERENCES tournaments(tournamentId) ON DELETE CASCADE
);

CREATE TABLE notifications
(
  notificationId SERIAL NOT NULL,
  isRead BOOLEAN NOT NULL DEFAULT FALSE, --Je li korisnik pročitao notifikaciju
  creationTime TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  userId INT NOT NULL,
  tournamentId INT NOT NULL,
  PRIMARY KEY (notificationId),
  FOREIGN KEY (userId) REFERENCES players(userId) ON DELETE CASCADE,
  FOREIGN KEY (tournamentId) REFERENCES tournaments(tournamentId) ON DELETE CASCADE
);

CREATE TABLE participations
(
  isApproved BOOLEAN NOT NULL DEFAULT FALSE,
  isDenied BOOLEAN NOT NULL DEFAULT FALSE,
  userId INT NOT NULL,
  tournamentId INT NOT NULL,
  signUpTime TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (userId, tournamentId),
  FOREIGN KEY (userId) REFERENCES players(userId) ON DELETE CASCADE,
  FOREIGN KEY (tournamentId) REFERENCES tournaments(tournamentId) ON DELETE CASCADE,
  CONSTRAINT check_approval CHECK (NOT (isApproved AND isDenied)) --make sure that participation cant be denied and approved 
);

CREATE TABLE membership_price
(
	membershipPrice DECIMAL(6,2) NOT NULL DEFAULT 0.00
);

CREATE OR REPLACE PROCEDURE dispense_notifications_for_user(userId INT)
LANGUAGE plpgsql 
AS $$ 
DECLARE
	tournament_record RECORD;
BEGIN
	FOR tournament_record IN
		SELECT tournamentId
		FROM tournaments
	LOOP
		INSERT INTO notifications(creationTime, userId, tournamentId)
		VALUES (CURRENT_TIMESTAMP, userID, tournament_record.tournamentId);
	END LOOP;
END;
$$;

CREATE OR REPLACE FUNCTION dispense_notifications()
RETURNS TRIGGER AS $$
DECLARE
	player_record RECORD;
BEGIN
	FOR player_record IN
		SELECT userId
		FROM players
		WHERE players.isSubscribedToTournaments
	LOOP
		INSERT INTO notifications(creationTime, userId, tournamentId)
		VALUES (CURRENT_TIMESTAMP, player_record.userId, NEW.tournamentId);
	END LOOP;
	RETURN NEW;
END;
$$ LANGUAGE plpgsql; 

CREATE OR REPLACE TRIGGER insert_notifications
AFTER INSERT
ON tournaments
FOR EACH ROW
EXECUTE FUNCTION dispense_notifications();