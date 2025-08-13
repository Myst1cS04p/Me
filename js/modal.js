document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.portfolio-card');
    const modalOverlay = document.getElementById('project-modal-overlay');
    const modal = document.getElementById('project-modal');
    const title = modal.querySelector('.modal-title');
    const date = modal.querySelector('.modal-date');
    const desc = modal.querySelector('.modal-description');
    const cta = modal.querySelector('.modal-cta');
    const closeBtn = modal.querySelector('.modal-close');
    const glow = document.getElementById('portfolio-overlay-glow');
    const heading = document.querySelector('.portfolio-heading');
    const devlogBtn = modal.querySelector('.modal-devlog');

    // Helper to change glow color
    function updateGlow(color) {
        const rgba = hexToRgba(color, 0.25);
        glow.style.background = `radial-gradient(circle, ${rgba} 20%, transparent 70%)`;
        
    }

    function hexToRgba(hex, alpha = 1) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    function brightenColor(hex, amount = 0.7) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);

        const brighten = (c) => Math.round(c + (255 - c) * amount);

        return `rgb(${brighten(r)}, ${brighten(g)}, ${brighten(b)})`;
    }
    
    cards.forEach(card => {
        const color = getComputedStyle(card).getPropertyValue('--hover-color').trim();
        const brightTextColor = brightenColor(color);
        const brightModalColor = brightenColor(color);

        // Hover: Update section glow color
        card.addEventListener('mouseenter', () => {
            updateGlow(color);
            
            heading.style.color = brightTextColor;
            heading.style.textShadow = `0 0 10px ${color}`; // soft actual glow
        });
        
        
        // Click: Open modal and populate data
        card.addEventListener('click', () => {
            const devlog = card.dataset.devlog;
            title.textContent = card.dataset.name;
            date.textContent = card.dataset.date;
            desc.textContent = card.dataset.description;
            cta.textContent = card.dataset.cta;
            cta.href = card.dataset.link;

            if (devlog) {
                devlogBtn.href = devlog;
                devlogBtn.classList.remove('hidden');
            } else {
                console.log(devlog);
                devlogBtn.classList.add('hidden');
            }

            // Dynamic modal styling
            modal.style.borderColor = color;
            modal.style.boxShadow = `0 0 25px ${color}, 0 0 60px ${color}`;
            title.style.color = brightModalColor;
            title.style.textShadow = `0 0 10px ${color}`;
            closeBtn.style.color = brightModalColor;
            closeBtn.style.textShadow = `0 0 10px ${color}`;
            cta.style.backgroundColor = color;
            cta.style.boxShadow = `0 0 15px ${color}, 0 0 30px ${color}`;
            cta.style.color = brightModalColor;
            devlogBtn.style.backgroundColor = color;
            devlogBtn.style.boxShadow = `0 0 15px ${color}, 0 0 30px ${color}`;
            devlogBtn.style.color = brightModalColor;

            modalOverlay.classList.remove('hidden');
        });
    });

    // Close modal handlers
    closeBtn.addEventListener('click', () => modalOverlay.classList.add('hidden'));
    modalOverlay.addEventListener('click', e => {
        if (e.target === modalOverlay) modalOverlay.classList.add('hidden');
    });
});