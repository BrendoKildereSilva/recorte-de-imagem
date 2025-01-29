
import { PreparandoAmbiente, Dados, inputfile, ImagePreview } from "../index";


inputfile.addEventListener('change', () => {
  const regexAnalizarExtensao = /\.(jpg|jpeg|png|gif|bmp|tiff|svg|webp|heif|heic)$/i;
  
  var file = inputfile.files[0]
  var fileName = inputfile.files[0].name
  
  var Extensao = regexAnalizarExtensao.test(fileName)
  
  if(!Extensao){
      alert("Apenas imagem com o formato:  jpg, jpeg, png, gif, bmp, tiff,svg, webp, heif, heic")
  }
  
  else{
      const reader = new FileReader();
  
      reader.onload = () => {
          ImagePreview.src = reader.result;
          PreparandoAmbiente();

          ImagePreview.onload = () => {
      
              if(ImagePreview.width == 0 || ImagePreview.height == 0){
                  ExcluirImagem();
                  AbrirOuFecharContainerError(true, "Tente Novamente")
                  console.log('error')
              }
            
              Dados['Dados_da_imagem']['proporcao']['ImagemPreview']['width'] = ImagePreview.width
              Dados['Dados_da_imagem']['proporcao']['ImagemPreview']['height'] = ImagePreview.height

              Dados['Dados_da_imagem']['proporcao']['ImagemOriginal']['width'] = ImagePreview.width
              Dados['Dados_da_imagem']['proporcao']['ImagemOriginal']['height'] = ImagePreview.height

              // centralizarImagem()
          };
      
              
      }
      
      
      reader.readAsDataURL(file);
          
      }
      
})  