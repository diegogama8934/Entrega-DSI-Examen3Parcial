//Se coloca el contenido en la screen principal y se colorea el boton de la nav bar para que esté activo

function loadApp(){

    //Como la primera Screen de la App es la del juego, cuando la página cargue se tiene que mover a la página de inicio.

    //Se selecciona todo el contenido y el número de pixeles que se va a mover-

    const content = document.getElementById( 'content' );
    const pixeles = document.getElementById( 'screen-home' ).offsetWidth;

    //Se quitan los estilos que había para que no se viera la página de juego de manera instantánea y se traslada al mismo lugar 
    //(es decir, no se mueve, solamente aquí se hace la funcionalidad para que siga el mismo procedimiento de las demás pantallas
    //y no se tenga que mover siempre accediendo a su atributo del elemento).

    content.setAttribute( 'style' , '' );
    content.style.transform = `translateX(-${ pixeles }px)`

    //Después de que se haya cargado las propiedades debidas (en un tiempo considerado de medio segundo) se pondrá que las animaciones
    //que tenga cuando se transforme, duren 1.5 segundos.

    setTimeout(() => {
        content.style.transition = "transform 1.5s";
    }, 500)

    //Se pone el botón de inicio como que está "Activo"

    const btnHome = document.getElementById( 'first-btn' );
    btnHome.setAttribute( 'style' , 'background-color: #EE7F64;' );

    loadUsers();
    classifyUsers();
//     shuffleOpciones('pregunta1');
//     shuffleOpciones('pregunta2');
// shuffleOpciones('pregunta3');
// shuffleOpciones('pregunta4');
// shuffleOpciones('pregunta5');
// shuffleOpciones('pregunta6');
// shuffleOpciones('pregunta7');
// shuffleOpciones('pregunta8');
// shuffleOpciones('pregunta9');
// shuffleOpciones('pregunta10');
// shuffleOpciones('pregunta11');
// shuffleOpciones('pregunta12');
// shuffleOpciones('pregunta13');
// shuffleOpciones('pregunta14');
// shuffleOpciones('pregunta15');
// shuffleOpciones('pregunta16');
// shuffleOpciones('pregunta17');
// shuffleOpciones('pregunta18');
// shuffleOpciones('pregunta19');
// shuffleOpciones('pregunta20');
// shuffleOpciones('pregunta21');
// shuffleOpciones('pregunta22');
// shuffleOpciones('pregunta23');
// shuffleOpciones('pregunta24');
// shuffleOpciones('pregunta25');
// shuffleOpciones('pregunta26');
// shuffleOpciones('pregunta27');
// shuffleOpciones('pregunta28');
// shuffleOpciones('pregunta29');
// shuffleOpciones('pregunta30');
}
async function shuffleOpciones(documentId) {
    const docRef = db.collection("preguntas").doc(documentId);
    const docSnapshot = await docRef.get();
  
    if (docSnapshot.exists) {
      const opciones = docSnapshot.data().opciones;
      const opcionesShuffle = shuffleArray(opciones);
  
      await docRef.update({ opciones: opcionesShuffle });
  
      console.log("Opciones actualizadas correctamente:", opcionesShuffle);
    } else {
      console.log("El documento no existe:", documentId);
    }
  }
  
  function shuffleArray(array) {
    const shuffledArray = [...array];
  
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
  
    return shuffledArray;
  }
  