import { ImagePreview } from '../../../index.js';
import { Zoom } from './zoom.js';
import { zoomout } from './zoomout.js';

let initialDistance = null;
const minChange = 5; // Ajuste isso conforme necessário

// Função para calcular a distância entre dois pontos de toque
function getDistance(touches) {
    const [touch1, touch2] = touches;
    const dx = touch2.pageX - touch1.pageX;
    const dy = touch2.pageY - touch1.pageY;
    return Math.sqrt(dx * dx + dy * dy);
}

// Detectando o toque inicial (dois dedos)
ImagePreview.addEventListener('touchstart', (event) => {
    if (event.touches.length === 2) {
        initialDistance = getDistance(event.touches); // Armazenar a distância inicial
    }
});

// Detectando o movimento dos dedos
ImagePreview.addEventListener('touchmove', (event) => {
    if (event.touches.length === 2 && initialDistance !== null) {
        const currentDistance = getDistance(event.touches);
        const distanceChange = currentDistance - initialDistance;

        if (Math.abs(distanceChange) > minChange) { // Verifica se a mudança foi significativa
            if (distanceChange > 0) {
                Zoom(); // Se a distância aumentar, dá zoom
            } else {
                zoomout(); // Se a distância diminuir, dá zoom out
            }
            initialDistance = currentDistance; // Atualiza a distância inicial
        }
    }
});

// Quando o toque termina, resetar a distância
ImagePreview.addEventListener('touchend', () => {
    initialDistance = null; // Reseta a distância quando o toque acaba
});
