<h1 align="center">
  Desafio Anestech
</h1>

<p align="center">
  <a href="#rocket-technologies">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#information_source-how-to-use">Como usar</a>&nbsp;&nbsp;&nbsp;
</p>

<p>
  Desafio: Estamos com problemas em saber quanto tempo foi gasto nas tarefas que efetuamos diariamente, para conseguirmos registrar tudo o que fazemos precisamos de um pequeno sistema para registrar as tarefas e que seja possível informar quando ela foi iniciada, quando foi finalizada e o responsável da tarefa.
</p>

## :rocket: Tecnologias

- [NodeJS](https://nodejs.org)
- [ReactJS](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [Redux-Saga](https://redux-saga.js.org/)
- [styled-components](https://www.styled-components.com/)
- [Axios](https://github.com/axios/axios)
- [Immer](https://github.com/immerjs/immer)
- [date-fns](https://date-fns.org/)
- [Reactotron](https://infinite.red/reactotron)
- [VS Code][vc] with [EditorConfig][vceditconfig] and [ESLint][vceslint]
- E outros...

## :information_source: Como usar

Para clonar e executar este aplicativo, você precisará [Git](https://git-scm.com), [Node.js][nodejs] + [Yarn v1.13][yarn] instalado no seu computador
Você também precisará configurar e executar um banco de dados Postgres e inserir as informações de acesso em um arquivo .env, com base em um arquivo .env.example fornecido na pasta de back-end.

Obs: Eu utilizei o docker toolbox e a imagem do postgres 11.

Na sua linha de comando:

```bash
# Clone o repositório
$ git clone https://github.com/anacvignola/anestech-challenge/

# Navegue até a pasta
$ cd anestech-challenge

# Instale as dependencias do backend
$ cd backend
$ yarn install

# Rode as migrations da database
$ yarn migrate

# Rode o backend
$ yarn dev

# Instale as dependencias do frontend e rode ele
$ cd frontend
$ yarn install
$ yarn start

```

[nodejs]: https://nodejs.org/
[yarn]: https://yarnpkg.com/
[vc]: https://code.visualstudio.com/
[vceditconfig]: https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig
[vceslint]: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
