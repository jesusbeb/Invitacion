
// Referencias a Elementos del DOM
const weddingMusic = document.getElementById('weddingMusic');
const envelopeScreen = document.getElementById('envelopeScreen');
const mainInvitation = document.getElementById('mainInvitation');
const waxSeal = document.getElementById('waxSeal');
const envelopeFlap = document.getElementById('envelopeFlap');
const musicToggleBtn = document.getElementById('musicToggleBtn');
const playIcon = document.getElementById('playIcon');
const pauseIcon = document.getElementById('pauseIcon');
const musicProgressBar = document.getElementById('musicProgressBar');
const musicTime = document.getElementById('musicTime');
const invitationContainer = document.getElementById('invitationContainer');
const envelopeLetter = document.getElementById('envelopeLetter');


// TEMPORIZADOR EN TIEMPO REAL (Establecido para el 19 de septiembre de 2026)
// Formato ISO estándar para asegurar compatibilidad total en móviles (iOS y Android)
const targetDate = new Date('2026-09-19T16:00:00').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    // Si la fecha ya pasó o hay un error, dejamos todo en ceros de forma segura
    if (isNaN(difference) || difference < 0) {
        document.getElementById('days').innerText = "00";
        document.getElementById('hours').innerText = "00";
        document.getElementById('minutes').innerText = "00";
        document.getElementById('seconds').innerText = "00";
        return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    // Actualizamos el DOM asegurándonos de que los IDs existan
    if (document.getElementById('days')) document.getElementById('days').innerText = days.toString().padStart(2, '0');
    if (document.getElementById('hours')) document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
    if (document.getElementById('minutes')) document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
    if (document.getElementById('seconds')) document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');
}

// Iniciar el temporizador instantáneamente y actualizar cada segundo
updateCountdown();
setInterval(updateCountdown, 1000);


// Función de apertura interactiva del sobre con transición animada exacta al video
function openInvitation() {

    // Auto-reproducción de la música
    playMusic();

    // 1. Activar rotación y efecto roto del lacre
    waxSeal.classList.add('seal-active');
    
    // 2. Retrasar apertura de solapa
    setTimeout(() => {
        envelopeFlap.classList.add('flap-active');
    }, 400);

    // 3. Hacer que la carta salga deslizándose del sobre
    setTimeout(() => {
        if (envelopeLetter) {
            envelopeLetter.classList.remove('translate-y-0', 'opacity-0');
            envelopeLetter.classList.add('-translate-y-24', 'opacity-100');
        }
    }, 900); 

    // 4. Transición fluida al contenido de la invitación
    setTimeout(() => {
        // Iniciamos el desvanecimiento suave del sobre (tardará 3 segundos)
        envelopeScreen.classList.add('opacity-0');
        
        // Habilitamos la estructura de la invitación (aún invisible)
        mainInvitation.classList.remove('hidden');
        
        // Pequeño delay para que el navegador procese el cambio de 'hidden' a visible
        setTimeout(() => {
            mainInvitation.classList.add('opacity-100');
        }, 50);

        // >>> EL TRUCO CLAVE: 
        // Esperamos exactamente los 3 segundos (3000ms) de la transición antes de liberar el scroll
        setTimeout(() => {
            // Ocultamos el sobre por completo del flujo de la página
            envelopeScreen.classList.add('hidden');
            
            // Liberamos el contenedor para permitir el scroll natural SIN saltos bruscos
            invitationContainer.classList.remove('h-screen', 'overflow-hidden');
            invitationContainer.classList.add('min-h-screen', 'h-auto');
        }, 3000); // Coincide exactamente con el duration-[3000ms] del HTML


        
    }, 2000); // Tiempo que se queda la carta arriba antes de iniciar el cambio
}




// Intento de reproducción de música
function playMusic() {
    // Buscamos el elemento de forma segura dentro de la función
    const audio = document.getElementById('weddingMusic');
    
    // Si por alguna razón no existe, salimos pacíficamente sin romper el código
    if (!audio) return;

    audio.play().then(() => {
        const pIcon = document.getElementById('playIcon');
        const paIcon = document.getElementById('pauseIcon');
        
        if (pIcon) pIcon.classList.add('hidden');
        if (paIcon) paIcon.classList.remove('hidden');
    }).catch(error => {
        console.log("Interacción requerida: " + error);
    });
}

// Interruptor de reproducción / pausa de música
function toggleMusic() {
    const audio = document.getElementById('weddingMusic');
    if (!audio) return;

    const pIcon = document.getElementById('playIcon');
    const paIcon = document.getElementById('pauseIcon');

    if (audio.paused) {
        audio.play();
        if (pIcon) pIcon.classList.add('hidden');
        if (paIcon) paIcon.classList.remove('hidden');
    } else {
        audio.pause();
        if (pIcon) pIcon.classList.remove('hidden');
        if (paIcon) paIcon.classList.add('hidden');
    }
}

