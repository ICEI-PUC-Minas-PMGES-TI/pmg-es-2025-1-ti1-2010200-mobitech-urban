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


### Protótipo Interativo

**✳️✳️✳️ COLOQUE AQUI UM IFRAME COM SEU PROTÓTIPO INTERATIVO ✳️✳️✳️**

✅ [Protótipo Interativo (MarvelApp)](https://marvelapp.com/prototype/4hd6091?emb=1&iosapp=false&frameless=false)  ⚠️ EXEMPLO ⚠️

> ⚠️ **APAGUE ESSA PARTE ANTES DE ENTREGAR SEU TRABALHO**
>
> Um protótipo interativo apresenta o projeto de interfaces e permite ao usuário navegar pelas funcionalidades como se estivesse lidando com o software pronto. Utilize as mesmas ferramentas de construção de wireframes para montagem do seu protótipo interativo. Inclua o link para o protótipo interativo do projeto.

# Metodologia

Detalhes sobre a organização do grupo e o ferramental empregado.

## Ferramentas

Relação de ferramentas empregadas pelo grupo durante o projeto.

| Ambiente                    | Plataforma | Link de acesso                                     |
| --------------------------- | ---------- | -------------------------------------------------- |
| Processo de Design Thinking | Miro       | (https://miro.com/app/board/uXjVIZ5HadY=/)     |
| Repositório de código       | GitHub     | https://github.com/ICEI-PUC-Minas-PMGES-TI/pmg-es-2025-1-ti1-2010200-mobitech-urban.git      |
| Hospedagem do site          | Render     | https://site.render.com/XXXXXXX ⚠️ EXEMPLO ⚠️ |
| Protótipo Interativo        | Figma      | https://www.figma.com/design/DPoDWFlNYK84nEhqEHVUfJ/Mobitech-Urban-interface?node-id=0-1&t=EmAaUGkfTv8bbX9t-0   |
|                             |            |                                                    |

> ⚠️ **APAGUE ESSA PARTE ANTES DE ENTREGAR SEU TRABALHO**
>
> Liste as ferramentas empregadas no desenvolvimento do projeto, justificando a escolha delas, sempre que possível. Inclua itens como: (1) Editor de código, (2) )ferramentas de comunicação, (3) )ferramentas de diagramação, (4) )plataformas de hospedagem, entre outras.

## Gerenciamento do Projeto

Divisão de papéis no grupo e apresentação da estrutura da ferramenta de controle de tarefas (Kanban).

![Exemplo de Kanban](images/exemplo-kanban.png)

