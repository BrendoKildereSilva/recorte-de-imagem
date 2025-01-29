import { ImagePreview } from '../../index'

let initialDistance = null;
var isDraggimg = false;
var offsetXImg = 0;
var offsetYImg = 0;
var x = 0;
var y = 0;


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




    if (isDraggimg) {
        const containerRect = document.querySelector('.area_de_trabalho').getBoundingClientRect();
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