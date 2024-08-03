document.addEventListener("DOMContentLoaded", function() {
    const container = document.querySelector('.circle-container');
    const numCircles = 450;  // Increased number of circles to 4,000

    for (let i = 0; i < numCircles; i++) {
        const circle = document.createElement('div');
        circle.classList.add('circle');
        
        // Set initial size and position
        const size = Math.random() * 3 + 1 + 'px'; // Smaller circles
        const startX = Math.random() * 100 + 'vw';
        const startY = Math.random() * 100 + 'vh';
        const endX = Math.random() * 100 + 'vw';
        const endY = Math.random() * 100 + 'vh';
        const blinkDuration = Math.random() * 2 + 4 + 's'; // Slower blinking duration between 4s and 6s
        const movementDuration = Math.random() * 10 + 5 + 's'; // Movement duration between 5s and 15s

        circle.style.width = size;
        circle.style.height = size;
        circle.style.transform = `translate(${startX}, ${startY})`;
        circle.style.animationDuration = `blink ${blinkDuration} infinite`;

        // Function to create and apply a random movement animation
        const applyMovement = () => {
            const keyframes = `
                @keyframes move-${i} {
                    0% {
                        transform: translate(${startX}, ${startY});
                    }
                    100% {
                        transform: translate(${endX}, ${endY});
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
        applyMovement();
        setInterval(() => {
            // Update positions for the next animation
            const newEndX = Math.random() * 100 + 'vw';
            const newEndY = Math.random() * 100 + 'vh';
            const newKeyframes = `
                @keyframes move-${i} {
                    0% {
                        transform: translate(${endX}, ${endY});
                    }
                    100% {
                        transform: translate(${newEndX}, ${newEndY});
                    }
                }
            `;
            const styleSheet = document.createElement('style');
            styleSheet.type = 'text/css';
            styleSheet.innerText = newKeyframes;
            document.head.appendChild(styleSheet);

            endX = newEndX;
            endY = newEndY;

            // Apply the updated animation
            circle.style.animation = `move-${i} ${movementDuration} linear infinite, blink ${blinkDuration} infinite`;
        }, (Math.random() * 10 + 5) * 1000);

        container.appendChild(circle);
    }
});
