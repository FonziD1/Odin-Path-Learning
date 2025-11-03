const container= document.querySelector("div");

const p = document.createElement('p');
p.textContent = "Hello, Dom Manipulation!";
p.style.color = 'red';

container.appendChild(p);

const p2 = document.createElement('p');
p2.textContent = 'Hey I\'m red!';
p2.style.color = "red";
container.appendChild(p2);

const h3 = document.createElement('h3');
h3.textContent = "I'm a blue h3";
h3.style.color = "blue";
container.insertBefore(h3,p);

const newDiv = document.createElement('div')
newDiv.style.border = '1p solid black';
newDiv.style.background = 'pink';
newDiv.style.padding =' 2px 10px'
const h1 = document.createElement('h1');
h1.textContent = 'Hi I\'m a div';

const p3 = document.createElement('p');
p3.textContent = 'ME TOO!';

newDiv.appendChild(h1);
newDiv.appendChild(p3);
container.appendChild(newDiv);

const btn = document.getElementById('btn');
btn.addEventListener('click', () => {
    alert('Button Clicked!');
})

const btn2 = document.getElementById('second');
btn2.onclick = () => alert('Hello from button 2')

btn.addEventListener("click", something);

function something(e){
console.log(e.target);
  e.target.style.background = 'blue';
}