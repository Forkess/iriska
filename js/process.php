<?php
$headers = "Content-Type: text/html; charset=UTF-8\r\n";
$data = json_decode(file_get_contents('php://input'), true); 

// set sender, recipient and subject
$from = 'noreply@sender.ru';
$to = 'dubaua@gmail.com';
$subject = stripcslashes(htmlspecialchars($data[subject]));
$message = '';

foreach ($data[form_data] as $k => $v) {
	$label = stripcslashes(htmlspecialchars($v[label]));
	$field = stripcslashes(htmlspecialchars($v[data]));
    $message .= '<p>' . $label . ': <strong>' . $field . '</strong></p>';
}

$verify = mail($to,$subject,$message,$headers.$from);
echo $verify;
?>
