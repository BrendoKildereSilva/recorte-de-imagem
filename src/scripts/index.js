
export var Dados = { 
  "Dados_da_imagem": {
    "proporcao": {
      "ImagemPreview": { "width": "", "height": ""},
      "ImagemOriginal": { "width": "", "height": ""}
    },
    "scale": 1
  }
}





export function PreparandoAmbiente() {
  containerApresentacao.style.display = "none"
  Area__de__trabalho.style.display = "block"
  BarraDeTarefas.style.opacity = 1
  BarraDeTarefas.style.pointerEvents = "all"
}




// variaveis global:
export const containerApresentacao = document.getElementById('container-add-imagem')
export const BarraDeTarefas = document.getElementById('barra-de-ferramentas')
export const Area__de__trabalho = document.getElementById('Area_de_trabalho')
export var inputfile = document.getElementById('input-add-file-image')
export const area_de_corte = document.getElementById('container-de-captura')
export var ImagePreview = document.getElementById('img-preview')
