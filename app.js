document.addEventListener('DOMContentLoaded', () => {
    const gridEl = document.querySelector('.grid');
    const width = 10;

    for (let i = 0; i < width * width; i++) {
        let gridChild = document.createElement('div');
        gridEl.appendChild(gridChild);
    }
})