// =============================================================
// manager.js
// Depende de storage.js carregado antes no HTML:
//   <script src="assets/js/storage.js" defer></script>
//   <script src="assets/js/manager.js" defer></script>
// =============================================================

let checklistId  = null; // id do checklist sendo editado
let taskSelecionada = null; // id da task com foco no painel direito

// ─── Init ────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const idUrl  = params.get('id');

  if (idUrl) {
    // Modo edição — carrega checklist existente
    const todos = getAllChecklists();
    const existente = todos.find(c => c.id === idUrl);
    if (existente) {
      checklistId = existente.id;
      const prioridadeValue = existente.priority === 'média' ? 'media' : (existente.priority || 'baixa');
      document.getElementById('prioridade').value = prioridadeValue;
      atualizarBandeiraPrioridade(document.getElementById('prioridade'));
      document.getElementById('stack').value      = existente.area      || '';
      document.getElementById('prazo').value      = existente.deadline  || '';
      const h2 = document.getElementById('checklist-titulo');
      if (h2) h2.textContent = existente.title || 'Editar checklist';
      renderizarTasks(existente.tasks || []);
      if (existente.tasks && existente.tasks.length > 0) {
        selecionarTask(existente.tasks[0].id);
      }
    }
  }
  // Modo criação — checklistId fica null até salvar

  configurarPainelDireito();
  configurarDarkMode();
  document.getElementById('btn-save')?.addEventListener('click', salvarEVoltar);
  atualizarContadorDescricao();

  if (!taskSelecionada) {
    setPainelAtivo(false);
  }
});

function configurarPainelDireito() {
  ['titulo', 'descricao', 'nivel-prioridade', 'prioridade'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', () => {
        if (id !== 'prioridade') {
          sincronizarDetalhe();
        }
        if (id === 'descricao') atualizarContadorDescricao();
        if (id === 'nivel-prioridade' || id === 'prioridade') atualizarBandeiraPrioridade(el);
      });
    }
  });
}

function atualizarBandeiraPrioridade(select) {
  if (!select) return;
  const wrapper = select.closest('.priority-select-wrapper');
  if (!wrapper) return;
  wrapper.classList.remove('alta', 'media', 'baixa');
  const value = normalizarPrioridade(select.value);
  wrapper.classList.add(value);
}

function normalizarPrioridade(value) {
  if (!value) return 'baixa';
  if (value === 'média') return 'media';
  return value;
}

function atualizarContadorDescricao() {
  const descricao = document.getElementById('descricao');
  const contador = document.getElementById('descricao-count');
  if (descricao && contador) {
    contador.textContent = String(descricao.value.length);
  }
  
}

// ─── Buffer temporário de tasks (modo criação) ───────────────
// Em modo criação, o checklist ainda não existe no storage,
// então guardamos as tasks aqui até o usuário clicar em Salvar.

let _tasksTmp = [];

function getTasksAtuais() {
  if (checklistId) {
    const todos = getAllChecklists();
    const c = todos.find(c => c.id === checklistId);
    return c ? c.tasks : [];
  }
  return _tasksTmp;
}

function setTasksAtuais(tasks) {
  if (checklistId) {
    updateCheckList(checklistId, { tasks });
  } else {
    _tasksTmp = tasks;
  }
}

// ─── Criar task (chamado pelo onclick="CreateTask()" no HTML) ─

function obterDeadlineChecklist() {
  if (checklistId) {
    const todos = getAllChecklists();
    const c = todos.find(c => c.id === checklistId);
    return c ? (c.deadline || '') : '';
  }
  return document.getElementById('prazo')?.value || '';
}

function CreateTask() {
  // Se ainda não existe checklist (modo criação), cria/persist ite no storage no primeiro "+"
  if (!checklistId) {
    const dadosChecklist = {
      title: 'Checklist',
      priority: document.getElementById('prioridade')?.value || 'baixa',
      area: document.getElementById('stack')?.value || '',
      deadline: document.getElementById('prazo')?.value || '',
      status: 'andamento',
    };

    const novo = createChecklist(dadosChecklist);
    checklistId = novo.id;
    _tasksTmp = [];
  }

  let tasks = getTasksAtuais();
  const prioridadeTask = document.getElementById('nivel-prioridade')?.value || 'baixa';

  const nova = {
    id:          Date.now().toString(),
    title:       '',
    description: '',
    priority:    prioridadeTask,
    completed:   false,
  };

  tasks.push(nova);
  setTasksAtuais(tasks);
  renderizarTasks(tasks);
  selecionarTask(nova.id);
  document.getElementById('titulo').focus();
}

