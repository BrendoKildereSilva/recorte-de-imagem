import {Dados, inputfile, ImagePreview, EncerrandoAmbiente } from '../index'
const ButtonDeletar = document.getElementById('button-deletar')

ButtonDeletar.addEventListener('click', () => {
  ExcluirImagem()
})


function ExcluirImagem(){
  
  ImagePreview.style.width = null
  ImagePreview.style.height = null
  
  ImagePreview.src = ""
  inputfile.value = ""

  Dados['Dados_da_imagem']['scale'] = 1

  Dados['Dados_da_imagem']['proporcao']['ImagemOriginal']['width'] = "";
  Dados['Dados_da_imagem']['proporcao']['ImagemOriginal']['height'] = "";

  Dados['Dados_da_imagem']['proporcao']['ImagemPreview']['width'] = "";
  Dados['Dados_da_imagem']['proporcao']['ImagemPreview']['height'] = "";

  EncerrandoAmbiente();

  
}