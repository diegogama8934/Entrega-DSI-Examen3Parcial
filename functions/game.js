var numeroPregunta=0;
var valorActual,leftTime;
var intervalID;
var lugar;
var lugar2;
function startGame(){

    loadGameScreen();

    loadPuntuacion();
    
    cambiarPregunta(0)
    console.log('el usuario que esta llegando es :' + nombreUsuarioEliminar);
}

async function actualizarPerfil(nombreUsuario, puntuacion, tiempoIns) {
  const userRef = userCollection.doc(nombreUsuario);
  const userDoc = await userRef.get();

  if (userDoc.exists) {
    const { puntuacionM, tiempo: tiempoAnterior } = userDoc.data(); 
    

    if (puntuacion > puntuacionM || (puntuacion === puntuacionM && tiempoIns < tiempoAnterior)) {
      await userRef.update({
        puntuacionM: puntuacion,
        tiempo: tiempoIns
      });

      console.log('Perfil actualizado correctamente.');
    } else {
      console.log('No se cumplieron las condiciones para actualizar el perfil.');
    }
  } else {
    console.log('El usuario no existe en la colección.');
  }
}


function checkAnswer(opcionClick){
  
  
    const respondidasElement=document.querySelector('#respondidas');
    const totalElement=document.querySelector('#total');
    valorActual = parseInt(respondidasElement.textContent);
    const valorTotal=parseInt(totalElement.textContent);
    console.log('la opcion que clickeaste es: '+opcionClick);
    console.log('la opcion correcta deberia ser: '+preguntas[0].resCorrecta);
    console.log('numero de pregunta es: '+numeroPregunta);
    if(numeroPregunta===5){
      if(opcionClick===preguntas[0].resCorrecta){
        respondidasElement.textContent=valorActual+1;
        totalElement.textContent=valorTotal+1;
      }
      else{
        totalElement.textContent=valorTotal+1;  
      }
      valorActual = parseInt(respondidasElement.textContent);
      clearInterval(intervalID);
      // const tiempo=document.querySelector('.left-time');
      //aqui entra lo que pasa cuando ya se completo el quizz con las 5 preguntas, nombreusuarioeliminar es la variable con el nombre del usuario, (valorActual+1) es la variable de cuantas preguntas acerto, (60-leftTime) es el tiempo que hizo en este quiz
      console.log('tus aciertos son: '+valorActual+ ' tu tiempo es: '+(60-leftTime));
  
      actualizarPerfil(nombreUsuarioEliminar,valorActual,(60-leftTime));
      //aqui deberia ir la funcion para que se ponga el nuevo forumlario
      showPodium();
     
    }else{
      if(opcionClick===preguntas[0].resCorrecta){
        respondidasElement.textContent=valorActual+1;
        totalElement.textContent=valorTotal+1;
      }
      else{
        totalElement.textContent=valorTotal+1;  
      }
      preguntas.splice(0,1);
      cambiarPregunta(0);
    
    }
  
  }

function cambiarPregunta(indice) {
  const elementoPregunta = document.querySelector('.indicacion');
  const optionsPregunta = document.querySelectorAll('.option');

  numeroPregunta=numeroPregunta+1;
  
  elementoPregunta.innerHTML = '<b>' + 'Pregunta ' + numeroPregunta + ':' + '<b>' + preguntas[indice].pregunta;
  optionsPregunta[0].innerHTML = preguntas[indice].opciones[0];
  optionsPregunta[1].innerHTML = preguntas[indice].opciones[1];
  optionsPregunta[2].innerHTML = preguntas[indice].opciones[2];

  

console.log(preguntas);

  
}


