<?php

use function PHPSTORM_META\type;
header("Access-Control-Allow-Origin: *");
require '../../vendor/autoload.php';

$response = array();
try 
{
    if ($_POST['queryMethod'])
    {
        $db = new stirlands\DbConnect('mysql:host=localhost;dbname=test', 'root');
        $dbResponse = array();
        $method = $_POST['queryMethod'];
        switch ($method)
        {
            case 'getAllPlayers':
                $response['data'] = getAllPlayers($db);
                break;
            default:
                throw new Exception('Invalid query method provided.' . $method);
                break;
        }
    }
    else 
    {
        throw new Exception('No POST data detected.');
    }
}
catch (Exception $ex)
{
    $response['error'] = $ex->getMessage();
}
finally 
{

    echo json_encode($response);
}

function getAllPlayers(stirlands\DbConnect $db) : array
{
    return $db->query('SELECT playerid, firstname FROM player');
}





?>