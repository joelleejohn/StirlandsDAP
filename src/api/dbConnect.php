<?php

namespace stirlands;

use Throwable;

class DbConnect
{
	public function __construct(string $connString)
	{
		try {
			$this->connectionString = $connString;
			$this->openConnection();
			$this->database->setAttribute(\PDO::ATTR_EMULATE_PREPARES, false);
			$this->database->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
		} catch (Throwable $ex) {
			throw new Throwable('--Unable to initialise database' . $ex->getMessage());
		}
	}

	private $database;

	private function getDatabase(): \PDO
	{
		if (isset($this->database)) {
			return $this->database;
		} else {
			throw new Throwable('--Database connection has not been created.');
		}
	}

	private $connectionString;

	private function openConnection()
	{
		try {
			$username = getenv("dbUsername");
			$password = getenv("dbPassword");

			$this->database = new \PDO($this->connectionString, $username, $password);
		} catch (\PDOException $ex) {
			throw new Throwable('--Connection Failed: ' . $ex->getMessage());
		}
	}

	public function query(string $query): array
	{
		try {
			$db = $this->getDatabase();

			return $db->query($query)->fetchAll();
		} catch (Throwable $ex) {
			throw new Throwable('--Failed to run query. Error: ' . $ex->getMessage());
		}
	}

	public function queryRecords(string $query, array $contexts = null)
	{
		$retVal = ["error" => null, "result" => null];

		try {
			$db = $this->getDatabase();

			$dbQuery = $db->prepare($query);

			if (!is_null($contexts)) {
				// Whatever contexts we have, convert that to a parameter.
				// This avoids writing a procedure for each query that uses parameters. 
				foreach ($contexts as $key => $val) {
					$dataType = \PDO::PARAM_STR;

					if (is_numeric($val)) {
						$searchFor = 'is';

						if (substr($key, 0, strlen($searchFor)) === $searchFor)
							$dataType = \PDO::PARAM_INT;
						else
							$dataType = \PDO::PARAM_INT;
					}

					$dbQuery->bindValue(':' . $key, $val, $dataType);
				}
			}
			$result = $dbQuery->execute();
			$dbQuery->debugDumpParams();
			if ($result === true) {
				$returned = $dbQuery->fetchAll(\PDO::FETCH_ASSOC);
				$retVal["result"] = $returned;
				$retVal["error"] = !$returned ? $returned : false;
			}
		} catch (Throwable $ex) {
			$retVal["error"] = '--Failed to run query. Error: ' . $ex->getMessage();
		} finally {
			return $retVal;
		}
	}
}
