import { Dados, ImagePreview } from '../index.js'
import { centralizarImagem } from '../functions/moverImagem/centralizarImg.js'

const buttonResetar = document.getElementById('button-resetar')

buttonResetar.addEventListener('click', () => {
    
        
        var WidthimgOriginal = Dados['Dados_da_imagem']['proporcao']['ImagemOriginal']['width'] 
        var HeightimgOriginal = Dados['Dados_da_imagem']['proporcao']['ImagemOriginal']['height'] 

        Dados['Dados_da_imagem']['proporcao']['ImagemPreview']['width'] = WidthimgOriginal
         Dados['Dados_da_imagem']['proporcao']['ImagemPreview']['height'] = HeightimgOriginal 

        ImagePreview.style.width = WidthimgOriginal + 'px'
        ImagePreview.style.height = HeightimgOriginal + 'px'
        
        Dados['Dados_da_imagem']['scale'] = 1

        centralizarImagem();

})