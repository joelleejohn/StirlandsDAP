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
	iscurrent tinyint NULL,
	iscaptain tinyint NULL,
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
	ishidden tinyint NOT NULL DEFAULT 0,
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
	isactive tinyint NOT NULL DEFAULT 1,
	homenumber varchar(80) NULL,
	phonenumber varchar(80) NOT NULL,
	ishidden tinyint NOT NULL DEFAULT 0,
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
	isactive tinyint NOT NULL DEFAULT 1,
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
	(1, 1, 'Marston', 'bmarston0@amazon.co.uk', '1999-03-15 09:54:11', '2014-10-22 22:22:34', false, '6531696872', '5269874280'),
	(2, 1, 'MacDermot', 'tmacdermot1@usgs.gov', '1999-12-21 16:29:05', '2009-03-16 18:31:44', true, '4821396449', '5023816227'),
	(3, 2, 'Canelas', 'tcanelas2@mapquest.com', '1997-06-03 21:49:56', '2017-02-09 12:26:14', true, '4728850928', '9298862788'),
	(4, 2, 'Harbard', 'eharbard3@latimes.com', '1996-10-31 19:05:28', '2019-01-31 05:58:38', true, '2283444489', '4454416489'),
	(5, 1, 'Poluzzi', 'cpoluzzi4@bing.com', '2002-11-01 18:43:09', '2011-01-07 02:41:22', true, '1427720944', '1841935767'),
	(6, 2, 'Gadie', 'dgadie5@storify.com', '1997-12-30 15:44:16', '2015-08-11 02:14:16', false, '8206944730', '3435612485'),
	(7, 2, 'Blight', 'fblight6@samsung.com', '1999-05-10 00:27:09', '2008-07-14 21:28:45', true, '4344057181', '5978134299'),
	(8, 1, 'Polycote', 'epolycote7@friendfeed.com', '2000-12-31 23:08:46', '2010-05-25 00:10:50', true, '1929562427', '6254990385'),
	(9, 2, 'Shuker', 'rshuker8@live.com', '2002-02-12 10:08:01', '2011-06-18 06:38:52', true, '3806030619', '6437929715'),
	(10, 1, 'Godspeede', 'kgodspeede9@cloudflare.com', '1999-08-17 04:15:47', '2020-02-05 15:18:09', false, '2302806858', '1736476545'),
	(11, 1, 'McGiffie', 'smcgiffiea@sitemeter.com', '1997-05-29 20:18:44', '2015-07-10 02:10:25', true, '4042758522', '5169533199'),
	(12, 1, 'Pavelin', 'jpavelinb@indiegogo.com', '2002-03-01 13:09:59', '2019-10-13 14:19:02', true, '3933003818', '1946766932'),
	(13, 1, 'Wormstone', 'dwormstonec@comsenz.com', '1996-10-12 14:34:23', '2010-02-15 03:45:02', false, '2204074572', '1684603279'),
	(14, 1, 'Blackwood', 'nblackwoodd@webs.com', '2002-07-16 07:14:22', '2013-04-25 21:16:12', true, '9788031235', '9585604213'),
	(15, 2, 'Firebrace', 'kfirebracee@wikipedia.org', '1997-10-24 19:16:13', '2010-09-13 05:24:01', true, '1984127251', '4816365019'),
	(16, 2, 'Suermeier', 'asuermeierf@gravatar.com', '1998-09-29 03:17:49', '2006-11-14 00:08:51', true, '9394937455', '2156754106'),
	(17, 1, 'Lum', 'clumg@comcast.net', '2001-09-30 22:25:11', '2006-06-26 02:34:26', false, '9895422945', '9267482747'),
	(18, 1, 'Maudling', 'rmaudlingh@china.com.cn', '1996-12-22 14:49:56', '2008-02-20 10:57:30', false, '2368435785', '2304911166'),
	(19, 1, 'Edinborough', 'hedinboroughi@wikimedia.org', '2002-06-28 22:59:46', '2008-11-06 11:19:38', true, '2445169959', '5971816123'),
	(20, 2, 'Saintpierre', 'wsaintpierrej@ovh.net', '2002-07-23 04:54:18', '2017-11-19 01:10:16', false, '2359196580', '8769094090'),
	(21, 1, 'Stanlack', 'gstanlackk@ebay.com', '1998-08-24 10:28:09', '2016-10-17 08:07:51', true, '3916074850', '8491089495'),
	(22, 1, 'Brient', 'mbrientl@ed.gov', '2002-05-23 17:47:01', '2010-02-25 09:46:34', false, '5389883449', '3574223437'),
	(23, 2, 'Klimochkin', 'sklimochkinm@europa.eu', '2000-04-04 20:03:55', '2020-02-23 09:48:10', true, '5106185779', '6737123078'),
	(24, 2, 'Whalley', 'fwhalleyn@about.me', '2001-06-26 22:16:18', '2019-11-20 08:44:29', false, '1472171284', '1622849744'),
	(25, 2, 'Fullstone', 'vfullstoneo@github.io', '1999-05-17 19:05:07', '2019-01-11 02:17:18', true, '9805745804', '9378908305'),
	(26, 2, 'Chestnutt', 'achestnuttp@domainmarket.com', '1999-04-16 16:34:05', '2010-01-02 22:58:05', false, '4915421369', '4156857773'),
	(27, 1, 'Crumley', 'scrumleyq@dyndns.org', '1996-06-01 20:34:00', '2007-04-12 23:57:42', false, '5756483852', '8339813382'),
	(28, 1, 'Miller', 'kmillerr@cloudflare.com', '1998-09-07 20:55:11', '2008-12-30 20:07:22', false, '7538799543', '3369499946'),
	(29, 1, 'Dahmel', 'ddahmels@japanpost.jp', '2001-11-16 19:55:40', '2015-05-02 05:14:57', true, '4996434054', '8416592655'),
	(30, 2, 'Pelosi', 'spelosit@comsenz.com', '2001-12-17 15:55:16', '2009-10-05 10:15:43', true, '5035015025', '3008168931'),
	(31, 1, 'Cawthera', 'jcawtherau@shutterfly.com', '2003-03-08 09:25:29', '2011-02-05 15:08:38', true, '8881087457', '9973415649'),
	(32, 1, 'Cufflin', 'bcufflinv@chron.com', '2000-03-30 00:03:02', '2014-05-23 17:44:27', false, '3815179966', '5797492113'),
	(33, 2, 'Rue', 'vruew@theatlantic.com', '1999-01-11 21:12:20', '2013-09-18 07:11:09', true, '4592998486', '2478274916'),
	(34, 1, 'Cardenoza', 'ucardenozax@dailymail.co.uk', '1996-11-12 13:19:12', '2011-06-04 12:37:51', false, '6769212255', '6712524387'),
	(35, 1, 'Sango', 'msangoy@theguardian.com', '1998-12-15 21:08:03', '2013-08-25 16:45:54', false, '7011930224', '2393273483'),
	(36, 1, 'Cruikshank', 'lcruikshankz@vk.com', '1998-08-14 09:34:06', '2006-09-22 17:05:26', false, '9046002902', '5004629941'),
	(37, 2, 'Hacquard', 'lhacquard10@baidu.com', '1998-10-24 08:04:56', '2007-04-09 18:33:17', true, '1573233823', '7177174042'),
	(38, 1, 'Beebis', 'sbeebis11@miitbeian.gov.cn', '2000-01-11 01:39:40', '2015-05-16 10:48:32', false, '6769528344', '8303092145'),
	(39, 1, 'Brangan', 'dbrangan12@addtoany.com', '2000-01-04 01:24:07', '2008-12-14 08:45:50', true, '7946662838', '3593540313'),
	(40, 2, 'Bemwell', 'bbemwell13@house.gov', '1999-11-20 05:40:57', '2012-10-08 23:45:47', true, '6909986338', '3099138675'),
	(41, 1, 'Manby', 'cmanby14@samsung.com', '1997-12-03 16:22:33', '2010-07-10 04:41:16', false, '8106857758', '9079357079'),
	(42, 2, 'Itzkovwitch', 'vitzkovwitch15@qq.com', '1996-08-19 07:30:06', '2010-02-17 08:56:53', false, '1653324913', '4494380932'),
	(43, 1, 'Balchen', 'abalchen16@smh.com.au', '1999-06-12 02:21:47', '2007-11-18 23:20:52', true, '8946573843', '9342205912'),
	(44, 1, 'Bonifazio', 'dbonifazio17@ezinearticles.com', '2001-03-15 22:02:04', '2014-12-16 16:23:21', true, '5244895184', '8274558558'),
	(45, 1, 'Taylerson', 'ataylerson18@canalblog.com', '2003-02-01 22:47:54', '2009-01-07 09:03:05', false, '3027436904', '5243011735'),
	(46, 2, 'Labin', 'flabin19@tinyurl.com', '1998-08-28 14:56:32', '2007-07-14 16:46:50', false, '5748425890', '6462854707'),
	(47, 2, 'MacCoveney', 'emaccoveney1a@so-net.ne.jp', '1997-04-30 02:23:10', '2018-02-09 12:04:45', true, '8274054680', '2107678869'),
	(48, 1, 'Kinnane', 'jkinnane1b@cbsnews.com', '1999-04-26 03:55:21', '2014-08-26 22:01:38', true, '9967566595', '1307864131'),
	(49, 1, 'Bontein', 'abontein1c@jigsy.com', '1999-07-03 19:26:02', '2017-04-30 05:11:56', false, '9101842722', '6697374837'),
	(50, 1, 'Braksper', 'wbraksper1d@cloudflare.com', '2002-02-13 03:27:52', '2009-04-19 05:37:29', true, '1499509621', '2333933603'),
	(51, 2, 'Stannering', 'cstannering1e@surveymonkey.com', '1998-09-23 16:44:09', '2006-10-10 19:53:28', false, '1552027543', '9322180690'),
	(52, 2, 'Butler', 'nbutler1f@umn.edu', '1998-04-16 04:14:04', '2017-01-31 12:40:02', false, '7035175360', '7676357372'),
	(53, 1, 'Boyn', 'tboyn1g@edublogs.org', '1998-06-02 14:19:04', '2018-05-20 06:10:42', true, '3527501032', '4579854118'),
	(54, 1, 'Arrigo', 'sarrigo1h@nsw.gov.au', '2000-09-18 10:03:53', '2013-10-01 20:30:48', false, '7977473497', '5319946688'),
	(55, 2, 'Bothbie', 'bbothbie1i@blogspot.com', '2002-09-25 03:14:15', '2016-05-13 02:35:46', false, '2602012990', '3569362370'),
	(56, 2, 'Marchent', 'jmarchent1j@timesonline.co.uk', '1999-06-03 05:26:44', '2007-07-16 15:05:30', true, '9141709400', '2963093524'),
	(57, 2, 'Kid', 'akid1k@t-online.de', '2000-08-08 18:15:35', '2008-09-12 09:17:09', false, '7407223828', '1968894426'),
	(58, 2, 'Lillgard', 'llillgard1l@senate.gov', '2000-12-19 18:34:06', '2011-08-12 21:48:50', true, '2354686906', '9792690855'),
	(59, 2, 'Mateuszczyk', 'smateuszczyk1m@google.com', '1997-05-27 21:26:51', '2008-10-30 02:52:42', false, '9823455332', '4815802483'),
	(60, 1, 'Japp', 'mjapp1n@cbslocal.com', '2002-02-12 17:56:06', '2013-12-24 22:13:40', false, '3078559769', '5128993845'),
	(61, 1, 'Bromont', 'lbromont1o@yahoo.com', '1998-05-13 08:57:52', '2019-06-06 18:19:32', true, '1175963110', '8848058884'),
	(62, 2, 'Gorini', 'igorini1p@eventbrite.com', '2001-08-11 10:02:48', '2008-08-26 04:33:55', true, '9994797000', '1373614163'),
	(63, 1, 'Boch', 'kboch1q@shinystat.com', '2001-01-15 23:44:15', '2016-01-11 23:33:30', true, '2557236979', '7609920338'),
	(64, 2, 'Priestnall', 'apriestnall1r@livejournal.com', '1997-06-15 09:10:33', '2011-05-27 01:42:43', true, '2517808241', '3048140515'),
	(65, 2, 'Lothlorien', 'hlothlorien1s@mail.ru', '2000-03-18 10:35:56', '2006-06-08 21:34:45', false, '1919295795', '3528800171'),
	(66, 1, 'Marsden', 'cmarsden1t@berkeley.edu', '2001-11-16 11:43:42', '2011-10-16 21:06:20', true, '7817308608', '5348565850'),
	(67, 2, 'Dodson', 'idodson1u@exblog.jp', '2002-12-26 07:15:55', '2012-12-27 05:49:54', false, '6941797744', '5986705761'),
	(68, 2, 'Cutsforth', 'dcutsforth1v@un.org', '2003-04-26 21:59:43', '2007-11-14 00:05:10', true, '3008399349', '1995358782'),
	(69, 1, 'Feakins', 'jfeakins1w@lycos.com', '1998-08-12 01:30:13', '2011-09-13 09:25:07', true, '6757159915', '4068700818'),
	(70, 2, 'Perulli', 'mperulli1x@ning.com', '1998-11-08 02:32:09', '2012-03-28 09:02:30', false, '3393340541', '2999018038'),
	(71, 1, 'MacFarlan', 'kmacfarlan1y@newyorker.com', '2002-06-17 00:57:37', '2011-11-26 04:12:54', false, '3401274116', '7866016905'),
	(72, 2, 'Goneau', 'fgoneau1z@amazon.com', '2002-10-25 08:27:07', '2015-10-30 05:16:28', false, '1791045389', '6472629236'),
	(73, 2, 'Seabon', 'xseabon20@salon.com', '1999-10-05 03:45:47', '2012-01-26 00:33:40', true, '5868832491', '8644149044'),
	(74, 1, 'Palffy', 'npalffy21@dell.com', '2001-10-25 14:44:52', '2008-04-27 09:55:07', true, '5062796441', '6028374277'),
	(75, 2, 'Catenot', 'wcatenot22@4shared.com', '2002-01-10 18:42:34', '2015-11-09 13:04:53', false, '1757018217', '4133394653'),
	(76, 1, 'Bonnar', 'sbonnar23@loc.gov', '2001-08-13 22:38:40', '2018-05-05 14:46:50', true, '7619694637', '9537005405'),
	(77, 1, 'Biddwell', 'fbiddwell24@ameblo.jp', '2000-02-11 14:37:19', '2016-01-08 16:30:45', true, '7541638628', '4785611958'),
	(78, 1, 'Spitell', 'sspitell25@eventbrite.com', '2002-04-17 08:32:43', '2017-03-30 17:50:09', true, '7014973185', '9047738067'),
	(79, 1, 'Stewart', 'bstewart26@sourceforge.net', '1999-11-15 21:13:46', '2007-01-05 04:27:00', false, '2066220305', '1904044205'),
	(80, 2, 'Bluschke', 'sbluschke27@ucoz.com', '2001-09-07 05:42:25', '2013-08-16 15:29:46', true, '8181241125', '1306692938'),
	(81, 2, 'Budgeon', 'mbudgeon28@army.mil', '1997-10-19 03:27:45', '2015-02-21 07:01:05', false, '7515020787', '4959371992'),
	(82, 1, 'Spehr', 'espehr29@devhub.com', '1998-12-09 17:36:15', '2006-07-14 05:27:17', true, '6156691751', '1414544118'),
	(83, 2, 'Starkings', 'gstarkings2a@cocolog-nifty.com', '2001-11-29 03:06:50', '2015-10-03 09:07:24', true, '6434825307', '8945305841'),
	(84, 1, 'Concannon', 'vconcannon2b@twitpic.com', '2001-12-28 18:39:48', '2011-10-03 05:48:02', true, '8202795908', '6507093810'),
	(85, 1, 'Ingon', 'eingon2c@vistaprint.com', '1999-02-22 16:40:53', '2015-06-19 16:04:41', true, '4903142522', '1118989153'),
	(86, 2, 'Orneblow', 'gorneblow2d@loc.gov', '1999-01-24 10:29:50', '2019-05-27 05:31:17', false, '7025601034', '4497847640'),
	(87, 1, 'Coppledike', 'ccoppledike2e@deliciousdays.com', '2000-03-18 08:05:36', '2011-07-17 18:39:18', false, '5783674566', '4439667437'),
	(88, 1, 'Pampling', 'opampling2f@cloudflare.com', '2000-02-11 17:30:27', '2006-07-09 10:03:34', false, '3563324959', '9548604567'),
	(89, 2, 'Wingeatt', 'swingeatt2g@linkedin.com', '1997-06-11 22:15:41', '2017-02-28 14:45:39', true, '5139013553', '8563313200'),
	(90, 2, 'Chalcroft', 'achalcroft2h@ning.com', '1997-01-03 09:54:19', '2017-01-02 02:56:43', false, '8921402904', '1722276785'),
	(91, 1, 'Eilhermann', 'jeilhermann2i@tinyurl.com', '1997-07-23 17:20:49', '2016-07-28 06:44:39', false, '8073839876', '9082392509'),
	(92, 1, 'Flanagan', 'dflanagan2j@mapy.cz', '2000-03-30 08:04:06', '2006-09-02 02:52:33', false, '4919274875', '6116668339'),
	(93, 1, 'Cargon', 'mcargon2k@geocities.jp', '2002-09-22 13:51:23', '2009-03-14 19:26:02', true, '9992548438', '5942715414'),
	(94, 1, 'Fenna', 'jfenna2l@ft.com', '1999-10-05 16:08:33', '2015-05-26 06:19:08', false, '1141931508', '7659226677'),
	(95, 2, 'Gilders', 'ggilders2m@hao123.com', '2002-02-12 23:49:38', '2008-10-30 13:05:31', true, '3356598270', '8231813943'),
	(96, 1, 'Pendell', 'opendell2n@networksolutions.com', '2002-02-03 22:08:48', '2007-01-02 19:15:55', false, '5483864772', '5185238431'),
	(97, 2, 'Conerding', 'rconerding2o@macromedia.com', '2002-03-01 07:28:58', '2012-05-01 23:42:45', true, '3914628170', '8629135067'),
	(98, 1, 'Owttrim', 'mowttrim2p@google.com', '2001-05-16 07:45:32', '2013-01-30 14:15:37', true, '9237943303', '5541006733'),
	(99, 1, 'Domenici', 'cdomenici2q@who.int', '1999-11-08 10:14:55', '2007-04-11 05:20:41', true, '2316964972', '3109357190'),
	(100, 2, 'Tuff', 'atuff2r@whitehouse.gov', '1998-02-17 12:14:02', '2010-02-12 05:54:47', true, '1305915324', '5422612200');


-- End of file.

