document.addEventListener('DOMContentLoaded', () => {
    // Utility for Counter Animations
    const animateValue = (id, start, end, duration) => {
        const obj = document.getElementById(id);
        if (!obj) return;
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerText = Math.floor(progress * (end - start) + start).toLocaleString();
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    // Load initial stats if elements exist
    if (document.getElementById('stat-sponsors')) {
        animateValue('stat-sponsors', 0, 11, 1500);
    }
});
