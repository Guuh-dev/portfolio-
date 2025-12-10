(function() {
    // Variáveis
    const idadeInput = document.getElementById('idade-input');
    const verificarBtn = document.getElementById('verificar-btn');
    const resultadoP = document.getElementById('resultado-idade');
    const listaContainer = document.getElementById('lista-sonhos');
    const cardsContainer = document.getElementById('cards-container');
    const inputTarefa = document.getElementById('nova-tarefa-input');
    const adicionarBtn = document.getElementById('adicionar-btn');
    const listaTarefasUL = document.getElementById('lista-tarefas'); 

    let tarefas = [];
    if (typeof localStorage !== 'undefined') {
        tarefas = JSON.parse(localStorage.getItem('tarefasSalvas')) || [];
    }

    const sonhosLista = [
        "Buy A M5 Competition",
        "Gaming Pc (Ryzen 9800x3d, RTX 5090)",
        "Complete Ecossytem of Samsung",
        "Buy a house for my parents"
    ];

    const dadosProjetos = [
        { titulo: "Personal Website", descricao: "My First Portifolio.", cor: "#ffc107" },
        { titulo: "Theme Changer", descricao: "Project with LocalStorage.", cor: "#17a2b8" },
        { titulo: "Age Verificator", descricao: "First use of IF/ELSE.", cor: "#28a745" },
        { titulo: "Reponsive Design", descricao: "Testing layouts for Mobile Phones .", cor: "#dc3545" }, 
        { titulo: "My Dream Setup", descricao: "Detailed list of Hardware.", cor: "#6f42c1" }
    ];

    // Funções
    function verificarPermissao() {
        if (!idadeInput || !resultadoP) return;
        
        const idade = Number(idadeInput.value); 
        const idadeMinima = 18;

        if (idade >= idadeMinima) {
            resultadoP.textContent = 'Acesso Liberado! 🎉';
            resultadoP.style.color = 'green';
        } else if (idade < idadeMinima && idade > 0) {
            resultadoP.textContent = 'Acesso Bloqueado. Você precisa de ' + (idadeMinima - idade) + ' anos a mais.';
            resultadoP.style.color = 'orange';
        } else {
            resultadoP.textContent = 'Por favor, digite uma idade válida.';
            resultadoP.style.color = 'red';
        }
    }

    function criarCardGenerico(titulo, descricao, corFundo) {
        if (!cardsContainer) return;

        const card = document.createElement('div');
        card.classList.add('projeto-card');
        card.style.backgroundColor = corFundo;

        const tituloEl = document.createElement('h3');
        tituloEl.textContent = titulo;
        const descricaoEl = document.createElement('p');
        descricaoEl.textContent = descricao;

        card.appendChild(tituloEl);
        card.appendChild(descricaoEl);
        cardsContainer.appendChild(card);
    }

    function exibirListaSonhos() {
        if (!listaContainer) return;
        
        listaContainer.innerHTML = ''; 
        sonhosLista.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            if(item === "Buy a house for my parents") {
                // Seu JS original usa "Comprar uma casa 'foda' para os meus pais" para estilizar. 
                // Adaptado para a versão em inglês:
                li.style.color = 'red';
                li.style.fontWeight = 'bold';
                li.style.borderLeft = '3px solid red';
            }
            listaContainer.appendChild(li);
        });
    }

    function salvarTarefas() {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('tarefasSalvas', JSON.stringify(tarefas));
        }
    }

    function renderizarTarefas() {
        if (!listaTarefasUL) return;

        listaTarefasUL.innerHTML = '';
        tarefas.forEach((tarefa, idx) => {
            const li = document.createElement('li');
            const span = document.createElement('span');
            span.textContent = tarefa;
            const btn = document.createElement('button');
            btn.textContent = 'Remover';
            btn.classList.add('remover-btn');
            btn.dataset.index = idx;

            li.appendChild(span);
            li.appendChild(btn);
            listaTarefasUL.appendChild(li);
        });
    }

    function adicionarTarefa() {
        if (!inputTarefa) return;
        
        const texto = inputTarefa.value.trim();
        if(texto) {
            tarefas.push(texto);
            inputTarefa.value = '';
            renderizarTarefas();
            salvarTarefas();
        }
    }

    function removerTarefa(e) {
        if(e.target.classList.contains('remover-btn')) {
            const idx = e.target.dataset.index;
            tarefas.splice(idx, 1);
            renderizarTarefas();
            salvarTarefas();
        }
    }

    function inicializarCards() {
        dadosProjetos.forEach(proj => criarCardGenerico(proj.titulo, proj.descricao, proj.cor));
    }

  
    if (verificarBtn) verificarBtn.addEventListener('click', verificarPermissao);
    if (adicionarBtn) adicionarBtn.addEventListener('click', adicionarTarefa);
    if (listaTarefasUL) listaTarefasUL.addEventListener('click', removerTarefa);

  
    exibirListaSonhos();
    inicializarCards();
    renderizarTarefas();
})();
