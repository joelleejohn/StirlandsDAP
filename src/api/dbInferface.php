<?php
session_id('user');
session_start();
ob_start();
require '../../vendor/autoload.php';

use stirlands\DbConnect;

$_SESSION['IsDevelopment'] = (bool)getenv('IsDevelopment');
$response = [];
const pages = [
	[
		"page" => "Home",
		"route" => "/",
		"title" => "Home",
		"query" => "getPlayers",
		"icon" => "menu",
		"exact" => true,
	],
	[ 
		"page" => "players",
		"route" => "/players",
		"title" => "Players",
		"query" => "getPlayers",
		"icon" => "person",
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
try
{
	if (isset($_POST['queryMethod']))
	{
		$db = new stirlands\DbConnect(getenv('connectionString'));

		$method = $_POST['queryMethod'];

		$response = call_user_func($method, $db);
	}
	else
	{
		throw new Throwable('No POST data detected.');
	}
}
catch (Exception $ex)
{
	$response = [ 'hasErrored' => true, 'error' => $ex->getMessage(), "deg" => $_POST ] ;
}
finally
{
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
	return [ "result" => [ "isAuthenticated" => isset($_SESSION["user"]), "user" => $val ]];
}

function getPlayers(DbConnect $db) : array
{
	$clubId = isset($_POST["clubid"]) ? $_POST["clubid"] : 1; 
	$isActive = isset($_POST["isactive"]) ? $_POST["isactive"] : 1;
	return [ 
		"data" => $db->query(
"SELECT 
	player.playerid,
	player.firstname,
	player.lastname,
	player.isactive,
    club.clubname,
    team.teamname
FROM player
INNER JOIN lkplayerteam ON lkplayerteam.playerid = player.playerid
INNER JOIN team ON team.teamid = lkplayerteam.teamid
INNER JOIN club ON club.clubid = team.clubid AND club.clubid = :clubid
WHERE lkplayerteam.iscurrent = :isactive",
			//params
			[ "clubid" => $clubId , "isactive" => $isActive ]
), 
		"columns" => [ 
			[ "displayName" => "PlayerID", "key" => "playerid", "datatype" => "numeric", "sort" => null, "icon" => "vpnkey" ],
			[ "displayName" => "Club", "key" => "clubname", "datatype" => null, "sort" => 1, "icon" => "business" ],
			[ "displayName" => "First Name", "key" => "firstname", "datatype" => null, "sort" => null, "icon" => "accountbox"],
			[ "displayName" => "Last Name", "key" => "lastname", "datatype" => null, "sort" => null, "icon" => "accountbox" ],
			[ "displayName" => "Active Player", "key" => "isactive", "datatype" => "icon", "sort" => null, "icon" => "sportscricket" ],
		] 
	];
}

function login(DbConnect $db)
{
	$result = [ "hasErrored" => false, "result" => null];
	
	try 
	{
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
			[ "username" => $_POST["username"], "password" => $_POST["password"]]);

		if ($queryResult["error"])
		{
			$result["hasErrored"] = true;
			$result["error"] = $queryResult["error"];
		}
		else
		{
			$_SESSION["user"] = $queryResult["result"];
			$result["result"] = $_SESSION["user"];
		}
	}
	catch (Throwable $ex)
	{
		$result["hasErrored"] = true;
		$result["error"] = $ex->getMessage();
	}
	finally
	{
		$result["isAuthenticated"] = isset($_SESSION["user"]);
		return $result;
	}
}

function logout(){
	try 
	{
		unset($_SESSION['user']);
		return session_destroy();
	} catch (Throwable $ex)
	{
		return false;
	}
}

function clubs(DbConnect $db)
{
	$retVal = array();
	// array of clubs. clubid, clubname
	try 
	{
		$queryResult = $db->queryRecords(
			"SELECT club.clubid, club.clubname, foundeddate"
		);
	}
	catch (Throwable $ex)
	{

	}
}
