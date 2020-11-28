<?php
include_once 'Punto.php';
include_once 'Caja.php';

class Juego {

    public $puntos;

    public $escenario;

    public $initi;
    
    public function __construct() {
        $this->puntos = new  Punto();
        $this->escenario = [];
        $this->initi = null;
    }
    
    public function init_escenario() {
        for ($cell=0; $cell < 4; $cell++) { 
            $this->escenario[$cell] = [];
            for ($fila=0; $fila < 4; $fila++) { 
                $this->escenario[$cell][$fila] = new Caja($cell, $fila);
            }
        }
    }

    public function volcar() {
        $volcar_lista = [];
        for ($fila=0; $fila < 4; $fila++) { 
            for ($cell=0; $cell < 4; $cell++) { 
                if ($this->escenario[$cell][$fila]->caja == null) {
                    array_push($volcar_lista, $this->escenario[$cell][$fila]);            
                }
            }
        }
        return $volcar_lista;
    }
}