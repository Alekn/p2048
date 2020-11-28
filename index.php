<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>2048 Parcial</title>
    <link rel="stylesheet" href="estilos.css">
</head>
<body>

    <p> Junta numeros hasta obtener la baldosa 2048</p>
    <!-- <div class="cover"></div> -->
    <div class="container">
        <div class="logo">2048</div>
        <div class="scoreBar">
            <label style="position: relative; top:-13px;">puntos:</label>
            <label id="score"> 0</label>
            <div id="addScore"></div>
        </div>
        <div id="stage"></div>
        <!--<div id="gameOver hide">-->
            <!--<div class="overText">GameOver!</div>-->
        <!--</div>-->
    </div>

    <script src="interacciones.js"></script>
</body>
</html>