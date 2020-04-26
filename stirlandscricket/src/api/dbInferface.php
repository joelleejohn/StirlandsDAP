<?php

use stirlands\DbConnect;

session_start();
$_SESSION['IsDevelopment'] = (bool)getenv('IsDevelopment');
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require '../../vendor/autoload.php';
$response = array();
if(isset($_SESSION['user']) || $_SESSION['IsDevelopment'])
{
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
		$response = [ 'hasErrored' => true, 'error' => $ex->getMessage() ] ;
	}
	finally
	{

		echo json_encode($response);
	}
}
else 
{
	echo json_encode($response = [ 'authFail' => true ]);
}

function isLoggedIn()
{
	return [ "result" => [ "isAuthenticated" => isset($_SESSION["user"]), "authFail" => false ] ];
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
			$result["result"] = $queryResult["result"];
			$_SESSION["user"] = $queryResult["result"];
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