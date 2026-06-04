// * CARDS
let grid;

function renderizarCards() { //Mostra todos os cards no grid
     grid = document.querySelector('#card-grid');
     grid.innerHTML = ''
     let checklists = getAllChecklists(); // Toda vez que tiver conteúdo novo, ela receberá um novo valor

     checklists.forEach((checklist) => {
          let statusAtual = null; // criou ele fora, para dentro das funções ele apenas receber o valor para não repetir sempre o "let"
          let prioridadeAtual = null; //mesma lógica do de cima

          // ? Verificações do Status
          if (checklist.status === 'andamento') {
               statusAtual = `<div class="tag-progresso andamento">
          <svg class="tag-icone" viewBox="0 0 31 35" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M15.5 1V7.6M21.59 10.57L25.795 5.785M24.2 17.5H30M21.59 24.43L25.795 29.215M15.5 27.4V34M5.205 29.215L9.41 24.43M1 17.5H6.8M5.205 5.785L9.41 10.57"
                  stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
          </svg>

          <span class="tag-texto">Andamento</span>
    </div>`

          } else if (checklist.status === 'concluido') {
               statusAtual = ` <div class="tag-progesso concluido">
          <svg class="tag-icone" viewBox="0 0 31 32" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M29.708 13.0051C30.3702 16.367 29.8983 19.8622 28.3709 22.9078C26.8435 25.9533 24.353 28.3652 21.3147 29.7411C18.2764 31.117 14.874 31.3738 11.6748 30.4686C8.47566 29.5635 5.67313 27.5512 3.7346 24.7672C1.79608 21.9833 0.838731 18.5959 1.02222 15.1702C1.2057 11.7444 2.51893 8.48724 4.74289 5.94186C6.96686 3.39649 9.96714 1.71676 13.2434 1.18279C16.5196 0.648826 19.8738 1.2929 22.7466 3.00761M11.1466 14.5051L15.4966 19.0051L29.9966 4.00511"
                   stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
          </svg>


          <span class="tag-texto">Concluído</span>
    </div>`
          } else {
               statusAtual = `
                <div class="tag-progresso nao-iniciada">
          <svg class="tag-icone" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M4.66125 4.66125L22.3375 22.3387M26 13.5C26 20.4036 20.4036 26 13.5 26C6.59644 26 1 20.4036 1 13.5C1 6.59644 6.59644 1 13.5 1C20.4036 1 26 6.59644 26 13.5Z"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>


          <span class="tag-texto">Não iniciada</span>
    </div>
           `
          };

          // ? Verificações da Prioridade

          if (checklist.priority === 'baixa') {
               prioridadeAtual = `
               <div class="tag-prioridade baixa">
          <svg class="tag-icone" viewBox="0 0 29 33" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M0.600098 31.6V3.69998C0.600098 3.45935 0.661092 3.22202 0.778252 3.00679C0.895411 2.79157 1.06552 2.60435 1.2751 2.45998C3.0277 1.25263 5.15935 0.599976 7.3501 0.599976C12.4126 0.599976 15.7876 3.69998 19.7245 3.69998C21.9745 3.69998 23.6997 3.28664 24.9001 2.45998C25.1508 2.28726 25.4489 2.18209 25.7611 2.15624C26.0732 2.13039 26.387 2.18488 26.6673 2.31361C26.9476 2.44235 27.1833 2.64023 27.3481 2.88509C27.5128 3.12996 27.6001 3.41212 27.6001 3.69998V19.2C27.6001 19.4406 27.5391 19.6779 27.4219 19.8932C27.3048 20.1084 27.1347 20.2956 26.9251 20.44C25.1725 21.6473 23.0408 22.3 20.8501 22.3C15.7876 22.3 12.4126 19.2 7.3501 19.2C4.85955 19.2 2.45639 20.0432 0.600098 21.5684" 
              stroke="currentColor"  stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span class="tag-texto">Baixa</span>
     </div>
               `
          } else if (checklist.priority === 'media') {
               prioridadeAtual = `
                <div class="tag-prioridade media">
          <svg class="tag-icone" viewBox="0 0 29 33" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M0.600098 31.6V3.69998C0.600098 3.45935 0.661092 3.22202 0.778252 3.00679C0.895411 2.79157 1.06552 2.60435 1.2751 2.45998C3.0277 1.25263 5.15935 0.599976 7.3501 0.599976C12.4126 0.599976 15.7876 3.69998 19.7245 3.69998C21.9745 3.69998 23.6997 3.28664 24.9001 2.45998C25.1508 2.28726 25.4489 2.18209 25.7611 2.15624C26.0732 2.13039 26.387 2.18488 26.6673 2.31361C26.9476 2.44235 27.1833 2.64023 27.3481 2.88509C27.5128 3.12996 27.6001 3.41212 27.6001 3.69998V19.2C27.6001 19.4406 27.5391 19.6779 27.4219 19.8932C27.3048 20.1084 27.1347 20.2956 26.9251 20.44C25.1725 21.6473 23.0408 22.3 20.8501 22.3C15.7876 22.3 12.4126 19.2 7.3501 19.2C4.85955 19.2 2.45639 20.0432 0.600098 21.5684" 
              stroke="currentColor"  stroke-linecap="round" stroke-linejoin="round"/>
          </svg>

          <span class="tag-texto">Média</span>
    </div>
               `
          } else {
               prioridadeAtual = `
                <div class="tag-prioridade alta">   
                 <svg class="tag-icone" viewBox="0 0 29 33" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M0.600098 31.6V3.69998C0.600098 3.45935 0.661092 3.22202 0.778252 3.00679C0.895411 2.79157 1.06552 2.60435 1.2751 2.45998C3.0277 1.25263 5.15935 0.599976 7.3501 0.599976C12.4126 0.599976 15.7876 3.69998 19.7245 3.69998C21.9745 3.69998 23.6997 3.28664 24.9001 2.45998C25.1508 2.28726 25.4489 2.18209 25.7611 2.15624C26.0732 2.13039 26.387 2.18488 26.6673 2.31361C26.9476 2.44235 27.1833 2.64023 27.3481 2.88509C27.5128 3.12996 27.6001 3.41212 27.6001 3.69998V19.2C27.6001 19.4406 27.5391 19.6779 27.4219 19.8932C27.3048 20.1084 27.1347 20.2956 26.9251 20.44C25.1725 21.6473 23.0408 22.3 20.8501 22.3C15.7876 22.3 12.4126 19.2 7.3501 19.2C4.85955 19.2 2.45639 20.0432 0.600098 21.5684" 
              stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>

          <span class="tag-texto">Alta</span>
    </div>
               `
          }

          // aqui exibe, de fato, cada card no Grid.
          grid.insertAdjacentHTML('beforeend', `
          <article class="card" data-id=${checklist.id} data-status=${checklist.status}>
          <div class="card-content">
               <div class="card-superior">
                    <div class="superior-grupo">
                         <h3 class="card-titulo">${checklist.title}</h3>
                         <div class="opcoes-icon"> 
                              <div class="opcoes-circulo"></div>
                              <div class="opcoes-circulo"></div>
                              <div class="opcoes-circulo"></div>
                         </div>
                    </div>
                    <div class="card-status">
                         ${statusAtual} 
                         ${prioridadeAtual} 
                    </div>
                    <div class="submenu-grupo invisible">
                         <button class="submenu-opts" id="editarCard" data-acao="editar">
                              <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
                                   <path d="M11 2l3 3-8 8H3v-3l8-8z" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                              </svg>
                              Editar
                         </button>
                         <div class="submenu-sep"></div>
                         <button class="submenu-opts" id="excluirCard" data-acao="excluir">
                              <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
                                   <path d="M2 4h12M5 4V2h6v2M6 7v5M10 7v5M3 4l1 9h8l1-9" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                              </svg>
                              Excluir
                         </button>
                    </div>
               </div>
               <div class="card-inferior">
                    <div class="progresso-wrapper">
                         <span class="progresso-label">${checklist.progress}%</span>
                         <div class="progresso-track">
                              <div class="barra-preenchimento" style="width: ${checklist.progress}%"></div>
                         </div>
                    </div> 
                         <div class="card-data">
                              <span>Última atualização:</span>
                              <span class="card-date">${checklist.updateAt}</span>
                    </div>
               </div>
          </div>
     </article>`
          );

          const cardAtual = grid.lastElementChild;
          renderizarProgresso(checklist, cardAtual);
 
          // * Submenu — abrir/fechar
          cardAtual.querySelector('.opcoes-icon').addEventListener('click', function (event) {
               event.stopPropagation();
               document.querySelectorAll('.submenu-grupo').forEach((submenu) => {
                    submenu.classList.add('invisible');
               });
               cardAtual.querySelector('.submenu-grupo').classList.remove('invisible');
          });
 
          // * Botão Excluir — abre modal de confirmação
          cardAtual.querySelector('[data-acao="excluir"]').addEventListener('click', function (event) {
               event.stopPropagation();
               const id = cardAtual.dataset.id;
               const titulo = checklist.title;
               abrirModalExclusao(id, titulo);
          });
          // * Botão Editar — redireciona para o manager com o id do checklist
               cardAtual.querySelector('[data-acao="editar"]').addEventListener('click', function (event) {
               event.stopPropagation();
               const id = cardAtual.dataset.id;
                window.location.href = `manager.html?id=${id}`;
          });
 
          document.addEventListener('click', () => {
               cardAtual.querySelector('.submenu-grupo').classList.add('invisible');
          });

          // Clique no card abre o modal de detalhes
          cardAtual.addEventListener('click', (event) => {
               if (event.target.closest('.submenu-grupo')) return;
               if (event.target.closest('[data-acao="excluir"]')) return;
               if (event.target.closest('.opcoes-icon')) return;

               const id = cardAtual.dataset.id;
               if (!id) return;
               abrirModalDetalhes(id);
          });
     });
};

 
 
