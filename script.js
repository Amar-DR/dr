// Ketikan efek untuk teks "amar.com"
const text = "amar.com";
let index = 0;
const typedTextElement = document.getElementById("typed-text");

function typeWriter() {
    if (index < text.length) {
        typedTextElement.innerHTML += text.charAt(index);
        index++;
        setTimeout(typeWriter, 200); // Kecepatan ketikan
    } else {
        setTimeout(showDashboard, 500); // Ganti ke dashboard setelah animasi selesai
    }
}

function showDashboard() {
    document.querySelector('.intro-screen').style.display = 'none';
    document.querySelector('.dashboard').style.display = 'block';
}

// Mulai ketikan saat halaman dimuat
window.onload = function() {
    typeWriter();
};
