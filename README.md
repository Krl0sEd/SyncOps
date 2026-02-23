# ⚙️ SyncOps

> **Sistema de checklists persistentes focado em redução de falhas humanas em processos operacionais.**

O **SyncOps** é um Dashboard Operacional de alta performance projetado para padronizar e otimizar rotinas de infraestrutura de TI e processos de *deploy*. Através de uma interface limpa e persistência de dados local, a ferramenta garante que nenhuma etapa crítica seja esquecida, gerando relatórios automatizados para abertura e fechamento de chamados (tickets).

---

## 🚀 Principais Funcionalidades

* **Checklists Persistentes:** Utilização de `localStorage` para garantir que o progresso da operação não seja perdido caso o navegador seja fechado acidentalmente.
* **Templates Operacionais:** Fluxos pré-definidos para operações comuns do dia a dia (ex: Formatação de Máquina, Deploy de Servidor, Onboarding).
* **Geração Automática de Relatórios:** Compilação do resultado do checklist em um texto formatado, pronto para cópia e colagem em sistemas de chamados (ITSM).
* **Interface Moderna:** Foco em UX/UI, transições suaves e opção de Dark Mode.

---

## 🏗️ Arquitetura e Tecnologias

Este projeto foi construído separando as responsabilidades de desenvolvimento visual e infraestrutura em nuvem:

### Front-end
* **HTML5 & CSS3:** Estruturação e estilização sem dependência de frameworks pesados.
* **JavaScript (Vanilla):** Lógica de negócios e persistência de dados (`localStorage`).

### Infraestrutura & DevOps
* **Docker:** Aplicação 100% conteinerizada para garantir padronização de ambiente.
* **Nginx:** Servidor Web atuando como *Proxy Reverso*, com configurações de segurança e *Rate Limiting*.
* **GitHub Actions:** Esteira de CI/CD automatizada para testes e *deploy* contínuo.
* **Hospedagem:** [A definir - ex: Máquina Virtual Linux / Nuvem]

---

## 💻 Como rodar o projeto localmente

Como o projeto está conteinerizado, subi-lo na sua máquina é um processo de apenas um comando.

**Pré-requisitos:**
* Ter o [Docker](https://www.docker.com/) instalado.

**Passo a passo:**

1. Clone este repositório:
   ```
   git clone [https://github.com/SEU-USUARIO/SyncOps.git](https://github.com/SEU-USUARIO/SyncOps.git)
   
   ```

2. Acesse a pasta do projeto:
   
```bash
cd SyncOps

```

3. Suba o contêiner do Nginx:
   
```bash
docker-compose up -d --build

```

4. Acesse no seu navegador: `http://localhost:80`

---

## 👥 Squad (Desenvolvimento e Operações)

* **Anderson:** Front-end
* **Carlos Bucazio:** Infraestrutura / DevOps
* **Pamela Goulart:** Front-end

---

## 📬 Contato

- 💻  **Análise e Desenvolvimento de Sistemas** | Foco em **DevOps & Redes**
- 📧 **Email**: [cbucazio@gmail.com](mailto:cbucazio@gmail.com)
- 🌐 **GitHub**: [Krl0sEd](https://github.com/Krl0sEd)
- 🧑‍💼 **Linkedin**: [linkedin.com/in/carlos-eduardo-de-oliveira-bucazio-516a7937a](https://www.linkedin.com/in/carlos-eduardo-de-oliveira-bucazio-516a7937a)

**✨ Feito com dedicação por Anderson, Carlos Eduardo de Oliveira Bucazio e Pamela Goulart 🚀**

---
