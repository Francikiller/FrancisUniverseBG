document.addEventListener("DOMContentLoaded", function() {
    const container = document.querySelector('.circle-container');
    const numCircles = 450;

    // Function to create and manage keyframes
    const createKeyframes = (index) => {
        return `
            @keyframes move-${index} {
                0% { transform: translate(var(--start-x), var(--start-y)); }
                100% { transform: translate(var(--end-x), var(--end-y)); }
            }
        `;
    };

    // Create a single <style> element to hold keyframes
    const styleSheet = document.createElement('style');
    document.head.appendChild(styleSheet);

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
        circle.style.setProperty('--start-x', startX);
        circle.style.setProperty('--start-y', startY);
        circle.style.setProperty('--end-x', endX);
        circle.style.setProperty('--end-y', endY);
        circle.style.animation = `blink ${blinkDuration} infinite, move-${i} ${movementDuration} linear infinite`;

        // Append keyframes for the current circle
        styleSheet.innerHTML += createKeyframes(i);

        // Update positions at intervals
        setInterval(() => {
            const newEndX = Math.random() * 100 + 'vw';
            const newEndY = Math.random() * 100 + 'vh';

            // Update custom properties and animation
            circle.style.setProperty('--end-x', newEndX);
            circle.style.setProperty('--end-y', newEndY);

            // Update keyframes directly in the styleSheet
            styleSheet.innerHTML = styleSheet.innerHTML.replace(
                new RegExp(`@keyframes move-${i} {[^}]*}`, 'g'),
                createKeyframes(i)
            );
        }, (Math.random() * 10 + 5) * 1000);

        container.appendChild(circle);
    }
});
