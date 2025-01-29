const ContainerExibicao = document.getElementById('container-de-exibicao')
const ContainerCapturaImage = document.getElementById('container-de-captura')
const containerAdicionarImagem = document.getElementById('container-add-imagem')
const buttonAtualizar = document.getElementById('button-atualizar')

const containerButtons = document.getElementById('container-buttons')
const containerBranco = document.getElementById('container-branco')
const containerEscala = document.getElementById('container-escala')

const buttonZoom = document.getElementById('button-Zoom')
const buttonZoomOut = document.getElementById('button-Zoom-out')
const buttonCortar = document.getElementById('button-cortar')
const buttonResetar = document.getElementById('button-resetar')
const ButtonExcluir = document.getElementById('button-excluir')
// 
const buttonFecharContainerErro = document.getElementById('button-fechar-container-erro')

const buttonCortarNovaImagem = document.getElementById('button-cortar-nov-imagem')
var mensagemDeErro = document.getElementById('mensagem-de-erro')
// 
var inputfile = document.getElementById('input-add-file-image')
// 
var ImagePreview = document.getElementById('img-preview')
var isDraggimg = false;
var offsetXImg = 0;
var offsetYImg = 0;
// 
var x = 0;
var y = 0;
// 
var calculoYCentralizar = 0
var calculoXCentralizar = 0
// 
var HeightimgOriginal = 0; 
var WidthimgOriginal = 0;  
// 
var PreviewheightImg = 0;
var PreviewwidthImg = 0;
// 
var WidthExibicao = 600
var HeightExibicao = 300
// 
// var WidthCorte = document.getElementById('input-width-d-corte').value
// var HeightCorte = document.getElementById('input-height-d-corte').value
var WidthCorte = 200
var HeightCorte = 200
//
var ZoomAplicado = 0
var AplicarZom = 0.1 
var ZoomMaximo = 10
var ZoomOutMinimo = -10
// 
var scale = 1
// 
var ZoomAplicadoWidth = 0
var ZoomAplicadoHeight = 0
// 
var StatusScala = undefined
var ExisteIMG = false
var imagemCortada = false
// 
const inputWidthCorte = document.getElementById('input-width-d-corte')  
const inputHeightCorte = document.getElementById('input-height-d-corte') 
// 
ContainerCapturaImage.style.width = `${WidthCorte}px`
ContainerCapturaImage.style.height = `${HeightCorte}px`
// 




// inputWidthCorte.addEventListener('change', () => {
// AtualizarDimensao()
// })

// inputHeightCorte.addEventListener('change', () => {
// AtualizarDimensao()

// })

// buttonZoom.addEventListener('click', () => {
//         Zoom();
// })

// buttonZoomOut.addEventListener('click', () => {
//         zoomout()
// })


// dar zoom ou zoomout com o scroll do mause


ContainerExibicao.addEventListener("wheel", (e) => {
    if (ExisteIMG == true) {
        e.preventDefault();
        var ValueDelta = e.deltaY.toString()
        var DeltaPositivoOuNegativo = ValueDelta.slice(0, 1)
        

        // o - é positivo por algum motivo desconhecido :(

        if(DeltaPositivoOuNegativo == "-"){
            Zoom();
        }
        else
        {
            zoomout()
        }
    }
});





// PC
// CLICAR NA IMAGEM E PERMITIR QUE MOVIMENTE-LA

ImagePreview.addEventListener('mousedown', (event) => {
event.preventDefault();
    isDraggimg = true;
    offsetXImg = event.clientX - ImagePreview.getBoundingClientRect().left;
    offsetYImg = event.clientY - ImagePreview.getBoundingClientRect().top;
});

window.addEventListener('mousemove', (event) => {

    if (isDraggimg) {
        const containerRect = document.querySelector('.container-de-exibicao').getBoundingClientRect();
        x = event.clientX - offsetXImg - containerRect.left;
        y = event.clientY - offsetYImg  - containerRect.top;
        ImagePreview.style.top = `${y}px`;
        ImagePreview.style.left = `${x}px`;
 
    }

});

