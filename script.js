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
// --- Page 3: Click to Add Light and Change Sound ---
if (document.body.id === 'page3') {
    const staticSound = document.getElementById('static-sound');
    const hopefulSound = document.getElementById('hopeful-sound');
    let staticVolume = 0.7; // Start with loud static
    let hopefulVolume = 0;   // Start with silent hopeful music

    // Set initial volumes
    if (staticSound) staticSound.volume = staticVolume;
    if (hopefulSound) hopefulSound.volume = hopefulVolume;

    // Listen for clicks anywhere on the page
    document.body.addEventListener('click', (e) => {
        // Create a new div element for our particle
        const particle = document.createElement('div');
        particle.className = 'light-particle';

        // Position the particle where the user clicked
        particle.style.left = `${e.clientX}px`;
        particle.style.top = `${e.clientY}px`;
        
        // Add the particle to the page
        document.body.appendChild(particle);

        // --- Audio Transition ---
        // With each click, decrease static and increase hopeful music
        if (staticVolume > 0) staticVolume -= 0.05;
        if (hopefulVolume < 0.5) hopefulVolume += 0.02; // Increase slower for a gentle fade-in
        
        if (staticSound) staticSound.volume = Math.max(0, staticVolume);
        if (hopefulSound) hopefulSound.volume = Math.min(0.5, hopefulVolume);

        // Remove the particle from the page after its animation finishes
        setTimeout(() => particle.remove(), 4000);
    });
}
// --- Page 4: Hover to Reveal Images ---
if (document.body.id === 'page4') {
    const hopefulSound = document.getElementById('hopeful-sound');
    if (hopefulSound) {
        // Make the hopeful music a bit louder now
        hopefulSound.volume = 0.5;
    }

    const hoverElements = document.querySelectorAll('.hover-reveal');
    const imageContainer = document.getElementById('image-container');
    
    // Loop through each line of the poem
    hoverElements.forEach(el => {
        // Add an event listener for when the mouse enters the text
        el.addEventListener('mouseenter', () => {
            const imageUrl = el.getAttribute('data-image'); // Get the image path
            imageContainer.style.backgroundImage = `url(${imageUrl})`; // Set the background
            imageContainer.style.opacity = 0.3; // Fade the image in
        });
        
        // Add an event listener for when the mouse leaves the text
        el.addEventListener('mouseleave', () => {
            imageContainer.style.opacity = 0; // Fade the image out
        });
    });
}
// --- Page 5: Floating Light Particles and Final Music ---
if (document.body.id === 'page5') {
    const hopefulSound = document.getElementById('hopeful-sound');
    if (hopefulSound) {
        // Bring the music to full, clear volume for the conclusion
        hopefulSound.volume = 0.7;
    }
    
    // Create a container for the particles so they don't clutter the body
    const particleContainer = document.createElement('div');
    document.body.appendChild(particleContainer);
    
    // Generate 25 particles
    for (let i = 0; i < 25; i++) {
        const particle = document.createElement('div');
        particle.className = 'light-particle';

        // Give each particle a random horizontal position and size
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.width = `${(Math.random() * 5) + 2}px`;
        particle.style.height = particle.style.width;

        // Randomize the animation duration and delay to make them float at different speeds
        particle.style.animationDuration = `${(Math.random() * 10) + 8}s`; // 8 to 18 seconds
        particle.style.animationDelay = `${Math.random() * 8}s`;

        particleContainer.appendChild(particle);
    }
}