function loadGameScreen(){

    //Selecionar la pantalla en donde se pondrán los elementos del juego
    const screen = document.getElementById( 'screen-game' );
    
    //Se crean los elementos del juego
    const item = document.createElement( 'div' );
    const pregunta = document.createElement( 'p' );
    const opciones = document.createElement( 'ul' );
    const opcion1 = document.createElement( 'li' );
    const opcion2 = document.createElement( 'li' );
    const opcion3 = document.createElement( 'li' );
    
    //Se crea la variable para manejar el número de preguntas que se han respondido
    const num_pregunta = 1;
    
    //Se colocan las clases y id´s necesarios
    item.setAttribute( 'id' , 'item-pregunta' );
    item.setAttribute( 'class' , 'item-pregunta desvanecer' );
    pregunta.setAttribute( 'class' , 'indicacion' );
    opciones.setAttribute( 'class' , 'options' );
    opcion1.setAttribute( 'class' , 'option' );
    opcion2.setAttribute( 'class' , 'option' );
    opcion3.setAttribute( 'class' , 'option' );
    
    //Se coloca la pregunta
    pregunta.innerHTML = `<b>Pregunta ${num_pregunta}</b>: ¿Cuál es la capital de Australia?`;
    
    
    //Se colocan las funcionalidades a cada opcion
    opcion1.setAttribute( 'onclick' , 'checkAnswer(this.textContent)' );
    opcion2.setAttribute( 'onclick' , 'checkAnswer(this.textContent)' );
    opcion3.setAttribute( 'onclick' , 'checkAnswer(this.textContent)' );
    
    //Dependiento de la respuesta correcta, se agrega un id a la opción que contenga la respuesta correcta
    //(en este caso la opción 3)
    opcion3.setAttribute( 'id' , 'respuesta-correcta');
    
    //Se les da un contenido a la pregunta y las opciones
    pregunta.innerHTML = `<b>Pregunta ${num_pregunta}</b>: ¿Cuál es la capital de Australia?`;
    opcion1.innerHTML = 'Sidney';
    opcion2.innerHTML = 'Melbourne';
    opcion3.innerHTML = 'Canberra';
    
    //Se organizan los elementos para posteriormente ya pegarlos en la screen que se desea
    opciones.append( opcion1 , opcion2 , opcion3 );
    item.append( pregunta , opciones );
    
    //Se guarda o se muestra en el html el elemento item que contiene toda la funcionalidad e información (pregunta y opciones) de cada
    //parte del quizz (es decir, de cada pregunta)
    screen.append( item );

    //Se pone la opacidad en 1 para que el elemento muestre todo
    item.setAttribute( 'class' , 'item-pregunta aparecer' )
}

function loadGameTimer(){
    //Se obtiene la pantalla para agregar la barra de progreso
    const screen = document.getElementById( 'screen-game' );

    // Se crean elementos necesarios para la barra de progreso del juego
    const progresBar = document.createElement( 'div' );
    const progres2 = document.createElement( 'div' );
    const timeContainer = document.createElement ( 'div' );
    const time = document.createElement( 'p' );
    
    
    // Se crea la variable de los 60 segundos que tiene que durar el juego
    let timeLeft = 60;
    
    // Se pone un texto para decirle al usuario el tiempo que queda
    time.innerHTML = `${ timeLeft } seg`;

    // Se aplican estilos a los elementos
    progresBar.setAttribute( 'id' , 'progres-bar-2' );
    progres2.setAttribute( 'id' , 'progres-2');
    time.setAttribute( 'id' , 'left-time' );
    timeContainer.setAttribute( 'id' , 'time-2-container' );

    //Se va reduciendo el número de segundo que se muestra al usuario según el tiempo faltante
    intervalID = setInterval(()=>{
        timeLeft--;
        time.innerHTML = `${timeLeft}seg`
        progres2.setAttribute( 'style' , `width:${ ( timeLeft /  60 ) * 100}%` );
        leftTime=timeLeft;      

        if ( timeLeft <= 30 && timeLeft>= 11) {
            ( timeLeft % 2 == 0) ? progres2.style.backgroundColor = '#f0b60a' : progres2.style.backgroundColor = '#F8D56F'; 
        }
        
        if ( timeLeft <= 10) {
            ( timeLeft % 2 == 0 ) ? progres2.style.backgroundColor = '#E53131' : progres2.style.backgroundColor = '#E86C6C';
        }   
        if (timeLeft <= 0) {
          clearInterval(intervalID);
          console.log('tus aciertos al acabarse el tiempo son: '+(valorActual)+ ' tu tiempo es: '+(60-leftTime));
          actualizarPerfil(nombreUsuarioEliminar,(valorActual),(60-leftTime));
            //aqui deberia ir la funcion para que se ponga el nuevo forumlario
           showPodium()
        }
    }, 1000);

    // Se organizan los elementos
    progresBar.append( progres2 );
    timeContainer.append(  time , progresBar );

    //Se muestra el elemento al usuario
    screen.append( timeContainer );

    let preguntas = {
        "respondidas": 0,
        "total" : 0
    }

    return preguntas;
}

