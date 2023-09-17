const buttonAtualizar = document.getElementById('button-atualizar')

const buttonZoom = document.getElementById('button-Zoom')
const buttonZoomOut = document.getElementById('button-Zoom-out')
const buttonCortar = document.getElementById('button-cortar')
const buttonResetar = document.getElementById('button-resetar')
const ButtonExcluir = document.getElementById('button-excluir')
const ContainerExibicao = document.getElementById('container-de-exibicao')
const cropper = document.getElementById('container-de-captura')
const buttonCortarNovaImagem = document.getElementById('button-cortar-nov-imagem')
var MensagemDeErro = document.getElementById('mensagem-de-erro')
// 
var inputfile = document.getElementById('input-file')
// 
var ImagePreview = document.getElementById('img-preview')
var isDraggimg = false;
var offsetXImg = 0;
var offsetYImg = 0;
// 
var x = 0;
var y = 0;
// 
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
var StatusExisteIMG = false
var imagemCortada = false
// 
const inputWidthCorte = document.getElementById('input-width-d-corte')  
const inputHeightCorte = document.getElementById('input-height-d-corte') 
// 
ContainerExibicao.style.width = `${WidthExibicao}px`
ContainerExibicao.style.height = `${HeightExibicao}px`
// 
cropper.style.width = `${WidthCorte}px`
cropper.style.height = `${HeightCorte}px`
// 
const mediaQuery = window.matchMedia('(max-width: 750px)');

function handleMediaChange(mediaQuery){
if (mediaQuery.matches) {
    
    ContainerExibicao.style.width = '300px'
    ContainerExibicao.style.height = '300px'

    WidthExibicao = 300
    HeightExibicao = 300

    cropper.style.width = `200px`
    cropper.style.height = `200px`

    document.getElementById('input-width-d-corte').value = '200'
    document.getElementById('input-height-d-corte').value = '200'

    WidthCorte = 200
    HeightCorte = 200
} 
else{
    ContainerExibicao.style.width = '600px'
    ContainerExibicao.style.height = '300px'

    WidthExibicao = 600
    HeightExibicao = 300
    
    
    cropper.style.width = `200px`
    cropper.style.height = `200px`
    
    document.getElementById('input-width-d-corte').value = '200'
    document.getElementById('input-height-d-corte').value = '200'
    
    WidthCorte = 200
    HeightCorte = 200

}

}

mediaQuery.addListener(handleMediaChange);
handleMediaChange(mediaQuery);


inputWidthCorte.addEventListener('change', () => {
AtualizarDimensao()
})

inputHeightCorte.addEventListener('change', () => {
AtualizarDimensao()

})

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
            
            var calculoY = (HeightExibicao - PreviewheightImg) / 2
            var calculoX = (WidthExibicao - PreviewwidthImg) / 2

            ImagePreview.style.top =  calculoY + 'px'
            ImagePreview.style.left = calculoX + 'px'

            ImagePreview.style.width = PreviewwidthImg + 'px'
            ImagePreview.style.height = PreviewheightImg + 'px'

            // Definindo o numero para quando for da zom
            ZoomAplicadoWidth = (PreviewwidthImg * 10) / 100
            ZoomAplicadoHeight = (PreviewheightImg * 10) / 100


            StatusExisteIMG = true
            MensagemDeErro.innerText = ''
            EsconderOuExibirCSS();

        
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
// 
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
// 
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
        var YpositivoLimit = (HeightExibicao /2) - HeightCorte/2
        var XpositivoLimit = (WidthExibicao /2) - WidthCorte/2


        // calculando limite eixo y - x negativos
        var YnegativoLimit = (-PreviewheightImg + YpositivoLimit) + parseInt(HeightCorte);
        var XnegativoLimit = (-PreviewwidthImg + XpositivoLimit) + parseInt(WidthCorte);

        var ScalaY = false
        var ScalaX = false


        var Yposition = ImagePreview.style.top.replace('px', "")
        var Xposition = ImagePreview.style.left.replace('px', "")

        // 
        // 
        

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
var ValueInputWidthCorte = parseInt(document.getElementById('input-width-d-corte').value)
var ValueInputHeightCorte = parseInt(document.getElementById('input-height-d-corte').value)


if(ValueInputWidthCorte < WidthExibicao && ValueInputHeightCorte < HeightExibicao){
    WidthCorte = document.getElementById('input-width-d-corte').value
    HeightCorte = document.getElementById('input-height-d-corte').value
    // 
    const ContainerExibicao = document.getElementById('container-de-exibicao')
    const ContainerCorte = document.getElementById('container-de-captura')
    // 
    ContainerCorte.style.width = `${WidthCorte}px` 
    ContainerCorte.style.height = `${HeightCorte}px`
}
else{
    MensagemDeErro.innerText = 'o tamanho da area de corte não pode ser maior que a area de exibição'

    document.getElementById('input-width-d-corte').value = WidthCorte
    document.getElementById('input-height-d-corte').value = HeightCorte
}



    
}

buttonZoom.addEventListener('click', () => {
if(StatusExisteIMG == false){
    MensagemDeErro.innerText = 'Erro: Adicione uma imagem' 
}
else if(ZoomAplicado < ZoomMaximo){
    var calcularZoom = scale + AplicarZom
    scale = calcularZoom
    
    ImagePreview.style.width = PreviewwidthImg + ZoomAplicadoWidth + 'px'
    ImagePreview.style.height = PreviewheightImg + ZoomAplicadoHeight + 'px'
    
    PreviewwidthImg = PreviewwidthImg + ZoomAplicadoWidth
    PreviewheightImg = PreviewheightImg + ZoomAplicadoHeight

    ZoomAplicado++
}

    
})

