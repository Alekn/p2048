<?php

class Caja {

    public $caja;
    public $posicion;

    public function __construct($cell, $fila) {
        $this->caja = null;
        $this->posicion = [$cell, $fila];
    }    

}