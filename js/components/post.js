/**
 * Post Features
 * - Table of Contents generation
 * - Progress bar
 * - Scroll-based TOC highlighting
 * - Image zoom (optional)
 */

document.addEventListener('DOMContentLoaded', function() {
  
  // ==========================================
  // TABLE OF CONTENTS GENERATION
  // ==========================================
  
  const tocNav = document.querySelector('.post-toc-nav');
  const content = document.querySelector('.post-content');
  
  if (tocNav && content) {
    const headings = content.querySelectorAll('h2, h3');
    
    if (headings.length > 0) {
      const tocList = document.createElement('ul');
      let currentH2List = null;
      
      headings.forEach((heading, index) => {
        // Add ID for linking
        if (!heading.id) {
          heading.id = `heading-${index}`;
        }
        
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = `#${heading.id}`;
        link.textContent = heading.textContent;
        link.classList.add('toc-link');
        
        // Smooth scroll on click
        link.addEventListener('click', (e) => {
          e.preventDefault();
          heading.scrollIntoView({ behavior: 'smooth' });
          history.pushState(null, null, `#${heading.id}`);
        });
        
        listItem.appendChild(link);
        
        if (heading.tagName === 'H2') {
          tocList.appendChild(listItem);
          currentH2List = null;
        } else if (heading.tagName === 'H3') {
          if (!currentH2List) {
            currentH2List = document.createElement('ul');
            const lastLi = tocList.lastElementChild;
            if (lastLi) lastLi.appendChild(currentH2List);
          }
          if (currentH2List) {
            currentH2List.appendChild(listItem);
          }
        }
      });
      
      tocNav.appendChild(tocList);
    } else {
      // Hide TOC if no headings
      const toc = document.querySelector('.post-toc');
      if (toc) toc.style.display = 'none';
    }
  }
  
  // ==========================================
  // SCROLL PROGRESS BAR
  // ==========================================
  
  const progressBar = document.getElementById('post-progress');
  
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = (window.scrollY / documentHeight) * 100;
      
      progressBar.style.width = `${Math.min(scrolled, 100)}%`;
    });
  }
  
  // ==========================================
  // ACTIVE TOC LINK HIGHLIGHTING
  // ==========================================
  
  if (tocNav && content) {
    const tocLinks = tocNav.querySelectorAll('a');
    const headings = content.querySelectorAll('h2, h3');
    
    if (tocLinks.length > 0 && headings.length > 0) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            
            // Remove active from all
            tocLinks.forEach(link => link.classList.remove('active'));
            
            // Add active to current
            const activeLink = tocNav.querySelector(`a[href="#${id}"]`);
            if (activeLink) {
              activeLink.classList.add('active');
            }
          }
        });
      }, {
        rootMargin: '-80px 0px -80% 0px'
      });
      
      headings.forEach(heading => observer.observe(heading));
    }
  }
  
  // ==========================================
  // IMAGE ZOOM ON CLICK (OPTIONAL)
  // ==========================================
  
  const contentImages = content ? content.querySelectorAll('img') : [];
  
  contentImages.forEach(img => {
    img.addEventListener('click', function() {
      // Create overlay
      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.9);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: zoom-out;
        padding: 2rem;
      `;
      
      // Create zoomed image
      const zoomedImg = document.createElement('img');
      zoomedImg.src = this.src;
      zoomedImg.alt = this.alt;
      zoomedImg.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
        border-radius: 8px;
        box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);
      `;
      
      overlay.appendChild(zoomedImg);
      document.body.appendChild(overlay);
      
      // Close on click
      overlay.addEventListener('click', () => {
        document.body.removeChild(overlay);
      });
      
      // Close on escape
      const closeOnEscape = (e) => {
        if (e.key === 'Escape') {
          if (document.body.contains(overlay)) {
            document.body.removeChild(overlay);
          }
          document.removeEventListener('keydown', closeOnEscape);
        }
      };
      document.addEventListener('keydown', closeOnEscape);
    });
  });
  
  // ==========================================
  // SYNTAX HIGHLIGHTING (if you add it later)
  // ==========================================
  
  // If you add Prism.js or highlight.js, initialize here
  // Example: if (window.Prism) Prism.highlightAll();
  
});