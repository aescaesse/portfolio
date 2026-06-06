if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}

window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});

document.addEventListener("DOMContentLoaded", () => {
    
    window.scrollTo(0, 0);

    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    lenis.scrollTo(0, { immediate: true });

    gsap.registerPlugin(ScrollTrigger);

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    let progress = { value: 0 };
    const counterEl = document.getElementById("preloader-counter");

    gsap.to(progress, {
        value: 100,
        duration: 2.2,
        ease: "power2.inOut",
        onUpdate: () => {
            counterEl.innerText = Math.round(progress.value) + "%";
        },
        onComplete: () => {
            gsap.to("#preloader", {
                yPercent: -100,
                duration: 1.2,
                ease: "power4.inOut",
                onComplete: () => {
                    tlHero.play();
                }
            });
        }
    });

    const projects = [
        { 
            id: 1, 
            title: 'Joanna Burlikowska', 
            description: 'A refined digital portfolio showcasing multidisciplinary works across visual identity, photography, and traditional fine art.', 
            imageURL: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2560&auto=format&fit=crop'
        }
    ];

    const worksContainer = document.getElementById('works-container');

    projects.forEach((project) => {
        const idString = project.id.toString().padStart(2, '0');
        const projectHTML = `
            <div class="flex flex-col gap-4 group cursor-pointer project-item opacity-0 translate-y-8" data-id="${project.id}">
                <div class="w-full aspect-[4/3] overflow-hidden mb-2 bg-gray-200">
                    <img src="${project.imageURL}" alt="${project.title}" class="w-full h-full object-cover grayscale transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:grayscale-0 group-hover:scale-105">
                </div>
                <span class="font-sans text-xs tracking-widest text-gray-500 uppercase">${idString}</span>
                <h3 class="font-serif text-3xl group-hover:text-gray-500 transition-colors duration-300">
                    ${project.title}
                </h3>
                <p class="font-sans text-sm text-gray-700 leading-relaxed">
                    ${project.description}
                </p>
            </div>
        `;
        worksContainer.insertAdjacentHTML('beforeend', projectHTML);
    });

    const tlHero = gsap.timeline({ paused: true });

    tlHero.to(".hero-text", {
        y: "0%",
        duration: 1.2,
        stagger: 0.2,
        ease: "power4.out"
    });

    gsap.to(".scroll-line", {
        y: "100%",
        duration: 1.5,
        ease: "power2.inOut",
        repeat: -1,
    });

    const revealElements = document.querySelectorAll('.scroll-reveal');

    revealElements.forEach(element => {
        gsap.to(element, {
            scrollTrigger: {
                trigger: element.closest('.reveal-wrapper'),
                start: "top 90%",
            },
            y: "0%",
            duration: 1,
            ease: "power3.out"
        });
    });

    gsap.to(".project-item", {
        scrollTrigger: {
            trigger: ".works-grid",
            start: "top 85%",
        },
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
    });

    gsap.to(".offering-item", {
        scrollTrigger: {
            trigger: ".offerings-grid",
            start: "top 85%",
        },
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
    });
});