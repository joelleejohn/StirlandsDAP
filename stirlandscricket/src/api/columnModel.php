<?php
namespace stirlands;
class ColumnModel
{
	public function __construct($databaseName, $displayName, $dataType)
	{
		$this->DatabaseName = $databaseName;
		$this->DisplayName = $displayName;
		$this->DisplayName = $dataType;
	}

	public $DatabaseName;

	public $DisplayName;

	public $DataType;
}
?>