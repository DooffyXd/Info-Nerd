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
        }, { threshold: 0.1 });
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

    /* ---- ========================== ---- */
    /* ----  LÓGICA DO MONTE SEU PC    ---- */
    /* ---- ========================== ---- */
    const selectsComponentes = document.querySelectorAll('.componente-select');
    const precoTotalEl = document.getElementById('preco-total');
    const btnFinalizarPC = document.getElementById('btn-finalizar-pc');
    const numeroLojaPC = '5511918611301'; 
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

    /* ---- ========================== ---- */
    /* ----     LÓGICA DA LOJA.HTML    ---- */
    /* ---- ========================== ---- */

    // 1. O "Banco de Dados" de produtos
    // SEU TRABALHO: Adicione seus 700 produtos aqui neste formato.
    const productDatabase = [
        // MOUSE
        {
            id: 1,
            name: 'Mouse Gamer XYZ',
            price: 249.90,
            category: 'mouse',
            description: 'Sensor de 16.000 DPI, 8 botões programáveis e iluminação RGB.',
            image: 'https://placehold.co/600x400/1E1E1E/00f5c3?text=Mouse+Gamer',
            link: 'SEU_LINK_DO_MERCADO_PAGO_AQUI_1'
        },
        {
            id: 2,
            name: 'Mouse Óptico Básico',
            price: 49.90,
            category: 'mouse',
            description: 'Mouse óptico confortável com 3 botões, ideal para trabalho.',
            image: 'https://placehold.co/600x400/1E1E1E/00f5c3?text=Mouse+Basico',
            link: 'SEU_LINK_DO_MERCADO_PAGO_AQUI_2'
        },
        // TECLADO
        {
            id: 3,
            name: 'Teclado Mecânico',
            price: 399.90,
            category: 'teclado',
            description: 'Switches Blue, ABNT2, 100% anti-ghosting e iluminação personalizável.',
            image: 'https://placehold.co/600x400/1E1E1E/00f5c3?text=Teclado',
            link: 'SEU_LINK_DO_MERCADO_PAGO_AQUI_3'
        },
        // HEADSET
        {
            id: 4,
            name: 'Headset Gamer 7.1',
            price: 319.90,
            category: 'headset',
            description: 'Som Surround 7.1, microfone com cancelamento de ruído e design confortável.',
            image: 'https://placehold.co/600x400/1E1E1E/00f5c3?text=Headset',
            link: 'SEU_LINK_DO_MERCADO_PAGO_AQUI_4'
        },
        // PLACA DE VÍDEO
        {
            id: 5,
            name: 'Placa de Vídeo RTX 4060 8GB',
            price: 1800.00,
            category: 'placa-video',
            description: 'NVIDIA RTX 4060 8GB, performance ideal para jogos em 1080p.',
            image: 'https://placehold.co/600x400/1E1E1E/00f5c3?text=RTX+4060',
            link: 'SEU_LINK_DO_MERCADO_PAGO_AQUI_5'
        },
        {
            id: 6,
            name: 'Placa de Vídeo RX 6600 8GB',
            price: 1450.00,
            category: 'placa-video',
            description: 'AMD Radeon RX 6600 8GB, ótimo custo-benefício para Full HD.',
            image: 'https://placehold.co/600x400/1E1E1E/00f5c3?text=RX+6600',
            link: 'SEU_LINK_DO_MERCADO_PAGO_AQUI_6'
        },
        // SSD
        {
            id: 7,
            name: 'SSD 1TB NVMe Gen3',
            price: 280.00,
            category: 'ssd',
            description: 'Velocidade de leitura de 2100MB/s e gravação de 1700MB/s.',
            image: 'https://placehold.co/600x400/1E1E1E/00f5c3?text=SSD+1TB',
            link: 'SEU_LINK_DO_MERCADO_PAGO_AQUI_7'
        },
        // ADICIONE SEUS OUTROS 693 PRODUTOS AQUI...
    ];

    // 2. Seleção dos elementos da página
    const grid = document.getElementById('loja-grid');
    const searchBar = document.getElementById('search-bar');
    const categoryFilter = document.getElementById('category-filter');
    const notFoundMessage = document.getElementById('not-found-message');

    // 3. Função para "desenhar" os produtos na tela
    function renderProducts(productsToRender) {
        // Limpa o grid antes de desenhar
        if (!grid) return; // Só roda se o grid existir (nao roda em outras paginas)
        grid.innerHTML = ''; 

        // Verifica se a lista de produtos está vazia
        if (productsToRender.length === 0) {
            notFoundMessage.style.display = 'block'; // Mostra a mensagem
        } else {
            notFoundMessage.style.display = 'none'; // Esconde a mensagem
        }

        // Cria o HTML de cada card
        productsToRender.forEach(product => {
            const card = document.createElement('div');
            card.className = 'produto-card'; // Reutiliza a classe que já criamos
            
            // Formata o preço para R$ 1.800,00
            const precoFormatado = `R$ ${product.price.toFixed(2).replace('.', ',')}`;

            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="produto-info">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <span class="preco">${precoFormatado}</span>
                    <a href="${product.link}" target="_blank" class="btn btn-primary">
                        <i class="fas fa-credit-card"></i> Comprar (Pix ou Cartão)
                    </a>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    // 4. Função principal de filtragem
    function filterAndRender() {
        if (!grid) return; // Se não estamos na loja, não faz nada
        
        const searchTerm = searchBar.value.toLowerCase();
        const selectedCategory = categoryFilter.value;

        // Começa com a lista completa
        let filteredProducts = productDatabase;

        // 1. Filtra por Categoria
        if (selectedCategory !== 'todos') {
            filteredProducts = filteredProducts.filter(product => {
                return product.category === selectedCategory;
            });
        }

        // 2. Filtra por Texto (Busca)
        if (searchTerm) {
            filteredProducts = filteredProducts.filter(product => {
                return product.name.toLowerCase().includes(searchTerm) || 
                       product.description.toLowerCase().includes(searchTerm);
            });
        }

        // 3. Manda desenhar os produtos que sobraram
        renderProducts(filteredProducts);
    }

    // 5. Adiciona os "ouvintes" de evento
    if (searchBar && categoryFilter && grid) {
        // Ouve cada tecla digitada na barra de busca
        searchBar.addEventListener('input', filterAndRender);
        
        // Ouve a mudança no seletor de categoria
        categoryFilter.addEventListener('change', filterAndRender);

        // 6. Renderiza todos os produtos na primeira vez que a página carrega
        renderProducts(productDatabase);
    }

}); // <-- FIM do document.addEventListener('DOMContentLoaded')


