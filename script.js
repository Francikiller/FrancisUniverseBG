document.addEventListener("DOMContentLoaded", function() {
    const container = document.querySelector('.circle-container');
    const numCircles = 450;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const styleSheet = document.createElement('style');
    document.head.appendChild(styleSheet);

    const createKeyframes = (index, startX, startY, endX, endY) => `
        @keyframes move-${index} {
            0% { transform: translate(${startX}, ${startY}); }
            100% { transform: translate(${endX}, ${endY}); }
        }
    `;

    const updateKeyframes = (index, startX, startY, endX, endY) => {
        const keyframes = createKeyframes(index, startX, startY, endX, endY);
        styleSheet.sheet.insertRule(keyframes, styleSheet.sheet.cssRules.length);

        // Clean up old keyframes if needed
        if (styleSheet.sheet.cssRules.length > 20) { // Adjust the number as needed
            styleSheet.sheet.deleteRule(0);
        }
    };

    const createCircle = () => {
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
        circle.style.animation = `blink ${blinkDuration} infinite, move-${Date.now()} ${movementDuration} linear infinite`;

        updateKeyframes(Date.now(), startX, startY, endX, endY);

        // Add the circle to the container
        container.appendChild(circle);

        return circle;
    };

    const circles = [];
    for (let i = 0; i < numCircles; i++) {
        circles.push(createCircle());
    }

    const checkAndReplaceCircles = () => {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        circles.forEach(circle => {
            const rect = circle.getBoundingClientRect();
            if (
                rect.left > viewportWidth || 
                rect.right < 0 || 
                rect.top > viewportHeight || 
                rect.bottom < 0
            ) {
                // Remove circle
                container.removeChild(circle);

                // Create and add a new circle
                const newCircle = createCircle();
                circles[circles.indexOf(circle)] = newCircle;
            }
        });
    };

    // Check every 100ms
    setInterval(checkAndReplaceCircles, 100);

    // Update viewport dimensions on resize
    window.addEventListener('resize', () => {
        viewportWidth = window.innerWidth;
        viewportHeight = window.innerHeight;
    });
});
