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
			$this->database->setAttribute(\PDO::ATTR_EMULATE_PREPARES, false);
			$this->database->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
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
			$username = getenv("dbUsername");
			$password = getenv("dbPassword");
			
			$this->database = new \PDO($this->connectionString, $username, $password);
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

	public function querySingleRecord(string $query, array $contexts = null, bool $isErrorOnZero = false, string $zeroError = null)
	{
		$retVal = ["error" => null, "result" => null];

		try 
		{
			$db = $this->getDatabase();
			
			$dbQuery = $db->prepare($query);

			if (!is_null($contexts))
			{
				// Whatever contexts we have, convert that to a parameter.
				// This avoids writing a procedure for each queery that uses parameters. 
				foreach ($contexts as $key => $val)
				{
					$dataType = \PDO::PARAM_STR;

					if (is_numeric($val))
					{
						$searchFor = 'is';

						if (substr($key, 0, strlen($searchFor)) === $searchFor) 
							$dataType = \PDO::PARAM_BOOL;
						else
							$dataType = \PDO::PARAM_INT;
					}

					$dbQuery->bindValue(':'.$key, $val, $dataType);
				}
			}

			$result = $dbQuery->execute();
			if ($result === true)
			{
				$returned = $dbQuery->fetch(\PDO::FETCH_ASSOC);
				$retVal["result"] = $returned;
				$retVal["error"] = !$returned ? $returned : false;
			}
		}
		catch (Exception $ex)
		{
			throw new Exception('##Failed to run query. Error: ' . $ex->getMessage());
		}
		finally
		{
			return $retVal;
		}
	}
}

?>