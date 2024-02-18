window.onload=inicio();
function inicio(){
    document.getElementById("form").addEventListener("submit",iniciarBuscaMinas,false);
}

//Inicia el buscaminas
function iniciarBuscaMinas(){
    dificultad = document.getElementById("tamaño").value;
    generarTableroJS(dificultad);
    colocarBombasTableroJS(dificultad);
    ganar();
}

//Genera el tablero y los contadores
function generarTableroJS(dificultad){
    //Establece la dificultad
    dificultad = dificultad.split('x');
    dificultad[0] = parseInt(dificultad[0]);
    dificultad[1] = parseInt(dificultad[1]);
    let form = document.getElementById("form");
    form.remove();

    //Creación contadores de tiempo y minas
    let minecounter = document.createElement("div");
    minecounter.innerHTML = "Minas restantes: ";
    minecounter.setAttribute("class","counter");
    minecounter.setAttribute("id","counter");
    document.body.append(minecounter);
    let div = document.createElement("div");
    let cont = 0;
    div.setAttribute("class","timer");
    div.innerHTML= "Tiempo: " + cont;
    document.body.append(div);
    div.setAttribute("id","timer");
    timer(cont);

    //Creación de tablero y casillas
    let tablero = document.createElement("table"); 
    let array = [];
    tablero.setAttribute("class","center");
    tablero.setAttribute("id","tablero");
    for(let i=0;i<dificultad[0];i++){
        let linea = document.createElement("tr");
        array.push([i]);
        for(let j=0;j<dificultad[1];j++){
            array[i].push([j]);
            let casilla = document.createElement("td");
            let clicable = document.createElement("button");
            clicable.setAttribute("id",i + "-" + j);
            casilla.appendChild(clicable);
            linea.appendChild(casilla);
        }
        tablero.appendChild(linea);
    }
    document.body.appendChild(tablero);

    //Establece event listeners para funciones check y bandera
    for(let i = 0;i<dificultad[0];i++){ 
        for(let j=0;j<dificultad[1];j++){
            document.getElementById(i + "-" + j).addEventListener("click",check,false);
            document.getElementById(i + "-" + j).addEventListener("contextmenu",bandera,false);
        }
    }
}


function calcularNumMinas( x , y ){ //* en función de tamaño y dificultad
    let numMinas = 0;
    let total = x*y;
    numMinas = Math.floor(total * 0.25);
    return numMinas;
}

function numeroAleatorio(x){
    return Math.floor(Math.random() * x);
}

function colocarBombasTableroJS(dificultad){
    dificultad = dificultad.split('x');
    minasColocadas = 0;
    let numMinas = calcularNumMinas(parseInt(dificultad[0]),parseInt(dificultad[1]));
    while (minasColocadas<numMinas){
        let fila = numeroAleatorio(document.getElementById("tablero").children.length);
        let columna = numeroAleatorio(document.getElementById("tablero").children[fila].children.length);
        if (document.getElementById("tablero").children[fila].children[columna].className != "mina"){
            document.getElementById("tablero").children[fila].children[columna].className = "mina";
            minasColocadas++;
        }
    }
    minasRestantes();
}

//Contador de tiempo
function timer(cont){ 
    timerInterval = setInterval(()=>{
        cont++;
        document.getElementById("timer").textContent = "Tiempo: " + cont;
    },1000)
}

//Actualización contador de minas
function minasRestantes(){ 
    minasInterval = setInterval(()=>{
        document.getElementById("counter").textContent = "Minas restantes: " + minasColocadas;
    },1000)
}

//Comprobación y mensaje de ganar
function ganar(){ 
    let minas = minasColocadas;
    ganarInterval = setInterval(()=>{
        minas = document.querySelectorAll("td.mina").length;
        if(minas == 0){
            clearInterval(timerInterval);
            clearInterval(minasInterval);
            clearInterval(ganarInterval);
            let tiempo = document.getElementById("timer").innerHTML;
            document.getElementById("timer").remove();
            document.getElementById("counter").remove();
            document.getElementById("tablero").remove();
            alert("¡Enhorabuena has ganado! " + tiempo);
            let reinicio = document.createElement("button");
            reinicio.innerHTML = "reiniciar";
            document.body.append(reinicio);
            reinicio.addEventListener("click",reiniciar,false);
        }
    },1000)
}