> ⚠️ **APAGUE ESSA PARTE ANTES DE ENTREGAR SEU TRABALHO**
>
> Nesta parte do documento, você deve apresentar  o processo de trabalho baseado nas metodologias ágeis, a divisão de papéis e tarefas, as ferramentas empregadas e como foi realizada a gestão de configuração do projeto via GitHub.
>
> Coloque detalhes sobre o processo de Design Thinking e a implementação do Framework Scrum seguido pelo grupo. O grupo poderá fazer uso de ferramentas on-line para acompanhar o andamento do projeto, a execução das tarefas e o status de desenvolvimento da solução.
>
> **Orientações**:
>
> - [Sobre Projects - GitHub Docs](https://docs.github.com/pt/issues/planning-and-tracking-with-projects/learning-about-projects/about-projects)
> - [Gestão de projetos com GitHub | balta.io](https://balta.io/blog/gestao-de-projetos-com-github)
> - [(460) GitHub Projects - YouTube](https://www.youtube.com/playlist?list=PLiO7XHcmTsldZR93nkTFmmWbCEVF_8F5H)
> - [11 Passos Essenciais para Implantar Scrum no seu Projeto](https://mindmaster.com.br/scrum-11-passos/)
> - [Scrum em 9 minutos](https://www.youtube.com/watch?v=XfvQWnRgxG0)

# Solução Implementada

Esta seção apresenta todos os detalhes da solução criada no projeto.

## Vídeo do Projeto

O vídeo a seguir traz uma apresentação do problema que a equipe está tratando e a proposta de solução. ⚠️ EXEMPLO ⚠️

[![Vídeo do projeto](images/video.png)](https://www.youtube.com/embed/70gGoFyGeqQ)

> ⚠️ **APAGUE ESSA PARTE ANTES DE ENTREGAR SEU TRABALHO**
>
> O video de apresentação é voltado para que o público externo possa conhecer a solução. O formato é livre, sendo importante que seja apresentado o problema e a solução numa linguagem descomplicada e direta.
>
> Inclua um link para o vídeo do projeto.

## Funcionalidades

Esta seção apresenta as funcionalidades da solução.Info

##### Funcionalidade 1 - Cadastro de Contatos ⚠️ EXEMPLO ⚠️

Permite a inclusão, leitura, alteração e exclusão de contatos para o sistema

* **Estrutura de dados:** [Contatos](#ti_ed_contatos)
* **Instruções de acesso:**
  * Abra o site e efetue o login
  * Acesse o menu principal e escolha a opção Cadastros
  * Em seguida, escolha a opção Contatos
* **Tela da funcionalidade**:

![Tela de Funcionalidade](images/exemplo-funcionalidade.png)

> ⚠️ **APAGUE ESSA PARTE ANTES DE ENTREGAR SEU TRABALHO**
>
> Apresente cada uma das funcionalidades que a aplicação fornece tanto para os usuários quanto aos administradores da solução.
>
> Inclua, para cada funcionalidade, itens como: (1) titulos e descrição da funcionalidade; (2) Estrutura de dados associada; (3) o detalhe sobre as instruções de acesso e uso.

## Estruturas de Dados

Descrição das estruturas de dados utilizadas na solução com exemplos no formato JSON.Info

##### Estrutura de Dados - Contatos   ⚠️ EXEMPLO ⚠️

Contatos da aplicação

```json
  {
    "id": 1,
    "nome": "Leanne Graham",
    "cidade": "Belo Horizonte",
    "categoria": "amigos",
    "email": "Sincere@april.biz",
    "telefone": "1-770-736-8031",
    "website": "hildegard.org"
  }
  
```

##### Estrutura de Dados - Usuários  ⚠️ EXEMPLO ⚠️

Registro dos usuários do sistema utilizados para login e para o perfil do sistema

```json
  {
    id: "eed55b91-45be-4f2c-81bc-7686135503f9",
    email: "admin@abc.com",
    id: "eed55b91-45be-4f2c-81bc-7686135503f9",
    login: "admin",
    nome: "Administrador do Sistema",
    senha: "123"
  }
```

> ⚠️ **APAGUE ESSA PARTE ANTES DE ENTREGAR SEU TRABALHO**
>
> Apresente as estruturas de dados utilizadas na solução tanto para dados utilizados na essência da aplicação quanto outras estruturas que foram criadas para algum tipo de configuração
>
> Nomeie a estrutura, coloque uma descrição sucinta e apresente um exemplo em formato JSON.
>
> **Orientações:**
>
> * [JSON Introduction](https://www.w3schools.com/js/js_json_intro.asp)
> * [Trabalhando com JSON - Aprendendo desenvolvimento web | MDN](https://developer.mozilla.org/pt-BR/docs/Learn/JavaScript/Objects/JSON)

## Módulos e APIs

Esta seção apresenta os módulos e APIs utilizados na solução

**Images**:

* Unsplash - [https://unsplash.com/](https://unsplash.com/) ⚠️ EXEMPLO ⚠️

**Fonts:**

* Icons Font Face - [https://fontawesome.com/](https://fontawesome.com/) ⚠️ EXEMPLO ⚠️

**Scripts:**

* jQuery - [http://www.jquery.com/](http://www.jquery.com/) ⚠️ EXEMPLO ⚠️
* Bootstrap 4 - [http://getbootstrap.com/](http://getbootstrap.com/) ⚠️ EXEMPLO ⚠️

> ⚠️ **APAGUE ESSA PARTE ANTES DE ENTREGAR SEU TRABALHO**
>
> Apresente os módulos e APIs utilizados no desenvolvimento da solução. Inclua itens como: (1) Frameworks, bibliotecas, módulos, etc. utilizados no desenvolvimento da solução; (2) APIs utilizadas para acesso a dados, serviços, etc.

# Referências

As referências utilizadas no trabalho foram:

* SOBRENOME, Nome do autor. Título da obra. 8. ed. Cidade: Editora, 2000. 287 p ⚠️ EXEMPLO ⚠️

> ⚠️ **APAGUE ESSA PARTE ANTES DE ENTREGAR SEU TRABALHO**
>
> Inclua todas as referências (livros, artigos, sites, etc) utilizados no desenvolvimento do trabalho.
>
> **Orientações**:
>
> - [Formato ABNT](https://www.normastecnicas.com/abnt/trabalhos-academicos/referencias/)
> - [Referências Bibliográficas da ABNT](https://comunidade.rockcontent.com/referencia-bibliografica-abnt/)
