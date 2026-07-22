let currentPostId = null;

function switchTab(hash) {
    const tab = hash.replace('#', '') || 'home';

    document.querySelectorAll('.nav-links a').forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === hash);
    });

    document.querySelectorAll('.tab-content').forEach(el => {
        el.classList.toggle('active', el.id === tab);
    });

    if (tab === 'blog') {
        renderBlogList();
    }
}

function renderBlogList() {
    const list = document.getElementById('post-list');
    list.innerHTML = '';
    document.getElementById('blog-list').style.display = 'block';
    document.getElementById('blog-post').style.display = 'none';

    posts.forEach(post => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="date">${post.date}</div>
            <h3><a href="#" class="post-link" data-id="${post.id}">${post.title}</a></h3>
        `;
        list.appendChild(li);
    });

    document.querySelectorAll('.post-link').forEach(a => {
        a.addEventListener('click', e => {
            e.preventDefault();
            showPost(a.dataset.id);
        });
    });
}

function showPost(id) {
    const post = posts.find(p => p.id === id);
    if (!post) return;

    currentPostId = id;
    document.getElementById('blog-list').style.display = 'none';
    document.getElementById('blog-post').style.display = 'block';
    document.getElementById('post-title').textContent = post.title;
    document.getElementById('post-date').textContent = post.date;
    document.getElementById('post-content').innerHTML = marked.parse(post.content);

    loadComments(id);
}

function loadComments(postId) {
    const container = document.getElementById('comments');
    container.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://utteranc.es/client.js';
    script.setAttribute('repo', 'takba-hzh/takba-hzh.github.io');
    script.setAttribute('issue-term', 'pathname');
    script.setAttribute('theme', 'github-light');
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;
    container.appendChild(script);
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

    document.getElementById('back-to-blog').addEventListener('click', e => {
        e.preventDefault();
        history.pushState(null, '', '#blog');
        renderBlogList();
    });
});