window.addEventListener('mouseup', () => {
    isDraggimg = false
});


let initialDistance = null;


function getDistance(touches) {
    const [touch1, touch2] = touches;
    const dx = touch2.clientX - touch1.clientX;
    const dy = touch2.clientY - touch1.clientY;
    return Math.sqrt(dx * dx + dy * dy);
}


ImagePreview.addEventListener('touchstart', (event) => {
    


    if(event.touches.length === 1){
        event.preventDefault();
        isDraggimg = true;
        offsetXImg = event.touches[0].clientX - ImagePreview.getBoundingClientRect().left;
        offsetYImg = event.touches[0].clientY - ImagePreview.getBoundingClientRect().top;
    }
    else if(event.touches.length === 2){
        initialDistance = getDistance(event.touches);
    }
    
});





const minChange = 20; // Ajuste o valor conforme necessário

ImagePreview.addEventListener('touchmove', (event) => {


    if (event.touches.length === 2) {
       

        const currentDistance = getDistance(event.touches);
        if (initialDistance !== null) {
            const distanceChange = currentDistance - initialDistance;
            if (Math.abs(distanceChange) > minChange) {
                if (distanceChange > 0) {
                    Zoom()
                } else {
                    zoomout()
                }
                initialDistance = currentDistance; // Atualiza a distância inicial para o próximo movimento
            }
        }
    }

    if (event.touches.length === 1 && isDraggimg) {
        const containerRect = document.querySelector('.container-de-exibicao').getBoundingClientRect();
        x = event.touches[0].clientX - offsetXImg -  containerRect.left;
        y = event.touches[0].clientY - offsetYImg - containerRect.top;

        
         ImagePreview.style.top = `${y}px`;
        ImagePreview.style.left = `${x}px`;
}

    
});

ImagePreview.addEventListener('touchend', (event) => {
    if (event.touches.length < 2) {
        initialDistance = null;
    }

    if (event.touches.length === 0) {
        isDraggimg = false;
    }
});



