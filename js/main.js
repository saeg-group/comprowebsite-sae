/* ==========================================================================
   SAE AQIQAH - MAIN JAVASCRIPT (BOILERPLATE)
   Features: Navigation toggle, smooth scrolling, scroll active indicator
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileNavToggle && navMenu) {
        mobileNavToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileNavToggle.querySelector('i');
            if (icon) {
                if (navMenu.classList.contains('active')) {
                    icon.className = 'fa-solid fa-xmark';
                } else {
                    icon.className = 'fa-solid fa-bars';
                }
            }
        });
    }

    // 2. Active Link Highlight on Scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.pageYOffset + 150; // Offset for header

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // 3. Gallery Carousel Slider (Autoslide, Manual Slide, 3D Center Focus, Progress Bar, Context Card)
    const slider = document.getElementById('gallerySlider');
    const prevBtn = document.getElementById('sliderPrevBtn');
    const nextBtn = document.getElementById('sliderNextBtn');
    const indicatorsContainer = document.getElementById('sliderIndicators');
    const progressBar = document.getElementById('sliderProgressBar');
    
    // Stories for contextual descriptions
    const stories = [
        { title: "Profil Utama SAE Aqiqah", desc: "Transformasi modern 20 tahun dedikasi melayani umat dengan standar kualitas syar'i terbaik di Malang Raya." },
        { title: "Layanan Qurban Syar'i", desc: "Menjamin ketersediaan kambing dan domba qurban yang cukup umur (poel), sehat, dan 100% sesuai syariat." },
        { title: "Cita Rasa Katering Premium", desc: "Sajian bintang lima dari olahan daging segar pilihan, dimasak higienis dan berkelas bintang lima." },
        { title: "Nilai Utama & Sejarah Kami", desc: "Berprinsip kokoh pada asas Syar'i, Amanah, dan Excellent untuk ibadah aqiqah keluarga Anda." },
        { title: "Fasilitas Kandang Mandiri", desc: "Peternakan mandiri kami yang terintegrasi dari hulu ke hilir, menjamin transparansi proses 100%." },
        { title: "Domba Qurban Pilihan", desc: "Seleksi domba-domba sehat berbobot optimal yang dirawat dengan dedikasi tinggi sepanjang tahun." },
        { title: "Kambing Kualitas Premium", desc: "Penyaringan ketat untuk hewan aqiqah berdasarkan kriteria fisik prima dan kesehatan tanpa kompromi." },
        { title: "Pemeliharaan & Pakan Sehat", desc: "Pemberian pakan bernutrisi tinggi secara berkala di kandang mandiri demi menjaga kualitas mutu daging." },
        { title: "Pilihan Paket Aqiqah Lengkap", desc: "Paket katering praktis dikemas menggunakan boks doff hitam eksklusif untuk kemudahan distribusi Anda." },
        { title: "Ibadah Aqiqah Premium", desc: "Menghadirkan ketenangan hati ibadah aqiqah putra-putri tercinta lewat pengawasan profesional." }
    ];

    if (slider) {
        const slides = slider.querySelectorAll('.gallery-slide');
        const totalSlides = slides.length;
        let currentIndex = 0;
        let progressInterval;
        let progressElapsed = 0;
        const progressDuration = 3500; // 3.5 seconds auto-slide duration

        // Generate dots indicators
        function generateIndicators() {
            indicatorsContainer.innerHTML = '';
            for (let i = 0; i < totalSlides; i++) {
                const dot = document.createElement('button');
                dot.classList.add('indicator-dot');
                if (i === currentIndex) dot.classList.add('active');
                dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
                dot.addEventListener('click', () => {
                    goToSlide(i);
                });
                indicatorsContainer.appendChild(dot);
            }
        }

        function updateSliderPosition() {
            if (currentIndex < 0) currentIndex = 0;
            if (currentIndex > totalSlides - 1) currentIndex = totalSlides - 1;

            const containerWidth = slider.parentElement.offsetWidth;
            const slideWidth = slides[0].offsetWidth || 450;
            const gap = 20; // 20px CSS gap

            // Mathematically center active slide
            const amountToMove = (containerWidth - slideWidth) / 2 - currentIndex * (slideWidth + gap);
            slider.style.transform = `translateX(${amountToMove}px)`;

            // Update classes for 3D visual hierarchy (active scale 1.08, side scales 0.92, other scale 0.85)
            slides.forEach((slide, index) => {
                slide.classList.remove('active', 'prev-slide', 'next-slide');
                if (index === currentIndex) {
                    slide.classList.add('active');
                } else if (index === currentIndex - 1) {
                    slide.classList.add('prev-slide');
                } else if (index === currentIndex + 1) {
                    slide.classList.add('next-slide');
                }
            });

            // Update Context Card description
            const card = document.getElementById('sliderContextCard');
            const cardTitle = document.getElementById('contextCardTitle');
            const cardDesc = document.getElementById('contextCardDesc');

            if (card && cardTitle && cardDesc) {
                card.style.opacity = '0';
                card.style.transform = 'translateY(8px)';
                setTimeout(() => {
                    cardTitle.textContent = stories[currentIndex].title;
                    cardDesc.textContent = stories[currentIndex].desc;
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 200);
            }

            // Update indicators dots active state
            const dots = indicatorsContainer.querySelectorAll('.indicator-dot');
            dots.forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }

        function goToSlide(index) {
            currentIndex = index;
            updateSliderPosition();
            startProgress(); // Reset progress bar animation
        }

        function nextSlide() {
            if (currentIndex >= totalSlides - 1) {
                currentIndex = 0; // wrap to first slide
            } else {
                currentIndex++;
            }
            goToSlide(currentIndex);
        }

        function prevSlide() {
            if (currentIndex <= 0) {
                currentIndex = totalSlides - 1; // wrap to last slide
            } else {
                currentIndex--;
            }
            goToSlide(currentIndex);
        }

        // Click event listeners
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
            });
        }

        // Swipe event listeners for touch devices
        let touchStartX = 0;
        let touchEndX = 0;
        let isSwiping = false;

        slider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            isSwiping = true;
            stopProgress();
        }, { passive: true });

        slider.addEventListener('touchend', (e) => {
            if (!isSwiping) return;
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            isSwiping = false;
            startProgress();
        }, { passive: true });

        function handleSwipe() {
            const swipeThreshold = 50; // min distance to trigger swipe
            const diffX = touchStartX - touchEndX;
            if (Math.abs(diffX) > swipeThreshold) {
                if (diffX > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
        }

        // Progress Bar & Auto-change tick loop
        function startProgress() {
            progressElapsed = 0;
            if (progressBar) progressBar.style.width = '0%';
            clearInterval(progressInterval);

            const tickTime = 30; // 30ms interval
            progressInterval = setInterval(() => {
                progressElapsed += tickTime;
                let percent = (progressElapsed / progressDuration) * 100;
                if (percent > 100) percent = 100;
                if (progressBar) progressBar.style.width = `${percent}%`;

                if (progressElapsed >= progressDuration) {
                    nextSlide();
                }
            }, tickTime);
        }

        function stopProgress() {
            clearInterval(progressInterval);
        }

        // Pause auto-slide on hover
        const wrapper = document.querySelector('.gallery-slider-wrapper');
        if (wrapper) {
            wrapper.addEventListener('mouseenter', () => {
                stopProgress();
            });
            wrapper.addEventListener('mouseleave', () => {
                // Resume tick progress
                progressInterval = setInterval(() => {
                    progressElapsed += 30;
                    let percent = (progressElapsed / progressDuration) * 100;
                    if (percent > 100) percent = 100;
                    if (progressBar) progressBar.style.width = `${percent}%`;

                    if (progressElapsed >= progressDuration) {
                        nextSlide();
                    }
                }, 30);
            });
        }

        // Initialize Slider
        generateIndicators();
        // Wait a slight delay for layouts to paint before centering position calculation
        setTimeout(() => {
            updateSliderPosition();
            startProgress();
        }, 150);

        // Recenter slide position dynamically on resize
        window.addEventListener('resize', () => {
            updateSliderPosition();
        });
    }
});
