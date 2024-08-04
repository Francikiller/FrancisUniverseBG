document.addEventListener("DOMContentLoaded", function() {
    const container = document.querySelector('.circle-container');
    const numCircles = 450;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Create a single <style> element for keyframes
    const styleSheet = document.createElement('style');
    document.head.appendChild(styleSheet);

    // Function to generate unique keyframe names
    const generateUniqueId = () => `move-${Math.random().toString(36).substr(2, 9)}`;

    const createKeyframes = (id, startX, startY, endX, endY) => `
        @keyframes ${id} {
            0% { transform: translate(${startX}, ${startY}); }
            100% { transform: translate(${endX}, ${endY}); }
        }
    `;

    // Store keyframe rules to avoid duplication
    const keyframeRules = new Map();

    const updateKeyframes = (id, startX, startY, endX, endY) => {
        if (!keyframeRules.has(id)) {
            const keyframes = createKeyframes(id, startX, startY, endX, endY);
            styleSheet.sheet.insertRule(keyframes, styleSheet.sheet.cssRules.length);
            keyframeRules.set(id, true);
        } else {
            // Update existing keyframes if necessary
            const ruleIndex = Array.from(styleSheet.sheet.cssRules).findIndex(rule => rule.name === id);
            if (ruleIndex >= 0) {
                styleSheet.sheet.deleteRule(ruleIndex);
                const keyframes = createKeyframes(id, startX, startY, endX, endY);
                styleSheet.sheet.insertRule(keyframes, styleSheet.sheet.cssRules.length);
            }
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

        // Generate a unique id for the keyframes
        const id = generateUniqueId();
        updateKeyframes(id, startX, startY, endX, endY);

        circle.style.width = size;
        circle.style.height = size;
        circle.style.transform = `translate(${startX}, ${startY})`;
        circle.style.animation = `blink ${blinkDuration} infinite, ${id} ${movementDuration} linear infinite`;

        container.appendChild(circle);

        return { circle, id, endX, endY, movementDuration };
    };

    const circles = [];
    for (let i = 0; i < numCircles; i++) {
        circles.push(createCircle());
    }

    const checkAndReplaceCircles = () => {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        circles.forEach(({ circle, id, endX, endY, movementDuration }, index) => {
            const rect = circle.getBoundingClientRect();
            if (
                rect.left > viewportWidth || 
                rect.right < 0 || 
                rect.top > viewportHeight || 
                rect.bottom < 0
            ) {
                // Remove the circle
                container.removeChild(circle);
                keyframeRules.delete(id);

                // Create and add a new circle
                const newCircleData = createCircle();
                circles[index] = newCircleData;
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
