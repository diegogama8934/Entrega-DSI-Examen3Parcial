//Navegar a la screen ver perfil, donde se podrá iniciar un quizz, eliminar perfil, o regresar a inicio
var nombreUsuarioEliminar;
var preguntasHechas=false;
var newLiElement,PlayButton;
function viewProfile(nombreU){

    //Se quita la barra de navegación

    quitNavBar();

    const content = document.getElementById( 'content' );
    content.style.transform = `translateX(0px)`;
    console.log('el usuario que presionaste es: '+ nombreU);
    nombreUsuarioEliminar=nombreU;
    perfilData(nombreU);
}

//Elimina y vuelve a cargar los perfiles en la pantalla de inicio
function deleteProf(){
    console.log(nombreUsuarioEliminar);
    deleteUsuario(nombreUsuarioEliminar);
    users=[];
    loadUsers();
    backToMainScreen();
}

//Se quita la barra de navegación

function quitNavBar(){

    //Esconder barra de navegación

    const navBar = document.getElementById( 'nav-container' );
    navBar.setAttribute( 'class' , 'desvanecer' );

    //Después de 600 ms (para no afectar la visualiazción de la transición), se eliminan las funciones del botón

    setTimeout(() => {

        //Se seleccionan todos los botones de la navBar

        const btns = document.getElementsByClassName( 'nav-screen-item' );

        //La collección de HTML se pasa a un arreglo usando el spred (los 3 puntos)

        const btnsArr = [...btns];

        //Para cada boton, primero se quita la clase que tienen y luego se agrega la clase que va a permitir mantener solo su tamaño
        //(y así no afectar el estilo)

        for(let i = 0; i<btnsArr.length; i++){
            
            btnsArr[i].setAttribute( 'class' , '' );
            btnsArr[i].setAttribute( 'class' , 'nav-screen-item-aux' );
            
            //Hacer que el botón no se le pueda hacer click

            btnsArr[i].disabled = true;
        }
    }, 600)
}

//Regresar a la página principal

function backToMainScreen(){
    
    // Moverse a la pantalla principal
    
    moveToHome();

    // Mostrar la barra de navegación

    const navBar = document.getElementById( 'nav-container' );
    navBar.setAttribute( 'class' , 'aparecer' );
    
    //Devolver visualización y funciones de los botones de la barra de navegación

    // Se obtienen los botones y se pasan a un arreglo usando spread.

    const btns = document.getElementsByClassName( 'nav-screen-item-aux' );
    const btnsArr = [...btns];

    for(let i = 0; i<btnsArr.length; i++){
        

        btnsArr[i].setAttribute( 'class' , '' );
        btnsArr[i].setAttribute( 'class' , 'nav-screen-item' );
        
        //Hacer que el botón se le pueda hacer click

        btnsArr[i].disabled = false;
    }
    if(preguntasHechas===true){
      preguntasHechas=false;
      newLiElement.remove();
      PlayButton.disabled=false;
    }
    

}

//Consulta los datos del usuario que se ha seleccionado 
function perfilData(nombreUsuario) {
    const userCollection = firebase.firestore().collection('users');
  
    userCollection.get().then(function(querySnapshot) {
      const usersPerfil = [];
      querySnapshot.forEach(function(doc) {
        var data = doc.data();
        usersPerfil.push(data);
      });
  
      // Filtrar el usuario actual
      const usuarioActual = usersPerfil.find(user => user.nombre === nombreUsuario);
  
      if (usuarioActual) {
        const puntuacionActual = usuarioActual.puntuacionM;
        const tiempoActual = usuarioActual.tiempo;
        
        const todasContestadas = Object.values(usuarioActual.preguntasCont).every(valor => valor === true);

      if (todasContestadas) {
        const userDataItems = document.querySelectorAll('li.user-data');
        console.log('todas las preguntas estan contestadas ya');
        preguntasHechas = true; // Cambiar el valor de preguntasHechas a true
        PlayButton=document.getElementById('btn-play');
        PlayButton.disabled=true;
        newLiElement = document.createElement('li');
        newLiElement.innerHTML = '<b>'+'Se han respondido todas las preguntas posibles para este usuario por lo que ya no se puede hacer mas quizes, intente con otro usuario.'+'<b>';
        userDataItems[0].parentNode.appendChild(newLiElement);
      }

        // Ordenar usuarios por puntuación (descendente) y tiempo (ascendente)
        const sortedUsers = usersPerfil.sort(function(a, b) {
          if (a.puntuacionM !== b.puntuacionM) {
            return b.puntuacionM - a.puntuacionM;
          } else {
            return a.tiempo - b.tiempo;
          }
        });
  
        // Obtener la posición del usuario actual en la clasificación
        const posicion = sortedUsers.findIndex(user => user.nombre === nombreUsuario) + 1;
        
        const mejorQuizzElement = document.querySelector('.user-data:first-child span');
        const tiempoElement = document.querySelector('.user-data span:last-child');
        const lugarElement = document.querySelector('.user-data:nth-child(2) span');

        console.log(mejorQuizzElement);
        console.log(tiempoElement);
        console.log(lugarElement);

        mejorQuizzElement.textContent = puntuacionActual;
        tiempoElement.textContent = tiempoActual;
        lugarElement.textContent = posicion;

        console.log(`El usuario ${nombreUsuario} se encuentra en la posición ${posicion} de la clasificación.`);
        console.log(`Puntuación: ${puntuacionActual}/5`);
        console.log(`Tiempo: ${tiempoActual} seg`);
      } else {
        console.log(`No se encontró ningún usuario con el nombre ${nombreUsuario}.`);
      }
    }).catch(function(error) {
      console.log(error);
    });
  }
  