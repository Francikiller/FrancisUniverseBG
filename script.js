document.addEventListener("DOMContentLoaded", function() {
    if (typeof particlesJS === 'undefined') {
        console.error('particlesJS is not defined. Ensure particles.js is loaded correctly.');
        return;
    }

    particlesJS("particles-js", {"particles":{"number":{"value":160,"density":{"enable":true,"value_area":800}},"color":{"value":"#6300f2"},"shape":{"type":"circle","stroke":{"width":0,"color":"#000000"},"polygon":{"nb_sides":5},"image":{"src":"img/github.svg","width":100,"height":100}},"opacity":{"value":1,"random":true,"anim":{"enable":true,"speed":1,"opacity_min":0,"sync":false}},"size":{"value":3,"random":true,"anim":{"enable":false,"speed":4,"size_min":0.3,"sync":false}},"line_linked":{"enable":false,"distance":150,"color":"#ffffff","opacity":0.4,"width":1},"move":{"enable":true,"speed":1,"direction":"none","random":true,"straight":false,"out_mode":"out","bounce":false,"attract":{"enable":false,"rotateX":600,"rotateY":600}}},"interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":true,"mode":"bubble"},"onclick":{"enable":true,"mode":"push"},"resize":true},"modes":{"grab":{"distance":400,"line_linked":{"opacity":1}},"bubble":{"distance":250,"size":0,"duration":2,"opacity":0,"speed":3},"repulse":{"distance":400,"duration":0.4},"push":{"particles_nb":4},"remove":{"particles_nb":2}}},"retina_detect":true});var count_particles, stats, update; stats = new Stats; stats.setMode(0); stats.domElement.style.position = 'absolute'; stats.domElement.style.left = '0px'; stats.domElement.style.top = '0px'; document.body.appendChild(stats.domElement); count_particles = document.querySelector('.js-count-particles'); update = function() { stats.begin(); stats.end(); if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) { count_particles.innerText = window.pJSDom[0].pJS.particles.array.length; } requestAnimationFrame(update); }; requestAnimationFrame(update);;

    // Typing effect
    const texts = ['Welcome', 'To Francis Universe'];
    let index = 0;
    let charIndex = 0;
    const typeSpeed = 100;
    const eraseSpeed = 50;
    const newTextDelay = 2000;
    const cursor = document.querySelector('.cursor');
    const typewriterElement = document.querySelector('.typewriter');

    function type() {
        if (charIndex < texts[index].length) {
            typewriterElement.textContent += texts[index].charAt(charIndex);
            charIndex++;
            setTimeout(type, typeSpeed);
        } else {
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typewriterElement.textContent = texts[index].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, eraseSpeed);
        } else {
            index++;
            if (index >= texts.length) index = 0;
            setTimeout(type, typeSpeed + 1100);
        }
    }

    // Start typing on load
    type();
});
