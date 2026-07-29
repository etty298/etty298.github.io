(function() {
    'use strict';

    // ===== 1. PROGRESS BAR =====
    const progressFill = document.getElementById('progressFill');
    window.addEventListener('scroll', function() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressFill.style.width = progress + '%';
    });

    // ===== 2. NAVBAR SCROLL =====
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ===== 3. STICKY CTA (mobile) =====
    const stickyCta = document.getElementById('stickyCta');
    let isStickyVisible = false;
    let stickyTimeout = null;

    const observerSticky = new IntersectionObserver(function(entries) {
        const heroSection = document.querySelector('#hero');
        const finalSection = document.querySelector('#final-cta');

        const heroVisible = entries.some(e => e.target === heroSection && e.isIntersecting);
        const finalVisible = entries.some(e => e.target === finalSection && e.isIntersecting);

        if (finalVisible) {
            stickyCta.classList.remove('visible');
            isStickyVisible = false;
            return;
        }

        if (!heroVisible && window.innerWidth <= 768) {
            stickyCta.classList.add('visible');
            isStickyVisible = true;
            clearTimeout(stickyTimeout);
        } else {
            stickyTimeout = setTimeout(function() {
                stickyCta.classList.remove('visible');
                isStickyVisible = false;
            }, 500);
        }
    }, { threshold: 0.1 });

    const heroEl = document.querySelector('#hero');
    const finalEl = document.querySelector('#final-cta');
    if (heroEl) observerSticky.observe(heroEl);
    if (finalEl) observerSticky.observe(finalEl);

    // ===== 4. REVEAL ON SCROLL (IntersectionObserver) =====
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(function(el) {
        revealObserver.observe(el);
    });


    // ===== 6. FAQ ACCORDION =====
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(function(item) {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            faqItems.forEach(function(other) {
                other.classList.remove('active');
            });
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // ===== 7. FORM SUBMISSION =====
    const form = document.getElementById('leadForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('nameInput').value.trim();
            const phone = document.getElementById('phoneInput').value.trim();

            if (!name || !phone) {
                alert('Пожалуйста, заполни все поля.');
                return;
            }

            // Имитация отправки
            const btn = form.querySelector('.btn');
            const originalText = btn.innerHTML;
            btn.innerHTML = '✅ Отправлено!';
            btn.disabled = true;
            btn.style.opacity = '0.7';

            setTimeout(function() {
                btn.innerHTML = originalText;
                btn.disabled = false;
                btn.style.opacity = '1';
                form.reset();
                alert('Спасибо! Мы свяжемся с тобой в ближайшее время.');
            }, 1500);

            // Здесь можно добавить реальную отправку на бэкенд
            console.log('Заявка:', { name, phone });
        });
    }

    // ===== 8. SMOOTH SCROLL for anchor links =====
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ===== 9. KEYBOARD ACCESSIBILITY =====
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            faqItems.forEach(function(item) {
                item.classList.remove('active');
            });
        }
    });

    // ===== 10. LOGO CLICK - scroll to top =====
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.style.cursor = 'pointer';
        logo.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

})();