// =============================================
//   MODAL DE CONFIRMAÇÃO DE EXCLUSÃO
// =============================================
 
function abrirModalExclusao(id, titulo) {
     const modal = document.createElement('div');
     modal.classList.add('modal-overlay');
     modal.innerHTML = `
          <div class="modal-caixa">
               <h3 class="modal-titulo">Excluir checklist?</h3>
               <p class="modal-descricao">Tem certeza que deseja excluir <strong>"${titulo}"</strong>? Essa ação não pode ser desfeita.</p>
               <div class="modal-acoes">
                    <button class="modal-btn cancelar" id="modal-cancelar">Cancelar</button>
                    <button class="modal-btn confirmar" id="modal-confirmar">Excluir</button>
               </div>
          </div>
     `;
 
     document.body.appendChild(modal);

     requestAnimationFrame(() => modal.classList.add('visivel'));
 
     modal.querySelector('#modal-cancelar').addEventListener('click', () => {
          fecharModal(modal);
     });

     modal.querySelector('#modal-confirmar').addEventListener('click', () => {
          deleteCheckLists(id);
          fecharModal(modal);
          renderizarCards();
          renderizarGraficos();
     });
 
     modal.addEventListener('click', (event) => {
          if (event.target === modal) fecharModal(modal);
     });
}
 
