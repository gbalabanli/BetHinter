<?php

error_log(">> SUCCESS: Get bulletin has started!");
date_default_timezone_set('Asia/Istanbul');
get_provider_bulletin();

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
function jsonRemoveUnicodeSequences($struct) {
   return preg_replace("/\\\\u([a-f0-9]{4})/e", "iconv('UCS-4LE','UTF-8',pack('V', hexdec('U$1')))", json_encode($struct));
}
function get_provider_bulletin() {
	$FOLDER_DIRECTORY = "../bulletins";
	$FILE_NAME = "bulletin_last.json";
	$url = "http://www.birebin.com/api/iddaa.ashx/GetIddaaBulletin/3?ApiKey=YjlkMjZmOTJiNTVkMjg1MjhlZDA4NzliOWNmY2Q4YTdhMTE0ZGU2OTU3YjQ2ODU3ZDE0MGIzMTY3ZTAxMTlkNTlhNGQ4MTdkZjI1ZWExODIyZTA0Y2NiNmEwMjg5NmI5OWM3NmI5ZjU5MjFkMmU5M2I1YWMwNDk1ZmIzZmE5N2MxNGQ1ZWE0YTZjZGQ5ODg4NDViMDQyNTI4ZDFkODFlOQ%3D%3D";
	// create curl resource 
	//echo "ayşe";
	$output = get_json($url);
	if ($output === FALSE) {
		throw new Exception("<< ERROR: FILE CANNOT BE RECEIVED!"); 
	}	
	//echo($output);
	if (!file_exists($FOLDER_DIRECTORY)) {
		mkdir($FOLDER_DIRECTORY, 0777, true);
	}
	
	$file = $FOLDER_DIRECTORY."/".$FILE_NAME;
	
	//TO BACKUP THE OLD FILE
	if (file_exists($file)) {
		//echo "\nfile_copy starts".microtime(true);
		//echo $file;
		$my_json = file_get_contents($file);
		
		//echo $my_json;
		$my_json = json_decode($my_json,1);
		//echo $my_json['batch_date']['today'];
		
		json_last_error();
		$old_date = $my_json['batch_date']['today'];
		
		rename($file, $FOLDER_DIRECTORY."/bulletin_".$old_date.".json");
		//copy($file,  $FOLDER_DIRECTORY."/bulletin_".$old_date.".json");	
		
	}
	// Write the contents back to the file
	
	// New file creating
	//$data = iconv("UTF-8", "ISO-8859-1//IGNORE", $output);

	$data = json_decode($output,1);

	//var_dump( $data);

	json_last_error();
	$today = getdate();
	$ext   = $today["year"].str_pad($today["mon"], 2, '0', STR_PAD_LEFT).str_pad($today["mday"], 2, '0', STR_PAD_LEFT); //.$today["hours"].$today["minutes"].$today["seconds"];
	$str   = $today["year"]."-".$today["mon"]."-".$today["mday"];
	$extTime = str_pad($today["hours"], 2, '0', STR_PAD_LEFT).":".str_pad($today["minutes"], 2, '0', STR_PAD_LEFT).":".str_pad($today["seconds"], 2, '0', STR_PAD_LEFT);
	//echo $ext;
	$newdata["batch_date"] = array('today'=>$ext);
	$newdata["batch_date"] += array('time'=>$extTime);
	
	if($today["wday"] < 5 and $today["wday"] != 0 ){ // BULTEN CUMA GUNU CIKIYOR VE SALI GUNU CIKAN BULTEN CUMANIN DEVAMI
		$week_id = date ( "W", strtotime($str." -1 week") );
		echo $str;
		echo "week: ".$week_id;
	}
	else{
		$week_id = date ( "W", strtotime($str) );
		
	}

	$newdata["bulletin"]  = array('id'=>$today["year"].$week_id);
	$newdata["bulletin"] += array('GMT'=>+3);

	$newdata["provider_bulletin"] = $data;

	$result = file_put_contents($file, jsonRemoveUnicodeSequences($newdata,LOCK_EX));	
	
	if($result === FALSE){
		error_log("<< ERROR: Get bulletin for date:".$str. "-".$today["weekday"]." cannot be written(created/updated) for week:".$week_id."!");		
	}
	else {
		error_log("<< SUCCESS: Get bulletin for date:".$str. "-".$today["weekday"]." is written(created/updated) for week:".$week_id." written BYTES:".$result);
	}
}
	
?>