buttonZoomOut.addEventListener('click', () => {
if(StatusExisteIMG == false){
    MensagemDeErro.innerText = 'Erro: Adicione uma imagem' 
}
else if(ZoomAplicado > ZoomOutMinimo){
    var calcularZoom = scale - AplicarZom
    scale = calcularZoom

    ImagePreview.style.width = PreviewwidthImg - ZoomAplicadoWidth + 'px'
    ImagePreview.style.height = PreviewheightImg - ZoomAplicadoHeight + 'px'

    PreviewwidthImg = PreviewwidthImg - ZoomAplicadoWidth
    PreviewheightImg = PreviewheightImg - ZoomAplicadoHeight

    ZoomAplicado--

}
    
})


buttonCortar.addEventListener('click', (e) => {
    VerificarScala()


    if(StatusExisteIMG == false){
        MensagemDeErro.innerText = 'Erro: Adicione uma imagem' 
    }
    else if(StatusScala == true){

        const containerRect = document.querySelector('.container-de-exibicao').getBoundingClientRect();
        const cropperRect = cropper.getBoundingClientRect();
        const canvas = document.createElement('canvas');
        canvas.width = WidthCorte;
        canvas.height = HeightCorte;
        const ctx = canvas.getContext('2d');

        const imgRect = ImagePreview.getBoundingClientRect();

    
        const x = (cropperRect.left  - imgRect.left + ImagePreview.scrollLeft + (cropperRect.width - WidthCorte) / 2)/ scale ;
        const y = (cropperRect.top - imgRect.top + ImagePreview.scrollTop + (cropperRect.height - HeightCorte) / 2) / scale ;
        ctx.drawImage(ImagePreview, x, y, WidthCorte / scale, HeightCorte / scale, 0, 0, WidthCorte, HeightCorte);

        const resultContainer= document.getElementById('container-image')
        resultContainer.innerHTML = ""
        resultContainer.style.height = HeightCorte + 'px'
        resultContainer.style.width = WidthCorte + 'px'
        resultContainer.appendChild(canvas);

        // Convertendo o canvas em um Blob usando fetch

        const originalFileExtension = inputfile.files[0].name.split('.').pop(); // Captura a extensão da imagem original
        const newFileName = `cropped_image.${originalFileExtension}`;

        var buttonBaixar = document.getElementById('button-baixar')

        canvas.toBlob((blob) => {
            var file = new File([blob], newFileName, { type: `image/${originalFileExtension}` });
            
            console.log('Imagem recortada:', file); 

            var Reader = new FileReader();

            Reader.onload = () =>{
                buttonBaixar.href = Reader.result
            }

            Reader.readAsDataURL(file)
        });

        imagemCortada = true
        MensagemDeErro.innerText = '' 
        EsconderOuExibirCSS();

    }
    else
    {
        MensagemDeErro.innerText = 'Erro: fora de scala' 
    }


});

buttonResetar.addEventListener('click', () => {
    if(StatusExisteIMG == false){
        MensagemDeErro.innerText = 'adicione uma imagem'
    }
    else{
        
        // centralizar imagem
        var calculoY = (HeightExibicao - HeightimgOriginal) / 2
        var calculoX = (WidthExibicao - WidthimgOriginal) / 2
        
        ImagePreview.style.top =  calculoY + 'px'
        ImagePreview.style.left = calculoX + 'px'

        ImagePreview.style.width = WidthimgOriginal + 'px'
        ImagePreview.style.height = HeightimgOriginal + 'px'

        ZoomAplicado = 0

        PreviewwidthImg = WidthimgOriginal
        PreviewheightImg = HeightimgOriginal

        scale = 1


    }
})

ButtonExcluir.addEventListener('click', () => {

    if(StatusExisteIMG == false){
        MensagemDeErro.innerText = 'adicione uma imagem'
    }
    else
    {
        ImagePreview.src = ""

        PreviewheightImg = null;
        PreviewwidthImg = null;

        ImagePreview.style.width = null
        ImagePreview.style.height = null
        inputfile.value = ""

        ZoomAplicado = 0
        scale = 1



        StatusExisteIMG = false
        EsconderOuExibirCSS()


    }
})

buttonCortarNovaImagem.addEventListener('click', () => {
ImagePreview.src = ""
PreviewheightImg = null;
PreviewwidthImg = null;
ImagePreview.style.width = null
ImagePreview.style.height = null
StatusExisteIMG = false
imagemCortada  = false
inputfile.value = ""
ZoomAplicado = 0
scale = 1




EsconderOuExibirCSS()   
})

function EsconderOuExibirCSS(){

var ContainerDimensao = document.getElementById('container-input-dimensão')
var LabelFile = document.getElementById('label-file')
var ContainerButton = document.getElementById('container-button')
var ContainerCorte = document.getElementById('container-corte')
var ContaineResultado = document.getElementById('container-resultado')


if(StatusExisteIMG == true){
    ContainerDimensao.style.display = 'block'
    LabelFile.style.display = 'none'
    ContainerButton.style.display = 'flex'
}
else{
    ContainerDimensao.style.display = 'none'
    LabelFile.style.display = 'flex'
    ContainerButton.style.display = 'none'
}

if(imagemCortada == true){
    ContainerCorte.style.display = 'none'
    ContaineResultado.style.display = 'flex'
}
else{
    ContainerCorte.style.display = 'flex'
    ContaineResultado.style.display = 'none'
}
}