window.addEventListener("load",inicio,false);
function inicio(){
    document.getElementById("cambiarTextos").addEventListener("click",cambiarTexto,false);
    document.getElementById("cambiarClases").addEventListener("click",cambiarClase,false);
    document.getElementById("quitarClases").addEventListener("click",quitarClases,false);
}

function cambiarTexto(){
    document.getElementById("parrafo1").innerHTML = "Primer párrafo cambiado";
    document.getElementsByTagName("p")[1].innerHTML = "Segundo párrafo cambiado";
    document.getElementsByClassName("miClase")[0].innerHTML = "Tercer párrafo cambiado";
}

function cambiarClase(){
    document.getElementById("parrafo1").setAttribute("class","miClase");
    document.getElementById("parrafo2").className = "miClase";
}

function quitarClases(){
    document.getElementById("parrafo1").setAttribute("class","");
    document.getElementById("parrafo2").className = "";
}

