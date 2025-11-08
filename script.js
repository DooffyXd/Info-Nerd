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
    const menuIcon = document.getElementById('menu-toggle-icon'); 

    if (menuButton && navbar && menuIcon) { 
        const navLinks = navbar.querySelectorAll('a');

        const toggleMenu = () => {
            navbar.classList.toggle('active');
            document.body.classList.toggle('menu-open');
            const isExpanded = navbar.classList.contains('active');
            menuButton.setAttribute('aria-expanded', isExpanded);

            if (isExpanded) {
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-times');
            } else {
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            }
        };

        const closeMenu = () => {
            if (navbar.classList.contains('active')) {
                navbar.classList.remove('active');
                document.body.classList.remove('menu-open');
                menuButton.setAttribute('aria-expanded', 'false');
                
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            }
        };

        menuButton.addEventListener('click', (e) => {
            e.stopPropagation(); 
            toggleMenu();
        });
        
        navLinks.forEach(link => {
            if (link.getAttribute('href').startsWith('#') || link.getAttribute('href').includes('index.html#')) {
                 link.addEventListener('click', closeMenu);
            }
        });

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
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1, 
        });

        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }

    // --- FORMULÁRIO DE ORÇAMENTO (Página orcamento.html) ---
    const whatsappForm = document.getElementById('whatsapp-form');

    if (whatsappForm) {
        whatsappForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const numeroComercial = '5511918611301';
            const nome = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const telefoneCliente = document.getElementById('phone').value;
            const equipamento = document.getElementById('equipamento').value;
            const defeito = document.getElementById('message').value;

            const mensagem = `Olá! Gostaria de solicitar um orçamento.
-----------------------------
*Nome:* ${nome}
*E-mail:* ${email}
*Telefone:* ${telefoneCliente}
*Equipamento:* ${equipamento}
*Defeito:* ${defeito}
-----------------------------
Aguardando contato.`;

            const mensagemCodificada = encodeURIComponent(mensagem);
            const urlWhatsApp = `https://wa.me/${numeroComercial}?text=${mensagemCodificada}`;
            window.open(urlWhatsApp, '_blank');
        });
    }

    /* O Bloco de Lógica da Loja (btn-comprar-whatsapp) 
       foi REMOVIDO daqui, pois a loja.html agora usa links diretos.
    */


    /* ---- ========================== ---- */
    /* ----  LÓGICA DO MONTE SEU PC    ---- */
    /* ---- ========================== ---- */

    const selectsComponentes = document.querySelectorAll('.componente-select');
    const precoTotalEl = document.getElementById('preco-total');
    const btnFinalizarPC = document.getElementById('btn-finalizar-pc');
    const numeroLojaPC = '5511918611301'; // Seu número de WhatsApp

    function calcularTotalPC() {
        let total = 0;
        selectsComponentes.forEach(select => {
            total += parseFloat(select.value);
        });
        if (precoTotalEl) {
            precoTotalEl.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
        }
    }

    if (selectsComponentes.length > 0 && precoTotalEl) {
        selectsComponentes.forEach(select => {
            select.addEventListener('change', calcularTotalPC);
        });
    }

    if (btnFinalizarPC) {
        btnFinalizarPC.addEventListener('click', () => {
            let mensagem = 'Olá! Gostaria de um orçamento para este PC que montei:\n';
            mensagem += '-----------------------------\n';
            let total = 0;

            selectsComponentes.forEach(select => {
                const selectedOption = select.options[select.selectedIndex];
                const precoItem = parseFloat(selectedOption.value); 

                if (precoItem > 0) {
                    const label = select.closest('.componente-grupo').querySelector('label').innerText.trim();
                    const nomeItem = selectedOption.text.split(' - R$')[0];

                    mensagem += `*${label}:* ${nomeItem}\n`;
                    total += precoItem;
                }
            });

            if (total === 0) {
                console.warn("Nenhum item selecionado."); 
                return; 
            }

            mensagem += '-----------------------------\n';
            mensagem += `*TOTAL ESTIMADO:* R$ ${total.toFixed(2).replace('.', ',')}`;

            const mensagemCodificada = encodeURIComponent(mensagem);
            const urlWhatsApp = `https://wa.me/${numeroLojaPC}?text=${mensagemCodificada}`;
            
            window.open(urlWhatsApp, '_blank');
        });
    }

}); // <-- FIM do document.addEventListener('DOMContentLoaded')
