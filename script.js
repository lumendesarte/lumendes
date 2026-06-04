// função de filtragem:
function filterSelection(categoria) {
    const currentPage = window.location.pathname;
    const isOnIndex = currentPage.endsWith("index.html") || currentPage === "/" || currentPage === "/seu-caminho/index.html"; // ajuste conforme necessário

    if (!isOnIndex && !window.location.search.includes("filter=")) {
        window.location.href = "/?filter=" + categoria;
        return;
    }

    var projetos = document.getElementsByClassName('thumbnail');

    if (categoria == 'todos') categoria = '';

    for (var i = 0; i < projetos.length; i++) {
        if (projetos[i].className.indexOf(categoria) > -1) {
            projetos[i].style.display = "block";
        } else {
            projetos[i].style.display = "none";
        }
    }
    const newUrl = categoria ? `/?filter=${categoria}` : "/";
    history.pushState(null, "", newUrl);
}

// Na página index.html, ao carregar a página, verificar o parâmetro e aplicar o filtro:
document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const filterParam = urlParams.get("filter");
    if (filterParam) {
        filterSelection(filterParam);
    }
});

//exibição do submenu
// Seleciona o botão de "Portfolio" e o submenu
const portfolioButton = document.querySelector('.dropdown');

// Adiciona um evento de clique ao botão
portfolioButton.addEventListener('click', function (event) {
    event.stopPropagation();

    portfolioButton.classList.toggle('open');
});

// Fecha o submenu se o usuário clicar fora dele
document.addEventListener('click', function (event) {
    if (!portfolioButton.contains(event.target)) {
        portfolioButton.classList.remove('open');
    }
});

// navegação dos botoes sobre e contato
document.querySelector(".btn-sobre").addEventListener("click", function () {
    window.location.href = "/sobre";
});

document.querySelector(".btn-contato").addEventListener("click", function () {
    window.location.href = "/contato";
});

// botoes ativos
document.addEventListener("DOMContentLoaded", function () {
    const currentPage = window.location.pathname;

    if (
        currentPage === "/" ||
        currentPage.endsWith("/index.html") ||
        currentPage.endsWith("/index")
    ) {
        const portfolioButton = document.querySelector("li.dropdown > button.dropbtn");
        if (portfolioButton) {
            portfolioButton.classList.add("active");
        }
    } else if (currentPage.includes("/sobre")) {
        document.querySelector(".btn-sobre")?.classList.add("active");
    } else if (currentPage.includes("/contato")) {
        document.querySelector(".btn-contato")?.classList.add("active");
    }
});

// galeria
function openContent(id) {
    document.getElementById(id).style.display = 'block';
    document.body.classList.add('no-scroll'); /* Desativa o scroll */
    const newUrl = `${window.location.pathname}?content=${encodeURIComponent(id)}`;
    history.pushState(null, '', newUrl);
}

function closeContent(id) {
    document.getElementById(id).style.display = 'none';
    document.body.classList.remove('no-scroll'); /* Reativa o scroll */
    history.pushState(null, '', window.location.pathname);
}

window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const contentId = urlParams.get('content');
    if (contentId) {
        const decodedId = decodeURIComponent(contentId);
        const contentElement = document.getElementById(decodedId);
        if (contentElement) {
            openContent(decodedId);
        }
    }
};

// botão voltar
window.onpopstate = function(event) {
    const urlParams = new URLSearchParams(window.location.search);
    const contentId = urlParams.get('content');

    // Fecha todos os conteúdos abertos
    const expandedContents = document.getElementsByClassName('expanded-content');
    for (let i = 0; i < expandedContents.length; i++) {
        expandedContents[i].style.display = 'none';
    }
    document.body.classList.remove('no-scroll');

    if (contentId) {
        const decodedId = decodeURIComponent(contentId);
        const contentElement = document.getElementById(decodedId);
        if (contentElement) {
            openContent(decodedId);
        }
    }
};

// Fechar ao clicar fora do conteúdo
window.onclick = function (event) {
    const expandedContents = document.getElementsByClassName('expanded-content');
    for (let i = 0; i < expandedContents.length; i++) {
        if (event.target == expandedContents[i]) {
            closeContent(expandedContents[i].id);
        }
    }
};

// mensagens do formulário
const form = document.getElementById('contactForm');
form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const statusDiv = document.getElementById('mensagem-status');
    const formData = new FormData(form);

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            statusDiv.innerHTML = "✅ Mensagem enviada com sucesso!";
            form.reset();
        } else {
            statusDiv.innerHTML = "❌ Erro ao enviar a mensagem. Tente novamente ou envie diretamente para lumendesarte.contato@gmail.com";
        }
    } catch (error) {
        statusDiv.innerHTML = "❌ Erro ao enviar a mensagem. Tente novamente ou envie diretamente para lumendesarte.contato@gmail.com";
        console.error(error);
    }
});
