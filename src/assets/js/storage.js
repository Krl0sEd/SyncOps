const STORAGE_KEY = 'syncops_checklists'; // nome para achar os dados dentro do localstorage

function getAllChecklists() {
     const data = localStorage.getItem(STORAGE_KEY);
     return data ? JSON.parse(data) : []; // Se tiver dados, retorna todos eles. Se não, devolve um array vazia.
}

function saveAllChecklists(checklists) {
     localStorage.setItem(STORAGE_KEY, JSON.stringify(checklists));
}

//* CRUD Completo
function createChecklist(dados) {
     const checklists = getAllChecklists(); //Importante para a inserção abaixo!!!!

     const novoChecklist = {
          id: Date.now().toString(),
          title: dados.title,
          priority: dados.priority,
          area: dados.area,
          deadline: dados.deadline,
          status: dados.status,
          progress: 0,
          tasks: [],
          createdAt: new Date().toISOString(),
          updateAt: new Date().toISOString()
     };

     checklists.push(novoChecklist); //Envia o novoChecklist para a lista de checklist, mas ainda não está de fato salvo no LocalStorage.

     saveAllChecklists(checklists); // Agora sim, salvo no LocalStorage. o "push" é para adicionar no final da lista, mas não quer dizer que o LocalStorage entendeu isso.
     return novoChecklist;
}

function updateCheckList(id, dadosAtualizados) {
     const checklists = getAllChecklists();

     const index = checklists.findIndex(checklist => checklist.id === id);

     if (index === -1) return null;

     checklists[index] = { 
     //! o '...' (spread) ele despeja os campos dos objetos e vê qual se repete, se um campo aparecer mais vezes, o ultimo prevalece
          ...checklists[index], //joga: id, titulo, priority, status...
          ...dadosAtualizados, // joga: sobrescreve o valor antigo
          updateAt: new Date().toISOString()
     };

     saveAllChecklists(checklists);
     return checklists[index];
}

function deleteCheckLists(id) {
     const checklists = getAllChecklists();
     const checkListFiltrados = checklists.filter( // Pega todos os checklist, EXCETO os que tem o mesmo id do que foi colocado no parametro
          checklist => checklist.id !== id
     );

     saveAllChecklists(checkListFiltrados); // mantém a lista, removendo apenas aquele que você deixou de lado acima
};


//* Barra de progresso
const PESOS_PRIORIDADE = {
     'baixa' : 1,
     'media' : 2,
     'alta' : 3
};

function calcularProgresso(tasks) {
     if (tasks.length === 0) return 0;

     const pesoTotal = tasks.reduce((acumulador, task) => {
          return acumulador + PESOS_PRIORIDADE[task.priority];
     }, 0);

     const pesoConcluido = tasks.reduce((acumulador, task) => {
          if (task.completed) {
               return acumulador + PESOS_PRIORIDADE[task.priority];
          }
          return acumulador
     }, 0);

     return Math.round((pesoConcluido / pesoTotal) * 100)
}

//* Adição/Remoção de tasks

function adicionarTask(checkListId) {
     const checklists = getAllChecklists();
     
     const index = checklists.findIndex(checklist => checklist.id === checkListId);
     if (index === -1) return null;

     const novaTask = {
          id: Date.now().toString(),
          title: '',
          description: '',
          priority: 'baixa',
          completed: false
     }

     checklists[index].tasks.push(novaTask);

     saveAllChecklists(checklists);
     return novaTask;
}
