const img = document.querySelector('.scroll-image');

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;

    // Normalize scroll (0 → 1)
    const progress = scrollTop / maxScroll;

    // Move from right → left
    const moveX = progress * (window.innerWidth * 1);

    img.style.transform = `translateX(-${moveX}px)`;
    });