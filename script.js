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
            iframeURL: 'https://aescaesse.github.io/hipnotizingsky/'
        }
    ];

    const worksContainer = document.getElementById('works-container');

    projects.forEach((project) => {
        const idString = project.id.toString().padStart(2, '0');
        const projectHTML = `
            <div class="flex flex-col gap-4 group cursor-pointer project-item opacity-0 translate-y-8" data-id="${project.id}">
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

    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalIframe = document.getElementById('modal-iframe');
    const btnClose = document.getElementById('close-modal');

    document.querySelectorAll('.project-item').forEach(item => {
        item.addEventListener('click', function() {
            const projectId = parseInt(this.getAttribute('data-id'));
            const project = projects.find(p => p.id === projectId);

            if (project) {
                lenis.stop();
                
                const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
                document.body.style.paddingRight = `${scrollbarWidth}px`;
                
                modalTitle.innerText = project.title;
                modalDesc.innerText = project.description;
                modalIframe.src = project.iframeURL;

                gsap.to(modal, { 
                    autoAlpha: 1, 
                    duration: 0.6, 
                    ease: "power3.inOut" 
                });
                
                document.body.style.overflow = 'hidden';
                modal.style.pointerEvents = 'auto'; 
            }
        });
    });

    function closeModal() {
        gsap.to(modal, { 
            autoAlpha: 0, 
            duration: 0.5, 
            ease: "power2.inOut",
            onComplete: () => {
                modalIframe.src = "";
                document.body.style.overflow = '';
                document.body.style.paddingRight = '';
                modal.style.pointerEvents = 'none';
                lenis.start();
            }
        });
    }

    if (btnClose) {
        btnClose.addEventListener('click', closeModal);
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
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