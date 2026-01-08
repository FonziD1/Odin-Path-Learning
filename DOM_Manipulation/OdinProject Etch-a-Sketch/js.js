const squareconainer = document.querySelector('.square-container');

for (let i =0; i < 256; i++){
    document.createElement('div');
    squareconainer.appendChild(div);
    div.classList.add('square');
    div.addEventListener('mouseover', () => {
        div.style.backgroundColor = '#000';
    });

}