function loadPuntuacion(){

    let { respondidas , total } = loadGameTimer();

    const screen = document.getElementById( 'screen-game' );

    const puntuacion = document.createElement( 'p' );
    puntuacion.setAttribute( 'class' , 'indicacion' );
    puntuacion.setAttribute( 'id' , 'puntuacion' );

    puntuacion.innerHTML = `Puntuación: <b><span id="respondidas">${respondidas}</span>/<span id="total">${total}</span></b>`;

    screen.append( puntuacion );
}

function reloadPuntuacion(event){
    let total = parseInt(document.getElementById( 'respondidas' ).textContent);
    total++;
    total.innerHTML = `${total}`;
    
    let puntuacion = parseInt(document.getElementById( 'total' ).textContent);

    if(!event.target.id){
        puntuacion++
        puntuacion.innerHTML = `${puntuacion}`;
    }

    nextQuestion();
}

function nextQuestion(){
    const total = parseInt(document.getElementById( 'respondidas' ).textContent);
    const nuevaPregunta = DB.preguntas[total];
    
    
}

function showPodium(){
    const pregunta = document.getElementById( 'item-pregunta' );
    const timer = document.getElementById( 'time-2-container' );
    const puntuacion = document.getElementById( 'puntuacion' );
    
    pregunta.remove();
    timer.remove();
    puntuacion.remove();

    const screen = document.getElementById( 'screen-game' );
    // const clasificacion = document.createElement( 'div' );
    // const podio = document.createElement( 'div' );
    // const primerLugar = document.createElement( 'div' );
    // const segundoLugar = document.createElement( 'div' );
    // const tercerLugar = document.createElement( 'div' );

    // clasificacion.setAttribute( 'id' , 'clasificacion' );
    // podio.setAttribute( 'id' , 'podio' );
    
    // primerLugar.setAttribute( 'class' , 'lugar-podio' );
    // segundoLugar.setAttribute( 'class' , 'lugar-podio' );
    // tercerLugar.setAttribute( 'class' , 'lugar-podio' );

    // primerLugar.setAttribute( 'id' , 'first-place' );
    // segundoLugar.setAttribute( 'id' , 'second-place' );
    // tercerLugar.setAttribute( 'id' , 'third-place' );

    // //Necesito meter los datos de los 3 mejores usuarios en esta parte

    // podio.append( segundoLugar , primerLugar , tercerLugar );
    // clasificacion.append( podio );
    // screen.append( clasificacion );

    classifyUsers();

    const clasificacion = document.getElementById('clasification');
    clasificacion.append(podioList)

    const tuPuntuacion = document.createElement( 'p' );
    tuPuntuacion.setAttribute( 'class' , 'indicacion' );
    tuPuntuacion.setAttribute( 'id' , 'tu-puntuacion' );
    tuPuntuacion.innerHTML = `Tuviste ${valorActual} aciertos en ${60-leftTime} segundos.`;

    const button = document.createElement( 'button' );
    button.setAttribute( 'onclick' , 'moveToHomeAfterGame()');
    button.setAttribute( 'id' , 'btn-move-to-home');
    button.textContent = 'Ir a inicio';

    screen.append( clasificacion , tuPuntuacion , button );

}

