import {Dados, area_de_corte, Area__de__trabalho, ImagePreview } from '../../index'


export var HeightCorte = 200
export var WidthCorte = 200
area_de_corte.style.width = `${HeightCorte}px`
area_de_corte.style.height = `${WidthCorte}px`
export var StatusScala = null

export function VerificarScala(){

  // calculando limite eixo y - x positivos
  var YpositivoLimit = (Area__de__trabalho.clientHeight /2) - HeightCorte/2
  var XpositivoLimit = (Area__de__trabalho.clientWidth /2) - WidthCorte/2


  // calculando limite eixo y - x negativos
  var YnegativoLimit = (-Dados['Dados_da_imagem']['proporcao']['ImagemPreview']['height'] + YpositivoLimit) + parseInt(HeightCorte);
  var XnegativoLimit = (-Dados['Dados_da_imagem']['proporcao']['ImagemPreview']['width'] + XpositivoLimit) + parseInt(WidthCorte);

  var ScalaY = false
  var ScalaX = false


  var Yposition = ImagePreview.style.top.replace('px', "")
  var Xposition = ImagePreview.style.left.replace('px', "")
  







  if(Yposition > YpositivoLimit || Yposition < YnegativoLimit ){
      
      ScalaY = false
  
  }
  else{
      ScalaY = true
  }

  // 
  // 

  if(Xposition > XpositivoLimit || Xposition < XnegativoLimit){
      ScalaX = false
  }
  else{
      ScalaX = true
  }

  // 
  // 

  if(ScalaX == true && ScalaY == true){
      StatusScala = true
  }
  else
  {
      StatusScala = false
  }
}
