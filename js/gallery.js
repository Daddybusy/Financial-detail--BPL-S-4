document.addEventListener('DOMContentLoaded', () => {
    fetch('data/gallery.json')
        .then(res => res.json())
        .then(data => {
            const grid = document.getElementById('gallery-grid');
            if (!grid) return;

            grid.innerHTML = data.map(item => `
                <div class="gallery-item glass-card" onclick="openLightbox('${item.image}', '${item.caption}')">
                    <img src="${item.image}" alt="${item.title}" class="gallery-img" onerror="this.src='https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600&auto=format&fit=crop&q=60'">
                    <div class="gallery-overlay">
                        <div>
                            <h4>${item.title}</h4>
                            <p class="small-text">${item.caption}</p>
                        </div>
                    </div>
                </div>
            `).join('');
        });

    const lightbox = document.getElementById('lightbox');
    const closeBtn = document.getElementById('lightbox-close');

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });
    }
});

function openLightbox(src, caption) {
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    const cap = document.getElementById('lightbox-caption');
    
    img.src = src;
    cap.innerText = caption;
    lightbox.style.display = 'flex';
}
