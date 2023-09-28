# Meu Front-end

Este é um projeto de log de manutenção  do **Sprint II** de **Engenharia de software** 

## A aplicação possui as seguintes funcionalidades:

**Cadastro de Atividades:** O usuário pode inserir uma nova atividade informando a data, a descrição da atividade e o autor. Esta funcionalidade depende do método `cadastrar_atividade` da API.

**Visualização de Atividades:** A tabela exibe a lista de atividades cadastradas, incluindo o ID, a data, a descrição da atividade e o autor. Essa funcionalidade utiliza do método `listar_atividade` da API

**Edição de Atividades:** O usuário pode editar uma atividade clicando no botão "Editar" ao lado da atividade desejada. Isso abrirá um prompt para inserir os novos detalhes da atividade. Está funcionalidade utiliza do método `atualizar_atividade` da API.

**Exclusão de Atividades:** O usuário pode excluir uma atividade clicando no botão "Deletar" ao lado da atividade desejada. Isso solicitará uma confirmação antes de excluir a atividade. Está funcionalidade depende do utiliza o método `deletar_atividade`

**Duplicar Atividades:** O usuário pode duplicar uma atividade clicando no botão "Duplicar" ao lado da atividade desejada. Está funcionalidade depende do utiliza o método `duplicar_atividade`

**Verificação de Feriados:** A aplicação verifica se uma data é feriado no Brasil. Está funcionalidade utiliza uma API `pública` `externa` como método. 

***Documentação da API remota:***
```
https://date.nager.at/swagger/index.html
```

## Execução

criar imagem via docker e executar container na porta:8080. a API desenvolvida precisa estar hospedada na porta 5000 do localhost.