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

    // Helper to change glow color
    function updateGlow(color) {
        const rgba = hexToRgba(color, 0.25);
        glow.style.background = `radial-gradient(circle, ${rgba} 50%, transparent 70%)`;
    }

    function hexToRgba(hex, alpha = 1) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }



    cards.forEach(card => {
        const color = getComputedStyle(card).getPropertyValue('--hover-color').trim();

        // Hover: Update section glow color
        card.addEventListener('mouseenter', () => {
            updateGlow(color);

            heading.style.color = color;
            heading.style.textShadow = `0 0 10px ${color}`;
        });


        // Click: Open modal and populate data
        card.addEventListener('click', () => {
            title.textContent = card.dataset.name;
            date.textContent = card.dataset.date;
            desc.textContent = card.dataset.description;
            cta.textContent = card.dataset.cta;
            cta.href = card.dataset.link;

            // Dynamic modal styling
            modal.style.borderColor = color;
            modal.style.boxShadow = `0 0 25px ${color}, 0 0 60px ${color}`;
            title.style.color = color;
            title.style.textShadow = `0 0 10px ${color}`;
            closeBtn.style.color = color;
            closeBtn.style.textShadow = `0 0 10px ${color}`;
            cta.style.backgroundColor = color;
            cta.style.boxShadow = `0 0 15px ${color}, 0 0 30px ${color}`;

            modalOverlay.classList.remove('hidden');
        });
    });

    // Close modal handlers
    closeBtn.addEventListener('click', () => modalOverlay.classList.add('hidden'));
    modalOverlay.addEventListener('click', e => {
        if (e.target === modalOverlay) modalOverlay.classList.add('hidden');
    });
});