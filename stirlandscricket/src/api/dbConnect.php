<?php
namespace stirlands;

use Exception;

class DbConnect
{
    public function __construct(string $connString)
    {
        try 
        {
            $this->connectionString = $connString;
            $this->openConnection();  
        }
        catch (Exception $ex)
        {
            echo '##Unable to initialise database' . $ex->getMessage();
        }
    }

    private $database;

    private function getDatabase() : \PDO
    {
        if (isset($this->database))
        {
            return $this->database;
        }
        else 
        {
            throw new Exception('##Database connection has not been created.');
        }
    }

    private $connectionString;

    private function openConnection() : void
    {
        try
        {
            $this->database = new \PDO($this->connectionString, 'root', null);
        }
        catch (\PDOException $ex)
        {
            throw new Exception('##Connection Failed: ' . $ex->getMessage());
        }
    }

    public function query(string $query): array
    {
        try 
        {
            $db = $this->getDatabase();

            return $db->query($query)->fetchAll();
        }
        catch (Exception $ex)
        {
            throw new Exception('##Failed to run query. Error: ' . $ex->getMessage());
        }
    }
}

?>