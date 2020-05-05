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
);

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
	ishidden tinyint NOT NULL DEFAULT 0,
	lastmodified timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
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
	isactive tinyint NOT NULL DEFAULT 0,
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
	iscaptain tinyint NOT NULL DEFAULT 0,
	iswicketkeeper tinyint NOT NULL DEFAULT 0,
	isbatsman tinyint NOT NULL DEFAULT 0,
	isbowler tinyint NOT NULL DEFAULT 0,
	lastmodified timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
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
	iscurrent tinyint NOT NULL DEFAULT 1,
	iscaptain tinyint NOT NULL DEFAULT 0,
	lastmodified timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT PK_lkplayerteam_lkplayerteamid PRIMARY KEY (lkplayerteamid)
);

-- Table: lkteamleague
CREATE TABLE lkteamleague (
	lkteamleagueid bigint NOT NULL AUTO_INCREMENT,
	leagueid bigint NOT NULL,
	teamid bigint NOT NULL,
	lastmodified timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
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
	lastmodified timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
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
	lastmodified timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
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
	ishidden tinyint NOT NULL DEFAULT 0,
	lastmodified timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
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
	isactive tinyint NOT NULL DEFAULT 1,
	homenumber varchar(80) NULL,
	phonenumber varchar(80) NOT NULL,
	ishidden tinyint NOT NULL DEFAULT 0,
	lastmodified timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
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
	isactive tinyint NOT NULL DEFAULT 1,
	lastmodified timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
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
INSERT INTO location (locationid, locationname, line1, line2, line4, postcode, county)
VALUES
	(1, 'Stirlands', 'Stirlands Cricket Club Of Birdham', 'Church Lane', 'Birdham, Chichester', 'PO207SP', 'Sussex'),
	(2, 'Arundel', 'Waterwoods Plain', 'A27, Chichester Road', 'Arundel, Chichester', 'BN180AD', 'Sussex');

-- Seed values for table: team
INSERT INTO team (clubid, locationid, teamname, isactive)
VALUES
	(1, 1, '1st XI', 1),
	(1, 1, '2st XI', 1),
	(1, 1, 'Twenty20', 1),
	(1, 1, 'Twenty20 2nd XI', 1),
	(1, 1, 'Under 12', 0),
	(1, 1, 'Under 9', 0),
	(2, 2, '2st XI', 1),
	(2, 2, '2st XI', 1),
	(2, 2, 'Twenty20', 1),
	(2, 2, 'Twenty20 2nd XI', 1),
	(2, 2, 'Under 22', 0),
	(2, 2, 'Under 9', 0);
    
INSERT INTO league (leagueid, leaguename, isactive)
VALUES 
	(1, "Sussex Cricket League", 1),
	(2, "Friendly", 1);

INSERT INTO lkteamleague (leagueid, teamid, position, points)
VALUES
	(1, 1, 0, 0),
	(1, 2, 0, 0),
	(1, 6, 0, 0),
	(1, 7, 0, 0),
	(2, 1, 0, 0),
	(2, 2, 0, 0),
	(2, 3, 0, 0),
	(2, 4, 0, 0),
	(2, 5, 0, 0),
	(2, 6, 0, 0),
	(2, 7, 0, 0),
	(2, 8, 0, 0),
	(2, 9, 0, 0),
	(2, 10, 0, 0),
	(2, 11, 0, 0),
	(2, 12, 0, 0);

INSERT INTO player (playerid, locationid, firstname, lastname, dateofbirth, dateregistered, isactive, homenumber, phonenumber) 
VALUES
	(1, 2, 'Stefanie', 'Davenport', '1996-05-18', '2017-01-18', '6152042875', '7171794942'),
	(2, 1, 'Laetitia', 'Berthomier', '2002-08-21', '2016-05-27', '8921868098', '6454187747'),
	(3, 2, 'Whit', 'Gussie', '1994-10-26', '2015-03-04', '6197680801', '7909982115'),
	(4, 1, 'Athene', 'Piche', '1991-03-08', '2019-04-24', '3646342007', '6616155297'),
	(5, 2, 'Margarette', 'Daice', '1993-06-23', '2015-04-22', '4297077140', '9627415713'),
	(6, 2, 'Daphne', 'Powdrell', '1998-05-30', '2014-05-05', '5466942639', '7334772038'),
	(7, 1, 'Charmaine', 'Dolohunty', '2003-02-11', '2016-11-08', '7299544358', '1737590741'),
	(8, 2, 'Bette', 'Brownsell', '1999-11-03', '2017-11-02', '6632149499', '1364960065'),
	(9, 2, 'Anica', 'Wollen', '1999-07-31', '2017-06-16', '7142186626', '5795058303'),
	(10, 2, 'Merna', 'Pearlman', '1998-12-30', '2017-10-03', '8056465231', '1143722514'),
	(11, 1, 'Tallulah', 'Patrie', '1996-11-15', '2017-02-16', '3333911941', '6111425737'),
	(12, 2, 'Temp', 'Basili', '1993-04-16', '2019-03-27', '8909403088', '1555300661'),
	(13, 2, 'Jonie', 'Findlater', '1995-11-24', '2019-04-25', '4978859105', '1644572514'),
	(14, 2, 'Hayes', 'Culver', '2001-07-12', '2017-11-26', '3583073601', '9082340885'),
	(15, 1, 'Lorri', 'Lefeuvre', '2002-12-04', '2015-12-03', '7046468029', '6927975543'),
	(16, 1, 'Malynda', 'Pixton', '1995-08-03', '2019-04-09', '5101059422', '9662921445'),
	(17, 2, 'Lilli', 'Disbrow', '1998-09-25', '2018-05-05', '9592062390', '2851150567'),
	(18, 2, 'Thadeus', 'Kerfod', '1993-08-11', '2019-04-18', '1798184596', '2108032964'),
	(19, 2, 'Kippar', 'Clare', '1995-06-22', '2019-01-18', '2224877985', '3554631102'),
	(20, 1, 'Irita', 'Bakeup', '1994-10-20', '2018-07-02', '3585566902', '8773478728'),
	(21, 2, 'Willie', 'Yuryichev', '1999-01-20', '2017-04-05', '3975083953', '3207725324'),
	(22, 1, 'Brig', 'Pulhoster', '1999-02-23', '2019-04-17', '6346398344', '7827254037'),
	(23, 2, 'Lucila', 'Crayke', '1999-10-19', '2017-06-29', '2394354682', '2641629552'),
	(24, 1, 'Gusti', 'Delgado', '2001-08-02', '2014-07-29', '7921263744', '6994478964'),
	(25, 2, 'Matthiew', 'Dmtrovic', '1994-04-29', '2019-02-24', '9464571559', '1974476945'),
	(26, 1, 'Jacquenetta', 'Norwich', '1992-01-25', '2017-07-02', '2015248287', '4199889928'),
	(27, 1, 'Aleece', 'McAnalley', '1994-07-22', '2018-10-28', '9859985312', '5709903065'),
	(28, 1, 'Gertie', 'Filipic', '1990-12-21', '2015-01-03', '9858623198', '4976808136'),
	(29, 1, 'Shalne', 'Ivanisov', '1990-09-26', '2018-12-26', '4876810902', '8514762308'),
	(30, 2, 'Ryann', 'Elsip', '1991-06-30', '2016-08-28', '2375566843', '1859636043'),
	(31, 1, 'Zarla', 'Blampy', '2002-02-24', '2019-02-05', '1031901326', '5022242176'),
	(32, 2, 'Felecia', 'Sorey', '1998-08-31', '2015-06-14', '1649586533', '3847514954'),
	(33, 2, 'Meriel', 'Stripling', '2003-07-18', '2014-12-12', '3536757896', '5031641665'),
	(34, 2, 'Tish', 'Dellenbrok', '1994-05-20', '2016-10-10', '9724806361', '4347834338'),
	(35, 1, 'Mei', 'Lethley', '2000-06-10', '2016-06-01', '7179544589', '5394232909'),
	(36, 1, 'Farah', 'Quinnelly', '2003-05-30', '2018-04-18', '2275645117', '3762425066'),
	(37, 2, 'Dora', 'Backhouse', '2003-06-28', '2015-09-26', '9719423609', '2683064850'),
	(38, 1, 'Clive', 'Allabush', '2003-02-26', '2019-01-11', '2844786980', '7722695098'),
	(39, 2, 'Leticia', 'Minghetti', '1994-01-17', '2017-09-20', '4715172422', '7685227838'),
	(40, 2, 'Mile', 'Cutchee', '1992-07-23', '2014-10-14', '3963876790', '4835042328'),
	(41, 1, 'Raphaela', 'Gerardi', '1996-12-11', '2014-12-21', '7271818008', '8299924023'),
	(42, 1, 'Waring', 'Coopey', '1997-12-21', '2017-01-10', '7093996863', '6215960448'),
	(43, 2, 'Vittorio', 'Plumm', '1990-11-13', '2015-08-31', '7408506216', '5915247211'),
	(44, 1, 'Marti', 'Pawlyn', '2001-08-19', '2016-05-18', '4347243201', '1006382109'),
	(45, 1, 'Ernest', 'Vaggs', '1992-04-16', '2014-10-21', '4902284099', '5606045376'),
	(46, 2, 'Kerrin', 'Westphalen', '2000-08-11', '2017-09-04', '1772605437', '6923835961'),
	(47, 1, 'Ellsworth', 'Mushet', '1995-10-13', '2019-03-24', '5245529730', '9847453641'),
	(48, 2, 'Meris', 'Frigout', '2003-08-11', '2018-09-16', '3923439963', '6494913514'),
	(49, 2, 'Gaelan', 'Pollastro', '1995-01-01', '2017-07-29', '9339417778', '4754839996'),
	(50, 2, 'Osbourn', 'Twopenny', '2004-03-12', '2018-10-22', '3631049370', '8644013790'),
	(51, 2, 'Marlane', 'Ropking', '1993-09-09', '2017-12-25', '2104032857', '2512214660'),
	(52, 2, 'Henri', 'Howick', '1997-03-27', '2018-01-27', '5322834936', '3468691420'),
	(53, 2, 'Camilla', 'Malley', '1996-08-12', '2017-03-31', '8421465699', '9527261282'),
	(54, 1, 'Lyman', 'Ector', '1991-09-25', '2019-01-20', '7623313338', '2099740927'),
	(55, 2, 'Brennen', 'Keave', '2003-09-26', '2015-01-29', '3276005413', '2535070412'),
	(56, 2, 'Adolpho', 'Gilkes', '1993-11-27', '2015-07-26', '4308300088', '8398178090'),
	(57, 1, 'Fulton', 'Shakeshaft', '2000-05-23', '2017-08-06', '3666337089', '9478223184'),
	(58, 1, 'Benjie', 'Curdell', '2002-10-12', '2015-10-03', '5407330683', '7973317721'),
	(59, 1, 'Bev', 'Janicijevic', '1991-07-28', '2018-01-11', '9262891841', '1219496980'),
	(60, 1, 'Maude', 'Mussared', '2001-12-26', '2014-05-28', '3586730235', '7487097551'),
	(61, 2, 'Grissel', 'Lockie', '1999-08-18', '2016-07-06', '6135838028', '6401161550'),
	(62, 2, 'Hymie', 'Mounsey', '1991-04-05', '2018-06-15', '8795724790', '4999859067'),
	(63, 2, 'Libbie', 'Hartington', '1991-01-13', '2016-12-05', '8996315484', '9211015859'),
	(64, 2, 'Meggie', 'Mottram', '1990-06-23', '2014-12-07', '7733924557', '9286226933'),
	(65, 1, 'Norina', 'Casine', '1990-11-01', '2015-12-17', '9355873389', '6492203758'),
	(66, 1, 'Adler', 'Valance', '1993-01-16', '2015-03-25', '5272540112', '7239782815'),
	(67, 2, 'Sean', 'Kayne', '1992-10-26', '2015-11-19', '9056206050', '6151466024'),
	(68, 1, 'Amalee', 'Eaglesham', '1999-10-14', '2018-08-16', '4248045245', '9256565439'),
	(69, 1, 'Irita', 'Adnam', '2002-02-18', '2018-05-12', '3683440783', '5258231900'),
	(70, 2, 'Lou', 'Hindsberg', '1998-07-05', '2017-12-31', '5603945053', '9187703218'),
	(71, 2, 'Catie', 'Eason', '1993-03-15', '2014-09-24', '4793431326', '8326151183'),
	(72, 2, 'Jennette', 'Bamlett', '1995-10-09', '2017-05-25', '4447225595', '6966165620'),
	(73, 2, 'Tedie', 'Mechem', '2002-06-29', '2018-08-04', '3626894584', '3467838646'),
	(74, 2, 'Vito', 'Mosten', '2003-06-04', '2018-07-25', '1004181941', '5059279627'),
	(75, 2, 'Appolonia', 'Filasov', '1999-05-22', '2018-09-25', '5072375795', '5805704071'),
	(76, 1, 'Jehu', 'Lindsley', '1992-06-19', '2014-05-30', '2769273308', '8726760261'),
	(77, 1, 'Ursuline', 'Welldrake', '1994-04-03', '2015-04-24', '7865407402', '4214504020'),
	(78, 1, 'Rock', 'Scading', '1992-02-02', '2017-05-29', '5134792972', '8106672174'),
	(79, 2, 'Marybeth', 'Nassau', '1994-10-15', '2019-01-13', '2545517968', '3249785594'),
	(80, 2, 'Aleda', 'Bamforth', '2003-11-08', '2016-06-03', '3602131335', '7549124551'),
	(81, 1, 'Osbert', 'Ridger', '1993-05-08', '2016-09-21', '4201779214', '3737629624'),
	(82, 1, 'Thaddus', 'Whellans', '1997-02-07', '2015-04-01', '1916573542', '8783840288'),
	(83, 2, 'Christye', 'D''Ambrogi', '1998-02-07', '2014-10-05', '5164209210', '5775536142'),
	(84, 1, 'Clevey', 'Gorcke', '1998-04-02', '2016-03-11', '9673482038', '5996598036'),
	(85, 2, 'Loren', 'Rajchert', '1994-05-11', '2017-01-03', '6549576253', '3651368587'),
	(86, 1, 'Albrecht', 'Belamy', '2004-02-29', '2015-05-10', '5649455590', '3537319552'),
	(87, 1, 'Judah', 'Bruford', '1997-03-18', '2016-04-29', '3559099717', '9468337404'),
	(88, 2, 'Bernardo', 'Kirwood', '1997-10-04', '2016-08-11', '4124026643', '4095348258'),
	(89, 1, 'Ulrika', 'Gilman', '1990-10-21', '2017-07-01', '3655951334', '3901848090'),
	(90, 2, 'Donn', 'Farbrace', '1997-10-09', '2018-06-27', '2231288539', '3276029392'),
	(91, 2, 'Neila', 'Tilliard', '1990-11-16', '2019-01-23', '1972666585', '6322958789'),
	(92, 2, 'Mathias', 'Yeldon', '2003-03-16', '2018-06-07', '3019668135', '3399442042'),
	(93, 1, 'Selig', 'Hargraves', '2002-03-27', '2017-06-16', '2563610627', '8201251894'),
	(94, 1, 'Theodore', 'Kermott', '1995-12-14', '2018-10-24', '3849621948', '9846947864'),
	(95, 1, 'Dion', 'Broddle', '1997-12-03', '2018-12-28', '7608204134', '7839288169'),
	(96, 2, 'Emmie', 'Dorning', '1998-12-06', '2014-09-10', '3545844125', '5611802662'),
	(97, 1, 'Dominik', 'Lorraine', '2002-12-12', '2016-10-29', '5039757308', '8561980080'),
	(98, 1, 'Skippie', 'Kilgrove', '1997-08-26', '2017-10-20', '1544116650', '1289885765'),
	(99, 2, 'Junette', 'Willshaw', '2000-05-29', '2018-12-07', '5325059602', '1677677653'),
	(100, 2, 'Roselia', 'Vasilchenko', '1996-07-27', '2014-11-23', '7387178610', '8602927399'),
	(101, 1, 'Silvester', 'Frederick', '1996-06-11', '2014-05-06', '3434890333', '2474402474'),
	(102, 1, 'Staford', 'Meys', '1995-04-22', '2016-02-07', '1856027805', '9204379296'),
	(103, 2, 'Liz', 'Hurley', '1994-07-14', '2017-12-17', '1839931696', '8989760713'),
	(104, 2, 'Quintus', 'Barkworth', '1997-07-29', '2015-03-20', '1927528225', '5315894440'),
	(105, 2, 'Corny', 'Fernant', '2002-06-03', '2015-06-26', '2498340519', '1385943255'),
	(106, 2, 'Keith', 'Normabell', '1995-07-31', '2016-03-08', '5743421264', '2949464897'),
	(107, 1, 'Riordan', 'Reicherz', '2003-10-26', '2017-11-18', '6208495861', '1989472503'),
	(108, 2, 'Rolfe', 'Baversor', '1999-06-14', '2016-06-05', '5423454372', '8992090776'),
	(109, 2, 'Tresa', 'Osman', '2000-01-23', '2017-04-03', '4947015129', '6013072822'),
	(110, 1, 'Goober', 'Dewing', '1999-01-22', '2019-01-17', '9484011355', '1094691585'),
	(111, 2, 'Norene', 'Autrie', '2003-06-30', '2019-03-05', '2553447309', '6679492760'),
	(112, 1, 'Auria', 'Casterou', '1998-11-29', '2015-09-07', '9105766117', '3224459008'),
	(113, 2, 'Artemis', 'Liddyard', '1993-09-10', '2018-02-25', '5581092698', '4401931206'),
	(114, 1, 'Wolf', 'Lammerts', '1999-04-13', '2015-05-09', '3217392636', '9192756597'),
	(115, 1, 'Clarence', 'Tumber', '2003-11-24', '2015-07-05', '7607327639', '7693948939'),
	(116, 1, 'Sherye', 'Fowden', '1994-06-22', '2018-03-05', '4642032054', '9848037550'),
	(117, 1, 'Zenia', 'Cadney', '1990-09-25', '2015-03-23', '7671434660', '3652148014'),
	(118, 2, 'Oswald', 'MacFarland', '1999-05-31', '2014-11-04', '5843385255', '9677950912'),
	(119, 2, 'Marietta', 'Genike', '1990-09-11', '2018-09-23', '8127586117', '7285191766'),
	(120, 1, 'Tedman', 'Brittles', '1998-05-29', '2015-03-16', '7958176234', '7934503658'),
	(121, 1, 'Warner', 'Slisby', '1997-12-01', '2018-01-23', '3262936768', '4428042502'),
	(122, 1, 'Yancy', 'Middleweek', '1990-12-27', '2018-07-07', '8765833427', '3695489512'),
	(123, 1, 'Oliviero', 'Haxbie', '1995-06-13', '2017-10-07', '2787416649', '4653556977'),
	(124, 1, 'Shae', 'Shilliday', '1995-03-08', '2017-09-18', '4493623857', '8708258887'),
	(125, 1, 'Abbie', 'Moden', '1995-10-02', '2018-05-21', '4318967916', '2708024632'),
	(126, 2, 'Marcello', 'Durkin', '1994-01-04', '2015-07-10', '1437877803', '1388396992'),
	(127, 1, 'Bess', 'Robley', '2003-12-18', '2015-07-30', '2939610931', '9464326228'),
	(128, 2, 'Valdemar', 'Gillbee', '1994-05-01', '2017-05-25', '3586077332', '5524087312'),
	(129, 2, 'Vicky', 'Cuxson', '2003-05-06', '2016-11-18', '7508371901', '1758551708'),
	(130, 1, 'Gunther', 'Dodd', '2002-04-10', '2019-02-12', '7225581818', '8531634941'),
	(131, 1, 'Bria', 'Haime', '1999-12-14', '2019-04-28', '6141032726', '5657961527'),
	(132, 1, 'Seline', 'Geertz', '2002-10-13', '2016-09-28', '2887021525', '1164517270');

INSERT INTO lkplayerteam (playerid, teamid, startdate)
VALUES
 	(1, 1, '2015-08-05'),
 	(1, 1, '2015-08-05'),
 	(2, 1, '2016-06-21'),
 	(3, 1, '2014-02-08'),
 	(4, 1, '2014-03-01'),
 	(5, 1, '2014-04-26'),
 	(6, 1, '2018-07-26'),
 	(7, 1, '2013-07-30'),
 	(8, 1, '2019-06-24'),
 	(9, 1, '2020-02-03'),
 	(10, 1, '2013-07-04'),
 	(11, 1, '2013-07-04'),
	(12, 2, '2015-03-28'),
	(13, 2, '2015-05-24'),
	(14, 2, '2018-01-04'),
	(15, 2, '2014-06-29'),
	(16, 2, '2019-01-20'),
	(17, 2, '2019-01-01'),
	(18, 2, '2018-09-26'),
	(19, 2, '2014-07-12'),
	(20, 2, '2018-12-15'),
	(21, 2, '2017-01-31'),
	(22, 2, '2018-03-23'),
	(23, 3, '2015-10-24'),
	(24, 3, '2016-12-07'),
	(25, 3, '2015-08-05'),
	(26, 3, '2015-10-31'),
	(27, 3, '2015-09-16'),
	(28, 3, '2017-03-16'),
	(29, 3, '2018-06-25'),
	(30, 3, '2016-06-09'),
	(31, 3, '2015-10-23'),
	(32, 3, '2016-08-05'),
	(33, 3, '2019-03-13'),
	(34, 3, '2016-05-18'),
	(35, 4, '2017-03-15'),
	(36, 4, '2017-12-16'),
	(37, 4, '2019-04-14'),
	(38, 4, '2017-02-17'),
	(39, 4, '2018-02-19'),
	(40, 4, '2018-02-25'),
	(41, 4, '2016-02-21'),
	(42, 4, '2016-11-28'),
	(43, 4, '2017-05-25'),
	(44, 4, '2017-06-29'),
	(45, 4, '2017-01-28'),
	(46, 5, '2016-06-08'),
	(47, 5, '2016-03-18'),
	(48, 5, '2017-02-07'),
	(49, 5, '2015-11-22'),
	(50, 5, '2017-01-30'),
	(51, 5, '2015-09-17'),
	(52, 5, '2017-07-15'),
	(53, 5, '2017-04-09'),
	(54, 5, '2016-12-17'),
	(55, 5, '2018-11-11'),
	(56, 5, '2017-06-15'),
	(57, 6, '2016-01-08'),
	(58, 6, '2017-08-18'),
	(59, 6, '2019-05-03'),
	(60, 6, '2019-02-26'),
	(61, 6, '2016-10-23'),
	(62, 6, '2016-10-02'),
	(63, 6, '2017-10-14'),
	(64, 6, '2015-08-09'),
	(65, 6, '2017-05-13'),
	(66, 6, '2014-05-05'),
	(67, 6, '2016-10-19'),
	(68, 7, '2016-10-07'),
	(69, 7, '2016-09-12'),
	(70, 7, '2018-12-11'),
	(71, 7, '2018-07-17'),
	(72, 7, '2015-08-10'),
	(73, 7, '2016-03-28'),
	(74, 7, '2018-10-15'),
	(75, 7, '2016-01-02'),
	(76, 7, '2018-03-10'),
	(77, 7, '2018-05-29'),
	(78, 7, '2015-11-08'),
	(79, 8, '2015-03-12'),
	(80, 8, '2016-11-25'),
	(81, 8, '2016-12-13'),
	(82, 8, '2014-09-03'),
	(83, 8, '2017-12-30'),
	(84, 8, '2018-09-18'),
	(85, 8, '2018-11-01'),
	(86, 8, '2017-06-14'),
	(87, 8, '2016-07-21'),
	(88, 8, '2015-01-27'),
	(89, 8, '2018-01-15'),
	(90, 8, '2017-06-10'),
	(91, 9, '2018-05-11'),
	(92, 9, '2018-01-01'),
	(93, 9, '2017-02-28'),
	(94, 9, '2018-08-08'),
	(95, 9, '2014-06-19'),
	(96, 9, '2015-03-11'),
	(97, 9, '2017-10-31'),
	(98, 9, '2017-01-08'),
	(99, 9, '2019-02-05'),
	(100, 9, '2015-09-22'),
	(101, 9, '2014-11-19'),
	(102, 10, '2015-09-14'),
	(103, 10, '2016-08-25'),
	(104, 10, '2014-09-20'),
	(105, 10, '2016-08-11'),
	(106, 10, '2015-04-19'),
	(107, 10, '2016-12-24'),
	(108, 10, '2017-01-10'),
	(109, 10, '2016-03-19'),
	(110, 10, '2018-03-09'),
	(111, 10, '2016-04-07'),
	(112, 10, '2017-04-04'),
	(113, 10, '2018-08-11'),
	(114, 11, '2014-06-10'),
	(115, 11, '2015-06-18'),
	(116, 11, '2017-01-22'),
	(117, 11, '2014-06-13'),
	(118, 11, '2016-09-09'),
	(119, 11, '2016-01-22'),
	(120, 11, '2015-06-24'),
	(121, 11, '2017-03-20'),
	(122, 11, '2017-12-15'),
	(123, 11, '2016-07-17'),
	(124, 11, '2017-10-18'),
	(125, 11, '2015-07-18'),
	(126, 12, '2017-09-25'),
	(127, 12, '2017-04-15'),
	(128, 12, '2014-12-02'),
	(129, 12, '2016-02-29'),
	(130, 12, '2017-08-09'),
	(131, 12, '2017-12-22'),
	(132, 12, '2019-02-07'),
	(133, 12, '2015-03-11'),
	(134, 12, '2015-08-14'),
	(135, 12, '2016-03-08'),
	(136, 12, '2015-06-27'),
	(137, 12, '2018-05-19'),
	(138, 2, '2017-06-20'),
	(139, 4, '2017-01-11'),
	(140, 5, '2016-09-24'),
	(141, 6, '2015-12-08'),
	(142, 2, '2015-10-06');

-- End of file.

