<?php
session_id('user');
session_start();
ob_start();
require '../../vendor/autoload.php';

use stirlands\DbConnect;

$_SESSION['IsDevelopment'] = (bool)getenv('IsDevelopment');
$response = array();

try
{
	if (isset($_POST['queryMethod']))
	{
		$db = new stirlands\DbConnect(getenv('connectionString'));
		$dbResponse = array();
		$method = $_POST['queryMethod'];
		$response = call_user_func($method, $db);
	}
	else
	{
		throw new Exception('No POST data detected.');
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


function isLoggedIn()
{
	$val = isset($_SESSION["user"]) ? $_SESSION["user"] : false;
	return [ "result" => [ "isAuthenticated" => isset($_SESSION["user"]), "user" => $val ]];
}

function getAllPlayers(DbConnect $db) : array
{
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
INNER JOIN club ON club.clubid = team.clubid AND club.clubid = 1
WHERE lkplayerteam.iscurrent = 1"), 
		"columns" => [ 
			[ "displayName" => "PlayerID", "key" => "playerid", "datatype" => "numeric", "sort" => null, "icon" => "vpnkey" ],
			[ "displayName" => "First Name", "key" => "firstname", "datatype" => null, "sort" => 1, "icon" => "accountbox"],
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
		$queryResult = $db->querySingleRecord(
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
	catch (Exception $ex)
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
	} catch (Exception $ex)
	{
		return false;
	}
}





?>