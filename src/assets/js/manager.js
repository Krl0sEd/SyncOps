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
      const h2 = document.querySelector('.title-h2');
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

function renderizarTasks(tasks) {
  const container = document.getElementById('created-tasks');
  if (!container) return;
  container.innerHTML = '';

  if (!tasks || tasks.length === 0) {
    container.innerHTML = '<p class="tasks-empty">Nenhuma tarefa ainda.<br>Clique em "Adicionar tarefa".</p>';
    atualizarTaskCount(0);
    return;
  }

  atualizarTaskCount(tasks.length);
  tasks.forEach((task, index) => {
    const item = document.createElement('div');
    item.className  = 'task-item' + (task.id === taskSelecionada ? ' task-item-ativa' : '');
    item.dataset.id = task.id;

    item.innerHTML = `
      <span class="task-item-numero">${String(index + 1).padStart(2, '0')}</span>
      <div class="task-item-corpo">
        <span class="task-item-titulo">${task.title || 'Sem título'}</span>
        <span class="task-item-meta">
          <span class="task-item-prioridade ${normalizarPrioridade(task.priority)}">${task.priority === 'média' ? 'Média' : (task.priority || 'baixa')}</span>
          ${(() => {
            const prazo = task.deadline || obterDeadlineChecklist();
            return prazo ? `<span class="task-item-deadline">${formatarDataPrazo(prazo)}</span>` : '';
          })()}
        </span>
      </div>
      <button class="task-item-remover" title="Remover">
        <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
          <path d="M2 4h12M5 4V2h6v2M6 7v5M10 7v5M3 4l1 9h8l1-9"
            stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    `;

    item.addEventListener('click', e => {
      if (e.target.closest('.task-item-remover')) return;
      selecionarTask(task.id);
    });

    item.querySelector('.task-item-remover').addEventListener('click', e => {
      e.stopPropagation();
      removerTask(task.id);
    });

    container.appendChild(item);
  });
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
    el.classList.toggle('task-item-ativa', el.dataset.id === id);
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
  const prioEl   = itemEl.querySelector('.task-item-prioridade');
  if (tituloEl) tituloEl.textContent = t.title || 'Sem título';
  if (prioEl) {
    prioEl.textContent = t.priority === 'média' ? 'Média' : (t.priority || 'baixa');
    prioEl.className   = `task-item-prioridade ${normalizarPrioridade(t.priority)}`;
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
  const title = checklistId
    ? (getAllChecklists().find(c => c.id === checklistId)?.title || 'Checklist')
    : 'Checklist';

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
  if (localStorage.getItem('syncops:tema') === 'dark') {
    document.documentElement.classList.add('darkmode');
  }
  btn.addEventListener('click', () => {
    document.documentElement.classList.toggle('darkmode');
    const tema = document.documentElement.classList.contains('darkmode') ? 'dark' : 'light';
    localStorage.setItem('syncops:tema', tema);
  });
}