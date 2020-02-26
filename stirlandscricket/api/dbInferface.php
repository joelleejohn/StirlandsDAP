<?php
$response = [];
try 
{
    if ($_POST['queryMethod'])
    {
        $db = new stirlands\DbConnect('mysql:host=localhost;dbname=test', 'root');
        $dbResponse = [];

        switch ($_POST['queryMethod'])
        {
            case 'getAllPlayers':
                $dbResponse = getAllPlayers($db);
            default:
                throw new Exception('Invalid query method provided.');
        }
        
        $response['data'] = $dbResponse;
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
    return $db->query('SELECT * FROM player');
}





?>