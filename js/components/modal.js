/**
 * Project Modal Component
 * Handles opening/closing modal and populating with project data
 */

document.addEventListener('DOMContentLoaded', function () {
  const cards = document.querySelectorAll('.portfolio-card');
  const modalOverlay = document.getElementById('project-modal-overlay');
  const modal = document.getElementById('project-modal');
  
  // Modal elements
  const elements = {
    title: modal.querySelector('.modal-title'),
    dateCreated: modal.querySelector('.modal-date-created'),
    dateModified: modal.querySelector('.modal-date-modified'),
    description: modal.querySelector('.modal-description'),
    cta: modal.querySelector('.modal-cta'),
    devlog: modal.querySelector('.modal-devlog'),
    close: modal.querySelector('.modal-close')
  };
  
  const glow = document.getElementById('portfolio-glow');
  const heading = document.querySelector('.portfolio-heading');

  /**
   * Convert hex color to rgba
   */
  function hexToRgba(hex, alpha = 1) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  /**
   * Brighten a hex color
   */
  function brightenColor(hex, amount = 0.7) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    
    const brighten = (c) => Math.round(c + (255 - c) * amount);
    
    return `rgb(${brighten(r)}, ${brighten(g)}, ${brighten(b)})`;
  }

  /**
   * Update section glow color
   */
  function updateGlow(color) {
    if (!glow) return;
    const rgba = hexToRgba(color, 0.25);
    glow.style.background = `radial-gradient(circle, ${rgba} 20%, transparent 70%)`;
  }

  /**
   * Update heading style on hover
   */
  function updateHeading(color, isHovering) {
    if (!heading) return;
    
    if (isHovering) {
      const brightColor = brightenColor(color);
      heading.style.color = brightColor;
      heading.style.textShadow = `0 0 10px ${color}`;
    } else {
      // Reset to default (defined in CSS)
      heading.style.color = '';
      heading.style.textShadow = '';
    }
  }

  /**
   * Open modal with project data
   */
  function openModal(card) {
    const data = card.dataset;
    const color = getComputedStyle(card).getPropertyValue('--hover-color').trim();
    const brightColor = brightenColor(color);

    // Populate text content
    elements.title.textContent = data.name;
    elements.dateCreated.textContent = `Date Created: ${data.date_created}`;
    elements.description.textContent = data.description;

    // Handle modified date
    if (data.date_modified) {
      elements.dateModified.textContent = `Date Modified: ${data.date_modified}`;
      elements.dateModified.style.display = 'inline-block';
    } else {
      elements.dateModified.style.display = 'none';
    }

    // Handle CTA button
    if (data.cta && data.link) {
      elements.cta.textContent = data.cta;
      elements.cta.href = data.link;
      elements.cta.style.display = 'inline-block';
      elements.cta.style.backgroundColor = color;
      elements.cta.style.boxShadow = `0 0 15px ${color}, 0 0 30px ${color}`;
      elements.cta.style.color = brightColor;
    } else {
      elements.cta.style.display = 'none';
    }

    // Handle devlog button
    if (data.devlog) {
      elements.devlog.href = data.devlog;
      elements.devlog.classList.remove('hidden');
      elements.devlog.style.backgroundColor = color;
      elements.devlog.style.boxShadow = `0 0 15px ${color}, 0 0 30px ${color}`;
      elements.devlog.style.color = brightColor;
    } else {
      elements.devlog.classList.add('hidden');
    }

    // Apply dynamic styling to modal
    modal.style.borderColor = color;
    modal.style.boxShadow = `0 0 25px ${color}, 0 0 60px ${color}`;
    elements.title.style.color = brightColor;
    elements.title.style.textShadow = `0 0 10px ${color}`;
    elements.close.style.color = brightColor;
    elements.close.style.textShadow = `0 0 10px ${color}`;

    // Show modal
    modalOverlay.classList.remove('hidden');
  }

  /**
   * Close modal
   */
  function closeModal() {
    modalOverlay.classList.add('hidden');
  }

  // Event listeners for each card
  cards.forEach(card => {
    const color = getComputedStyle(card).getPropertyValue('--hover-color').trim();

    // Hover: Update glow and heading
    card.addEventListener('mouseenter', () => {
      updateGlow(color);
      updateHeading(color, true);
    });

    card.addEventListener('mouseleave', () => {
      updateHeading(color, false);
    });

    // Click: Open modal
    card.addEventListener('click', () => openModal(card));
  });

  // Close modal handlers
  elements.close.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
});