import { Dados, ImagePreview, Area__de__trabalho} from '../../index.js'


const buttonCentralizar = document.getElementById('button-centralizar')
buttonCentralizar.addEventListener('click', () => {
  centralizarImagem()
})

export function centralizarImagem(){

  var PreviewwidthImg = Dados['Dados_da_imagem']['proporcao']['ImagemPreview']['width']
  var PreviewheightImg = Dados['Dados_da_imagem']['proporcao']['ImagemPreview']['height']

  ImagePreview.style.top = (Area__de__trabalho.clientHeight - PreviewheightImg) / 2 + 'px'
  ImagePreview.style.left = (Area__de__trabalho.clientWidth - PreviewwidthImg) / 2 + 'px'
}
