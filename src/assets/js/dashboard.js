// * CONTENT LOADED
document.addEventListener('DOMContentLoaded', renderizarCards);

// * CARDS
const grid = document.querySelector('#card-grid');

function renderizarCards() { //Mostra todos os cards no grid
     let checklists = getAllChecklists(); // Toda vez que tiver conteúdo novo, ela receberá um novo valor

     checklists.forEach((checklist) => {
          let statusAtual = null; // criou ele fora, para dentro das funções ele apenas receber o valor para não repetir sempre o "let"
          let prioridadeAtual = null; //mesma lógica do de cima

          // ? Verificações do Status
          if (checklist.status === 'andamento') {
               statusAtual = `<div class="tag-progesso andamento">
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
                <div class="tag-progesso nao-iniciada">
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

          // aqui exibe, de fato, cada car no Grid.
          grid.innerHTML += `
          <article class="card">
          <div class="card-content">
               <div class="card-superior">
                    <h3 class="card-titulo">${checklist.title}</h3>
                    <div class="tag-progresso">${statusAtual}</div> 
                    <div class="tag-prioridade">${prioridadeAtual}</div> 
               </div>
               <div class="card-inferior">
                    <div class="barra-progresso">
                         <div class="barra-preenchimento" style="width: ${checklist.progress}%"></div>
                    </div> 
                         <div class="card-data">
                              <span>Última atualização:</span>
                              <span class="card-date">${checklist.updateAt}</span>
                    </div>
               </div>
          </div>
     </article>`
     });
};
