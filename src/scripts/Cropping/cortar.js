import { VerificarScala, StatusScala, WidthCorte, HeightCorte } from './area-de-corte'
import {  Dados, ImagePreview, area_de_corte, inputfile } from '../index'
const buttonCortar = document.getElementById('button-cortar')


buttonCortar.addEventListener('click', (e) => {
  VerificarScala()

  if(StatusScala == true){

      const containerRect = document.querySelector('.area_de_trabalho').getBoundingClientRect();
      const cropperRect = area_de_corte.getBoundingClientRect();
      const canvas = document.createElement('canvas');
      canvas.width = WidthCorte;
      canvas.height = HeightCorte;
      const ctx = canvas.getContext('2d');

      const imgRect = ImagePreview.getBoundingClientRect();

  
      const x = (cropperRect.left  - imgRect.left + ImagePreview.scrollLeft + (cropperRect.width - WidthCorte) / 2)/ Dados['Dados_da_imagem']['scale'] ;
      const y = (cropperRect.top - imgRect.top + ImagePreview.scrollTop + (cropperRect.height - HeightCorte) / 2) / Dados['Dados_da_imagem']['scale'] ;
      ctx.drawImage(ImagePreview, x, y, WidthCorte / Dados['Dados_da_imagem']['scale'], HeightCorte / Dados['Dados_da_imagem']['scale'], 0, 0, WidthCorte, HeightCorte);

      // const resultContainer = document.getElementById('container-image')
      // resultContainer.innerHTML = ""
      // resultContainer.style.height = HeightCorte + 'px'
      // resultContainer.style.width = WidthCorte + 'px'

      // resultContainer.appendChild(canvas);

      // Convertendo o canvas em um Blob usando fetch

      var originalFileExtension = inputfile.files[0].name.split('.').pop(); // Captura a extensão da imagem original
      var newFileName = `cropped_image.${originalFileExtension}`;

      var regexCapturarExtensao = /.[A-Z-a-z]+$/
      var NomeOriginalDaImagem = inputfile.files[0].name.replace(regexCapturarExtensao, "")

      var buttonBaixar = document.createElement('a')

      canvas.toBlob((blob) => {
          var file = new File([blob], newFileName, { type: `image/${originalFileExtension}` });
          
          // console.log('Imagem recortada:', file); 

          var Reader = new FileReader();

          Reader.onload = () =>{
              buttonBaixar.href = Reader.result
              buttonBaixar.download = NomeOriginalDaImagem + '.' + originalFileExtension
              buttonBaixar.click()
          }
          
          Reader.readAsDataURL(file)
      });
      
     

  }
  else
  {
      alert('FORA DE ESCALA')
  }


});