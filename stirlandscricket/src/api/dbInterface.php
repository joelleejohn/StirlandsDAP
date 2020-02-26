<?php
namespace stirlands;
class DbConnect
{
    public function __construct(string $connString)
    {
        $this->connectionString = $connString;
        $this->OpenConnection();  
    }

    private $database;

    private $connectionString;

    private function OpenConnection() : void
    {
        try
        {

            $this->database = new \PDO($this->connectionString);
        }
        catch (\PDOException $ex)
        {
            echo "Connection Failed: " . $ex->getMessage();
        }
    }
}

?>