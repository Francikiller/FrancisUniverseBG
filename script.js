document.addEventListener("DOMContentLoaded", function() {
    const container = document.querySelector('.circle-container');
    const numCircles = 450;

    // Create a single <style> element for keyframes
    const styleSheet = document.createElement('style');
    document.head.appendChild(styleSheet);

    // Generate unique keyframe names
    const generateUniqueId = () => `move-${Math.random().toString(36).substr(2, 9)}`;

    // Function to create keyframes
    const createKeyframes = (id, startX, startY, endX, endY) => `
        @keyframes ${id} {
            0% { transform: translate(${startX}, ${startY}); }
            100% { transform: translate(${endX}, ${endY}); }
        }
    `;

    // Store keyframe rules to avoid duplication
    const keyframeRules = new Map();

    // Function to update keyframes
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

    // Function to create a circle
    const createCircle = () => {
        const circle = document.createElement('div');
        circle.classList.add('circle');

        const size = `${Math.random() * 3 + 1}px`;
        const startX = `${Math.random() * 100}vw`;
        const startY = `${Math.random() * 100}vh`;
        const endX = `${Math.random() * 100}vw`;
        const endY = `${Math.random() * 100}vh`;
        const blinkDuration = `${Math.random() * 2 + 4}s`;
        const movementDuration = `${Math.random() * 10 + 5}s`;

        const id = generateUniqueId();
        updateKeyframes(id, startX, startY, endX, endY);

        circle.style.width = size;
        circle.style.height = size;
        circle.style.transform = `translate(${startX}, ${startY})`;
        circle.style.animation = `blink ${blinkDuration} infinite, ${id} ${movementDuration} linear infinite`;

        container.appendChild(circle);

        return { circle, id, endX, endY, movementDuration };
    };

    // Array to store circle data
    const circles = [];
    for (let i = 0; i < numCircles; i++) {
        circles.push(createCircle());
    }

    // Function to check and replace circles
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

    // Typewriter effect for the text
    const textBox = document.querySelector('.typewriter');
    const texts = ["Welcome", "To Francis Universe."];
    let currentTextIndex = 0;
    let isDeleting = false;
    let textIndex = 0;

    const typewriter = () => {
        const currentText = texts[currentTextIndex];
        const typeSpeed = 100; // Speed of typing
        const deleteSpeed = 50; // Speed of deleting

        if (!isDeleting) {
            // Typing
            if (textIndex < currentText.length) {
                textBox.innerHTML += currentText.charAt(textIndex);
                textIndex++;
                setTimeout(typewriter, typeSpeed);
            } else {
                // Start deleting after typing is complete
                isDeleting = true;
                setTimeout(typewriter, 1000); // Pause before deleting
            }
        } else {
            // Deleting
            if (textIndex > 0) {
                textBox.innerHTML = currentText.substring(0, textIndex - 1);
                textIndex--;
                setTimeout(typewriter, deleteSpeed);
            } else {
                // Move to the next text
                isDeleting = false;
                currentTextIndex = (currentTextIndex + 1) % texts.length;
                setTimeout(typewriter, 500); // Pause before typing next text
            }
        }
    };

    typewriter();
});