//Revisa las casillas
function check(e){ 
    if(e.target.parentNode.className == "mina"){ //Pierdes en caso de que sea una mina
        document.getElementById("tablero").style.backgroundColor = "red";
        let tiempo = document.getElementById("timer").innerHTML;
        clearInterval(timerInterval);
        clearInterval(minasInterval);
        clearInterval(ganarInterval);
        document.getElementById("timer").remove();
        document.getElementById("counter").remove();
        setTimeout(()=>{
            document.getElementById("tablero").remove();
            alert(tiempo);
            let reinicio = document.createElement("button");
            reinicio.innerHTML = "reiniciar";
            document.body.append(reinicio);
            reinicio.addEventListener("click",reiniciar,false);
        },5000)
    }else if(e.target.parentNode.className!="mina_bandera" && e.target.parentNode.className!="bandera"){ //Comprueba que no haya bandera
        let minasCount = 0;
        const str = e.target.id;

        // Check izquierda
        if (e.target.parentNode.previousSibling !== null &&
        (e.target.parentNode.previousSibling.className == "mina"
        || e.target.parentNode.previousSibling.className == "mina_bandera"))
        minasCount++;

        // Check derecha
        if (e.target.parentNode.nextSibling !== null &&
        (e.target.parentNode.nextSibling.className == "mina"
        || e.target.parentNode.nextSibling.className == "mina_bandera"))
        minasCount++;

        // Check arriba
        if (e.target.parentNode.parentNode.previousSibling !== null &&
        e.target.parentNode.parentNode.previousSibling.children[parseInt(str.substring(e.target.id.length - 1))] &&
        (e.target.parentNode.parentNode.previousSibling.children[parseInt(str.substring(e.target.id.length - 1))].className == "mina"
        || e.target.parentNode.parentNode.previousSibling.children[parseInt(str.substring(e.target.id.length - 1))].className == "mina_bandera"))
        minasCount++;

        // Check abajo
        if (e.target.parentNode.parentNode.nextSibling !== null &&
        e.target.parentNode.parentNode.nextSibling.children[parseInt(str.substring(e.target.id.length - 1))] &&
        (e.target.parentNode.parentNode.nextSibling.children[parseInt(str.substring(e.target.id.length - 1))].className == "mina"
        || e.target.parentNode.parentNode.nextSibling.children[parseInt(str.substring(e.target.id.length - 1))].className == "mina_bandera"))
        minasCount++;

        // Check arriba-izquierda
        if (e.target.parentNode.parentNode.previousSibling !== null &&
        e.target.parentNode.parentNode.previousSibling.children[parseInt(str.substring(e.target.id.length - 1)) - 1] &&
        (e.target.parentNode.parentNode.previousSibling.children[parseInt(str.substring(e.target.id.length - 1)) - 1].className == "mina"
        || e.target.parentNode.parentNode.previousSibling.children[parseInt(str.substring(e.target.id.length - 1)) - 1].className == "mina_bandera"))
        minasCount++;

        // Check arriba-derecha
        if (e.target.parentNode.parentNode.previousSibling !== null &&
        e.target.parentNode.parentNode.previousSibling.children[parseInt(str.substring(e.target.id.length - 1)) + 1] &&
        (e.target.parentNode.parentNode.previousSibling.children[parseInt(str.substring(e.target.id.length - 1)) + 1].className == "mina"
        || e.target.parentNode.parentNode.previousSibling.children[parseInt(str.substring(e.target.id.length - 1)) + 1].className == "mina_bandera"))
        minasCount++;

        // Check abajo-izquierda
        if (e.target.parentNode.parentNode.nextSibling !== null &&
        e.target.parentNode.parentNode.nextSibling.children[parseInt(str.substring(e.target.id.length - 1)) - 1] &&
        (e.target.parentNode.parentNode.nextSibling.children[parseInt(str.substring(e.target.id.length - 1)) - 1].className == "mina"
        || e.target.parentNode.parentNode.nextSibling.children[parseInt(str.substring(e.target.id.length - 1)) - 1].className == "mina_bandera"))
        minasCount++;

        // Check abajo-derecha
        if (e.target.parentNode.parentNode.nextSibling !== null &&
        e.target.parentNode.parentNode.nextSibling.children[parseInt(str.substring(e.target.id.length - 1)) + 1] &&
        (e.target.parentNode.parentNode.nextSibling.children[parseInt(str.substring(e.target.id.length - 1)) + 1].className == "mina" 
        || e.target.parentNode.parentNode.nextSibling.children[parseInt(str.substring(e.target.id.length - 1)) + 1].className == "mina_bandera"))
        minasCount++;

        e.target.innerHTML = minasCount; //Indica cuantas minas hay alrededor
    }
}

//Función para establecer las banderas
function bandera(e){ 
    e.preventDefault();
    if(e.target.parentNode.className=="mina"){
        if(minasColocadas>0){
        e.target.parentNode.className = "mina_bandera";
        minasColocadas--;
        }
    }else if(e.target.parentNode.className=="mina_bandera"){
        e.target.parentNode.className = "mina"
        minasColocadas++;
    }else if(e.target.parentNode.className == ""){
        if(minasColocadas>0){
        e.target.parentNode.className = "bandera";
        minasColocadas--;
        }
    }else{
        e.target.parentNode.className = "";
        minasColocadas++;
    }
}

//Reiniciar la partida
function reiniciar(){ 
    location.replace("Buscaminas.html");
}