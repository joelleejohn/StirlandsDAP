<?php
session_id('user');
session_start();
ob_start();
require '../../vendor/autoload.php';

use stirlands\DbConnect;

$_SESSION['IsDevelopment'] = (bool) getenv('IsDevelopment');
$response = [];
const pages = [
	[
		"page" => "players",
		"route" => "/players",
		"title" => "Players",
		"query" => "getPlayers",
		"icon" => "sportscricket",
		"exact" => false,
		"filterfields" => [
			[
				"fieldname" => "clubid",
				"displayName" => "Club",
				"type" => "query",
				"detail" => [
					"query" => "clubs",
					"isRequired" => false,
				],
			],
			[
				"fieldname" => "isactive",
				"type" => "check",
				"detail" => [
					"defaultValue" => 0,
					"isRequired" => false,
				]
			],
		]
	],
];
try {
	if (isset($_POST['queryMethod'])) {
		$db = new stirlands\DbConnect(getenv('connectionString'));

		$method = $_POST['queryMethod'];

		$response = call_user_func($method, $db);
	} else {
		throw new Throwable('No POST data detected.');
	}
} catch (Exception $ex) {
	$response = ['hasErrored' => true, 'error' => $ex->getMessage(), "deg" => $_POST];
} finally {
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");
	echo json_encode($response);
	ob_end_flush();
	exit();
}

function pages()
{
	return pages;
}


function isLoggedIn()
{
	$val = isset($_SESSION["user"]) ? $_SESSION["user"] : false;
	return  ["isAuthenticated" => isset($_SESSION["user"]), "user" => $val];
}

function getPlayers(DbConnect $db): array
{
	$clubId = isset($_POST["ff_clubid"]) ? $_POST["ff_clubid"] : -1;
	$isActive = isset($_POST["ff_isactive"]) ? $_POST["ff_isactive"] : -1;
	return [
		"data" => $db->queryRecords(
			"SELECT 
	player.playerid,
	player.firstname,
	player.lastname,
	player.isactive,
    club.clubname,
	club.clubid,
	team.teamid,
    CONCAT(team.teamname, ' [', club.clubname ,']') AS teamname,
	player.dateofbirth,
	player.dateregistered,
	player.isactive,
	player.homenumber,
	player.phonenumber,
	iscaptain,
	iscurrent,
	location.locationid,
	CONCAT( location.line1, ', ', location.line4 ) AS locationname	
FROM player
INNER JOIN lkplayerteam ON lkplayerteam.playerid = player.playerid
INNER JOIN team ON team.teamid = lkplayerteam.teamid
INNER JOIN location ON location.locationid = player.locationid
INNER JOIN club ON club.clubid = team.clubid AND club.clubid = (SELECT CASE WHEN :clubid = -1 THEN 1 ELSE :clubbid END)
WHERE lkplayerteam.iscurrent = (SELECT CASE WHEN :isactive = -1 THEN lkplayerteam.iscurrent ELSE :isactivee END)",
			//params
			["clubid" => $clubId, "isactive" => $isActive, "clubbid" => $clubId, "isactivee" => $isActive ]
		),
		"columns" => [
			["displayName" => "PlayerID", "key" => "playerid", "datatype" => "numeric", "sort" => null, "icon" => "vpnkey"],
			["displayName" => "Club", "key" => "clubname", "datatype" => null, "sort" => 1, "icon" => "business"],
			["displayName" => "Team", "key" => "teamname", "datatype" => null, "sort" => null, "icon" => "sportsbaseball"],
			["displayName" => "Team", "key" => "teamid", "datatype" => "numeric", "sort" => null, "icon" => "sportsbaseball"],
			["displayName" => "First Name", "key" => "firstname", "datatype" => null, "sort" => null, "icon" => "accountbox"],
			["displayName" => "Last Name", "key" => "lastname", "datatype" => null, "sort" => null, "icon" => "accountbox"],
			["displayName" => "Active Player", "key" => "isactive", "datatype" => "icon", "sort" => null, "icon" => "sportscricket"],
			["displayName" => "Current Team", "key" => "iscurrent", "datatype" => "icon", "sort" => null, "icon" => "games"],
			["displayName" => "D.O.B", "key" => "dateofbirth", "datatype" => null, "sort" => null, "icon" => "childcare"],
			["displayName" => "Date Registered", "key" => "dateregistered", "datatype" => null, "sort" => null, "icon" => "playlistaddcheck"],
			["displayName" => "Captain", "key" => "iscaptain", "datatype" => "icon", "sort" => null, "icon" => "localactivity"],
			["displayName" => "Location", "key" => "locationname", "datatype" => null, "sort" => null, "icon" => "room"],
			["displayName" => "Location", "key" => "locationid", "datatype" => "numeric", "sort" => null, "icon" => "room"],
			["displayName" => "Home Number", "key" => "homenumber", "datatype" => "numeric", "sort" => null, "icon" => "phone", "isHidden" => true],
			["displayName" => "Phone Number", "key" => "phonenumber", "datatype" => "numeric", "sort" => null, "icon" => "phone", "isHidden" => true],
		]
	];
}

