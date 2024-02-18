document.querySelector('.trash').addEventListener("click",dissapear,false);
document.addEventListener("contextmenu",function(){return false},false); 
function dissapear(){
    document.querySelector('.trash').style.backgroundImage = "url('image-removebg-preview.png')";
    alert("La papelera se ha vaciado");
}