function fecharModal(modal) {
     modal.classList.remove('visivel');
     modal.addEventListener('transitionend', () => modal.remove(), { once: true });
}
 

// * Botões de filtro — inicializados dentro do DOMContentLoaded para garantir DOM pronto
function inicializarFiltros() {
     const filtroTodos        = document.querySelector('#filtro-todos');
     const filtroConcluido    = document.querySelector('#filtro-concluidos');
     const filtroAndamento    = document.querySelector('#filtro-andamento');
     const filtroNaoIniciados = document.querySelector('#filtro-nao-iniciados');
     const searchBar          = document.querySelector('#search-bar');

     const botoes = [filtroTodos, filtroConcluido, filtroAndamento, filtroNaoIniciados].filter(Boolean);

     function setFiltroAtivo(botao) {
          botoes.forEach(b => b.classList.remove('ativo'));
          botao.classList.add('ativo');
     }

     filtroTodos?.addEventListener('click', () => {
          setFiltroAtivo(filtroTodos);
          document.querySelectorAll('.card').forEach(c => c.classList.remove('invisible'));
     });

     filtroConcluido?.addEventListener('click', () => {
          setFiltroAtivo(filtroConcluido);
          document.querySelectorAll('.card').forEach(c =>
               c.classList.toggle('invisible', c.dataset.status !== 'concluido'));
     });

     filtroAndamento?.addEventListener('click', () => {
          setFiltroAtivo(filtroAndamento);
          document.querySelectorAll('.card').forEach(c =>
               c.classList.toggle('invisible', c.dataset.status !== 'andamento'));
     });

     filtroNaoIniciados?.addEventListener('click', () => {
          setFiltroAtivo(filtroNaoIniciados);
          document.querySelectorAll('.card').forEach(c =>
               c.classList.toggle('invisible', c.dataset.status !== 'nao-iniciada'));
     });

     searchBar?.addEventListener('keyup', () => {
          const searchItem = searchBar.value.toLowerCase();
          document.querySelectorAll('.card').forEach(card => {
               const titulo = card.querySelector('.card-titulo').textContent.toLowerCase();
               const original = card.querySelector('.card-titulo').textContent;
               if (titulo.includes(searchItem)) {
                    card.classList.remove('invisible');
                    const marcado = original.replace(new RegExp(searchItem, 'gi'), m =>
                         `<span style="color:var(--cor-marca-principal)">${m}</span>`);
                    card.querySelector('.card-titulo').innerHTML = marcado;
               } else {
                    card.classList.add('invisible');
               }
          });
     });
}


