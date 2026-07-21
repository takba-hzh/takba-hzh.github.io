document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.nav-links a');
    const current = location.pathname.split('/').pop() || 'index.html';

    links.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === current);
    });
});
