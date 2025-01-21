INSERT INTO membership_price (membershipPrice) VALUES
	(15);

INSERT INTO user_roles (roleId, roleName) VALUES
	(1, 'NEW_USER'),
	(2, 'PLAYER'),
	(3, 'UNPAID_OWNER'), --vlasnik koji nije platio godišnju članrinu
	(4, 'OWNER'),
	(5, 'ADMIN');

--potrebno je postaviti vlastite  emailove	
INSERT INTO users (userId, email, firstName, lastName, roleId) VALUES
	(1, 'email1@gmail.com', 'Michael', 'Williams', 4), --vlasnik
	(2, 'email2@gmail.com', 'John', 'Smith', 4), --vlasnik
	(3, 'email3@gmail.com', 'John', 'Padel', 2), --igrač
	(4, 'email4@gmail.com', 'Padel', 'Admin', 5); --admin
	
INSERT INTO owners (userId, phoneNumber) VALUES
	(1, '(425) 678-3492'),
	(2, '(917) 842-1357');
	
INSERT INTO players (userId) VALUES
	(3);
	
INSERT INTO courts (courtId, userId, courtName, location, isIndoor, image) VALUES
    (1, 1, 'Padel Zone', '123 Elm Street, Austin, TX', false,'a'),
    (2, 1, 'Ace Arena', '456 Oak Avenue, Miami, FL', false,'a'),
    (3, 1, 'The Padel Hub', '789 Maple Road, Denver, CO', true,'a'),
    (4, 1, 'Smash Court', '101 Pine Lane, Seattle, WA', false,'a'),
    (5, 1, 'Net Masters', '202 Cedar Street, Nashville, TN', true,'a'),
    (6, 2, 'PowerPadel', '303 Birch Drive, Austin, TX', false,'a'),
    (7, 2, 'Rally Point', '404 Spruce Boulevard, Portland, OR', true,'a'),
    (8, 2, 'Padel Playhouse', '505 Willow Way, Phoenix, AZ', false,'a'),
    (9, 2, 'Court Kings', '123 Poplar Street, Boston, MA', true,'a'),
	(10, 2, 'Padel Oasis', '707 Redwood Avenue, San Diego, CA', false,'a');
	
INSERT INTO tournaments (tournamentName, date, registrationFee, reward, playerLevel, description, isOpen, userId, courtId) VALUES
	('Spring Smash', '2024-02-20', 15, 100, 'Beginner', 'A fun event for new players', true, 1, 1),
	('Winter Rally', '2024-12-10', 20, 150, 'Intermediate', 'An exciting winter tournament', true, 2, 3),
	('Net Knockout', '2024-04-22', 10, 75, 'Beginner', 'Perfect for starting your journey', true, 1, 5),
	('Cedar Cup', '2024-07-25', 18, 120, 'Intermediate', 'Compete and grow your skills', true, 1, 7),
	('Phoenix Padel Challenge', '2024-09-12', 20, 150, 'Advanced', 'A high-level desert duel', true, 2, 8),
	('San Diego Doubles', '2024-11-01', 12, 80, 'Beginner', 'Pair up for fun and prizes', true, 1, 10),
	('Austin Ace Challenge', '2024-03-10', 25, 120, 'Intermediate', 'A thrilling tournament for players looking to test their growing skills in a competitive setting.', true, 1, 1),
	('Miami Masters', '2024-04-08', 40, 300, 'Advanced', 'The ultimate padel showdown for experienced players, featuring high-stakes matches and top rewards.', false, 1, 2),
	('Rocky Mountain Invitational', '2024-06-15', 30, 200, 'All Levels', 'Set against the stunning backdrop of the Rockies, this event welcomes players of all skill levels.', true, 2, 3),
	('Seattle Summer Cup', '2024-07-05', 20, 150, 'Beginner', 'An exciting entry-level tournament perfect for newcomers eager to explore competitive padel.', true, 2, 4),
	('Nashville Night Rally', '2024-08-18', 35, 250, 'Intermediate', 'A high-energy evening event under the lights, designed for rising stars and seasoned enthusiasts.', false, 1, 5),
	('Austin All-Stars', '2024-09-25', 50, 500, 'Professional', 'A premier tournament showcasing the region’s finest players battling for glory and prestige.', true, 2, 6),
	('Pacific Coast Championship', '2024-10-30', 45, 400, 'Advanced', 'Join the best in the game as they clash in this exciting coastal event with incredible prizes.', false, 1, 7),
	('Desert Duel', '2024-11-12', 15, 100, 'Beginner', 'A perfect first tournament in the Arizona heat, with friendly competition and great prizes.', true, 2, 8),
	('Boston Fall Classic', '2024-12-03', 30, 180, 'Intermediate', 'This classic event offers intense matches and a great atmosphere for mid-level competitors.', false, 1, 9),
	('Boston Smash Fest', '2024-10-05', 22, 175, 'All Levels', 'Smash your way to glory', false, 2, 9),
	('Padel Marathon', '2024-05-18', 25, 200, 'All Levels', 'Challenge yourself all day', false, 2, 4),
	('Elite Showdown', '2024-03-15', 30, 250, 'Advanced', 'Top-tier competition awaits', false, 1, 2),
	('The Grand Slam', '2024-06-30', 50, 500, 'Professional', 'Where legends are made', false, 2, 6),
	('California Doubles Showdown', '2024-12-15', 20, 150, 'All Levels', 'Grab a partner and test your teamwork in this exciting doubles-focused competition.', true, 2, 10);