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
		$db = new stirlands\DbConnect('mysql:host=localhost;dbname=test', 'root');
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
	$response["cookie"] = $_SESSION;
	$response["session"] = $_SESSION;
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
	return $db->query('SELECT rfuserroleid, rfuserrole FROM rfuserrole');
}

function login(DbConnect $db)
{
	$result = [ "hasErrored" => false, "result" => null];
	
	try 
	{
		$queryResult = $db->querySingleRecord(
			"SELECT 
				userid,
				rfuserroleid,
				username,
				primaryemail,
				secondaryemail 
			FROM user 
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
		return $result;
	}
}





?>