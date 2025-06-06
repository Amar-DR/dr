document.addEventListener('DOMContentLoaded', function() {
    // Tahun sekarang untuk footer
    const currentYearElem = document.getElementById('currentYear');
    if (currentYearElem) {
        currentYearElem.textContent = new Date().getFullYear();
    }

    // Toggle menu mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
        });
    }

    // Smooth scroll untuk link navigasi (opsional, html scroll-behavior sudah cukup)
    // Jika ingin kontrol lebih atau animasi scroll, bisa gunakan library atau custom script
    // document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    //     anchor.addEventListener('click', function (e) {
    //         e.preventDefault();
    //         if (document.querySelector(this.getAttribute('href'))) {
    //             document.querySelector(this.getAttribute('href')).scrollIntoView({
    //                 behavior: 'smooth'
    //             });
    //         }
    //         // Tutup menu mobile jika terbuka setelah klik link
    //         if (mainNav.classList.contains('active')) {
    //             mainNav.classList.remove('active');
    //         }
    //     });
    // });

    // Active link highlighting on scroll (Contoh sederhana)
    const sections = document.querySelectorAll('section[id]');
    const navLi = document.querySelectorAll('.main-nav ul li a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 100) { // -100 untuk offset header
                current = section.getAttribute('id');
            }
        });

        navLi.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').substring(1) === current) {
                a.classList.add('active');
            }
        });
    });

});