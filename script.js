// Cargar comentarios almacenados en localStorage
window.onload = function() {
    cargarComentarios();
};

// Función para guardar un comentario
document.getElementById('comentario-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const comentarioTexto = document.getElementById('comentario-texto').value;
    if (comentarioTexto.trim() !== '') {
        const comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];
        comentarios.push(comentarioTexto);
        localStorage.setItem('comentarios', JSON.stringify(comentarios));
        document.getElementById('comentario-texto').value = ''; // Limpiar textarea
        cargarComentarios();
    }
});

// Función para cargar los comentarios desde localStorage
function cargarComentarios() {
    const comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];
    const comentariosLista = document.getElementById('comentarios-lista');
    comentariosLista.innerHTML = ''; // Limpiar lista actual
    comentarios.forEach(function(comentario, index) {
        const comentarioDiv = document.createElement('div');
        comentarioDiv.classList.add('comentario');
        comentarioDiv.innerHTML = `<p>${comentario}</p>`;
        comentariosLista.appendChild(comentarioDiv);
    });
}


// Obtención de elementos HTML
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-bar');
const audio = document.getElementById('audio');
const songTitle = document.getElementById('song-title');

// Cambiar el título de la canción
const songs = [
    { title: "Fix You", src: "@coldplay - Fix You (Lyrics).mp3" },
    { title: "Yellow", src: "/@coldplay - Yellow (Lyrics).mp3" },
    { title: "We never change", src: "Coldplay - We Never l.mp3" },
    { title: "Magic", src: "Coldplay - Magic (Official Audio).mp3" },
    { title: "Sparks", src: "Coldplay - Sparks .mp3" },
    { title: "Paradise", src: "Coldplay - Paradise (Official Video).mp3" },
    { title: "Hymn For The Weekend", src: "Coldplay - Hymn For The Weekend (Official Video).mp3" },
    { title: "Always in My head", src: "Always in My Head.mp3" },
    { title: "Politik", src: Coldplay - Politik .mp3" },
    { title: "Viva la Vida", src: "viva la vida.mp3" },

];

let currentSongIndex = 0;

function loadSong(songIndex) {
    const song = songs[songIndex];
    songTitle.textContent = `Coldplay - ${song.title}`;
    audio.src = song.src;
    audio.load(); // Recargar el audio con la nueva fuente
}

// Reproducir o pausar la canción
function togglePlayPause() {
    if (audio.paused) {
        audio.play();
        playBtn.innerHTML = '&#10074;&#10074;'; // Cambio a icono de pausa
    } else {
        audio.pause();
        playBtn.innerHTML = '&#9654;'; // Cambio a icono de play
    }
}

// Avanzar a la siguiente canción
function nextTrack() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    audio.play();
}

// Retroceder a la canción anterior
function prevTrack() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    audio.play();
}

// Actualizar la barra de progreso
audio.addEventListener('timeupdate', () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;
});

// Manejar los eventos del reproductor
playBtn.addEventListener('click', togglePlayPause);
prevBtn.addEventListener('click', prevTrack);
nextBtn.addEventListener('click', nextTrack);

// Actualizar la posición de la canción al mover la barra de progreso
progressBar.addEventListener('input', (e) => {
    const progress = e.target.value;
    audio.currentTime = (audio.duration / 100) * progress;
});

// Cargar la primera canción al inicio
loadSong(currentSongIndex);