// =============================================
//   GRÁFICOS
// =============================================

function renderizarGraficos() {
     const checklists = getAllChecklists();
     renderizarGraficoProgresso(checklists);
     renderizarGraficoStatus(checklists);
}

function renderizarGraficoProgresso(checklists) {
     const container = document.getElementById('grafico-progresso');
     if (!container) return;

     if (checklists.length === 0) {
          container.innerHTML = '<p style="color:var(--texto-hierarquia-2);font-size:var(--text-sm);text-align:center;padding:40px 0;">Nenhum dado ainda.</p>';
          return;
     }

     const lista = [...checklists].reverse().slice(0, 5);
     container.innerHTML = lista.map(cl => {
          const progress = cl.progress || 0;
          const cor = progress === 100 ? '#5cb85c' : 'var(--cor-marca-principal)';
          const largura = Math.max(progress, 4);
          return `
          <div class="grafico-barra-h-item">
               <span class="grafico-barra-h-label" title="${cl.title}">${cl.title}</span>
               <div class="grafico-barra-h-track">
                    <div class="grafico-barra-h-fill" style="width:${largura}%;background:${cor};">
                         ${progress >= 20 ? `<span>${progress}%</span>` : ''}
                    </div>
               </div>
               ${progress < 20 ? `<span style="font-size:10px;font-weight:700;color:var(--texto-hierarquia-1);margin-left:6px;flex-shrink:0;">${progress}%</span>` : ''}
          </div>`;
     }).join('');
}

function renderizarGraficoStatus(checklists) {
     const container = document.getElementById('grafico-status');
     if (!container) return;

     const contagem = { concluido: 0, andamento: 0, 'nao-iniciada': 0 };
     checklists.forEach(cl => {
          const s = cl.status || 'nao-iniciada';
          if (contagem[s] !== undefined) contagem[s]++;
          else contagem['nao-iniciada']++;
     });

     const maxVal = Math.max(...Object.values(contagem), 1);
     const alturaMaxima = 110;

     const keys   = ['concluido', 'andamento', 'nao-iniciada'];
     const labels = ['Concluído', 'Em andamento', 'Não iniciado'];
     const cores  = ['#5cb85c', 'var(--cor-marca-principal)', '#b0b0b0'];

     container.innerHTML = `
     <div class="grafico-barras-v">
          ${keys.map((k, i) => {
               const h = Math.round((contagem[k] / maxVal) * alturaMaxima);
               return `
               <div class="grafico-barra-v-item">
                    <span class="grafico-barra-v-valor">${contagem[k]}</span>
                    <div class="grafico-barra-v-track" style="height:${h}px;background:${cores[i]};"></div>
                    <span class="grafico-barra-v-label">${labels[i]}</span>
               </div>`;
          }).join('')}
     </div>`;
}


// =============================================
//   MODAL DE DETALHES DO CHECKLIST
// =============================================

function formatarDataModal(iso) {
     if (!iso) return '—';
     const d = new Date(iso);
     if (isNaN(d)) return iso;
     return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }) +
          ' ' + d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

function tagStatusModal(status) {
     const map = {
          andamento: { label: 'Andamento', cls: 'andamento' },
          concluido: { label: 'Concluído', cls: 'concluido' },
          'nao-iniciada': { label: 'Não iniciada', cls: 'nao-iniciada' },
     };
     const s = map[status] || map['nao-iniciada'];
     return `<span class="tag-progresso ${s.cls}"><span class="tag-texto">${s.label}</span></span>`;
}

