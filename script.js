// Docker Deployment Demo - Interactive Elements

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe cards and features
    document.querySelectorAll('.card, .feature, .command-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Console greeting
    console.log('%cDocker Deployment Demo', 'color: #2496ED; font-size: 20px; font-weight: bold;');
    console.log('%cBu site Docker konteynerinde çalışıyor!', 'color: #22c55e; font-size: 14px;');

    const statusText = document.getElementById('backend-status');
    const statusDot = document.querySelector('.status-dot');

    if (statusText && statusDot) {
        fetch('/api/db')
            .then(response => response.json())
            .then(data => {
                if (!data.ok) {
                    throw new Error(data.message || 'Veritabanı kontrolü başarısız');
                }

                statusText.textContent = `Backend aktif - DB: ${data.database}`;
                statusDot.classList.add('online');
            })
            .catch(error => {
                statusText.textContent = `Backend aktif - DB bağlantısı yok`;
                statusDot.classList.add('warning');
                console.warn('DB kontrolü:', error.message);
            });
    }
});
