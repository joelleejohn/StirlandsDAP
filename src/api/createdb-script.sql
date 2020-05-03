-- Table: battingstatistic
CREATE TABLE battingstatistic (
	battingstatusid int NOT NULL AUTO_INCREMENT,
	lkplayermatchid bigint NOT NULL,
	rfbattingstatusid int NOT NULL,
	runs int NOT NULL,
	fours int NOT NULL,
	sixes int NOT NULL,
	fallofwicketrun int NOT NULL,
	fallofwicketout int NOT NULL,
	fieldingstatisticid bigint NOT NULL,
	CONSTRAINT PK_lkplayerbattingstatus PRIMARY KEY (battingstatusid)
) COMMENT 'provides a link between a player''''s match stats and a batting status (optionally with a link to another player e.g. battingstatus = caught & player who caught = playerid)';

-- Table: club
CREATE TABLE club (
	clubid bigint NOT NULL AUTO_INCREMENT,
	clubname varchar(100) NOT NULL,
	foundeddate date NOT NULL,
	CONSTRAINT club_pk PRIMARY KEY (clubid)
);

-- Table: emergencycontact
CREATE TABLE emergencycontact (
	emergencycontactid bigint NOT NULL AUTO_INCREMENT,
	playerid bigint NOT NULL,
	firstname varchar(100) NULL,
	lastname varchar(100) NULL,
	relation varchar(50) NOT NULL,
	ishidden bool NOT NULL,
	lastmodified timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT PK_emergencycontact PRIMARY KEY (emergencycontactid)
);

-- Table: fieldingstatistic
CREATE TABLE fieldingstatistic (
	fieldingstatisticid bigint NOT NULL AUTO_INCREMENT,
	lkplayermatchid bigint NOT NULL,
	catches int NOT NULL,
	overs int NOT NULL,
	runs int NOT NULL,
	wickets int NOT NULL,
	wides int NOT NULL,
	noballs int NOT NULL,
	CONSTRAINT PK_fieldingstatistic PRIMARY KEY (fieldingstatisticid)
);

-- Table: league
CREATE TABLE league (
	leagueid bigint NOT NULL AUTO_INCREMENT,
	leaguename varchar(100) NOT NULL,
	isactive bool NOT NULL DEFAULT 0,
	CONSTRAINT PK_league PRIMARY KEY (leagueid)
);

-- Table: lkplayermatch
CREATE TABLE lkplayermatch (
	lkplayermatchid bigint NOT NULL AUTO_INCREMENT,
	lkplayerteamid bigint NOT NULL,
	matchid bigint NOT NULL,
	singleruns int NULL,
	fours int NOT NULL,
	sixes int NULL,
	iscaptain bool NOT NULL DEFAULT 0,
	iswicketkeeper bool NOT NULL DEFAULT 0,
	isbatsman bool NOT NULL DEFAULT 0,
	isbowler bool NOT NULL DEFAULT 0,
	lastmodified timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	UNIQUE INDEX DF_lkplayermatch_lkplayerteamid_matchid (lkplayerteamid,matchid),
	CONSTRAINT lkplayermatch_pk PRIMARY KEY (lkplayermatchid)
);

-- Table: lkplayerteam
CREATE TABLE lkplayerteam (
	lkplayerteamid bigint NOT NULL AUTO_INCREMENT,
	playerid bigint NOT NULL,
	teamid bigint NOT NULL,
	startdate date NOT NULL,
	enddate date NULL,
	iscurrent bool NULL,
	iscaptain bool NULL,
	lastmodified timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT PK_lkplayerteam_lkplayerteamid PRIMARY KEY (lkplayerteamid)
);

-- Table: lkteamleague
CREATE TABLE lkteamleague (
	lkteamleagueid bigint NOT NULL AUTO_INCREMENT,
	leagueid bigint NOT NULL,
	teamid bigint NOT NULL,
	lastmodified timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	position int NOT NULL,
	points int NOT NULL,
	CONSTRAINT lkteamleague_pk PRIMARY KEY (lkteamleagueid)
);

-- Table: location
CREATE TABLE location (
	locationid bigint NOT NULL AUTO_INCREMENT,
	locationname varchar(100) NOT NULL,
	line1 varchar(255) NOT NULL,
	line2 varchar(255) NULL,
	line3 varchar(255) NULL,
	line4 varchar(255) NOT NULL,
	postcode varchar(7) NOT NULL,
	county varchar(255) NULL,
	lastmodified timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT location_pk PRIMARY KEY (locationid)
);

-- Table: match
CREATE TABLE `match` (
	matchid bigint NOT NULL AUTO_INCREMENT,
	homelkteamleagueid bigint NOT NULL,
	awaylkteamleagueid bigint NOT NULL,
	locationid bigint NULL,
	hometeamscore int NOT NULL,
	awayteamscore int NOT NULL,
	matchdate date NOT NULL,
	umpires varchar(255) NULL,
	scorers varchar(255) NULL,
	lastmodified timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT PK_match_matchid PRIMARY KEY (matchid)
);

-- Table: official
CREATE TABLE official (
	officialid bigint NOT NULL AUTO_INCREMENT,
	clubid bigint NOT NULL,
	firstname varchar(100) NULL,
	lastname varchar(100) NOT NULL,
	emailaddress varchar(255) NULL,
	role varchar(50) NOT NULL,
	ishidden bool NOT NULL DEFAULT 0,
	lastmodified timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT PK_personnel PRIMARY KEY (officialid)
);

-- Table: player
CREATE TABLE player (
	playerid bigint NOT NULL AUTO_INCREMENT,
	locationid bigint NOT NULL,
	firstname varchar(100) NOT NULL,
	lastname varchar(100) NOT NULL,
	dateofbirth date NULL,
	dateregistered date NOT NULL,
	isactive bool NULL NOT NULL DEFAULT 1,
	homenumber varchar(80) NULL,
	phonenumber varchar(80) NOT NULL,
	ishidden bool NOT NULL DEFAULT 0,
	lastmodified timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT PK_player_playerid PRIMARY KEY (playerid)
);

-- Table: rfbattingstatus
CREATE TABLE rfbattingstatus (
	rfbattingstatusid int NOT NULL AUTO_INCREMENT,
	rfbattingstatus varchar(50) NOT NULL,
	shortname varchar(20) NULL,
	description varchar(255) NULL,
	CONSTRAINT PK_rfbattingstatus PRIMARY KEY (rfbattingstatusid)
);

-- Table: rfuserrole
CREATE TABLE rfuserrole (
	rfuserroleid int NOT NULL AUTO_INCREMENT,
	rfuserrole varchar(100) NOT NULL,
	UNIQUE INDEX DF_rfuserrole_rfuserrole (rfuserrole),
	CONSTRAINT PK_rfuserrole PRIMARY KEY (rfuserroleid)
);

-- Table: team
CREATE TABLE team (
	teamid bigint NOT NULL AUTO_INCREMENT,
	clubid bigint NOT NULL,
	locationid bigint NOT NULL,
	teamname varchar(100) NOT NULL,
	isactive bool NOT NULL DEFAULT 0,
	lastmodified timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT PK_team_teamid PRIMARY KEY (teamid)
);

-- Table: user
CREATE TABLE user (
	userid bigint NOT NULL AUTO_INCREMENT,
	rfuserroleid int NOT NULL,
	username varchar(50) NOT NULL,
	password varchar(20) NOT NULL,
	primaryemail varchar(255) NOT NULL,
	secondaryemail varchar(255) NULL,
	UNIQUE INDEX DF_user_username (username),
	CONSTRAINT PK_user PRIMARY KEY (userid)
);



-- foreign keys
-- Reference: FK_battingstatistic_fieldingstatistic (table: battingstatistic)
ALTER TABLE battingstatistic ADD CONSTRAINT FK_battingstatistic_fieldingstatistic FOREIGN KEY FK_battingstatistic_fieldingstatistic (fieldingstatisticid)
	REFERENCES fieldingstatistic (fieldingstatisticid);

-- Reference: FK_battingstatistic_lkplayermatch (table: battingstatistic)
ALTER TABLE battingstatistic ADD CONSTRAINT FK_battingstatistic_lkplayermatch FOREIGN KEY FK_battingstatistic_lkplayermatch (lkplayermatchid)
	REFERENCES lkplayermatch (lkplayermatchid);

-- Reference: FK_battingstatistic_rfbattingstatus (table: battingstatistic)
ALTER TABLE battingstatistic ADD CONSTRAINT FK_battingstatistic_rfbattingstatus FOREIGN KEY FK_battingstatistic_rfbattingstatus (rfbattingstatusid)
	REFERENCES rfbattingstatus (rfbattingstatusid);

-- Reference: FK_emergencycontact_player (table: emergencycontact)
ALTER TABLE emergencycontact ADD CONSTRAINT FK_emergencycontact_player FOREIGN KEY FK_emergencycontact_player (playerid)
	REFERENCES player (playerid);

-- Reference: FK_fieldingstatus_lkplayermatch (table: fieldingstatistic)
ALTER TABLE fieldingstatistic ADD CONSTRAINT FK_fieldingstatus_lkplayermatch FOREIGN KEY FK_fieldingstatus_lkplayermatch (lkplayermatchid)
	REFERENCES lkplayermatch (lkplayermatchid);

-- Reference: FK_lkplayermatch_lkplayerteam (table: lkplayermatch)
ALTER TABLE lkplayermatch ADD CONSTRAINT FK_lkplayermatch_lkplayerteam FOREIGN KEY FK_lkplayermatch_lkplayerteam (lkplayerteamid)
	REFERENCES lkplayerteam (lkplayerteamid);

-- Reference: FK_lkplayermatch_matchid (table: lkplayermatch)
ALTER TABLE lkplayermatch ADD CONSTRAINT FK_lkplayermatch_matchid FOREIGN KEY FK_lkplayermatch_matchid (matchid)
	REFERENCES `match` (matchid)
	ON DELETE RESTRICT
	ON UPDATE RESTRICT;

-- Reference: FK_lkplayerteam_player (table: lkplayerteam)
ALTER TABLE lkplayerteam ADD CONSTRAINT FK_lkplayerteam_player FOREIGN KEY FK_lkplayerteam_player (playerid)
	REFERENCES player (playerid)
	ON DELETE RESTRICT
	ON UPDATE RESTRICT;

-- Reference: FK_lkplayerteam_team (table: lkplayerteam)
ALTER TABLE lkplayerteam ADD CONSTRAINT FK_lkplayerteam_team FOREIGN KEY FK_lkplayerteam_team (teamid)
	REFERENCES team (teamid)
	ON DELETE RESTRICT
	ON UPDATE RESTRICT;

-- Reference: FK_lkteamleague_league (table: lkteamleague)
ALTER TABLE lkteamleague ADD CONSTRAINT FK_lkteamleague_league FOREIGN KEY FK_lkteamleague_league (leagueid)
	REFERENCES league (leagueid);

-- Reference: FK_lkteamleague_team (table: lkteamleague)
ALTER TABLE lkteamleague ADD CONSTRAINT FK_lkteamleague_team FOREIGN KEY FK_lkteamleague_team (teamid)
	REFERENCES team (teamid);

-- Reference: FK_match_lkteamleague_away (table: match)
ALTER TABLE `match` ADD CONSTRAINT FK_match_lkteamleague_away FOREIGN KEY FK_match_lkteamleague_away (awaylkteamleagueid)
	REFERENCES lkteamleague (lkteamleagueid);

-- Reference: FK_match_lkteamleague_home (table: match)
ALTER TABLE `match` ADD CONSTRAINT FK_match_lkteamleague_home FOREIGN KEY FK_match_lkteamleague_home (homelkteamleagueid)
	REFERENCES lkteamleague (lkteamleagueid);

-- Reference: FK_match_location (table: match)
ALTER TABLE `match` ADD CONSTRAINT FK_match_location FOREIGN KEY FK_match_location (locationid)
	REFERENCES location (locationid);

-- Reference: FK_official_club (table: official)
ALTER TABLE official ADD CONSTRAINT FK_official_club FOREIGN KEY FK_official_club (clubid)
	REFERENCES club (clubid)
	ON DELETE RESTRICT
	ON UPDATE RESTRICT;

-- Reference: FK_player_location (table: player)
ALTER TABLE player ADD CONSTRAINT FK_player_location FOREIGN KEY FK_player_location (locationid)
	REFERENCES location (locationid);

-- Reference: FK_team_club (table: team)
ALTER TABLE team ADD CONSTRAINT FK_team_club FOREIGN KEY FK_team_club (clubid)
	REFERENCES club (clubid);

-- Reference: FK_team_location (table: team)
ALTER TABLE team ADD CONSTRAINT FK_team_location FOREIGN KEY FK_team_location (locationid)
	REFERENCES location (locationid);

-- Reference: FK_user_rfuserrole (table: user)
ALTER TABLE user ADD CONSTRAINT FK_user_rfuserrole FOREIGN KEY FK_user_rfuserrole (rfuserroleid)
	REFERENCES rfuserrole (rfuserroleid);

-- Seed values for table: rfuserrole
INSERT INTO rfuserrole (rfuserroleid, rfuserrole)
VALUES 
	(1, 'Administrator'),
	(2, 'Standard');

-- Seed values for table: user
INSERT INTO user (userid, rfuserroleid, username, password, primaryemail, secondaryemail)
VALUES 
	(1, 1, 'TimJohn', 'password', 'jjohn1@stu.chi.ac.uk', NULL),
	(2, 2, 'GeorgeLee', 'password', 'glee7@stu.chi.ac.uk', NULL),
	(3, 1, 'RogerHolden', 'password', 'r.holden@chi.ac.uk', NULL);

-- Seed values for table: club
INSERT INTO club (clubid, clubname, foundeddate)
VALUES
	(1, 'Stirlands Cricket Club', '1998-01-01'),
	(2, 'Arundel Cricket Club', '1989-01-01'),
	(3, 'Findon Cricket Club', '1986-01-01');

-- Seed values for table: rfbattingstatus
INSERT INTO rfbattingstatus (rfbattingstatusid, rfbattingstatus, shortname, description)
VALUES 
	(1, 'Not Out', NULL, 'Batter was not dismissed' ),
	(2, 'Bowled', 'B', 'Batter was bowled out - the ball hit the wicket.'),
	(3, 'Caught', 'C', 'Batter hit the ball and a fielder caught the ball before contact with the ground.'),
	(4, 'Leg Before Wicket', 'LBW', 'Batter was hit by the ball on a legitimate delivery when the ball could have hit the wicket.'),
	(5, 'Stumped', 'S', 'Batter was hit by the ball on a legitimate delivery when the ball could have hit the wicket.'),
	(6, 'Run Out', 'RO', 'Batter is going for a run or runs, but fall short of the batting crease when the stumps are broken by the fielding team.');

-- Seed values for table: location
INSERT INTO location (locationid, locationname, line1, line2, line3, line4, postcode, county)
VALUES
	(1, 'Stirlands', 'Stirlands Cricket Club Of Birdham', 'Church Lane', 'Birdham, Chichester', 'PO20 7SP', 'Sussex'),
	(2, 'Arundel', 'Waterwoods Plain', 'A27, Chichester Road', 'Arundel, Chichester', 'BN18 0AD', 'Sussex');

-- Seed values for table: team
INSERT INTO team (clubid, locationid, teamname, isactive)
VALUES
	(1, 1, '1st XI', 1),
	(1, 1, '2st XI', 1),
	(1, 1, 'Twenty20', 1),
	(1, 1, 'Twenty20 2nd XI', 1),
	(1, 1, 'Under 12', 0),
	(1, 1, 'Under 9', 0);
-- End of file.

