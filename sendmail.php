<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer-6.6.3/src/Exception.php';
require 'PHPMailer-6.6.3/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'phpmailer/language/');
$mail->IsHTML(true);

//From user message
$mail->setFrom('yuri.vynnyk@gmail.com', 'Заказчик');
// where send
$mail->addAddress('yuri.vynnyk@gmail.com');
//subject letter
$mail->Subject = 'Письмо с сайта портфолио';

//body message 
$body = '<h1>Пришло письмо с сайта портфолио</h1>';

if(trim(!empty($_POST['name']))) {
  $body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
}
if(trim(!empty($_POST['email']))) {
  $body.='<p><strong>E-mail:</strong> '.$_POST['email'].'</p>';
}
if(trim(!empty($_POST['phone']))) {
  $body.='<p><strong>Phone:</strong> '.$_POST['phone'].'</p>';
}
if(trim(!empty($_POST['message']))) {
  $body.='<p><strong>Сообщение</strong> '.$_POST['message'].'</p>';
}

$mail->Body = $body;

//send
if (!$mail->send()) {
  $message = 'ОШИБКА';
} else {

}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);
?>