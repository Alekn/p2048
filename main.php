<?php
include_once 'clases/Juego.php';

$inicio = new Juego();

$inicio->init_escenario();

$empty = json_encode($inicio->escenario);

echo $empty;