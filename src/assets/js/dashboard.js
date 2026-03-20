// * CARDS
const grid = document.querySelector('#card-grid');

function renderizarCards() { //Mostra todos os cards no grid
     checklists = getAllChecklists();
     checklists.forEach((checklist) => {

          if (checklist.status === 'andamento') {
               statusAtual = `<div class="tag-andamento">
          <svg class="tag-icone" viewBox="0 0 31 35" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M15.5 1V7.6M21.59 10.57L25.795 5.785M24.2 17.5H30M21.59 24.43L25.795 29.215M15.5 27.4V34M5.205 29.215L9.41 24.43M1 17.5H6.8M5.205 5.785L9.41 10.57"
                  stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
          </svg>

          <span class="tag-texto">Andamento</span>
    </div>`

          } else if (checklist.status === 'concluido') {
               statusAtual = ` <div class="tag-concluido">
          <svg class="tag-icone" viewBox="0 0 31 32" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M29.708 13.0051C30.3702 16.367 29.8983 19.8622 28.3709 22.9078C26.8435 25.9533 24.353 28.3652 21.3147 29.7411C18.2764 31.117 14.874 31.3738 11.6748 30.4686C8.47566 29.5635 5.67313 27.5512 3.7346 24.7672C1.79608 21.9833 0.838731 18.5959 1.02222 15.1702C1.2057 11.7444 2.51893 8.48724 4.74289 5.94186C6.96686 3.39649 9.96714 1.71676 13.2434 1.18279C16.5196 0.648826 19.8738 1.2929 22.7466 3.00761M11.1466 14.5051L15.4966 19.0051L29.9966 4.00511"
                   stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
          </svg>


          <span class="tag-texto">Concluído</span>
    </div>`
          } else {
               statusAtual = `
                <div class="tag-nao-iniciada">
          <svg class="tag-icone" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M4.66125 4.66125L22.3375 22.3387M26 13.5C26 20.4036 20.4036 26 13.5 26C6.59644 26 1 20.4036 1 13.5C1 6.59644 6.59644 1 13.5 1C20.4036 1 26 6.59644 26 13.5Z"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>


          <span class="tag-texto">Não iniciada</span>
    </div>
           `
          };
     


     grid.innerHTML =+ `
          <article class="card">
          <div class="card-content">
               <div class="card-superior">
                    <h3 class="card-titulo">${checklist.title}</h3>
                    <div class="tag">${statusAtual}</div> 
               </div>
               <div class="card-inferior">
                    <div class="barra-progresso" ${checklist.progress}></div> 
                         <div class="card-data">
                              <span>Última atualização:</span>
                              <span class="card-date">${checklist.updateAt}</span>
                    </div>
               </div>
          </div>
     </article>`
     });
};
