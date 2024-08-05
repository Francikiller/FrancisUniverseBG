document.addEventListener("DOMContentLoaded", function() {
    // Check if particles.js is loaded
    if (typeof particlesJS === 'undefined') {
        console.error('particlesJS is not defined. Ensure particles.js is loaded correctly.');
        return;
    }

    // Initialize particles.js with the config
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 450,
                "density": {
                    "enable": true,
                    "value_area": 800
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
                "enable": true,
                "distance": 150,
                "color": "#7e00af",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 6,
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
                    "enable": true,
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
                    "distance": 200,
                    "duration": 0.4
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
    });

    // Typewriter effect for the text
    const textBox = document.querySelector('.typewriter');
    const texts = ["Welcome", "To Francis Universe."];
    let currentTextIndex = 0;
    let isDeleting = false;
    let textIndex = 0;
    let cursorVisible = true;

    const typeSpeed = 100; // Speed of typing
    const deleteSpeed = 50; // Speed of deleting
    const pauseBeforeNextText = 2000; // Pause before starting next text

    const typewriter = () => {
        const currentText = texts[currentTextIndex];

        if (!isDeleting) {
            // Typing
            if (textIndex < currentText.length) {
                textBox.innerHTML += currentText.charAt(textIndex);
                textIndex++;
                setTimeout(typewriter, typeSpeed);
            } else {
                // Pause before deleting
                setTimeout(() => {
                    isDeleting = true;
                    setTimeout(typewriter, pauseBeforeNextText); // Pause before deleting
                }, pauseBeforeNextText);
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

        // Toggle cursor visibility
        cursorVisible = !cursorVisible;
        document.querySelector('.cursor').style.visibility = cursorVisible ? 'visible' : 'hidden';
    };

    typewriter();
});
