document.addEventListener('DOMContentLoaded', () => {
    // --- Global: Start Audio on User Interaction ---
    let musicStarted = false;
    function startMusic() {
        if (musicStarted) return;
        const staticSound = document.getElementById('static-sound');
        const hopefulSound = document.getElementById('hopeful-sound');
        if (staticSound) staticSound.play().catch(e=>console.log("Audio play failed"));
        if (hopefulSound) hopefulSound.play().catch(e=>console.log("Audio play failed"));
        musicStarted = true;
        document.body.removeEventListener('click', startMusic);
    }
    document.body.addEventListener('click', startMusic);


    // --- Page 1: Jittery Text ---
    if (document.body.id === 'page1') {
        const jitterText = document.querySelector('.jitter-text');
        window.addEventListener('mousemove', (e) => {
            const x = (e.clientX - window.innerWidth / 2) / 50;
            const y = (e.clientY - window.innerHeight / 2) / 50;
            jitterText.style.transform = `translate(${x}px, ${y}px)`;
        });
        const staticSound = document.getElementById('static-sound');
        if (staticSound) staticSound.volume = 0.3;
    }

    // --- Page 2: Louder Static on Scroll ---
    if (document.body.id === 'page2') {
        const staticSound = document.getElementById('static-sound');
        if (staticSound) {
            staticSound.volume = 0.4;
            window.addEventListener('scroll', () => {
                const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
                staticSound.volume = 0.4 + (scrollPercent * 0.4);
            });
        }
    }

    // --- Page 3: Add Light Particles ---
    if (document.body.id === 'page3') {
        const staticSound = document.getElementById('static-sound');
        const hopefulSound = document.getElementById('hopeful-sound');
        let staticVolume = 0.7;
        
        if (staticSound) staticSound.volume = staticVolume;
        if (hopefulSound) hopefulSound.volume = 0;

        document.body.addEventListener('click', (e) => {
            const particle = document.createElement('div');
            particle.className = 'light-particle';
            particle.style.left = `${e.clientX}px`;
            particle.style.top = `${e.clientY}px`;
            document.body.appendChild(particle);

            // Fade out static, fade in hope
            if (staticVolume > 0) staticVolume -= 0.05;
            if (staticSound) staticSound.volume = Math.max(0, staticVolume);
            if (hopefulSound && hopefulSound.volume < 0.5) hopefulSound.volume += 0.02;

            setTimeout(() => particle.remove(), 4000);
        });
    }

    // --- Page 4: Hover to Reveal Images ---
    if (document.body.id === 'page4') {
        const hopefulSound = document.getElementById('hopeful-sound');
        if (hopefulSound) hopefulSound.volume = 0.5;

        const hoverElements = document.querySelectorAll('.hover-reveal');
        const imageContainer = document.getElementById('image-container');
        
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                const imageUrl = el.getAttribute('data-image');
                imageContainer.style.backgroundImage = `url(${imageUrl})`;
                imageContainer.style.opacity = 0.3;
            });
            el.addEventListener('mouseleave', () => {
                imageContainer.style.opacity = 0;
            });
        });
    }

    // --- Page 5: Floating Light Particles ---
    if (document.body.id === 'page5') {
        const hopefulSound = document.getElementById('hopeful-sound');
        if (hopefulSound) hopefulSound.volume = 0.7;
        
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'light-particle';
            particle.style.left = `${Math.random() * 100}vw`;
            particle.style.top = `${Math.random() * 100}vh`;
            particle.style.animationDuration = `${(Math.random() * 5) + 3}s`;
            particle.style.animationDelay = `${Math.random() * 5}s`;
            document.body.appendChild(particle);
        }
    }
});
// --- Page 2: Louder Static and Faster Flashing on Scroll ---
if (document.body.id === 'page2') {
    const staticSound = document.getElementById('static-sound');
    const phoneScreen = document.querySelector('.phone-screen');

    if (staticSound) {
        // Set a base volume for the static
        staticSound.volume = 0.4;

        // Listen for the scroll event
        window.addEventListener('scroll', () => {
            // Calculate how far down the page the user has scrolled (from 0 to 1)
            const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
            
            // Increase the volume based on scroll, maxing out at 0.8
            staticSound.volume = 0.4 + (scrollPercent * 0.4);

            // Decrease the animation duration to speed it up, min speed 0.2s
            const newDuration = 2 - (scrollPercent * 1.8);
            phoneScreen.style.animationDuration = Math.max(0.2, newDuration) + 's';
        });
    }
}
