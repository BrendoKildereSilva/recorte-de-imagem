import { gsap } from "gsap";


const buttonNavBar = document.getElementById('button-nav-bar');
var StatusOpenOrClose = "close"

buttonNavBar.addEventListener('click', () => {

  if(StatusOpenOrClose == "close"){

    OpenBarraDeFerramentas()
    StatusOpenOrClose = "open"
  }else{

    CloseBarraDeFerramentas()
    StatusOpenOrClose = "close"
  }
  

})


function OpenBarraDeFerramentas(){
  gsap.to('.barra-de-ferramentas', {
    left: "0vw"
  })
  
  gsap.to('.fi-br-plus', {
    transform: "rotate(40deg)"
  })
}


function CloseBarraDeFerramentas(){
  gsap.to('.barra-de-ferramentas', {
    left: "-60vw"
  })

  gsap.to('.fi-br-plus', {
    transform: "rotate(90deg)"
  })
  
}