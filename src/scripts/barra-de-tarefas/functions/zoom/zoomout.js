import {Dados, ImagePreview } from '../../../index.js'
const buttonZoomOut = document.getElementById('button-Zoom-out')
buttonZoomOut.addEventListener('click', () => {
  zoomout()
})

export function zoomout(){

  if(Dados['Dados_da_imagem']['scale'] > 0.2){
  
          
          var calculoWidth = Dados['Dados_da_imagem']['proporcao']['ImagemOriginal']['width'] * 0.1
          var calculoHeight =Dados['Dados_da_imagem']['proporcao']['ImagemOriginal']['height'] * 0.1
          

          var NewValuePrewiewHeight = Dados['Dados_da_imagem']['proporcao']['ImagemPreview']['height']
          var NewValuePrewiewWidth = Dados['Dados_da_imagem']['proporcao']['ImagemPreview']['width']

          NewValuePrewiewHeight = parseInt(NewValuePrewiewHeight - calculoHeight)
          NewValuePrewiewWidth = parseInt(NewValuePrewiewWidth - calculoWidth)
          
          ImagePreview.style.height = NewValuePrewiewHeight + 'px'
          ImagePreview.style.width = NewValuePrewiewWidth + 'px'
          
          
          Dados['Dados_da_imagem']['proporcao']['ImagemPreview']['height'] = NewValuePrewiewHeight 
          Dados['Dados_da_imagem']['proporcao']['ImagemPreview']['width'] = NewValuePrewiewWidth 
          Dados['Dados_da_imagem']['scale'] =  Math.round((Dados['Dados_da_imagem']['scale'] - 0.1) * 10) / 10
          
          
          // imagemContainuarNaMesmaPosition('negativo', calculoWidth, calculoHeight)
  }
  
  }