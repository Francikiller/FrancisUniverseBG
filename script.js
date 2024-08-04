document.addEventListener("DOMContentLoaded", function() {
    const container = document.querySelector('.circle-container');
    const numCircles = 450;
    const styleSheet = document.createElement('style');
    document.head.appendChild(styleSheet);

    for (let i = 0; i < numCircles; i++) {
        const circle = document.createElement('div');
        circle.classList.add('circle');
        
        const size = Math.random() * 3 + 1 + 'px';
        const startX = Math.random() * 100 + 'vw';
        const startY = Math.random() * 100 + 'vh';
        let endX = Math.random() * 100 + 'vw';
        let endY = Math.random() * 100 + 'vh';
        const blinkDuration = Math.random() * 2 + 4 + 's';
        const movementDuration = Math.random() * 10 + 5 + 's';

        circle.style.width = size;
        circle.style.height = size;
        circle.style.transform = `translate(${startX}, ${startY})`;
        circle.style.animationDuration = `blink ${blinkDuration} infinite`;

        const updateKeyframes = (index, startX, startY, endX, endY) => {
            const keyframes = `
                @keyframes move-${index} {
                    0% {
                        transform: translate(${startX}, ${startY});
                    }
                    100% {
                        transform: translate(${endX}, ${endY});
                    }
                }
            `;
            const existingKeyframes = styleSheet.innerHTML.match(new RegExp(`@keyframes move-${index} {[^}]+}`, 'g'));
            if (existingKeyframes) {
                styleSheet.innerHTML = styleSheet.innerHTML.replace(existingKeyframes[0], keyframes);
            } else {
                styleSheet.innerHTML += keyframes;
            }
        };

        updateKeyframes(i, startX, startY, endX, endY);
        circle.style.animation = `move-${i} ${movementDuration} linear infinite, blink ${blinkDuration} infinite`;

        setInterval(() => {
            const newEndX = Math.random() * 100 + 'vw';
            const newEndY = Math.random() * 100 + 'vh';
            updateKeyframes(i, endX, endY, newEndX, newEndY);

            endX = newEndX;
            endY = newEndY;

            circle.style.animation = `move-${i} ${movementDuration} linear infinite, blink ${blinkDuration} infinite`;
        }, (Math.random() * 10 + 5) * 1000);

        container.appendChild(circle);
    }
});
