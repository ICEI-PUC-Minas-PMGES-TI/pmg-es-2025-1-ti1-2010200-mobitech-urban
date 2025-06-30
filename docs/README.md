# Introdução

Este documento apresenta as informações básicas do projeto MoveWave, uma plataforma voltada para melhorar a mobilidade urbana em Belo Horizonte por meio da participação ativa dos cidadãos.

* **Projeto:** MoveWave
* **Repositório GitHub:** https://github.com/ICEI-PUC-Minas-PMGES-TI/pmg-es-2025-1-ti1-2010200-mobitech-urban.git
* **Membros da equipe:**

  * [Larissa](https://github.com/llarissasilva)
  * [Luis](https://github.com/luisgustavox12)
  * [Gustavo](https://github.com/GustavoHS-Luz) 
  * [Fellipe](https://github.com/FillipeG) 

A documentação do projeto é estruturada da seguinte forma:

1. Introdução
2. Contexto
3. Product Discovery
4. Product Design
5. Metodologia
6. Solução
7. Referências Bibliográficas

✅ [Documentação de Design Thinking (MIRO)](files/processo-dt.pdf)

# Contexto

Belo Horizonte enfrenta sérios desafios relacionados à mobilidade urbana, especialmente durante o período de chuvas. As enchentes dificultam o deslocamento e colocam em risco a segurança de pedestres e motoristas. Além disso, a ausência de canais eficientes para que os cidadãos comuniquem esses problemas em tempo real dificulta a atuação rápida das autoridades. Sendo assim, o MoveWave surge como uma solução para esse cenário, com o objetivo de aproximar a população do poder público por meio de uma plataforma colaborativa de denúncias e mapeamento de ocorrências urbanas, a fim de tornar a gestão da cidade mais participativa, transparente e ágil. O público-alvo deste projeto abrange tanto os moradores da cidade, que convivem com esses desafios diariamente, quanto os órgãos públicos responsáveis pela manutenção e planejamento urbano.

## Problema

A capital mineira sofre com enchentes recorrentes, afetando a mobilidade urbana e colocando a população em risco. Bueiros entupidos e ruas esburacadas agravam a situação, dificultando o escoamento da água e aumentando os alagamentos. A cidade ainda carece de uma forma eficiente e acessível para que os cidadãos relatem essas ocorrências em tempo real. A ausência de um canal direto de comunicação entre população e poder público atrasa as respostas às emergências e dificulta o planejamento de ações preventivas. Essa falta de integração agrava os impactos na mobilidade, na segurança e na qualidade de vida dos moradores.

## Objetivos

O objetivo geral deste projeto é desenvolver um software para auxiliar na mitigação dos impactos das enchentes em Belo Horizonte, facilitando o monitoramento e a comunicação de problemas relacionados à mobilidade urbana e infraestrutura. Como objetivo específico pretende-se, criar uma plataforma onde usuários possam relatar enchentes e problemas urbanos em tempo real, incluindo o envio de fotos e vídeos; mapear os pontos críticos da cidade com base nos relatos da população, gerando alertas e informações úteis para os órgãos públicos; desenvolver um sistema de fórum para que os cidadãos possam discutir e compartilhar informações sobre os problemas urbanos.

## Justificativa

As enchentes em Belo Horizonte impactam a mobilidade urbana, causam prejuízos e colocam a população em risco. A falta de um canal eficiente para relatar esses problemas dificulta a resposta das autoridades e a adoção de medidas preventivas. Nas entrevistas realizadas, foi possível observar o quanto as enchentes prejudicam os trabalhadores, como motoristas de Uber que são forçados a parar de trabalhar, e comerciantes que, além de não poderem retornar para seus lares, enfrentam grandes prejuízos devido à perda de materiais quando a água invade seus estabelecimentos. Dessa forma, este projeto busca suprir essa necessidade por meio de uma plataforma colaborativa, permitindo o envio de relatos em tempo real, o mapeamento de pontos críticos e a interação entre cidadãos.

## Público-Alvo

O público-alvo da plataforma é composto por diferentes perfis de usuários, com o objetivo de atender tanto à população em geral quanto às autoridades responsáveis pela gestão urbana.
Cidadãos comuns, de diferentes idades e níveis de familiaridade com a tecnologia, que utilizam smartphones no seu dia a dia. Dentro desse grupo, incluem-se trabalhadores urbanos, como motoristas de aplicativos e comerciantes, que também fazem parte do público-alvo. Esses profissionais dependem da mobilidade e enfrentam impactos diretos nas suas atividades devido às enchentes, utilizando a plataforma para relatar interrupções nas vias e buscar soluções rápidas. A prefeitura e órgãos públicos, com profissionais responsáveis pela gestão de desastres e infraestrutura, formam outro grupo-alvo. Eles utilizarão a plataforma para analisar dados e tomar decisões em tempo real.

# Product Discovery

## Etapa de Entendimento

**Matriz CSD**: 
![image](https://github.com/user-attachments/assets/7ce6ee63-cb9a-491f-94bc-cf1d2d19e1ae)

**Mapa de stakeholders**:
![image](https://github.com/user-attachments/assets/e1edcda3-637f-4e1b-adc2-58cac8a50871)

**Entrevistas qualitativas e Highlights de pesquisa**:

![image](https://github.com/user-attachments/assets/cb0412b3-d19c-42b8-8829-e5fa3adbaf56)

![image](https://github.com/user-attachments/assets/56cbcfdb-1197-4afa-917f-d3b8b280d1eb)

![image](https://github.com/user-attachments/assets/3fb1a4cd-11cb-4ae2-9833-a06b8a18555f)

![image](https://github.com/user-attachments/assets/d25d9b8d-513d-4251-affe-c5371ebb18fa)

![image](https://github.com/user-attachments/assets/ca601fdc-4c57-4dde-9c8a-fac58ac5c8e4)

![image](https://github.com/user-attachments/assets/8fdc60af-952c-4d14-86f3-2d6e7b4d4f8f)


## Etapa de Definição

### Personas

![image](https://github.com/user-attachments/assets/a16863ab-3dd0-4062-829f-7cc144a5c59e)

![image](https://github.com/user-attachments/assets/e87a358a-de32-48e0-8b7d-824e110fd195)

![image](https://github.com/user-attachments/assets/a9666c25-0144-4629-a85e-992876dd91ca)

![image](https://github.com/user-attachments/assets/f81e4452-d8be-405b-a8e2-61f527df30c7)

![image](https://github.com/user-attachments/assets/63426d22-9b26-43ec-9d77-6992219b07d3)


# Product Design

Nesse momento, vamos transformar os insights e validações obtidos em soluções tangíveis e utilizáveis. Essa fase envolve a definição de uma proposta de valor, detalhando a prioridade de cada ideia e a consequente criação de wireframes, mockups e protótipos de alta fidelidade, que detalham a interface e a experiência do usuário.

## Histórias de Usuários

Com base na análise das personas foram identificadas as seguintes histórias de usuários:

| EU COMO...`PERSONA` | QUERO/PRECISO ...`FUNCIONALIDADE`        | PARA ...`MOTIVO/VALOR`               |
| --------------------- | ------------------------------------------ | -------------------------------------- |
| Cidadão comum         | enviar fotos e vídeos geolocalizados relacionados aos problemas de infraestrutura no meu bairro | que a prefeitura possa agir de forma mais eficaz na prevenção de enchentes           |
| Cidadão comum         | informar em tempo real as ruas que estão alagadas      | que a população possa evitar essas rotas, reduzindo riscos de acidentes e transtornos no trânsito. |
| Cidadão comum         | Fórum de denúncias e reclamações a respeito das enchentes e da falta infraestrutura local | que haja eficiência na gestão pública,  auxiliando a prefeitura a identificar e priorizar os problemas mais críticos           |
| Cidadão comum         | receber alertas antecipados sobre possíveis alagamentos       | que eu possa me preparar e tomar medidas preventivas contra enchentes |

## Proposta de Valor

##### Proposta para Persona José Rodriguez Santos: 
![image](https://github.com/user-attachments/assets/c92591b8-8e03-4208-9140-8a7ee385a134)


##### Proposta para Persona Maria Helena do Rosário: 
![image](https://github.com/user-attachments/assets/42bcb634-23d8-49ec-a90d-2617ae6d46a5)

##### Proposta para Persona Letícia Ribeiro Alves:
![image](https://github.com/user-attachments/assets/d8960cd4-265d-4239-bad0-214e4176bcc8)

##### Proposta para Persona João Carlos Almeida:
![image](https://github.com/user-attachments/assets/5bf7c732-5931-46b0-afc5-a9d0239cfa2f)

##### Proposta para Persona Joelma Santos:
![image](https://github.com/user-attachments/assets/eb43efc2-3c08-43fc-8023-f4d1946620fc)

## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto.

### Requisitos Funcionais

| ID     | Descrição do Requisito                                   | Prioridade |
| ------ | ---------------------------------------------------------- | ---------- |
| RF-001 | 	O sistema deve permitir que o usuário envie fotos e vídeos geolocalizados, informando endereço, data, horário e algum comentário se desejar. | ALTA |
| RF-002 | 	O sistema deve disponibilizar que o usuário realize uma filtragem por tipo de problema, data e bairro.  | MÉDIA     |
| RF-003 | 	O sistema deve fornecer à prefeitura acesso a dados por meio de tabelas e gráficos, destacando os bairros com maior incidência de problemas de infraestrutura e os tipos de ocorrências predominantes.| ALTA       |
| RF-004 | 	O sistema deve receber fotos e informações dos usuários para que seja possível detectar as áreas alagadas em tempo real, a fim de informar no mapa quais são as áreas afetadas.   | ALTA     |
| RF-005 | 	O sistema deve fazer uma integração com o Google Maps para que os usuários saibam com exatidão todas as áreas que estão intransitáveis da cidade e evite transitar por essas localidades. | ALTA       |
| RF-006 | 	O sistema deve oferecer um fórum onde os usuários possam registrar denúncias e reclamações sobre enchentes e problemas de infraestrutura, permitindo que outros cidadãos comentem e apoiem as publicações.  | MÉDIA     |
| RF-007 | 	O sistema deve permitir que o usuário adicione um comentário, assim como editá-lo ou apagá-lo | BAIXA       |
| RF-008 | 	O sistema deve gerar relatórios simples para a prefeitura, destacando os problemas mais recorrentes com base na quantidade de denúncias recebidas e na localização das ocorrências.   | MÉDIA     |
| RF-009 | 	O sistema deve possuir uma integração com uma API sobre os dados meteorológicos para que possa ter uma análise da probabilidade de ocorrer enchentes.  | ALTA     |
| RF-010 | 	O sistema deve permitir o envio de notificações para o usuário em tempo real sobre a probabilidade de ocorrer enchentes durante determinado período.
| MÉDIA       |
| RF-012 | 	O sistema deve fornecer uma página para o usuário com conteúdo e dicas de como se preparar e agir durante situações de enchentes. Assim como, contatos relevantes como por exemplo da defesa civil, bombeiros, PM e prefeitura.   | BAIXA     |


### Requisitos não Funcionais

| ID      | Descrição do Requisito                                                              | Prioridade |
| ------- | ------------------------------------------------------------------------------------- | ---------- |
| RNF-001 | 	O sistema deve processar e exibir novas postagens e alertas de áreas alagadas no mapa em até 5 segundos após o envio, garantindo atualização em tempo real. | MÉDIA     |
| RNF-002 | 	O tempo de resposta do sistema para envio de notificações deve ser inferior a 2 segundos após a detecção de um evento relevante.  | MÉDIA     |


## Projeto de Interface

![image](https://github.com/user-attachments/assets/07f774e4-b2be-4752-af21-4b895e5ad158)

![image](https://github.com/user-attachments/assets/ffd2fde9-1423-48db-9d62-c47d36764dfb)


### Wireframes

Estes são os protótipos de telas do sistema.

![image](https://github.com/user-attachments/assets/e904efdf-264f-4778-bdc6-bf84aa63485f)

![image](https://github.com/user-attachments/assets/7e2e3a4d-86a0-477e-a949-001c4c02f432)

![image](https://github.com/user-attachments/assets/38c28ff5-e679-4603-bb6a-19ddb34bf703)

![image](https://github.com/user-attachments/assets/96c0261e-4821-4698-9f19-cf34f7e34f3c)

![image](https://github.com/user-attachments/assets/4cb3cd4c-fb13-4c7e-88a4-1933d4e63021)

![image](https://github.com/user-attachments/assets/c2c2e643-2313-4caf-9d1b-382fab15ee26)

![image](https://github.com/user-attachments/assets/c5860aed-57b7-462d-9e9c-4dc7063cff7a)

![image](https://github.com/user-attachments/assets/479a5723-d107-474b-a453-762db4dfbfb6)

![image](https://github.com/user-attachments/assets/fce05532-a744-4094-894e-0cf4f93ecb8a)


### User Flow

![image](https://github.com/user-attachments/assets/d8e64e35-80cf-445d-ba98-44b42536feb3)

![image](https://github.com/user-attachments/assets/e93e3bf8-a456-40fc-9cc3-594f388e16c7)

![image](https://github.com/user-attachments/assets/9e60c5f1-42d2-494e-b497-c86d323c9d55)

![image](https://github.com/user-attachments/assets/2aa77319-18c1-4d70-b492-2a0e69b7d5fd)

![image](https://github.com/user-attachments/assets/4fb4d453-997c-4b19-bc6f-d3e9ac26ad64)

![image](https://github.com/user-attachments/assets/072d9960-85b1-4b64-b2fe-5d65296a0aa9)



# Metodologia

A metodologia aplicada no desenvolvimento do projeto MoveWave teve como base abordagens ágeis, especialmente o Design Thinking e o Scrum, visando promover uma estrutura de trabalho colaborativa, iterativa e centrada no usuário.

## Ferramentas

Relação de ferramentas empregadas pelo grupo durante o projeto.

| Ambiente                    | Plataforma | Link de acesso                                     |
| --------------------------- | ---------- | -------------------------------------------------- |
| Processo de Design Thinking | Miro       | (https://miro.com/app/board/uXjVIZ5HadY=/)     |
| Repositório de código       | GitHub     | https://github.com/ICEI-PUC-Minas-PMGES-TI/pmg-es-2025-1-ti1-2010200-mobitech-urban.git      |
| Hospedagem do site          | Render     | https://site.render.com/XXXXXXX ⚠️ EXEMPLO ⚠️ |
| Protótipo Interativo        | Figma      | https://www.figma.com/design/DPoDWFlNYK84nEhqEHVUfJ/Mobitech-Urban-interface?node-id=0-1&t=EmAaUGkfTv8bbX9t-0   |
|                             |            |                                                    |

Ferramentas Utilizadas: 
Durante o desenvolvimento do projeto MoveWave, a equipe utilizou diferentes ferramentas para garantir uma gestão eficiente, colaboração em tempo real e qualidade na entrega da solução. Abaixo estão listadas as principais ferramentas, agrupadas por finalidade:

Visual Studio Code: Editor de código utilizado por sua leveza, ampla personalização e suporte a extensões. Possui integração direta com o GitHub, facilitando o versionamento de código.

GitHub: Plataforma utilizada para armazenar e versionar o código-fonte, além de hospedar a documentação do projeto. Também foi usada para gerenciamento de tarefas por meio do recurso GitHub Projects, onde foi criado um quadro Kanban com colunas de tarefas (Backlog, To Do, Doing e Done).

WhatsApp e Google Meet: Utilizados para comunicação ágil entre os membros e realização de reuniões para alinhamento das entregas.

Miro: Ferramenta utilizada na etapa de Design Thinking para construção da Matriz CSD, Mapa de Stakeholders e organização das entrevistas com os usuários.

Figma: Plataforma online utilizada para criação de wireframes, mockups e protótipos de alta fidelidade. Permitiu colaboração em tempo real no design das telas.

Render (ou outra plataforma de hospedagem): Utilizada para disponibilizar a aplicação final online, com integração contínua ao repositório GitHub.

Google Docs / Microsoft Word: Utilizados para elaboração da documentação textual do projeto, permitindo edição colaborativa entre os membros.

OpenWeatherMap API (ou outra API meteorológica): Integrada à plataforma para obtenção de dados climáticos em tempo real, contribuindo para a emissão de alertas de enchentes.

## Gerenciamento do Projeto

A equipe trabalhou de forma colaborativa durante o desenvolvimento do projeto MoveWave, com todos os integrantes contribuindo ativamente na criação do site, tanto na parte de design quanto na implementação do código. As decisões foram tomadas de maneira conjunta, priorizando o diálogo e o alinhamento de ideias para garantir a consistência do resultado final.

Embora a divisão das tarefas tenha sido flexível, a liderança do grupo foi assumida por Larissa Silva, que organizou as atividades, distribuiu responsabilidades entre os membros, acompanhou o andamento das entregas e também participou do desenvolvimento técnico da aplicação.

Para controle das tarefas e organização das entregas, foi utilizado um quadro Kanban no GitHub Projects, com colunas que permitiam acompanhar o status das atividades: Backlog, To Do, Doing, Review/Testes e Done. Essa abordagem ajudou a manter a equipe alinhada e permitiu uma visão clara da evolução do projeto.

![image](https://github.com/user-attachments/assets/893f4c98-df0d-4302-9e4a-bb7a8f801934)

# Solução Implementada

O projeto MoveWave resultou em uma plataforma web colaborativa desenvolvida com o objetivo de facilitar a comunicação entre a população de Belo Horizonte e os órgãos públicos, especialmente em situações de emergência causadas por enchentes e outros problemas urbanos.

A solução permite que cidadãos relatem ocorrências em tempo real, enviando fotos, vídeos, localização e comentários, que são imediatamente processados e exibidos em um mapa interativo. Isso permite que outros usuários visualizem áreas afetadas e evitem rotas bloqueadas, e que os órgãos públicos atuem com mais rapidez e precisão.

Funcionalidades principais da plataforma:
Envio de denúncias geolocalizadas com imagens, vídeos e descrição textual.

Visualização de um mapa interativo com marcações em tempo real das áreas com problemas de infraestrutura.

Sistema de alertas baseado em dados meteorológicos integrados por API.

Fórum de discussões para que a população compartilhe informações, dúvidas e sugestões.

Painel administrativo com dados organizados por gráficos e relatórios, voltado para a tomada de decisão por parte da prefeitura e demais órgãos responsáveis.

Página de dicas e contatos úteis, com orientações de segurança e números emergenciais como Defesa Civil e Bombeiros.

A aplicação foi desenvolvida com tecnologias modernas, priorizando a usabilidade, acessibilidade e atualização em tempo real das informações. O foco principal foi criar uma interface simples e intuitiva, capaz de ser usada por qualquer cidadão, mesmo com pouca familiaridade com tecnologia.

## Vídeo do Projeto

O vídeo a seguir traz uma apresentação do problema que a equipe está tratando e a proposta de solução. ⚠️ EXEMPLO ⚠️

[![Vídeo do projeto](images/video.png)](https://www.youtube.com/embed/70gGoFyGeqQ)

> ⚠️ **APAGUE ESSA PARTE ANTES DE ENTREGAR SEU TRABALHO**
>
> O video de apresentação é voltado para que o público externo possa conhecer a solução. O formato é livre, sendo importante que seja apresentado o problema e a solução numa linguagem descomplicada e direta.
>
> Inclua um link para o vídeo do projeto.

## Funcionalidades

Funcionalidade 1 – Cadastro de Usuários
Esta funcionalidade permite que novos usuários se registrem no sistema, bem como que usuários existentes possam ter seus dados atualizados ou removidos. O cadastro inclui informações básicas como nome, e-mail, senha e outros dados necessários para autenticação e personalização do perfil.

Estrutura de dados:
Os usuários são armazenados com seus dados pessoais e credenciais para garantir segurança e gerenciamento adequado.

Instruções de acesso:

Acesse o site Movewave e faça login ou escolha a opção de cadastro para novos usuários.

Preencha o formulário com as informações solicitadas.

Após o cadastro, o usuário poderá acessar suas funcionalidades personalizadas no sistema.

![image](https://github.com/user-attachments/assets/b8633b05-3e2f-4b4c-b1dc-ddb5cecf6816)


Funcionalidade 2 – Cadastro de Prefeituras
Permite o registro das prefeituras dentro do sistema, possibilitando a inclusão de dados oficiais e informações relevantes de cada município para melhor gestão e transparência.

Estrutura de dados:
Cada prefeitura possui dados como nome, endereço, telefone, e-mail e outras informações institucionais importantes.

Instruções de acesso:

Acesse o site Movewave e faça login ou escolha a opção de cadastro para prefeitura

Preencha o formulário com as informações solicitadas.

Após o cadastro, o usuário poderá acessar suas funcionalidades personalizadas no sistema.

![image](https://github.com/user-attachments/assets/68359fef-5f07-48a5-9831-ded561c641e7)


Funcionalidade 3 – Cadastro de Postagens com Fotos e Texto
Esta funcionalidade permite que usuários autorizados criem postagens contendo textos descritivos e imagens, facilitando a comunicação e o compartilhamento de informações relevantes no site.

Estrutura de dados:
As postagens armazenam título, texto, imagens associadas, data de publicação e autor da postagem.

Instruções de acesso:

Faça login no sistema com um usuário autorizado.

No menu principal, acesse a opção Postagens.

Clique em Nova Postagem, insira o texto, faça upload das fotos e salve a postagem.

![image](https://github.com/user-attachments/assets/9c31bc9d-0169-4c20-9f34-a3202b005867)


Funcionalidade 4 – Cadastro de Comentários nas Postagens
Permite que os usuários interajam com as postagens através de comentários, promovendo maior engajamento e troca de informações.

Estrutura de dados:
Cada comentário está vinculado a uma postagem específica e contém o texto do comentário, autor e data de publicação.

Instruções de acesso:

Na página de uma postagem, os usuários poderão visualizar e adicionar comentários.

Para comentar, basta digitar o texto no campo designado e enviar.

Os comentários ficam disponíveis para visualização de todos os usuários da plataforma.

![image](https://github.com/user-attachments/assets/3b90cae3-2b47-447b-9a28-c58bbd01c297)


## Estruturas de Dados

Descrição das estruturas de dados utilizadas na solução com exemplos no formato JSON.Info

##### Estrutura de Dados - Cadastros  

"prefeituras": [
    {
      "prefeitura": "Prefeitura BH",
      "site": "https://prefeitura.pbh.gov.br/",
      "cep": "30535-610",
      "bairro": "Coração Eucarístico",
      "email": "adm3@gmail.com",
      "responsavel": "teste adm 3",
      "telefone": "(33) 33333-3333",
      "emailResponsavel": "adm3@gmail.com",
      "senha": "123456",
      "dataCadastro": "2025-06-29T20:28:13.901Z",
      "id": "1"
    }
  ],
  "usuarios": [
    {
      "id": "b9dc",
      "nome": "teste5",
      "email": "teste5@gmail.com",
      "telefone": "(99) 99999-9999",
      "cep": "30535-610",
      "bairro": "Coração Eucarístico",
      "senha": "123456",
      "dataCadastro": "2025-06-29T22:04:58.583Z"

   ##### Estrutura de Dados - Postagens

   "id": "1",
      "title": "Reclamação sobre a falta de alerta de enchente",
      "content": "Acho um absurdo que a prefeitura não tenha avisado a população sobre a enchente. Fui pego de surpresa e precisei evacuar minha casa. É urgente que a cidade tenha um sistema de alerta eficiente.",
      "author": "Maria Souza",
      "date": "2025-05-01",
      "type": "reclamação",
      "likes": 0,
      "image": "../assets/img/post1.webp",
      "userCreated": false

## Módulos e APIs

Esta seção apresenta os módulos e APIs utilizados na solução

Frameworks e Bibliotecas
Node.js
Plataforma utilizada para o desenvolvimento do back-end da aplicação, responsável por executar código JavaScript no servidor.

Express.js
Framework web minimalista para Node.js, utilizado para estruturar as rotas e requisições da API de forma simples e eficiente.

React.js
Biblioteca JavaScript para construção da interface do usuário (front-end), proporcionando uma experiência dinâmica e reativa ao usuário.

Axios
Cliente HTTP utilizado para fazer requisições assíncronas entre o front-end e o back-end, facilitando a comunicação com a API.

Mongoose (se estiver usando MongoDB)
Biblioteca para modelar objetos da base de dados MongoDB, permitindo trabalhar com os dados por meio de modelos em JavaScript.

Bootstrap / Tailwind CSS (escolha o que usou)
Frameworks de CSS utilizados para estilização da interface, oferecendo componentes prontos e responsivos.

Multer
Middleware utilizado para o upload e manipulação de arquivos (imagens) enviados nas postagens.

