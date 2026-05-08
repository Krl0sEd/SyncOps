const btnDarkmode = document.querySelector('#btn-darkmode');
 
// Ao carregar a página, verifica se o usuário já tinha dark mode ativo
function inicializarDarkmode() {
     const darkSalvo = localStorage.getItem('syncrops_darkmode');
 
     if (darkSalvo === 'ativo') {
          document.documentElement.classList.add('darkmode');
     }
}
 
// Alterna o dark mode ao clicar no botão
function alternarDarkmode() {
     const root = document.documentElement;
 
     if (root.classList.contains('darkmode')) {
          root.classList.remove('darkmode');
          localStorage.setItem('syncrops_darkmode', 'inativo');
     } else {
          root.classList.add('darkmode');
          localStorage.setItem('syncrops_darkmode', 'ativo');
     }
}
 
if (btnDarkmode) {
     btnDarkmode.addEventListener('click', alternarDarkmode);
}
 
// Inicializa assim que o arquivo é carregado
inicializarDarkmode();
