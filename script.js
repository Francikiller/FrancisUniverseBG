document.addEventListener("DOMContentLoaded", function() {
    const container = document.querySelector('.circle-container');
    const numCircles = 450;

    for (let i = 0; i < numCircles; i++) {
        const circle = document.createElement('div');
        circle.classList.add('circle');

        const size = Math.random() * 3 + 1 + 'px';
        const startX = Math.random() * 100 + 'vw';
        const startY = Math.random() * 100 + 'vh';
        const endX = Math.random() * 100 + 'vw';
        const endY = Math.random() * 100 + 'vh';
        const blinkDuration = Math.random() * 2 + 4 + 's';
        const movementDuration = Math.random() * 10 + 5 + 's';

        circle.style.width = size;
        circle.style.height = size;
        circle.style.transform = `translate(${startX}, ${startY})`;
        circle.style.animation = `blink ${blinkDuration} infinite, move-${i} ${movementDuration} linear infinite`;

        // Add movement keyframes directly in the stylesheet
        const keyframes = `
            @keyframes move-${i} {
                0% { transform: translate(${startX}, ${startY}); }
                100% { transform: translate(${endX}, ${endY}); }
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.type = 'text/css';
        styleSheet.innerText = keyframes;
        document.head.appendChild(styleSheet);

        // Set interval to update the end position
        setInterval(() => {
            const newEndX = Math.random() * 100 + 'vw';
            const newEndY = Math.random() * 100 + 'vh';
            circle.style.animation = `blink ${blinkDuration} infinite, move-${i} ${movementDuration} linear infinite`;
            
            // Update keyframes
            styleSheet.innerText = `
                @keyframes move-${i} {
                    0% { transform: translate(${endX}, ${endY}); }
                    100% { transform: translate(${newEndX}, ${newEndY}); }
                }
            `;

            endX = newEndX;
            endY = newEndY;
        }, (Math.random() * 10 + 5) * 1000);

        container.appendChild(circle);
    }
});
