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
        textElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        textElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = delayBetweenTexts;
        isDeleting = true;
    } 
    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex++;
        if (textIndex === texts.length) {
            textIndex = 0;
        }
    }

    setTimeout(type, typeSpeed);
}

document.addEventListener('DOMContentLoaded', type);