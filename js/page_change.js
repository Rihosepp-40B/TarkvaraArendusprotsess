JavaScript
function toggle(id) {
    const section = document.getElementById(id);
    const isVisible = section.style.display === 'block';

    // hide all sections first
    document.querySelectorAll('.section').forEach(sec => {
        sec.style.display = 'none';
    });

    if (!isVisible) {
        section.style.display = 'block';
    }
}