const DB = {
    "usuarios": [
      {
        "nombre": "Favio",
        "puntuacionM": 0,
        "tiempo": 0,
        "preguntasCont": {
          "pregunta1": false,
          "pregunta2": false,
          "pregunta3": false,
          "pregunta4": false,
          "pregunta5": false,
          "pregunta6": false,
          "pregunta7": false,
          "pregunta8": false,
          "pregunta9": false,
          "pregunta10": false,
          "pregunta11": false,
          "pregunta12": false,
          "pregunta13": false,
          "pregunta14": false,
          "pregunta15": false,
          "pregunta16": false,
          "pregunta17": false,
          "pregunta18": false,
          "pregunta19": false,
          "pregunta20": false,
          "pregunta21": false,
          "pregunta22": false,
          "pregunta23": false,
          "pregunta24": false,
          "pregunta25": false,
          "pregunta26": false,
          "pregunta27": false,
          "pregunta28": false,
          "pregunta29": false,
          "pregunta30": false
        }
      },
      {
        "nombre": "Diego",
        "puntuacionM": 0,
        "tiempo": 0,
        "preguntasCont": {
          "pregunta1": false,
          "pregunta2": false,
          "pregunta3": false,
          "pregunta4": false,
          "pregunta5": false,
          "pregunta6": false,
          "pregunta7": false,
          "pregunta8": false,
          "pregunta9": false,
          "pregunta10": false,
          "pregunta11": false,
          "pregunta12": false,
          "pregunta13": false,
          "pregunta14": false,
          "pregunta15": false,
          "pregunta16": false,
          "pregunta17": false,
          "pregunta18": false,
          "pregunta19": false,
          "pregunta20": false,
          "pregunta21": false,
          "pregunta22": false,
          "pregunta23": false,
          "pregunta24": false,
          "pregunta25": false,
          "pregunta26": false,
          "pregunta27": false,
          "pregunta28": false,
          "pregunta29": false,
          "pregunta30": false
        }
      },
      {
        "nombre": "Saul",
        "puntuacionM": 0,
        "tiempo": 0,
        "preguntasCont": {
          "pregunta1": false,
          "pregunta2": false,
          "pregunta3": false,
          "pregunta4": false,
          "pregunta5": false,
          "pregunta6": false,
          "pregunta7": false,
          "pregunta8": false,
          "pregunta9": false,
          "pregunta10": false,
          "pregunta11": false,
          "pregunta12": false,
          "pregunta13": false,
          "pregunta14": false,
          "pregunta15": false,
          "pregunta16": false,
          "pregunta17": false,
          "pregunta18": false,
          "pregunta19": false,
          "pregunta20": false,
          "pregunta21": false,
          "pregunta22": false,
          "pregunta23": false,
          "pregunta24": false,
          "pregunta25": false,
          "pregunta26": false,
          "pregunta27": false,
          "pregunta28": false,
          "pregunta29": false,
          "pregunta30": false
        }
      },
      {
        "nombre": "Rafael",
        "puntuacionM": 0,
        "tiempo": 0,
        "preguntasCont": {
          "pregunta1": false,
          "pregunta2": false,
          "pregunta3": false,
          "pregunta4": false,
          "pregunta5": false,
          "pregunta6": false,
          "pregunta7": false,
          "pregunta8": false,
          "pregunta9": false,
          "pregunta10": false,
          "pregunta11": false,
          "pregunta12": false,
          "pregunta13": false,
          "pregunta14": false,
          "pregunta15": false,
          "pregunta16": false,
          "pregunta17": false,
          "pregunta18": false,
          "pregunta19": false,
          "pregunta20": false,
          "pregunta21": false,
          "pregunta22": false,
          "pregunta23": false,
          "pregunta24": false,
          "pregunta25": false,
          "pregunta26": false,
          "pregunta27": false,
          "pregunta28": false,
          "pregunta29": false,
          "pregunta30": false
        }
      },
      {
        "nombre": "Andre",
        "puntuacionM": 0,
        "tiempo": 0,
        "preguntasCont": {
          "pregunta1": false,
          "pregunta2": false,
          "pregunta3": false,
          "pregunta4": false,
          "pregunta5": false,
          "pregunta6": false,
          "pregunta7": false,
          "pregunta8": false,
          "pregunta9": false,
          "pregunta10": false,
          "pregunta11": false,
          "pregunta12": false,
          "pregunta13": false,
          "pregunta14": false,
          "pregunta15": false,
          "pregunta16": false,
          "pregunta17": false,
          "pregunta18": false,
          "pregunta19": false,
          "pregunta20": false,
          "pregunta21": false,
          "pregunta22": false,
          "pregunta23": false,
          "pregunta24": false,
          "pregunta25": false,
          "pregunta26": false,
          "pregunta27": false,
          "pregunta28": false,
          "pregunta29": false,
          "pregunta30": false
        }
      }
    ],
    "preguntas": [
      {
        "pregunta1": "¿Cuál es la capital de Australia?",
        "opciones1": [
          "Sídney",
          "Melbourne",
          "Canberra"
        ],
        "respuestacorrecta1": "Canberra"
      },
      {
        "pregunta2": "¿Cuál es el río más largo del mundo?",
        "opciones2": [
          "Amazonas",
          "Nilo",
          "Yangtsé"
        ],
        "respuestacorrecta2": "Nilo"
      },
      {
        "pregunta3": "¿En qué año se descubrió América?",
        "opciones3": [
          "1492",
          "1776",
          "1812"
        ],
        "respuestacorrecta3": "1492"
      },
      {
        "pregunta4": "¿Cuál es la capital de España?",
        "opciones4": [
          "Madrid",
          "Barcelona",
          "Sevilla"
        ],
        "respuestacorrecta4": "Madrid"
      },
      {
        "pregunta5": "¿Quién pintó La Mona Lisa?",
        "opciones5": [
          "Leonardo da Vinci",
          "Pablo Picasso",
          "Vincent van Gogh"
        ],
        "respuestacorrecta5": "Leonardo da Vinci"
      },
      {
        "pregunta6": "¿Cuál es el océano más grande del mundo?",
        "opciones6": [
          "Océano Pacífico",
          "Océano Atlántico",
          "Océano Índico"
        ],
        "respuestacorrecta6": "Océano Pacífico"
      },
      {
        "pregunta7": "¿Cuál es la moneda de Japón?",
        "opciones7": [
          "Yen",
          "Dólar",
          "Euro"
        ],
        "respuestacorrecta7": "Yen"
      },
      {
        "pregunta8": "¿Cuál es el país más poblado del mundo?",
        "opciones8": [
          "China",
          "India",
          "Estados Unidos"
        ],
        "respuestacorrecta8": "China"
      },
      {
        "pregunta9": "¿Cuál es el monte más alto del mundo?",
        "opciones9": [
          "Monte Everest",
          "Monte Kilimanjaro",
          "Monte McKinley"
        ],
        "respuestacorrecta9": "Monte Everest"
      },
      {
        "pregunta10": "¿Cuál es el idioma más hablado del mundo?",
        "opciones10": [
          "Chino mandarín",
          "Español",
          "Inglés"
        ],
        "respuestacorrecta10": "Chino mandarín"
      },
      {
        "pregunta11": "¿En qué país se encuentra la Torre Eiffel?",
        "opciones11": [
          "Francia",
          "Italia",
          "Reino Unido"
        ],
        "respuestacorrecta11": "Francia"
      },
      {
        "pregunta12": "¿Quién escribió 'Don Quijote de la Mancha'?",
        "opciones12": [
          "Miguel de Cervantes",
          "William Shakespeare",
          "Friedrich Nietzsche"
        ],
        "respuestacorrecta12": "Miguel de Cervantes"
      },
      {
        "pregunta13": "¿Cuál es el metal más abundante en la corteza terrestre?",
        "opciones13": [
          "Aluminio",
          "Hierro",
          "Cobre"
        ],
        "respuestacorrecta13": "Aluminio"
      },
      {
        "pregunta14": "¿Cuál es el continente más grande del mundo?",
        "opciones14": [
          "Asia",
          "África",
          "América"
        ],
        "respuestacorrecta14": "Asia"
      },
      {
        "pregunta15": "¿Cuál es el planeta más grande del sistema solar?",
        "opciones15": [
          "Júpiter",
          "Saturno",
          "Neptuno"
        ],
        "respuestacorrecta15": "Júpiter"
      },
      {
        "pregunta16": "¿En qué año comenzó la Segunda Guerra Mundial?",
        "opciones16": [
          "1939",
          "1945",
          "1914"
        ],
        "respuestacorrecta16": "1939"
      },
      {
        "pregunta17": "¿Cuál es el animal terrestre más rápido?",
        "opciones17": [
          "Guepardo",
          "Leopardo",
          "Lobo"
        ],
        "respuestacorrecta17": "Guepardo"
      },
      {
        "pregunta18": "¿Cuál es la distancia aproximada entre la Tierra y la Luna?",
        "opciones18": [
          "384,400 kilómetros",
          "149,600,000 kilómetros",
          "6,371 kilómetros"
        ],
        "respuestacorrecta18": "384,400 kilómetros"
      },
      {
        "pregunta19": "¿Quién inventó la imprenta?",
        "opciones19": [
          "Johannes Gutenberg",
          "Isaac Newton",
          "Thomas Edison"
        ],
        "respuestacorrecta19": "Johannes Gutenberg"
      },
      {
        "pregunta20": "¿Cuál es la obra más famosa de William Shakespeare?",
        "opciones20": [
          "Romeo y Julieta",
          "Hamlet",
          "Macbeth"
        ],
        "respuestacorrecta20": "Hamlet"
      },
      {
        "pregunta21": "¿Cuál es el país más grande de América del Sur?",
        "opciones21": [
          "Brasil",
          "Argentina",
          "Colombia"
        ],
        "respuestacorrecta21": "Brasil"
      },
      {
        "pregunta22": "¿Cuál es el metal más valioso?",
        "opciones22": [
          "Oro",
          "Platino",
          "Paladio"
        ],
        "respuestacorrecta22": "Oro"
      },
      {
        "pregunta23": "¿Cuál es el océano más pequeño del mundo?",
        "opciones23": [
          "Océano Ártico",
          "Océano Índico",
          "Océano Pacífico"
        ],
        "respuestacorrecta23": "Océano Ártico"
      },
      {
        "pregunta24": "¿En qué año se firmó la Declaración de Independencia de Estados Unidos?",
        "opciones24": [
          "1776",
          "1789",
          "1812"
        ],
        "respuestacorrecta24": "1776"
      },
      {
        "pregunta25": "¿Quién pintó 'La noche estrellada'?",
        "opciones25": [
          "Vincent van Gogh",
          "Pablo Picasso",
          "Leonardo da Vinci"
        ],
        "respuestacorrecta25": "Vincent van Gogh"
      },
      {
        "pregunta26": "¿Cuál es la lengua oficial más hablada en el mundo?",
        "opciones26": [
          "Chino mandarín",
          "Español",
          "Inglés"
        ],
        "respuestacorrecta26": "Inglés"
      },
      {
        "pregunta27": "¿Cuál es el país más pequeño del mundo?",
        "opciones27": [
          "Ciudad del Vaticano",
          "Mónaco",
          "Nauru"
        ],
        "respuestacorrecta27": "Ciudad del Vaticano"
      },
      {
        "pregunta28": "¿En qué año se fundó la compañía Apple?",
        "opciones28": [
          "1976",
          "1984",
          "1991"
        ],
        "respuestacorrecta28": "1976"
      },
      {
        "pregunta29": "¿Cuál es el desierto más grande del mundo?",
        "opciones29": [
          "Desierto del Sahara",
          "Desierto de Gobi",
          "Desierto de Atacama"
        ],
        "respuestacorrecta29": "Desierto del Sahara"
      },
      {
        "pregunta30": "¿Cuál es el ave más grande del mundo?",
        "opciones30": [
          "Avestruz",
          "Águila",
          "Pingüino"
        ],
        "respuestacorrecta30": "Avestruz"
      }
    ]
}