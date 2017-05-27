<?php

	// Get Database connection utility.
	include('../../../../common/web/server/database_connection.php');

	// Establish headers needed for server-side events.
	header('Content-Type: text/event-stream');
	header('Cache-Control: no-cache'); 
	
	// Get connection to database.
	$databaseConnection = DatabaseConnection::getConnection();
	
	// Check for current messages.
	$checkSql = 'SELECT * FROM messages WHERE app = "protomysteries"';
	$result = $databaseConnection->query($checkSql);
	
	if ($result->num_rows > 0) {
		
		// Loop through current messages.
		while($row = $result->fetch_assoc()) {
			
			// Broadcast message.
			sendMsg($row['id'], $row['message']);
			
		}
	}
	
	// Close the connection.
	$databaseConnection->close();
	
	/**
	 * Constructs the SSE data format and flushes that data to the client.
	 *
	 * @param string $msg Line of text that should be transmitted.
	 */
	function sendMsg($id, $msg) {		
		echo 'data: {"id": "' . $id . '", "msg": "'. $msg. '"}' . PHP_EOL;
		echo 'retry: 150' . PHP_EOL;
		echo PHP_EOL;
		ob_flush();
		flush();
	}

	

?>