function VerificarScala(){

        // calculando limite eixo y - x positivos
        var YpositivoLimit = (ContainerExibicao.clientHeight /2) - HeightCorte/2
        var XpositivoLimit = (ContainerExibicao.clientWidth /2) - WidthCorte/2


        // calculando limite eixo y - x negativos
        var YnegativoLimit = (-PreviewheightImg + YpositivoLimit) + parseInt(HeightCorte);
        var XnegativoLimit = (-PreviewwidthImg + XpositivoLimit) + parseInt(WidthCorte);

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

function AtualizarDimensao(){
    
    WidthCorte = document.getElementById('input-width-d-corte').value
    HeightCorte = document.getElementById('input-height-d-corte').value

    ContainerCapturaImage.style.width = `${WidthCorte}px` 
    ContainerCapturaImage.style.height = `${HeightCorte}px`




    
}

function Zoom(){

    if(ExisteIMG){

        var calculoWidth = WidthimgOriginal * 0.1
        var calculoHeight = HeightimgOriginal * 0.1
        
        
        
        
        PreviewheightImg = parseInt(PreviewheightImg + calculoHeight)
        PreviewwidthImg = parseInt(PreviewwidthImg + calculoWidth)
        
        ImagePreview.style.width = PreviewwidthImg + 'px'
        ImagePreview.style.height = PreviewheightImg + 'px'
        
        
        scale =  Math.round((scale + 0.1) * 10) / 10
        
        
        imagemContainuarNaMesmaPosition('positivo', calculoWidth, calculoHeight)       
    }
}


function zoomout(){


if(scale > 0.2 && ExisteIMG){

        
        var calculoWidth = WidthimgOriginal * 0.1
        var calculoHeight = HeightimgOriginal * 0.1
        
        PreviewheightImg = parseInt(PreviewheightImg - calculoHeight)
        PreviewwidthImg = parseInt(PreviewwidthImg - calculoWidth)
        
        ImagePreview.style.width = PreviewwidthImg + 'px'
        ImagePreview.style.height = PreviewheightImg + 'px'
        
        
        scale =  Math.round((scale - 0.1) * 10) / 10
        
        
        imagemContainuarNaMesmaPosition('negativo', calculoWidth, calculoHeight)
}

}

function imagemContainuarNaMesmaPosition(ZomPositivoOuNegativo, calculoWidth, calculoHeight){
    
    if(ZomPositivoOuNegativo == 'positivo'){
        ImagePreview.style.left = (ImagePreview.style.left.slice(0,-2) - (calculoWidth/2)) + 'px'
        ImagePreview.style.top = (ImagePreview.style.top.slice(0,-2) - (calculoHeight/2)) + 'px'
    }
    else if(ZomPositivoOuNegativo == 'negativo')
    {

        var valueLeft = parseInt(ImagePreview.style.left.slice(0,-2))
        var valueTop = parseInt(ImagePreview.style.top.slice(0,-2))

        ImagePreview.style.left = parseInt(valueLeft + (calculoWidth/2)) + 'px'
        ImagePreview.style.top =  parseInt(valueTop + (calculoHeight/2)) + 'px'
    }
}


// ButtonExcluir.addEventListener('click', () => {
//     ExcluirImagem()
// })

function ExcluirImagem(){
    ExisteIMG = false
    scale = 1
    
    PreviewheightImg = null;
    PreviewwidthImg = null;
    
    ImagePreview.style.width = null
    ImagePreview.style.height = null
    
    
    ImagePreview.src = ""
    inputfile.value = ""
    
    ContainerCapturaImage.style.display = 'none'
    containerButtons.style.display = "none"
    containerEscala.style.display = "none"
    containerAdicionarImagem.style.display = 'flex'
}

// buttonResetar.addEventListener('click', () => {
//     if(ExisteIMG == false){
//         AbrirOuFecharContainerError(true, "adicionar uma imagem")
        
//     }
//     else{
        
        
//         ImagePreview.style.width = WidthimgOriginal + 'px'
//         ImagePreview.style.height = HeightimgOriginal + 'px'
        
//         PreviewwidthImg = WidthimgOriginal
//         PreviewheightImg = HeightimgOriginal
        
//         centralizarImagem();
//         scale = 1


//     }
// })

buttonCortar.addEventListener('click', (e) => {
  
    VerificarScala()


    if(ExisteIMG == false){
        AbrirOuFecharContainerError(true, "Insira uma imagem")
    }

    else if(StatusScala == true){

        const containerRect = document.querySelector('.container-de-exibicao').getBoundingClientRect();
        const cropperRect = ContainerCapturaImage.getBoundingClientRect();
        const canvas = document.createElement('canvas');
        canvas.width = WidthCorte;
        canvas.height = HeightCorte;
        const ctx = canvas.getContext('2d');

        const imgRect = ImagePreview.getBoundingClientRect();

    
        const x = (cropperRect.left  - imgRect.left + ImagePreview.scrollLeft + (cropperRect.width - WidthCorte) / 2)/ scale ;
        const y = (cropperRect.top - imgRect.top + ImagePreview.scrollTop + (cropperRect.height - HeightCorte) / 2) / scale ;
        ctx.drawImage(ImagePreview, x, y, WidthCorte / scale, HeightCorte / scale, 0, 0, WidthCorte, HeightCorte);

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
        AbrirOuFecharContainerError(true, "Fora de scala")
    }


});


function AbrirOuFecharContainerError(container, MessageError){
    if(container == true){
        containerBranco.style.display = 'flex'
        mensagemDeErro.innerText = MessageError
    }
    else if(container == false)
    {
        containerBranco.style.display = "none"
        mensagemDeErro.innerText = ""
    }
}

// buttonFecharContainerErro.addEventListener('click', (e) => {
//     e.preventDefault();
//     AbrirOuFecharContainerError(false, "")

// } )

function centralizarImagem(){

    ImagePreview.style.top = (ContainerExibicao.clientHeight - PreviewheightImg) / 2 + 'px'
    ImagePreview.style.left = (ContainerExibicao.clientWidth - PreviewwidthImg) / 2 + 'px'

}

