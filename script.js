const canvas = document.getElementById('screensaver');
const ctx = canvas.getContext('2d');

let x = Math.random() * canvas.width;
let y = Math.random() * canvas.height;
let dx = (Math.random() - 0.5) * 4;
let dy = (Math.random() - 0.5) * 4;
let color = getRandomColor();

let cornerCounter = 0;
let touchingCorner = false;

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Adjust position based on new canvas dimensions
    x = (x / canvas.width) * window.innerWidth;
    y = (y / canvas.height) * window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);

function isAtCorner() {
    const rectSize = 0.3;
    const cornerThreshold = 5; // Adjust as needed for accuracy
    return (
        x <= cornerThreshold &&
        y <= cornerThreshold &&
        x + canvas.width * rectSize >= canvas.width - cornerThreshold &&
        y + canvas.height * rectSize >= canvas.height - cornerThreshold
    );
}

function animate() {
    requestAnimationFrame(animate);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = color;
    // Set the rectangle size to 30% of the viewport size
    ctx.fillRect(x, y, canvas.width * 0.3, canvas.height * 0.3);

    if (isAtCorner() && !touchingCorner) {
        cornerCounter++;
        touchingCorner = true;
    } else if (!isAtCorner()) {
        touchingCorner = false;
    }

    // Position the counter in the middle of the rectangle
    const counter = document.getElementById('counter');
    counter.textContent = cornerCounter;
    counter.style.left = (x + canvas.width * 0.15 - counter.clientWidth / 2) + 'px'; // Center horizontally
    counter.style.top = (y + canvas.height * 0.15 - counter.clientHeight / 2) + 'px'; // Center vertically

    if (x + canvas.width * 0.3 > canvas.width || x < 0) {
        dx = -dx;
        color = getRandomColor();
    }

    if (y + canvas.height * 0.3 > canvas.height || y < 0) {
        dy = -dy;
        color = getRandomColor();
    }

    x += dx;
    y += dy;
}

// Create the counter element and add it to the body
const counter = document.createElement('div');
counter.id = 'counter';
document.body.appendChild(counter);

resizeCanvas();
animate();
