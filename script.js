document.addEventListener("DOMContentLoaded", () => {
    
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

    // Dodałem imageURL ze zdjęciem rzeźby jako test wizualny
    const projects = [
        { 
            id: 1, 
            title: 'Joanna Burlikowska', 
            description: 'A refined digital portfolio showcasing multidisciplinary works across visual identity, photography, and traditional fine art.', 
            iframeURL: 'https://aescaesse.github.io/hipnotizingsky/',
            imageURL: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2560&auto=format&fit=crop' 
        }
    ];

    const worksContainer = document.getElementById('works-container');

    projects.forEach((project) => {
        const projectHTML = `
            <div class="group border-b border-black py-8 md:py-12 cursor-pointer flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all duration-700 project-item relative opacity-0 translate-y-8" data-id="${project.id}">
                <div class="relative z-10 flex items-center">
                    <div class="w-0 overflow-hidden transition-all duration-700 ease-out group-hover:w-16 md:group-hover:w-24 hidden md:flex items-center opacity-0 group-hover:opacity-100">
                        <span class="font-sans text-xs tracking-widest uppercase text-gray-500 whitespace-nowrap">View —</span>
                    </div>
                    <h3 class="font-serif text-4xl md:text-6xl transition-all duration-700 group-hover:italic group-hover:text-gray-700">
                        ${project.title}
                    </h3>
                </div>
                <div class="relative z-10">
                    <p class="font-sans text-xs md:text-sm uppercase tracking-widest max-w-xs md:text-right transition-colors duration-700 group-hover:text-gray-500">
                        ${project.description}
                    </p>
                </div>
            </div>
        `;
        worksContainer.insertAdjacentHTML('beforeend', projectHTML);
    });

    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalIframe = document.getElementById('modal-iframe');
    const btnClose = document.getElementById('close-modal');
    
    // Zmienne dla pływającego zdjęcia
    const hoverImgContainer = document.getElementById('hover-image-container');
    const hoverImg = document.getElementById('hover-image');

    document.querySelectorAll('.project-item').forEach(item => {
        
        // Logika otwierania modala
        item.addEventListener('click', function() {
            const projectId = parseInt(this.getAttribute('data-id'));
            const project = projects.find(p => p.id === projectId);

            if (project) {
                lenis.stop();
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

        // Logika wjazdu pływającego zdjęcia
        item.addEventListener('mouseenter', (e) => {
            const projectId = parseInt(item.getAttribute('data-id'));
            const project = projects.find(p => p.id === projectId);
            
            if (project && project.imageURL) {
                hoverImg.src = project.imageURL;
                gsap.to(hoverImgContainer, {
                    autoAlpha: 1,
                    scale: 1,
                    duration: 0.5,
                    ease: "power3.out"
                });
            }
        });

        // Logika zjazdu pływającego zdjęcia
        item.addEventListener('mouseleave', () => {
            gsap.to(hoverImgContainer, {
                autoAlpha: 0,
                scale: 0.95,
                duration: 0.4,
                ease: "power2.inOut"
            });
        });

        // Płynne podążanie za myszką
        item.addEventListener('mousemove', (e) => {
            gsap.to(hoverImgContainer, {
                x: e.clientX,
                y: e.clientY,
                xPercent: 10,  // delikatne przesunięcie w prawo względem kursora
                yPercent: -50, // wycentrowanie pionowo do kursora
                duration: 0.8, 
                ease: "power3.out"
            });
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

    document.querySelectorAll('.project-item').forEach(item => {
        gsap.to(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 90%",
            },
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out"
        });
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