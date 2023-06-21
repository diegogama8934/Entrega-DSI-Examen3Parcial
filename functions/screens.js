//Mover contenido a la screen del equipo
function moveTeam(){
    //Quitar color del boton de origen
    quitColor();

    //Se pone el color activo del botón actual
    const btnActual = document.getElementById( 'last-btn' );
    btnActual.setAttribute( 'style' , 'background-color: #EE7F64;' );

    //Se selecciona el contenido (para moverlo)
    const contenido = document.getElementById( 'content' );

    //Se selcciona el número de pixeles que se moverá
    const pixeles = document.getElementById( 'screen-home' ).offsetWidth;

    //Se mueve el contenido
    contenido.style.transform = `translateX(-${ 4*pixeles }px)`;
}

//Mover contenido a la screen de cómo jugar
function moveHowToPlay(){

    //Quitar color del boton de origen
    quitColor();

    //Se pone el color activo del botón actual
    const btnActual = document.getElementById( 'second-btn' );
    btnActual.setAttribute( 'style' , 'background-color: #EE7F64;' );

    //Se selecciona el contenido (para moverlo)
    const contenido = document.getElementById( 'content' );

    //Se selcciona el número de pixeles que se moverá
    const pixeles = document.getElementById( 'screen-home' ).offsetWidth;

    //Se mueve el contenido
    contenido.style.transform = `translateX(-${ 2*pixeles }px)`;

}

//Mover contenido a la screen de inicio
function moveToHome(){
    //Quitar color del boton de origen
    quitColor();

    //Se pone el color activo del botón actual
    const btnActual = document.getElementById( 'first-btn' );
    btnActual.setAttribute( 'style' , 'background-color: #EE7F64;' );

    //Se selecciona el contenido (para moverlo)
    const contenido = document.getElementById( 'content' );

    //Se selcciona el número de pixeles que se moverá
    const pixeles = document.getElementById( 'screen-home' ).offsetWidth;

    //Se mueve el contenido
    contenido.style.transform = `translateX(-${ pixeles }px)`;
}

//Mover contenido a la screen de clasificacion
function moveClasification(){
    //Quitar color del boton de origen
    quitColor();

    //Se pone el color activo del botón actual
    const btnActual = document.getElementById( 'third-btn' );
    btnActual.setAttribute( 'style' , 'background-color: #EE7F64;' );

    //Se selecciona el contenido (para moverlo)
    const contenido = document.getElementById( 'content' );

    //Se selcciona el número de pixeles que se moverá
    const pixeles = document.getElementById( 'screen-home' ).offsetWidth;

    //Se mueve el contenido
    contenido.style.transform = `translateX(-${ 3*pixeles }px)`;
}

//Cambiar a estado activo los botones de la nav bar cuando se navegue
function quitColor(){

    //Se obtienen todos los botones de la barra de navegación y se pasa la colección HTML a Array usando spread.

    const btns = document.getElementsByClassName( 'nav-screen-item' )
    const btnsArr = [...btns]
    
    //Se selecciona el botón que queremos usando Array.find

    const btn = btnsArr.find(b => b.style.backgroundColor == "rgb(238, 127, 100)");
    
    //Se le quita el color
    
    if (btn) {
        btn.style = "";
    }
}

//Mover contenido a la screen de inicio después de terminar un juego.
function moveToHomeAfterGame(){
    moveToHome();

    setTimeout(()=>{
        const clasificacion = document.getElementById( 'podio' );
        const tuPuntuacion = document.getElementById( 'tu-puntuacion' );
        const button = document.getElementById( 'btn-move-to-home' );

        clasificacion.remove();
        tuPuntuacion.remove();
        button.remove();

        location.reload();
    } , 2000)
}