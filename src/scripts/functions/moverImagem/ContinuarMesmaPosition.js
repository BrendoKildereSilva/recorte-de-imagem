
import {Dados, ImagePreview } from '../../index'

export function ContinuarMesmaPosition( Action ){

  var WidthimgOriginal = Dados['Dados_da_imagem']['proporcao']['ImagemOriginal']['width']
  var HeightimgOriginal = Dados['Dados_da_imagem']['proporcao']['ImagemOriginal']['height']
  
  var calculoWidth = WidthimgOriginal * 0.1
  var calculoHeight = HeightimgOriginal * 0.1

  if(Action == 'Zoom'){
      ImagePreview.style.left = (ImagePreview.style.left.slice(0,-2) - (calculoWidth/2)) + 'px'
      ImagePreview.style.top = (ImagePreview.style.top.slice(0,-2) - (calculoHeight/2)) + 'px'
  }
  else if(Action == 'ZoomOut')
  {

      var valueLeft = parseInt(ImagePreview.style.left.slice(0,-2))
      var valueTop = parseInt(ImagePreview.style.top.slice(0,-2))

      ImagePreview.style.left = parseInt(valueLeft + (calculoWidth/2)) + 'px'
      ImagePreview.style.top =  parseInt(valueTop + (calculoHeight/2)) + 'px'
  }
}