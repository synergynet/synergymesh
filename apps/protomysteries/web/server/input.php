<?php

	// Get Database connection utility.
	include('../../../../common/web/server/database_connection.php');	
	
	// Get command value from Ajax message.
	$command = $_POST['command'];
	
	// Check the command is present.
	if ($command != null) {
		
		// Check the command is expected then call appropriate store message.
		if ($command == 'freeze') {
			storeMessage('freeze');
		}elseif ($command == 'unfreeze') {
			storeMessage('unfreeze');
		}
	}

	/** 
	 * Save a message in the database
	 * 
	 * @param String $message The message to be stored.
	 */
	function storeMessage($message) {
		
		// Get connection to database.
		$databaseConnection = DatabaseConnection::getConnection();
	
		// Create statement for storing the message.
		$storeMessageSql = 'INSERT INTO messages (app, message) VALUES ("protomysteries", "' . $message.'");';
	
		// Store the message.
		$databaseConnection->query($storeMessageSql);
		
		// Get the ID of the last record.
		$recordId = mysqli_insert_id($databaseConnection);
		
		// Wait 2 seconds.
		sleep(2);
		
		// Delete the record.
		$deleteSql = 'DELETE FROM messages WHERE id = ' . $recordId;
		$databaseConnection->query($deleteSql);
		
		// Close the connection.
		$databaseConnection->close();
		
	}


?>