function getPlayer(DbConnect $db){
	return $db->queryRecords(
		"SELECT *
		FROM player
		INNER JOIN lkplayerteam ON lkplayerteam.playerid = player.playerid AND lkplayerteam.iscurrent
		WHERE player.playerid = :playerid
		",
		["playerid" => $_POST["playerid"] ] );
}

function addPlayer(DbConnect $db){
	return $db->queryRecords(
		"CALL `playeradd`(
			 :locationid,
			 :firstname,
			 :lastname,
			 :dateofbirth,
			 :dateregistered,
			 :isactive,
			 :homenumber,
			 :phonenumber, 
			 :teamid, 
			 :iscaptain, 
			 :iscurrent)",
		//params
		[
			"locationid" => $_POST["locationid"], 
			"firstname" => $_POST["firstname"],
			"lastname" => $_POST["lastname"],
			"dateofbirth" => $_POST["dateofbirth"],
			"dateregistered" => $_POST["dateregistered"],
			"isactive" => $_POST["isactive"],
			"homenumber" => $_POST["homenumber"],
			"phonenumber" => $_POST["phonenumber"],
			"teamid" => $_POST["teamid"],
			"iscurrent" => $_POST["iscurrent"],
		]
	);
}

function editPlayer(DbConnect $db)
{
	return $db->queryRecords(
		"CALL `playeradd`(
			 :playerid
			 :locationid,
			 :firstname,
			 :lastname,
			 :dateofbirth,
			 :dateregistered,
			 :isactive,
			 :homenumber,
			 :phonenumber, 
			 :teamid, 
			 :iscaptain, 
			 :iscurrent)",
		//params
		[
			"playerid" => $_POST["playerid"],
			"locationid" => $_POST["locationid"],
			"firstname" => $_POST["firstname"],
			"lastname" => $_POST["lastname"],
			"dateofbirth" => $_POST["dateofbirth"],
			"dateregistered" => $_POST["dateregistered"],
			"isactive" => $_POST["isactive"],
			"homenumber" => $_POST["homenumber"],
			"phonenumber" => $_POST["phonenumber"],
			"teamid" => $_POST["teamid"],
			"iscurrent" => $_POST["iscurrent"],
		]
	);
}



function deletePlayer(DbConnect $db){
	return $db->queryRecords(
			
"CALL `playerdelete`(:playerid)",
			//params
			[ "playerid" => $_POST["playerid"] ]);
}

function login(DbConnect $db)
{
	$result = ["hasErrored" => false, "result" => null];

	try {
		$queryResult = $db->queryRecords(
			"SELECT 
				user.userid,
				user.rfuserroleid,
				rfuserrole.rfuserrole,
				user.username,
				user.primaryemail,
				user.secondaryemail 
			FROM user
			INNER JOIN rfuserrole ON rfuserrole.rfuserroleid = user.rfuserroleid 
			WHERE username = :username 
			AND password = :password",
			// params
			["username" => $_POST["username"], "password" => $_POST["password"]]
		);

		if ($queryResult["error"]) {
			$result["hasErrored"] = true;
			$result["error"] = $queryResult["error"];
		} else {
			$_SESSION["user"] = $queryResult["result"];
			$result = [ "user" => $_SESSION["user"], "isAuthenticated" => isset($_SESSION["user"]), "debug"=> $queryResult["debug"]];
		}
	} catch (Throwable $ex) {
		$result["hasErrored"] = true;
		$result["error"] = $ex->getMessage();
	} finally {
		$result["isAuthenticated"] = isset($_SESSION["user"]);
		return $result;
	}
}

function logout()
{
	try {
		unset($_SESSION['user']);
		return session_destroy();
	} catch (Throwable $ex) {
		return false;
	}
}

function locations(DbConnect $db){
	try {
		return $db->queryRecords(
			"SELECT 
				location.locationid, 
				CONCAT( location.line1, ', ', location.line4 ) AS locationname
			FROM location"
		);
	} catch (Throwable $ex) {
		return ["error" => $ex->getMessage(), ["result"] => null];
	}
}

function teams(DbConnect $db)
{
	try {
		return $db->queryRecords(
			"SELECT 
				team.teamid, 
				CONCAT(team.teamname, ' [', club.clubname ,']') AS teamname,
				foundeddate 
			FROM team
			INNER JOIN club on club.clubid = team.clubid"
		);
	} catch (Throwable $ex) {
		return ["error" => $ex->getMessage(), ["result"] => null ];
	}
}
