function switchTab(hash) {
    const tab = hash.replace('#', '') || 'home';

    document.querySelectorAll('.nav-links a').forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === hash);
    });

    document.querySelectorAll('.tab-content').forEach(el => {
        el.classList.toggle('active', el.id === tab);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    if (location.hash) {
        switchTab(location.hash);
    }

    document.querySelectorAll('.nav-links a').forEach(a => {
        a.addEventListener('click', e => {
            e.preventDefault();
            const hash = a.getAttribute('href');
            history.pushState(null, '', hash);
            switchTab(hash);
        });
    });

    window.addEventListener('popstate', () => {
        switchTab(location.hash || '#home');
    });
});
