document.addEventListener("DOMContentLoaded", function() {
    const container = document.querySelector('.circle-container');
    const numCircles = 4000;  // Increased number of circles to 4,000

    for (let i = 0; i < numCircles; i++) {
        const circle = document.createElement('div');
        circle.classList.add('circle');
        
        const size = Math.random() * 5 + 2 + 'px'; // Smaller circles
        const left = Math.random() * 100 + 'vw';
        const top = Math.random() * 100 + 'vh';
        const blinkDuration = Math.random() * 2 + 4 + 's'; // Slower blinking duration between 4s and 6s
        const movementDuration = Math.random() * 10 + 5 + 's'; // Movement duration between 5s and 15s

        circle.style.width = size;
        circle.style.height = size;
        circle.style.left = left;
        circle.style.top = top;
        circle.style.animationDuration = `blink ${blinkDuration} infinite`;

        // Function to set a random movement animation
        const randomMovement = () => {
            const newLeft = Math.random() * 100 + 'vw';
            const newTop = Math.random() * 100 + 'vh';

            // Create CSS keyframes for the movement
            const keyframes = `
                @keyframes move-${i} {
                    0% {
                        transform: translate(${circle.style.left}, ${circle.style.top});
                    }
                    100% {
                        transform: translate(${newLeft}, ${newTop});
                    }
                }
            `;
            const styleSheet = document.createElement('style');
            styleSheet.type = 'text/css';
            styleSheet.innerText = keyframes;
            document.head.appendChild(styleSheet);

            // Apply movement animation
            circle.style.animation = `move-${i} ${movementDuration} linear infinite, blink ${blinkDuration} infinite`;
        };

        // Initialize movement and set intervals for random movement changes
        randomMovement();
        setInterval(randomMovement, (Math.random() * 10 + 5) * 1000);

        container.appendChild(circle);
    }
});
