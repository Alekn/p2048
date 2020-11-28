<?php

class Punto {

    public $score;
    public $history;
    public $status;

    public function __construct() {
        $this->score = 0;
        $this->history = [];
        $this->status = 1;
    }    

}