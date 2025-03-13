// Get the canvas and context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Game variables
const roadWidth = 200;
const roadX = (canvas.width - roadWidth) / 2; // Center the road
const carWidth = 40;
const carHeight = 60;
let carX = canvas.width / 2 - carWidth / 2; // Center the car horizontally
let carY = canvas.height - carHeight - 20; // Start near the bottom
let carSpeed = 0; // Speed of the car (controlled by "W")
const maxSpeed = 5; // Maximum speed when "W" is pressed
const acceleration = 0.2; // How quickly the car speeds up
const deceleration = 0.1; // How quickly the car slows down

// Track key states
let isWPressed = false;

// Listen for key presses
document.addEventListener("keydown", (event) => {
    if (event.key.toLowerCase() === "w") {
        isWPressed = true;
    }
});

document.addEventListener("keyup", (event) => {
    if (event.key.toLowerCase() === "w") {
        isWPressed = false;
    }
});

// Game loop
function gameLoop() {
    // Update car speed based on key state
    if (isWPressed) {
        carSpeed = Math.min(carSpeed + acceleration, maxSpeed); // Accelerate
    } else {
        carSpeed = Math.max(carSpeed - deceleration, 0); // Decelerate
    }

    // Update car position (move upward = forward)
    carY -= carSpeed;

    // Prevent the car from moving off the top of the canvas
    if (carY < 0) {
        carY = 0;
    }

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the road
    ctx.fillStyle = "#555"; // Gray road
    ctx.fillRect(roadX, 0, roadWidth, canvas.height);

    // Draw road lines (to give a sense of movement)
    ctx.fillStyle = "#fff"; // White lines
    const lineHeight = 20;
    const lineSpacing = 40;
    for (let y = -lineSpacing + (carY % lineSpacing); y < canvas.height; y += lineSpacing) {
        ctx.fillRect(canvas.width / 2 - 2, y, 4, lineHeight);
    }

    // Draw the car
    ctx.fillStyle = "red";
    ctx.fillRect(carX, carY, carWidth, carHeight);

    // Request the next frame
    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();