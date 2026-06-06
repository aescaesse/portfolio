document.addEventListener("DOMContentLoaded", () => {
    
    gsap.registerPlugin(ScrollTrigger);

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
        const projectHTML = `
            <div class="group border-b border-black py-8 md:py-12 cursor-pointer flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all duration-500 project-item relative overflow-hidden shine-hover" data-id="${project.id}">
                <div class="reveal-wrapper relative z-10">
                    <h3 class="reveal-text scroll-reveal font-serif text-4xl md:text-6xl transition-all duration-500 group-hover:text-skyblue group-hover:drop-shadow-[0_0_12px_rgba(135,206,235,0.4)]">
                        ${project.title}
                    </h3>
                </div>
                <div class="reveal-wrapper relative z-10">
                    <p class="reveal-text scroll-reveal font-sans text-xs md:text-sm uppercase tracking-widest max-w-xs md:text-right transition-colors duration-500 group-hover:text-skyblue">
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

    document.querySelectorAll('.project-item').forEach(item => {
        item.addEventListener('click', function() {
            const projectId = parseInt(this.getAttribute('data-id'));
            const project = projects.find(p => p.id === projectId);

            if (project) {
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
                modal.style.pointerEvents = 'none';
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
});