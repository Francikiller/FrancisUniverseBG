document.addEventListener("DOMContentLoaded", function() {
    if (typeof particlesJS === 'undefined') {
        console.error('particlesJS is not defined. Ensure particles.js is loaded correctly.');
        return;
    }

    // Function to get screen size and adjust particle density
    function getParticleConfig() {
        let numParticles;
        let areaValue;

        if (window.innerWidth < 576) { // Small screens
            numParticles = 100;
            areaValue = 400;
        } else if (window.innerWidth < 768) { // Medium screens
            numParticles = 200;
            areaValue = 600;
        } else if (window.innerWidth < 992) { // Large screens
            numParticles = 350;
            areaValue = 800;
        } else { // Extra large screens
            numParticles = 450;
            areaValue = 1000;
        }

        return {
            "particles": {
                "number": {
                    "value": numParticles,
                    "density": {
                        "enable": true,
                        "value_area": areaValue
                    }
                },
                "color": {
                    "value": "#7e00af"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": false,
                    "distance": 0,
                    "color": "#7e00af",
                    "opacity": 0,
                    "width": 0
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": false,
                        "mode": "repulse"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 400,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 0,
                        "duration": 0
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        };
    }

    // Initialize particles with the dynamic config
    particlesJS('particles-js', getParticleConfig());

    // Reinitialize particles on window resize to adjust for new screen size
    window.addEventListener('resize', function() {
        particlesJS('particles-js', getParticleConfig());
    });

    // Typing effect
    const texts = ['Discover. Create. Evolve.', 'Where ideas become reality.', 'Your journey starts here.'];
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
