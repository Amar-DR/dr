// Array kata-kata yang ingin ditampilkan bergantian
const texts = [
    "Network Engineer",
    "IoT Enthusiast",
    "Tech Explorer",
    "PENS Student"
];

// Konfigurasi kecepatan (dalam milidetik)
const typingSpeed = 100; 
const deletingSpeed = 50; 
const delayBetweenTexts = 2000; // Jeda sebelum menghapus

const textElement = document.getElementById('typing-text');
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentText = texts[textIndex];

    if (isDeleting) {
        // Logika Menghapus
        textElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        // Logika Mengetik
        textElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    // Mengatur kecepatan dinamis
    let typeSpeed = isDeleting ? deletingSpeed : typingSpeed;

    // Jika kata selesai diketik
    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = delayBetweenTexts; // Tunggu sebentar sebelum menghapus
        isDeleting = true;
    } 
    // Jika kata selesai dihapus
    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex++; // Pindah ke kata berikutnya
        // Jika sudah di akhir array, kembali ke awal (looping)
        if (textIndex === texts.length) {
            textIndex = 0;
        }
    }

    // Jalankan fungsi ini lagi setelah waktu (typeSpeed)
    setTimeout(type, typeSpeed);
}

// Jalankan saat website selesai loading
document.addEventListener('DOMContentLoaded', type);