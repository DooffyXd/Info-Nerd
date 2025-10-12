document.addEventListener('DOMContentLoaded', () => {

    // --- EFEITO DO CABEÇALHO AO ROLAR A PÁGINA ---
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // --- FUNCIONALIDADE DO MENU MOBILE ---
    const menuButton = document.getElementById('menu-icon');
    const navbar = document.querySelector('.navbar');

    if (menuButton && navbar) {
        const navLinks = navbar.querySelectorAll('a');

        const toggleMenu = () => {
            navbar.classList.toggle('active');
            document.body.classList.toggle('menu-open');
            const isExpanded = navbar.classList.contains('active');
            menuButton.setAttribute('aria-expanded', isExpanded);
        };

        const closeMenu = () => {
            if (navbar.classList.contains('active')) {
                navbar.classList.remove('active');
                document.body.classList.remove('menu-open');
                menuButton.setAttribute('aria-expanded', 'false');
            }
        };

        menuButton.addEventListener('click', (e) => {
            e.stopPropagation(); // Impede que o clique no botão feche o menu imediatamente
            toggleMenu();
        });
        
        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Fecha o menu ao clicar fora dele
        document.addEventListener('click', (event) => {
            const isClickInsideNavbar = navbar.contains(event.target);
            const isClickOnMenuButton = menuButton.contains(event.target);

            if (!isClickInsideNavbar && !isClickOnMenuButton) {
                closeMenu();
            }
        });
    }


    // --- ANIMAÇÃO DOS ELEMENTOS AO ENTRAR NA TELA (Intersection Observer) ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Para de observar o elemento após a animação para economizar recursos
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1, // A animação começa quando 10% do elemento estiver visível
        });

        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
});