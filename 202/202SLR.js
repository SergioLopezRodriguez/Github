window.onload = iniciar;
contador= 0; //Variable global utilizada en las funciones de "Mensaje"
marcados = 0; //Variable global que gestiona las checkboxes marcadas

//Función de inicio, Establece los eventListener
function iniciar(){
    document.getElementById("enviar").addEventListener("click",validar,false);
    document.getElementById("cero").addEventListener("click",borrar,false);
    document.getElementById("clicar").addEventListener("click",google,false);
    document.getElementById("nuevo").addEventListener("click",nuevoCurso,false);
    document.getElementById("mensaje").addEventListener("keypress",cambiosMensaje,false);
    document.getElementById("mensaje").addEventListener("keydown",disminuirContador,false);
    var checkboxes = document.querySelectorAll('input[type="checkbox"][name="dias"]');
    checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener("click", cuentaCheckboxes,false);
    });
}

//Validación inputs usuario Botón "enviar"
function validar(){

    let nombre = document.getElementById("nombre");
    let regex = /^[a-zA-Z]+$/;
    if(!regex.test(nombre.value)){
        nombre.className="error";
        document.getElementById("nombreerror").innerHTML = "Por favor introduce un nombre válido"
    }
    let nif = document.getElementById("nif");
    regex = /^[0-9]{8}[A-Z]{1}/;
    if(!regex.test(nif.value)){
        nif.className="error";
        document.getElementById("niferror").innerHTML = "Por favor introduce un nif válido"
    }
    let mensaje = document.getElementById("mensaje");
    if(!mensaje.checkValidity())
        mensaje.className="error";
        document.getElementById("mensajeerror").innerHTML = "Por favor introduce un mensaje válido"
    let fecha = document.getElementById("fecha");
    if(!fecha.checkValidity())
        fecha.className="error";
        document.getElementById("fechaerror").innerHTML = "Por favor introduce una fecha válida"
    let curso = document.getElementById("nc");
    if(!curso.checkValidity()){
        curso.className="error";
        document.getElementById("cursoerror").innerHTML = "Por favor introduce un curso válido"    
    }
    let dias = document.getElementById("dias");    
    if(marcados<2){
        document.getElementById("diaserror").innerHTML = "Por favor introduce un número de días válido"
    }

    if(marcados<2){
        //dias.focus();
    }
    if(!curso.checkValidity()){
        curso.focus();
    }
    if(!fecha.checkValidity()){
        fecha.focus();
    }
    if(!mensaje.checkValidity()){
        mensaje.focus();
    }
    if(nif.textContent != "[0-9]{8}[A-Z]{1}"){
        nif.focus();
    }
    if(nombre.textContent != "[a-zA-Z]"){
        nombre.focus();
    }
}

//Eliminación errores validación Botón "cero"
function borrar(){
    document.getElementById("nombre").className="";
    document.getElementById("nif").className="";
    document.getElementById("mensaje").className="";
    document.getElementById("fecha").className="";
    document.getElementById("nc").className="";
    document.getElementById("curso").className="";
    document.getElementById("nombreerror").innerHTML = "";
    document.getElementById("niferror").innerHTML = "";
    document.getElementById("mensajeerror").innerHTML = "";
    document.getElementById("fechaerror").innerHTML = "";
    document.getElementById("cursoerror").innerHTML = "";
    document.getElementById("diaserror").innerHTML = "";
}

//Redirección a Google Botón "clicar"
function google(){
    window.location.replace("https://www.google.com/?hl=es");
}

//Función Select "Curso"
function nuevoCurso(){
    let curso = document.getElementById("curso");
    let newcurso = document.getElementById("nc").value;
    let option = document.createElement("option");
    option.text  = newcurso;
    curso.appendChild(option);
    let cursos = Array.from(curso.options);
    cursos.sort(function(a,b){return a.text.localeCompare(b.text)});
    curso.innerHTML = "";
    cursos.forEach(function(option){
        curso.appendChild(option);
    }
    );
}

//Funciones TextArea "Mensaje"
function cambiosMensaje(){
    let mensaje = document.getElementById("mensaje");
    let div = document.getElementById("contador");
    contador = mensaje.value.length+1;
    div.innerHTML = contador + "/500 caracteres";
}
function disminuirContador(e){
    let mensaje = document.getElementById("mensaje");
    let div = document.getElementById("contador");
    if(e.key === "Backspace" && contador!=0)
        contador = mensaje.value.length-1;
    div.innerHTML = contador + "/500 caracteres";
}

//Funciones Checkboxes "dias"
function cuentaCheckboxes(){
    let conteo = 0;
    let checkboxes = document.querySelectorAll('input[type="checkbox"][name="dias"]');
    checkboxes.forEach(function (checkbox) {
        if(checkbox.checked)
            conteo++;
    });
    marcados = conteo;
    console.log("Number of checked checkboxes:", conteo);
}