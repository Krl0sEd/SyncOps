function renderizarProgresso(checklist, containerElement) {
     // 1. Acha a barra de preenchimento DENTRO do card específico
     const preenchimento = containerElement.querySelector('.barra-preenchimento');
     const label = containerElement.querySelector('.progresso-label');
 
     // 2. Calcula o progresso usando a função do storage.js
     const progresso = calcularProgresso(checklist.tasks);
 
     // 3. Atualiza o campo de progresso no próprio checklist (mantém sincronizado)
     updateCheckList(checklist.id, { progress: progresso });
 
     // 4. Atualiza o visual
     if (preenchimento) preenchimento.style.width = progresso + '%';
     if (label) label.textContent = progresso + '%';
}
 