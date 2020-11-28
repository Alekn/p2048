window.onload = function () {

    let stage = document.querySelector('#stage');

    fetch('main.php').then(function(respuesta) {
        return respuesta.json();
    }).then(function(json) {
        objeto.init(json);
        objeto.nueva_caja();
        
    }).catch(function(err) {
        console.log('Problema con el fetch: ' + err.message);
    });
    
    function keyUp(e) {

        let tecla_actual=0;
    
        tecla_actual=e.keyCode||e.which||e.charCode;
    
        let tecla_name = String.fromCharCode(tecla_actual);
    
        switch (tecla_actual){
            case 37:objeto.move(0, 0);break;
            case 38:objeto.move(1, 0);break;
            case 39:objeto.move(0, 1);break;
            case 40:objeto.move(1, 1);break;
        }
    //        alert("codigo de teclas: " + tecla_actual + " caracter: " + tecla_name);
    }

    document.onkeyup = keyUp;
}

let objeto = {
    puntos: {
        score: 0,
        history: [],
        status: 1
    },
    stage: [],

    init: function (obj) {
        this.stage = obj;
    },

    nueva_caja: function () {
        let _this = this;
        
        let box = function (obj) {
            let num = Math.random() > 0.9 ? 4 : 2;
            this.value = num;
            this.parent = obj;
            
            this.domObj = function () {
                let domBox = document.createElement('span');
                domBox.innerText = num;
                domBox.textContent = num;
                domBox.className = 'fila' + obj.posicion[0] + ' ' + 'cell' + obj.posicion[1] + ' ' + 'num' + num;
                let root = document.getElementById('stage');
                root.appendChild(domBox);
                return  domBox;
            }();
            obj.caja = this;
        }
        let vaceadoList = this.vaceado();

        if (vaceadoList.length) {
            let randomIndex = Math.floor(Math.random() * vaceadoList.length);
            new box(vaceadoList[randomIndex]);
            return true;
        }
    },
    vaceado: function () {
        let vaceadoList = [];
        for (let fila = 0; fila < 4; fila++) {
            for (let cell = 0; cell < 4; cell++) {
                if (this.stage[cell][fila].caja == null) {
                    vaceadoList.push(this.stage[cell][fila]);
                }
            }
        }
        return vaceadoList;
    },
    fin_juego:function(){
        let vaceadoList = this.vaceado();
        if (!vaceadoList.length) {
            for(let i=0;i<4;i++){
                for(let j=0;j<4;j++){
                    let obj=this.stage[i][j];
                    let objLeft=(j==0)?{caja:{value:0}}:this.stage[i][j-1];
                    let objRight=(j==3)?{caja:{value:0}}:this.stage[i][j+1];
                    let objUp=(i==0)?{caja:{value:0}}:this.stage[i-1][j];
                    let objDown=(i==3)?{caja:{value:0}}:this.stage[i+1][j];
                    if(obj.caja.value==objLeft.caja.value
                        ||obj.caja.value==objDown.caja.value
                        ||obj.caja.value==objRight.caja.value
                        ||obj.caja.value==objUp.caja.value){
                        return false
                    }
                }
            }
            return true;
        }
        return false;
    },
    gameOver:function(){
        alert('GAVE OVER!');
    },
    mover_a :function (caja1, caja2) {
            caja2.caja = caja1.caja;
            caja2.caja.domObj.className = 'fila' + caja2.posicion[0] + ' ' + 'cell' + caja2.posicion[1] + ' ' + 'num' + caja2.caja.value;
//            caja1.caja.domObj.parentNode.removeChild(caja1.caja.domObj);
            caja1.caja = null;
    },
    agregar_a : function (caja1, caja2) {
            caja2.caja.domObj.parentNode.removeChild(caja2.caja.domObj);
            caja2.caja = caja1.caja;
            caja1.caja = null;
            caja2.caja.value = caja2.caja.value * 2;
            caja2.caja.domObj.className = 'fila' + caja2.posicion[0] + ' ' + 'cell' + caja2.posicion[1] + ' ' + 'num' + caja2.caja.value;
            caja2.caja.domObj.innerText = caja2.caja.value;
            caja2.caja.domObj.textContent = caja2.caja.value;
            this.puntos.score+=caja2.caja.value;
        let scoreBar= document.getElementById('score');
        scoreBar.innerText=this.puntos.score;
        scoreBar.textContent=this.puntos.score;
        return caja2.caja.value;
    },
    borrar:function(x,y){
        let can=0;
      for(let i=0;i<4;i++){
          //let fst=null;
          let vacia=null;
          for(let j=0;j<4;j++){
              let caja_entrante=null;
              switch (""+x+y){
                  case '00': caja_entrante=this.stage[i][j];break;
                  case '10':caja_entrante=this.stage[j][i];break;
                  case '11':caja_entrante=this.stage[3-j][i];break;
                  case '01':caja_entrante=this.stage[i][3-j];break;
              }
              if(caja_entrante.caja!=null){
                 if(vacia){
                   this.mover_a(caja_entrante,vacia)
                    vacia=null;
                    j=0;
                     can=1;
                 }
              }else if(!vacia){
                   vacia=caja_entrante;
              }
          }
      }
        return can;
    },

    move: function (x,y) {
        let can=0;
        can=this.borrar(x,y)?1:0;
        let add=0;
        for(let i=0;i<4;i++){
            for(let j=0;j<3;j++){
                let caja_entrante=null;
                let caja_entrante2=null;
                switch (""+x+y){
                    case '00':{
                        caja_entrante=this.stage[i][j];
                        caja_entrante2=this.stage[i][j+1];break;
                    }
                    case '10':{
                        caja_entrante=this.stage[j][i];
                        caja_entrante2=this.stage[j+1][i];break;
                    }

                    case '11':{
                        caja_entrante=this.stage[3-j][i];
                        caja_entrante2=this.stage[2-j][i];break;
                    }
                    case '01':{
                        caja_entrante=this.stage[i][3-j];
                        caja_entrante2=this.stage[i][2-j];break;
                    }
                }
                if(caja_entrante2.caja&&caja_entrante.caja.value==caja_entrante2.caja.value){
                  add+=this.agregar_a(caja_entrante2,caja_entrante);
                    this.borrar(x,y);
//                    j++;
                    can=1;
                }
//                console.log(this.stage);
            }
        }
        if(add){
            let addscore=document.getElementById('addScore');
            addscore.innerText="+"+add;
            addscore.textContent="+"+add;
            addscore.className="show";
            setTimeout(function(){
                addscore.className="hide";
            },500);
        }
        if(can){
            this.nueva_caja();
        }
        if(this.fin_juego()){
            this.gameOver();
        }
    }

}