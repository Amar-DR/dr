document.addEventListener('DOMContentLoaded', function() {
    // Script untuk menu mobile
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    // Memilih semua link di menu mobile DAN di navigasi header utama yang merujuk ke ID bagian
    const navLinks = document.querySelectorAll('#mobile-menu a[href^="#"], header nav a[href^="#"]');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            const expanded = mobileMenuButton.getAttribute('aria-expanded') === 'true' || false;
            mobileMenuButton.setAttribute('aria-expanded', !expanded);
            mobileMenu.classList.toggle('hidden');
            // Ganti ikon burger/close
            mobileMenuButton.querySelectorAll('svg').forEach(svg => svg.classList.toggle('hidden'));
        });

        // Tutup menu mobile setelah link diklik (jika menu mobile terbuka)
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenuButton.setAttribute('aria-expanded', 'false');
                    mobileMenu.classList.add('hidden');
                    // Pastikan ikon burger ditampilkan kembali
                    const svgs = mobileMenuButton.querySelectorAll('svg');
                    svgs[0].classList.remove('hidden'); // Burger icon
                    svgs[1].classList.add('hidden'); // Close icon
                }
            });
        });
    }

    // Set tahun saat ini di footer
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // Efek ketik untuk Hero Section
    const typingTextPlaceholder = document.getElementById('typing-text-placeholder');
    const roles = [
        "Pengembang Web Kreatif.",
        "Desainer UI/UX Inovatif.",
        "Pemecah Masalah Teknis.",
        "Pembelajar Sepanjang Hayat."
        // Tambahkan lebih banyak peran/tagline di sini
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let currentText = '';
    let isDeleting = false;

    function type() {
        if (!typingTextPlaceholder) return; // Keluar jika elemen tidak ditemukan

        const fullText = roles[roleIndex];
        if (isDeleting) {
            currentText = fullText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            currentText = fullText.substring(0, charIndex + 1);
            charIndex++;
        }

        // Tambahkan kursor yang berkedip menggunakan kelas CSS
        typingTextPlaceholder.innerHTML = `<span>${currentText}</span><span class="typing-cursor"></span>`;
        // Hapus cursor jika teks selesai diketik sebelum jeda
        if (!isDeleting && charIndex === fullText.length) {
            typingTextPlaceholder.innerHTML = `<span>${currentText}</span>`;
        }


        let typeSpeed = 150;
        if (isDeleting) {
            typeSpeed /= 2; // Lebih cepat saat menghapus
        }

        if (!isDeleting && charIndex === fullText.length) {
            typeSpeed = 2000; // Jeda sebelum mulai menghapus
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500; // Jeda sebelum mulai mengetik role baru
        }

        setTimeout(type, typeSpeed);
    }

    // Mulai efek ketik setelah halaman dimuat jika ada peran yang didefinisikan
    if (roles.length > 0 && typingTextPlaceholder) {
        setTimeout(type, 1000); // Jeda awal sebelum mulai mengetik
    }


    // Script untuk menandai link navigasi aktif berdasarkan section yang terlihat
    const sections = document.querySelectorAll('main section[id]');
    const headerNavLinksDesktop = document.querySelectorAll('header .hidden.md\\:block .nav-link'); // Hanya link di nav desktop
    const headerNavLinksMobile = document.querySelectorAll('#mobile-menu .nav-link'); // Hanya link di nav mobile

    function onScroll() {
        let currentSectionId = '';
        const headerHeight = document.querySelector('header') ? document.querySelector('header').offsetHeight : 80;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - (headerHeight + 40)) { // Tambah buffer sedikit
                currentSectionId = section.getAttribute('id');
            }
        });
        
        // Update links for desktop
        headerNavLinksDesktop.forEach(link => {
            link.classList.remove('nav-link-active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('nav-link-active');
            }
        });

        // Update links for mobile
        headerNavLinksMobile.forEach(link => {
            link.classList.remove('nav-link-active'); // Asumsi style aktif mobile sama atau dikelola terpisah
             if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('nav-link-active');
            }
        });
    }

    window.addEventListener('scroll', onScroll);
    onScroll(); // Panggil sekali saat load untuk menandai link beranda/hero
});