// Actualizar la barra de progreso y tiempos de la música
weddingMusic.addEventListener('timeupdate', () => {
    const current = weddingMusic.currentTime;
    const duration = weddingMusic.duration || 150; // Fallback a 150s
    const pct = (current / duration) * 100;
    musicProgressBar.style.width = `${pct}%`;

    // Formateador de minutos y segundos
    const curMin = Math.floor(current / 60);
    const curSec = Math.floor(current % 60).toString().padStart(2, '0');
    const durMin = Math.floor(duration / 60);
    const durSec = Math.floor(duration % 60).toString().padStart(2, '0');

    musicTime.textContent = `${curMin}:${curSec} / ${durMin}:${durSec}`;
});



// Controladores del Modal de Ubicación
function showMapModal() {
    const modal = document.getElementById('mapModal');
    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.remove('opacity-0');
    }, 10);
}

function closeMapModal() {
    const modal = document.getElementById('mapModal');
    modal.classList.add('opacity-0');
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}

// Controladores del Modal de Mesa de Regalos
function openGiftRegistry() {
    const modal = document.getElementById('giftModal');
    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.remove('opacity-0');
    }, 10);
}

function closeGiftModal() {
    const modal = document.getElementById('giftModal');
    modal.classList.add('opacity-0');
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}

// Sistema de Notificación Integrado (Toast)
function showToast(message) {
    const toast = document.getElementById('toastNotification');
    toast.innerText = message;
    toast.classList.remove('hidden');
    setTimeout(() => {
        toast.classList.remove('opacity-0');
        toast.classList.add('opacity-100');
    }, 10);

    setTimeout(() => {
        toast.classList.remove('opacity-100');
        toast.classList.add('opacity-0');
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 300);
    }, 2500);
}

// Simulación elegante de redirección a Google Maps
function simulateGoogleMapsRedirect() {
    closeMapModal();
    showToast("Redirigiendo a Lerdo de Tejada en Google Maps...");
    setTimeout(() => {
        window.open("https://maps.app.goo.gl/fK6J9YQ5FAt1N6kn9", "_blank");
    }, 1200);
}

// Simulación elegante de redirección a Mesa de Regalos
function simulateRegistryRedirect() {
    closeGiftModal();
    showToast("Redirigiendo a la Mesa de Regalos de Leydi & Jesús...");
    setTimeout(() => {
        window.open("https://www.amazon.com.mx/wedding/share/NuestraBodaLeydiJesus", "_blank");
    }, 1200);
}


// Disponibilidad del boton Subir Fotos durante la fecha indicada
// Enero es 0, Septiembre es 8, Diciembre es 11.
const fechaInicioFotos = new Date(2026, 6, 21, 2, 0);  // 2026, 8, 19, 16, 0  -  19 de Septiembre a las 4:00 PM
const fechaFinFotos    = new Date(2026, 6, 21, 6, 59);  // 2026, 8, 22, 23, 59 -  22 de Septiembre a las 11:59 PM
const ahora = new Date();
const btnFotos = document.getElementById('btnSubirFotos');

if (btnFotos) {
    if (ahora < fechaInicioFotos) {
        // ESTADO 1: Aún no empieza el evento
        btnFotos.textContent = 'DISPONIBLE EL 19 DE SEPTIEMBRE';
        btnFotos.classList.add('opacity-50', 'pointer-events-none');
        // Mantiene las clases de bloqueo por defecto
    } 
    else if (ahora >= fechaInicioFotos && ahora <= fechaFinFotos) {
        // ESTADO 2: Ventana de tiempo activa (El evento está ocurriendo o acaba de terminar)
        btnFotos.textContent = 'SUBIR FOTOS';
        btnFotos.classList.remove('opacity-50', 'pointer-events-none');

        // ¡La magia ocurre aquí! Inyectamos el enlace dinámicamente
        btnFotos.href = "https://script.google.com/macros/s/AKfycbxc3292z0tnU_CzChcn0m2UIT5MPTI3N2JYfJYcA77ddqlvwAPteTdjlpay8lVs3Hsz8A/exec";
    } 
    else {
        // ESTADO 3: Plazo vencido
        btnFotos.textContent = 'RECEPCIÓN DE FOTOS CERRADA';
        btnFotos.classList.add('opacity-50', 'pointer-events-none');
        btnFotos.removeAttribute('href'); // Por seguridad, si estaba puesto, lo removemos
    }
}