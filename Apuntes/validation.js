window.onload = iniciar;
function iniciar(){
    document.getElementById("enviar").addEventListener("click",validar,false);
}

function validarNombre(){
    var elemento = document.getElementById("nombre");
    if(!elemento.checkValidity()){
        if(elemento.validity.valueMissing){
            error2(elemento,"No puede dejar el campo 'Nombre' vacío");
        }
        if(elemento.validity.patternMismatch){
            error2(elemento,"Debe contener entre 2 y 15 caracteres");
        }
        //error(elemento);
        return false;
    }
    return true;
}

function validarEdad(){
    var elemento = document.getElementById("edad");
    if(!elemento.checkValidity()){
        if(elemento.validity.rangeUnderflow){
            error2(elemento,"La edad no puede ser menor a 18 años");
        }
        if(elemento.validity.rangeOverflow){
            error2(elemento,"La edad no puede ser mayor a 120 años");
        }
        if(elemento.validity.valueMissing){
            error2(elemento,"No puede dejar el campo 'Edad' vacío");
        }
        return false;
    }
    return true;
}
function validarTelefono(){
    var elemento = document.getElementById("telefono");
    if(!elemento.checkValidity()){
        if(elemento.validity.tooLong){
            error2(elemento,"El número no puede ser superior a 9 dígitos");
        }
        if(elemento.validity.patternMismatch){
            error2(elemento,"Por favor introduzca solo dígitos");
        }
        if(elemento.validity.valueMissing){
            error2(elemento,"No puede dejar el campo 'Teléfono' vacío");
        }
        return false;
    }
    return true;
}

function validar(e){
    if(validarNombre() && validarEdad() && validarTelefono() && confirm("¿Está segur@?")){
        return true;
    }else{
        e.preventDefault();
        return false;
    }
}

/*function error(elemento){
    document.getElementById("mensajeError").innerHTML = elemento.validationMessage;
    elemento.className = "error";
    elemento.focus();
}*/

function borrarError(){
    var formulario = document.forms[0];
    for (var i = 0 ; i < formulario.elements.length; i++){
        formulario.elements[i].className="";
    }
}

function error2(elemento, mensaje){
    document.getElementById("mensajeError").innerHTML = mensaje;
    document.getElementById("mensajeError").className = "error";
}