function tagPrioridadeModal(priority) {
     const map = {
          baixa: 'Baixa', media: 'Média', alta: 'Alta',
     };
     const p = priority || 'baixa';
     const label = map[p] || 'Baixa';
     const svgBandeira = `<svg class="tag-icone" viewBox="0 0 29 33" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.600098 31.6V3.69998C0.600098 3.45935 0.661092 3.22202 0.778252 3.00679C0.895411 2.79157 1.06552 2.60435 1.2751 2.45998C3.0277 1.25263 5.15935 0.599976 7.3501 0.599976C12.4126 0.599976 15.7876 3.69998 19.7245 3.69998C21.9745 3.69998 23.6997 3.28664 24.9001 2.45998C25.1508 2.28726 25.4489 2.18209 25.7611 2.15624C26.0732 2.13039 26.387 2.18488 26.6673 2.31361C26.9476 2.44235 27.1833 2.64023 27.3481 2.88509C27.5128 3.12996 27.6001 3.41212 27.6001 3.69998V19.2C27.6001 19.4406 27.5391 19.6779 27.4219 19.8932C27.3048 20.1084 27.1347 20.2956 26.9251 20.44C25.1725 21.6473 23.0408 22.3 20.8501 22.3C15.7876 22.3 12.4126 19.2 7.3501 19.2C4.85955 19.2 2.45639 20.0432 0.600098 21.5684"
          stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
     return `<span class="tag-prioridade ${p}">${svgBandeira}<span class="tag-texto">${label}</span></span>`;
}

function renderizarTasksModal(checklist, container) {
     const tasks = checklist.tasks || [];
     if (tasks.length === 0) {
          container.innerHTML = '<p style="color:var(--texto-hierarquia-2); font-size:var(--text-sm); text-align:center; padding: 20px 0;">Nenhuma tarefa criada.</p>';
          return;
     }

     container.innerHTML = tasks.map((task, idx) => {
          const done = !!task.completed;
          const p = task.priority || 'baixa';
          const labelP = { baixa: 'Baixa', media: 'Média', alta: 'Alta' }[p] || 'Baixa';
          const svgCheck = `<svg viewBox="0 0 16 16" width="16" height="16" fill="none">
               <path d="M3 8l3.5 3.5L13 4" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>`;

          return `
          <div class="modal-task-item" data-task-id="${task.id}" data-done="${done}">
               <div class="modal-task-linha" style="display:flex; align-items:flex-start; gap:14px;">
                    <div class="modal-task-conector" style="display:flex; flex-direction:column; align-items:center; flex-shrink:0;">
                         <button class="modal-task-check ${done ? 'checked' : ''}" data-task-id="${task.id}" aria-label="Marcar tarefa" style="
                              width:28px; height:28px; border-radius:50%; border: 2px solid ${done ? '#5cb85c' : 'var(--toggle-bg)'};
                              background: ${done ? '#5cb85c' : 'transparent'};
                              display:flex; align-items:center; justify-content:center;
                              cursor:pointer; flex-shrink:0; transition: all 0.2s;
                         ">${done ? svgCheck : ''}</button>
                         ${idx < tasks.length - 1 ? `<div style="width:2px; min-height:32px; background: var(--borda-separador); margin-top:4px; flex:1;"></div>` : ''}
                    </div>
                    <div style="flex:1; min-width:0; padding-bottom: ${idx < tasks.length - 1 ? '20px' : '0'};">
                         <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:8px;">
                              <span class="modal-task-titulo" style="
                                   font-weight:600; font-size:var(--text-base);
                                   color: ${done ? 'var(--texto-desabilitado)' : 'var(--texto-principal)'};
                                   text-decoration: ${done ? 'line-through' : 'none'};
                                   word-break: break-word;
                              ">${task.title || 'Sem título'}</span>
                              <span class="tag-prioridade ${p}" style="flex-shrink:0; font-size:var(--text-xs);">
                                   <span class="tag-texto">${labelP}</span>
                              </span>
                         </div>
                         ${task.description ? `<p style="margin-top:6px; font-size:var(--text-sm); color:var(--texto-hierarquia-2); line-height:1.6;">${task.description}</p>` : ''}
                    </div>
               </div>
          </div>`;
     }).join('');

     // eventos de toggle nas tasks
     container.querySelectorAll('.modal-task-check').forEach(btn => {
          btn.addEventListener('click', (e) => {
               e.stopPropagation();
               toggleTaskModal(checklist.id, btn.dataset.taskId, container);
          });
     });
}

function toggleTaskModal(checklistId, taskId, container) {
     const checklists = getAllChecklists();
     const cl = checklists.find(c => c.id === checklistId);
     if (!cl) return;

     const tasks = cl.tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t);
     const progress = calcularProgresso(tasks);
     const allDone = tasks.length > 0 && tasks.every(t => t.completed);
     const status = allDone ? 'concluido' : 'andamento';

     updateCheckList(checklistId, { tasks, progress, status });

     // atualiza o modal sem fechar
     const clAtualizado = getAllChecklists().find(c => c.id === checklistId);
     if (!clAtualizado) return;

     // rebuildas as tasks
     renderizarTasksModal(clAtualizado, container);

     // atualiza progresso e contador no modal
     const overlay = document.querySelector('.modal-overlay.modal-detalhes');
     if (overlay) {
          const barra = overlay.querySelector('.modal-det-barra');
          const label = overlay.querySelector('.modal-det-progresso-label');
          const contador = overlay.querySelector('.modal-det-contador');
          const concluidas = tasks.filter(t => t.completed).length;
          if (barra) barra.style.width = progress + '%';
          if (label) label.textContent = progress + '%';
          if (contador) contador.textContent = `${concluidas}/${tasks.length} tarefas concluídas`;
     }

     // rebuildas os cards no fundo
     renderizarCards();
     renderizarGraficos();
}

function abrirModalDetalhes(id) {
     const checklist = getAllChecklists().find(c => c.id === id);
     if (!checklist) return;

     const tasks = checklist.tasks || [];
     const concluidas = tasks.filter(t => t.completed).length;
     const progress = checklist.progress || 0;

     const modal = document.createElement('div');
     modal.classList.add('modal-overlay', 'modal-detalhes');
     modal.innerHTML = `
          <div class="modal-caixa modal-det-caixa">

               <!-- Cabeçalho -->
               <div class="modal-det-header">
                    <div style="flex:1; min-width:0;">
                         <h2 class="modal-det-titulo">${checklist.title || 'Checklist'}</h2>
                         <div class="modal-det-tags">
                              ${tagStatusModal(checklist.status)}
                              ${tagPrioridadeModal(checklist.priority)}
                         </div>
                    </div>
                    <div style="display:flex; gap:8px; align-items:center; flex-shrink:0;">
                         <button class="modal-btn-opcoes" id="modal-det-editar" title="Editar">
                              Opções
                              <svg viewBox="0 0 20 5" width="18" height="5" fill="none">
                                   <circle cx="2.5" cy="2.5" r="2.5" fill="currentColor"/>
                                   <circle cx="10" cy="2.5" r="2.5" fill="currentColor"/>
                                   <circle cx="17.5" cy="2.5" r="2.5" fill="currentColor"/>
                              </svg>
                         </button>
                         <button class="modal-btn-fechar" id="modal-det-fechar" aria-label="Fechar">
                              <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
                                   <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                              </svg>
                         </button>
                    </div>
               </div>

               <!-- Metadados -->
               <div class="modal-det-meta">
                    <div class="modal-det-meta-row">
                         <span class="modal-det-meta-icon">
                              <svg viewBox="0 0 18 18" width="15" height="15" fill="none"><rect x="1" y="3" width="16" height="14" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M1 7h16M6 1v4M12 1v4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
                         </span>
                         <span class="modal-det-meta-label">Criada</span>
                         <span class="modal-det-meta-valor">${formatarDataModal(checklist.createdAt)}</span>
                    </div>
                    <div class="modal-det-meta-row">
                         <span class="modal-det-meta-icon">
                              <svg viewBox="0 0 18 18" width="15" height="15" fill="none"><path d="M9 1v8l4 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="9" cy="9" r="8" stroke="currentColor" stroke-width="1.5"/></svg>
                         </span>
                         <span class="modal-det-meta-label">Status</span>
                         <span class="modal-det-meta-valor">${tagStatusModal(checklist.status)}</span>
                    </div>
                    <div class="modal-det-meta-row">
                         <span class="modal-det-meta-icon">
                              <svg viewBox="0 0 29 33" width="13" height="15" fill="none"><path d="M0.6 31.6V3.7c0-.24.06-.48.18-.69.12-.22.29-.4.49-.54C3.03 1.25 5.16.6 7.35.6c5.06 0 8.44 3.1 12.37 3.1 2.25 0 3.97-.41 5.17-1.24a1.1 1.1 0 011.63.85v15.5c0 .24-.06.48-.18.69-.12.22-.29.4-.49.54C24.17 21.65 22.04 22.3 19.85 22.3c-5.06 0-8.44-3.1-12.5-3.1-2.49 0-4.89.84-6.75 2.37" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg>
                         </span>
                         <span class="modal-det-meta-label">Prioridade</span>
                         <span class="modal-det-meta-valor">${tagPrioridadeModal(checklist.priority)}</span>
                    </div>
                    <div class="modal-det-meta-row">
                         <span class="modal-det-meta-icon">
                              <svg viewBox="0 0 18 18" width="15" height="15" fill="none"><rect x="1" y="3" width="16" height="14" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M1 7h16M6 1v4M12 1v4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
                         </span>
                         <span class="modal-det-meta-label">Término</span>
                         <span class="modal-det-meta-valor">${checklist.deadline ? formatarDataModal(checklist.deadline + 'T00:00:00') : '—'}</span>
                    </div>
                    ${checklist.area ? `
                    <div class="modal-det-meta-row">
                         <span class="modal-det-meta-icon">
                              <svg viewBox="0 0 18 18" width="15" height="15" fill="none"><circle cx="9" cy="9" r="8" stroke="currentColor" stroke-width="1.5"/><path d="M9 5v4l3 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
                         </span>
                         <span class="modal-det-meta-label">Área</span>
                         <span class="modal-det-meta-valor">${checklist.area}</span>
                    </div>` : ''}
               </div>

               <!-- Progresso -->
               <div class="modal-det-progresso-area">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                         <span class="modal-det-progresso-label">${progress}%</span>
                         <span class="modal-det-contador" style="font-size:var(--text-sm); color:var(--texto-hierarquia-2);">${concluidas}/${tasks.length} tarefas concluídas</span>
                    </div>
                    <div class="progresso-track">
                         <div class="barra-preenchimento modal-det-barra" style="width:${progress}%"></div>
                    </div>
               </div>

               <!-- Divisor -->
               <div style="height:1px; background:var(--borda-separador); margin: 4px 0 16px;"></div>

               <!-- Lista de tasks -->
               <div class="modal-det-tasks" id="modal-det-tasks-container"></div>
          </div>
     `;

     document.body.appendChild(modal);
     requestAnimationFrame(() => modal.classList.add('visivel'));

     // renderiza as tasks dentro do modal
     renderizarTasksModal(checklist, modal.querySelector('#modal-det-tasks-container'));

     // fechar
     modal.querySelector('#modal-det-fechar').addEventListener('click', () => fecharModal(modal));
     modal.addEventListener('click', (e) => { if (e.target === modal) fecharModal(modal); });

     
     // Opções — abre submenu com Editar e Excluir
          const btnOpcoes = modal.querySelector('#modal-det-editar');
          const submenu = document.createElement('div');
          submenu.className = 'menu-opcoes invisible';
          submenu.innerHTML = `
               <button class="submenu-opts" data-acao="editar">
                    <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
                         <path d="M11 2l3 3-8 8H3v-3l8-8z" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Editar
               </button>
               <div class="submenu-sep"></div>
               <button class="submenu-opts" data-acao="excluir">
                    <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
                         <path d="M2 4h12M5 4V2h6v2M6 7v5M10 7v5M3 4l1 9h8l1-9" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Excluir
               </button>
          `;
          btnOpcoes.style.position = 'relative';
          btnOpcoes.appendChild(submenu);

          btnOpcoes.addEventListener('click', (e) => {
               e.stopPropagation();
               submenu.classList.toggle('invisible');
          });

          submenu.querySelector('[data-acao="editar"]').addEventListener('click', () => {
               window.location.href = `manager.html?id=${id}`;
          });

          submenu.querySelector('[data-acao="excluir"]').addEventListener('click', () => {
               fecharModal(modal);
               abrirModalExclusao(id, checklist.title);
          });

          document.addEventListener('click', () => {
               submenu.classList.add('invisible');
          }, { once: true });
               };
     


// * CONTENT LOADED
document.addEventListener('DOMContentLoaded', () => {
     renderizarCards();
     inicializarFiltros();
     renderizarGraficos();
});