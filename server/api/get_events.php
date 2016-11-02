<?php
	header('content-type: application/json; charset=utf-8');
	header("access-control-allow-origin: *");
	$url_alt = "http://localhost/bulletins/bulletin_last.json";
	$url     = "http://localhost/bulletins/bulletin_last.json";
	$output = get_json($url);
	
	echo json_encode($output);
	
	function get_json($input_url){

		$ch = curl_init(); 
		// set url 
		curl_setopt($ch, CURLOPT_URL, $input_url); 
		//return the transfer as a string 
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 
		curl_setopt($ch, CURLOPT_ENCODING, ""); 
		// $output contains the output string 
		$output = curl_exec($ch); 
		// close curl resource to free up system resources 
		curl_close($ch); 
		return $output;
		
	}
	
?>