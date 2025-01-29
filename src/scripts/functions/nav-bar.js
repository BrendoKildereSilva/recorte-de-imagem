import { gsap } from "gsap";
const buttonNavBar = document.getElementById('button-nav-bar');
var StatusNavBar = "close"

buttonNavBar.addEventListener('click', () => {
  console.log(StatusNavBar)
  if(StatusNavBar == "close"){
    OpenBarraDeFerramentas()
  }else{

    CloseBarraDeFerramentas()
  }
})


function OpenBarraDeFerramentas(){
  StatusNavBar = "open"

  gsap.to('.barra-de-ferramentas', {
    left: "0vw"
  })
  
  gsap.to('.fi-br-plus', {
    transform: "rotate(40deg)"
  })
}


export function CloseBarraDeFerramentas(){
  StatusNavBar = "close"

  gsap.to('.barra-de-ferramentas', {
    left: "-60vw"
  })

  gsap.to('.fi-br-plus', {
    transform: "rotate(90deg)"
  })
  
}