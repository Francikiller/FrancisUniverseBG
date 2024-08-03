document.addEventListener("DOMContentLoaded", function() {
    const container = document.querySelector('.circle-container');
    const numCircles = 50;

    for (let i = 0; i < numCircles; i++) {
        const circle = document.createElement('div');
        circle.classList.add('circle');
        
        const size = Math.random() * 10 + 5 + 'px';
        const left = Math.random() * 100 + 'vw';
        const top = Math.random() * 100 + 'vh';
        const duration = Math.random() * 5 + 5 + 's';
        const blinkDuration = Math.random() * 2 + 0.5 + 's'; // Blinking duration
        const blinkDelay = Math.random() * 2 + 's'; // Blinking delay

        circle.style.width = size;
        circle.style.height = size;
        circle.style.left = left;
        circle.style.top = top;
        circle.style.animationDuration = `${blinkDuration}`;
        circle.style.animationDelay = `0s, ${blinkDelay}`; // Apply delay only to blinking
        
        // Generate random end position for the circle
        const endX = Math.random() * 100 + 'vw';
        const endY = Math.random() * 100 + 'vh';
        const keyframes = `
            @keyframes move-${i} {
                0% {
                    transform: translate(${left}, ${top});
                }
                100% {
                    transform: translate(${endX}, ${endY});
                }
            }
        `;
        
        // Append the keyframes to the document
        const styleSheet = document.createElement('style');
        styleSheet.type = 'text/css';
        styleSheet.innerText = keyframes;
        document.head.appendChild(styleSheet);

        // Apply the animation to the circle
        circle.style.animation = `move-${i} ${duration} linear infinite, blink ${blinkDuration} infinite`;

        container.appendChild(circle);
    }
});
