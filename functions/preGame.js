var preguntas = [];
//Cargar el conteo regresivo de 5 segundos para iniciar el juego y después iniciar el juego como tal
function startPreGame(){

    //Quitar la screen de ver perfil
    quitProfileScreen();
    
    //Cargar la screen del contador de 5 segundos
    loadPreGameScreen();

    //Activar el contador y la barra de progreso
    setTimeout( preGameTimerProces , 600 );

    //Quitar el contador y la barra de progreso para después iniciar el juego
    setTimeout( quitPreGameScreen , 5000);

    //
    setTimeout( startGame , 5750 );
    preguntasQuiz(nombreUsuarioEliminar);
}


//funciones para crear un arreglo con las preguntas que contestara el usuario
async function preguntasQuiz(nombreUsuario) {
    const userDoc = await userCollection.doc(nombreUsuario).get();
    const preguntasCont = userDoc.data().preguntasCont;
    const preguntasFalse = Object.keys(preguntasCont).filter(pregunta => preguntasCont[pregunta] === false);
    
    const preguntasAleatorias = obtenerPreguntasAleatorias(preguntasFalse, 5);
    
    for (const pregunta of preguntasAleatorias) {
      const preguntaDoc = await db.collection("preguntas").doc(pregunta).get();
      const preguntaData = preguntaDoc.data();
      preguntas.push({
        pregunta: preguntaData.pregunta,
        resCorrecta: preguntaData.resCorrecta,
        opciones: preguntaData.opciones
      });
      preguntasCont[pregunta] = true; // Cambiar el valor a true
    }
    
    await userCollection.doc(nombreUsuario).update({ preguntasCont }); // Actualizar el campo preguntasCont
    
    console.log(preguntas);
  }
  
  
  function obtenerPreguntasAleatorias(preguntas, cantidad) {
    const preguntasAleatorias = [];
    while (preguntas.length > 0 && preguntasAleatorias.length < cantidad) {
      const indiceAleatorio = Math.floor(Math.random() * preguntas.length);
      preguntasAleatorias.push(preguntas[indiceAleatorio]);
      preguntas.splice(indiceAleatorio, 1);
    }
    return preguntasAleatorias;
  }
  

//Quitar la screen donde se puede ver el perfil, regresar a inicio y eliminar perfil
function quitProfileScreen(){

    // Quitar el div que tiene los datos y acciones del usuario.

    const preGameInfo = document.getElementById( 'actions-profile' );
    preGameInfo.setAttribute( 'class' , 'desvanecer' );
    
    setTimeout(()=>{
        preGameInfo.remove();
    }, 520)

}

//Poner los elementos de la screen pre-game
function loadPreGameScreen(){

    //Se obtiene la screen
    const screen = document.getElementById('screen-game');

    //Construir los nuevos elementos
    const contentPreGame = document.createElement( 'div' );
    const p = document.createElement( 'p' );
    const timer = document.createElement( 'div' );
    const progresBar = document.createElement( 'div' );
    const progres = document.createElement( 'div' );

    //Aplicar estilos a cada elemento creado
    contentPreGame.setAttribute( 'id' , 'first-timer-container');
    contentPreGame.setAttribute( 'class' , 'desvanecer' );
    p.setAttribute( 'class' , 'indicacion' );
    timer.setAttribute( 'id' , 'pre-game-timer');
    progresBar.setAttribute( 'id' , 'progres-bar-1' );
    progres.setAttribute( 'id' , 'progres-1' );
    timer.innerHTML = '5 seg'
    p.innerHTML = 'El juego empezará en:'

    //Organizar elementos
    progresBar.appendChild( progres );
    contentPreGame.append( p , timer , progresBar );

    //Insertar elementos en la screen
    setTimeout(()=>{
        //Se coloca todo el timer
        screen.append( contentPreGame );
        
        //Se pone la opacidad en 1 para que aparezca con desvanecido
        setTimeout((contentPreGame.setAttribute( 'class' , 'aparecer' )), 20);
    }, 540);
}

//Hacer que la barra se mueva durante 5 segundos
function preGameTimerProces(){
    const timer = document.getElementById( 'pre-game-timer' );
    const progres = document.getElementById( 'progres-1' );
    let timeLeft = 5;

    const intervalID = setInterval(()=>{

        timeLeft --;
        timer.innerHTML = `${ ( timeLeft ) } seg`;
        
        if ( timeLeft == 0 ) clearInterval( intervalID );
    
    }, 1000)
    
    progres.setAttribute( 'style' , `width:0%` );
}

//Quitar el screen de pregame
function quitPreGameScreen(){
    const firstTimer = document.getElementById( 'first-timer-container' );

    firstTimer.setAttribute( 'class' , 'desvanecer' );
    
    setTimeout(() => {
        firstTimer.remove();
    }, 500);
}