import {Dados, ImagePreview } from '../../../index.js'
const buttonZoom = document.getElementById('button-Zoom')

buttonZoom.addEventListener('click', () => {
  Zoom()
})

export function Zoom(){

      var calculoWidth = Dados['Dados_da_imagem']['proporcao']['ImagemOriginal']['width'] * 0.1
      var calculoHeight = Dados['Dados_da_imagem']['proporcao']['ImagemOriginal']['height'] * 0.1
      
      var NewValuePrewiewHeight = Dados['Dados_da_imagem']['proporcao']['ImagemPreview']['height']
      var NewValuePrewiewWidth = Dados['Dados_da_imagem']['proporcao']['ImagemPreview']['width']

      var NewValuePrewiewHeight = parseInt(NewValuePrewiewHeight + calculoHeight)
      var NewValuePrewiewWidth = parseInt(NewValuePrewiewWidth + calculoWidth)

      Dados['Dados_da_imagem']['proporcao']['ImagemPreview']['height'] = NewValuePrewiewHeight
      Dados['Dados_da_imagem']['proporcao']['ImagemPreview']['width'] = NewValuePrewiewWidth 
      
      ImagePreview.style.height = NewValuePrewiewHeight + 'px'
      ImagePreview.style.width = NewValuePrewiewWidth + 'px'
      
      Dados['Dados_da_imagem']['scale'] = Math.round((Dados['Dados_da_imagem']['scale'] + 0.1) * 10) / 10;
      // imagemContainuarNaMesmaPosition('positivo', calculoWidth, calculoHeight)       
}
