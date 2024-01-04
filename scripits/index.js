const LabelbuttonAddImagem = document.getElementById('labelbutton-add-imagem')
const ContainerExibicao = document.getElementById('container-de-exibicao')
const ContainerCapturaImage = document.getElementById('container-de-captura')

const buttonAtualizar = document.getElementById('button-atualizar')
const buttonZoom = document.getElementById('button-Zoom')
const buttonZoomOut = document.getElementById('button-Zoom-out')
const buttonCortar = document.getElementById('button-cortar')
const buttonResetar = document.getElementById('button-resetar')
const ButtonExcluir = document.getElementById('button-excluir')
const buttonCortarNovaImagem = document.getElementById('button-cortar-nov-imagem')
var MensagemDeErro = document.getElementById('mensagem-de-erro')
var containerBranco = document.getElementById('container-branco')
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
var WidthCorte = document.getElementById('input-width-d-corte').value
var HeightCorte = document.getElementById('input-height-d-corte').value
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




inputWidthCorte.addEventListener('change', () => {
AtualizarDimensao()
})

inputHeightCorte.addEventListener('change', () => {
AtualizarDimensao()

})

buttonZoom.addEventListener('click', () => {
    Zoom();
})

buttonZoomOut.addEventListener('click', () => {
    zoomout()
})


// dar zoom ou zoomout com o scroll do mause
ContainerExibicao.addEventListener("wheel", (e) => {
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
});



inputfile.addEventListener('change', () => {


var file = inputfile.files[0]
var ExtensaoFile = file.name.slice(-4).toLowerCase() 

if(ExtensaoFile != '.jpg' && ExtensaoFile != '.png'){
    MensagemDeErro.innerText = 'Apenas arquivos .png e .jpg'
}

else{
    const reader = new FileReader();

reader.onload = () => {
    

    ImagePreview.src = reader.result;

    
    
    // Espera a imagem carregar antes de obter suas dimensões
    ImagePreview.onload = () => {

            PreviewwidthImg = ImagePreview.width; 
            PreviewheightImg = ImagePreview.height;

            WidthimgOriginal = ImagePreview.width;                
            HeightimgOriginal = ImagePreview.height; 

            centralizarImagem()
            

            
            containerBranco.style.display = 'none'
            ExisteIMG = true
            MensagemDeErro.innerText = ''
            LabelbuttonAddImagem.style.display = 'none'
            ContainerCapturaImage.style.display = 'block'

        
    };

        
}


reader.readAsDataURL(file);
    
}

})  

// CLICAR NA IMAGEM E PERMITIR QUE MOVIMENTE-A
// PC
ImagePreview.addEventListener('mousedown', (event) => {
event.preventDefault();
    isDraggimg = true;
    offsetXImg = event.clientX - ImagePreview.getBoundingClientRect().left;
    offsetYImg = event.clientY - ImagePreview.getBoundingClientRect().top;
});
// MOBILE
ImagePreview.addEventListener('touchstart', (event) => {
    event.preventDefault();
    isDraggimg = true;
    offsetXImg = event.touches[0].clientX - ImagePreview.getBoundingClientRect().left;
    offsetYImg = event.touches[0].clientY - ImagePreview.getBoundingClientRect().top;
});
// 
// QUANDO PARAR DE PRECIONAR O BUTÃO DE CLICK, PARAR DE MOVIMENTAR A IMAGEM
// PC
window.addEventListener('mouseup', () => {
    isDraggimg = false
});
// MOBILE
window.addEventListener('touchend', () => {
    isDraggimg = false
});
// 
// MOVIMENTAR IMAGEM
// PC
window.addEventListener('mousemove', (event) => {
    if (isDraggimg) {

        const containerRect = document.querySelector('.container-de-exibicao').getBoundingClientRect();
        x = event.clientX - offsetXImg - containerRect.left;
        y = event.clientY - offsetYImg  - containerRect.top;

        
        ImagePreview.style.top = `${y}px`;
        ImagePreview.style.left = `${x}px`;

        
    }

});
// MOBILE

window.addEventListener('touchmove', (event) => {
    if (isDraggimg) {
        const containerRect = document.querySelector('.container-de-exibicao').getBoundingClientRect();
        x = event.touches[0].clientX - offsetXImg -  containerRect.left;
        y = event.touches[0].clientY - offsetYImg - containerRect.top;

        
        ImagePreview.style.top = `${y}px`;
        ImagePreview.style.left = `${x}px`;

        
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

    var calculoWidth = WidthimgOriginal * 0.1
    var calculoHeight = HeightimgOriginal * 0.1

    


    PreviewheightImg = parseInt(PreviewheightImg + calculoHeight)
    PreviewwidthImg = parseInt(PreviewwidthImg + calculoWidth)

    ImagePreview.style.width = PreviewwidthImg + 'px'
    ImagePreview.style.height = PreviewheightImg + 'px'


    scale =  Math.round((scale + 0.1) * 10) / 10


    imagemContainuarNaMesmaPosition('positivo', calculoWidth, calculoHeight)


 
}


function zoomout(){
    var calculoWidth = WidthimgOriginal * 0.1
    var calculoHeight = HeightimgOriginal * 0.1

    PreviewheightImg = parseInt(PreviewheightImg - calculoHeight)
    PreviewwidthImg = parseInt(PreviewwidthImg - calculoWidth)

    ImagePreview.style.width = PreviewwidthImg + 'px'
    ImagePreview.style.height = PreviewheightImg + 'px'


    scale =  Math.round((scale - 0.1) * 10) / 10


    imagemContainuarNaMesmaPosition('negativo', calculoWidth, calculoHeight)
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


ButtonExcluir.addEventListener('click', () => {
    ExisteIMG = false
    scale = 1
    
    PreviewheightImg = null;
    PreviewwidthImg = null;
    
    ImagePreview.style.width = null
    ImagePreview.style.height = null
    
    
    ImagePreview.src = ""
    inputfile.value = ""
    
    containerBranco.style.display = 'block'
    LabelbuttonAddImagem.style.display = 'flex'
    ContainerCapturaImage.style.display = 'none'

})

buttonResetar.addEventListener('click', () => {
    if(StatusExisteIMG == false){
        MensagemDeErro.innerText = 'adicione uma imagem'
    }
    else{
        
        centralizarImagem();

        ImagePreview.style.width = WidthimgOriginal + 'px'
        ImagePreview.style.height = HeightimgOriginal + 'px'

        ZoomAplicado = 0

        PreviewwidthImg = WidthimgOriginal
        PreviewheightImg = HeightimgOriginal

        scale = 1


    }
})

buttonCortar.addEventListener('click', (e) => {
    console.log('slave karaio')
    VerificarScala()


    if(ExisteIMG == false){
        MensagemDeErro.innerText = 'Erro: Adicione uma imagem' 
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
            
            console.log('Imagem recortada:', file); 

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
        MensagemDeErro.innerText = 'Erro: fora de scala' 
    }


});





function centralizarImagem(){

    ImagePreview.style.top = (ContainerExibicao.clientHeight - PreviewheightImg) / 2 + 'px'
    ImagePreview.style.left = (ContainerExibicao.clientWidth - PreviewwidthImg) / 2 + 'px'

    
}

