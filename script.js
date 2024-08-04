document.addEventListener("DOMContentLoaded", function() {
    const container = document.querySelector('.circle-container');
    const numCircles = 450;
    const maxKeyframes = 10; // Maximum number of keyframe animations to keep
    const styleSheet = document.createElement('style');
    document.head.appendChild(styleSheet);

    let keyframeIndex = 0;

    const createKeyframes = (index, startX, startY, endX, endY) => `
        @keyframes move-${index} {
            0% { transform: translate(${startX}, ${startY}); }
            100% { transform: translate(${endX}, ${endY}); }
        }
    `;

    const updateKeyframes = (index, startX, startY, endX, endY) => {
        const keyframes = createKeyframes(index, startX, startY, endX, endY);
        styleSheet.sheet.insertRule(keyframes, styleSheet.sheet.cssRules.length);

        // Remove old keyframes if the limit is exceeded
        if (styleSheet.sheet.cssRules.length > maxKeyframes) {
            styleSheet.sheet.deleteRule(0); // Remove the oldest rule
        }
    };

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
        circle.style.setProperty('--start-x', startX);
        circle.style.setProperty('--start-y', startY);
        circle.style.setProperty('--end-x', endX);
        circle.style.setProperty('--end-y', endY);
        circle.style.animation = `blink ${blinkDuration} infinite, move-${i} ${movementDuration} linear infinite`;

        updateKeyframes(i, startX, startY, endX, endY);

        setInterval(() => {
            const newEndX = Math.random() * 100 + 'vw';
            const newEndY = Math.random() * 100 + 'vh';

            circle.style.setProperty('--end-x', newEndX);
            circle.style.setProperty('--end-y', newEndY);

            updateKeyframes(i, startX, startY, newEndX, newEndY);
        }, (Math.random() * 10 + 5) * 1000);

        container.appendChild(circle);
    }
});