// ─── Renderizar lista (painel esquerdo) ──────────────────────

const BANDEIRA_SVG = `<svg class="tag-icone" viewBox="0 0 29 33" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M0.600098 31.6V3.69998C0.600098 3.45935 0.661092 3.22202 0.778252 3.00679C0.895411 2.79157 1.06552 2.60435 1.2751 2.45998C3.0277 1.25263 5.15935 0.599976 7.3501 0.599976C12.4126 0.599976 15.7876 3.69998 19.7245 3.69998C21.9745 3.69998 23.6997 3.28664 24.9001 2.45998C25.1508 2.28726 25.4489 2.18209 25.7611 2.15624C26.0732 2.13039 26.387 2.18488 26.6673 2.31361C26.9476 2.44235 27.1833 2.64023 27.3481 2.88509C27.5128 3.12996 27.6001 3.41212 27.6001 3.69998V19.2C27.6001 19.4406 27.5391 19.6779 27.4219 19.8932C27.3048 20.1084 27.1347 20.2956 26.9251 20.44C25.1725 21.6473 23.0408 22.3 20.8501 22.3C15.7876 22.3 12.4126 19.2 7.3501 19.2C4.85955 19.2 2.45639 20.0432 0.600098 21.5684"
  stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

function labelPrioridade(priority) {
  const map = { baixa: 'Baixa', media: 'Média', média: 'Média', alta: 'Alta' };
  return map[priority] || 'Baixa';
}

function renderizarTasks(tasks) {
  const container = document.getElementById('created-tasks');
  if (!container) return;
  container.innerHTML = '';

  if (!tasks || tasks.length === 0) {
    container.innerHTML = '<p class="tasks-empty">Nenhuma tarefa ainda.<br>Clique em "+ Nova task".</p>';
    atualizarTaskCount(0);
    return;
  }

  atualizarTaskCount(tasks.length);

  tasks.forEach((task, index) => {
    const prioNorm  = normalizarPrioridade(task.priority);
    const prioLabel = labelPrioridade(task.priority);

    const item = document.createElement('div');
    item.className  = 'task-item' + (task.id === taskSelecionada ? ' ativa' : '');
    item.dataset.id = task.id;

    item.innerHTML = `
      <span class="task-item-num">${index + 1}</span>
      <div class="task-item-body">
        <div class="task-item-top">
          <span class="task-item-titulo">${task.title || 'Sem título'}</span>
          <div class="task-item-acoes">
            <span class="task-badge-prioridade ${prioNorm}">
              ${BANDEIRA_SVG}
              <span class="tag-texto">${prioLabel}</span>
            </span>
            <button class="task-item-menu-btn" title="Opções" aria-label="Opções da task">
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
        ${task.description
          ? `<span class="task-item-desc">${task.description}</span>`
          : ''}
      </div>
      <div class="task-submenu hidden">
        <button data-acao="remover" class="excluir">
          <svg viewBox="0 0 16 16" width="13" height="13" fill="none">
            <path d="M2 4h12M5 4V2h6v2M6 7v5M10 7v5M3 4l1 9h8l1-9"
              stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Remover
        </button>
      </div>
    `;

    // Selecionar task ao clicar
    item.addEventListener('click', e => {
      if (e.target.closest('.task-item-menu-btn') || e.target.closest('.task-submenu')) return;
      selecionarTask(task.id);
    });

    // Menu de 3 pontos
    const menuBtn  = item.querySelector('.task-item-menu-btn');
    const submenu  = item.querySelector('.task-submenu');

    menuBtn.addEventListener('click', e => {
      e.stopPropagation();
      document.querySelectorAll('.task-submenu').forEach(m => m.classList.add('hidden'));
      submenu.classList.toggle('hidden');
    });

    submenu.querySelector('[data-acao="remover"]').addEventListener('click', e => {
      e.stopPropagation();
      removerTask(task.id);
    });

    container.appendChild(item);
  });

  // Fechar submenus ao clicar fora
  document.addEventListener('click', () => {
    document.querySelectorAll('.task-submenu').forEach(m => m.classList.add('hidden'));
  }, { once: true });
}

// ─── Selecionar task → carrega no painel direito ─────────────

function selecionarTask(id) {
  taskSelecionada = id;
  const task = getTasksAtuais().find(t => t.id === id);
  if (!task) { limparPainel(); return; }

  document.getElementById('titulo').value           = task.title       || '';
  document.getElementById('descricao').value        = task.description || '';
  const prioridadeTask = task.priority === 'média' ? 'media' : (task.priority || 'baixa');
  document.getElementById('nivel-prioridade').value = prioridadeTask;
  atualizarBandeiraPrioridade(document.getElementById('nivel-prioridade'));

  document.querySelectorAll('.task-item').forEach(el => {
    el.classList.toggle('ativa', el.dataset.id === id);
  });

  setPainelAtivo(true);
}

function limparPainel() {
  document.getElementById('titulo').value           = '';
  document.getElementById('descricao').value        = '';
  document.getElementById('nivel-prioridade').value = '';
  setPainelAtivo(false);
}

function setPainelAtivo(ativo) {
  const painel = document.querySelector('.task-details-container');
  if (!painel) return;
  painel.style.opacity       = ativo ? '1' : '0.4';
  painel.style.pointerEvents = ativo ? 'auto' : 'none';
}

// ─── Sincronizar painel direito → storage em tempo real ──────

function sincronizarDetalhe() {
  if (!taskSelecionada) return;

  let tasks = getTasksAtuais();
  const idx = tasks.findIndex(t => t.id === taskSelecionada);
  if (idx < 0) return;

  tasks[idx] = {
    ...tasks[idx],
    title:       document.getElementById('titulo').value,
    description: document.getElementById('descricao').value,
    priority:    document.getElementById('nivel-prioridade').value || 'baixa',
  };

  setTasksAtuais(tasks);

  // Atualiza item na lista sem re-renderizar tudo
  const itemEl = document.querySelector(`.task-item[data-id="${taskSelecionada}"]`);
  if (!itemEl) return;
  const t = tasks[idx];

  const tituloEl = itemEl.querySelector('.task-item-titulo');
  const prioEl   = itemEl.querySelector('.task-badge-prioridade');
  const descEl   = itemEl.querySelector('.task-item-desc');

  if (tituloEl) tituloEl.textContent = t.title || 'Sem título';

  if (prioEl) {
    const prioNorm  = normalizarPrioridade(t.priority);
    const prioLabel = labelPrioridade(t.priority);
    prioEl.className = `task-badge-prioridade ${prioNorm}`;
    prioEl.innerHTML = `${BANDEIRA_SVG}<span class="tag-texto">${prioLabel}</span>`;
  }

  if (t.description) {
    if (descEl) {
      descEl.textContent = t.description;
    } else {
      const novoDesc = document.createElement('span');
      novoDesc.className = 'task-item-desc';
      novoDesc.textContent = t.description;
      itemEl.querySelector('.task-item-body').appendChild(novoDesc);
    }
  } else if (descEl) {
    descEl.remove();
  }
}

// ─── Remover task ────────────────────────────────────────────

function removerTask(id) {
  let tasks = getTasksAtuais().filter(t => t.id !== id);
  setTasksAtuais(tasks);
  if (taskSelecionada === id) { taskSelecionada = null; limparPainel(); }
  renderizarTasks(tasks);
}

function formatarDataPrazo(value) {
  if (!value) return '';
  const data = new Date(value);
  if (Number.isNaN(data.getTime())) return value;
  return data.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

function atualizarTaskCount(total) {
  const counter = document.getElementById('task-count');
  if (counter) counter.textContent = `${total} item${total === 1 ? '' : 's'}`;
}

function salvarEVoltar() {
  const tituloEl = document.getElementById('checklist-titulo');
  const tituloDigitado = tituloEl ? tituloEl.textContent.trim() : '';

  const title = tituloDigitado || (checklistId
    ? (getAllChecklists().find(c => c.id === checklistId)?.title || 'Checklist')
    : 'Checklist');

  const dados = {
    title,
    priority: document.getElementById('prioridade').value.trim(),
    area: document.getElementById('stack').value.trim(),
    deadline: document.getElementById('prazo').value,
    status: 'andamento',
  };

  if (checklistId) {
    updateCheckList(checklistId, dados);
  } else {
    const novo = createChecklist(dados);
    if (_tasksTmp.length > 0) {
      updateCheckList(novo.id, { tasks: _tasksTmp });
    }
    checklistId = novo.id;
  }

  window.location.href = 'index.html';
}

// ─── Dark mode ───────────────────────────────────────────────

function configurarDarkMode() {
  const btn = document.getElementById('btn-darkmode');
  if (!btn) return;
  if (localStorage.getItem('syncrops_darkmode') === 'ativo') {
    document.documentElement.classList.add('darkmode');
  }
  btn.addEventListener('click', () => {
    document.documentElement.classList.toggle('darkmode');
    const ativo = document.documentElement.classList.contains('darkmode');
    localStorage.setItem('syncrops_darkmode', ativo ? 'ativo' : 'inativo');
  });
}