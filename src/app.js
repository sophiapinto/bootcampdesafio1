const express = require("express");
const cors = require("cors");
const { isuuid } = require("uuidv4");

// const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  //Rota que lista todos os repositórios;
  //retornado um array com todos os repositórios que foram criados até o momento.

  const { title } = request.query;
  
  const repositories = title
  ? repositories.filter(repository => repository.title.includes(title))
  : repositories;

  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = {
    id: "uuid",
    title,
    url,
    techs,
    likes: 0, //like deve sempre iniciar em 0
  };

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  //// A rota deve alterar apenas o title,
  //a url e as techs do repositório que possua o id igual
  //ao id presente nos parâmetros da rota.

});

app.delete("/repositories/:id", (request, response) => {
  //A rota deve deletar o repositório com o id presente nos parâmetros da rota;
  //1º parâmetro: index de onde deve iniciar a remoção
  //2º parâmetro: a quantidade de valores removidos.
  
  const { id } = request.params;

  //const repository = repositories.body.find((r) => r.id === response.body.id);
  const repositoryIndex = repositories.findIndex (repository => repository.id ==id);

  if (repositoryIndex < 0) {
    return response.status(400).json({ error:'Project not found'})
  }

  repositories.splice(repositoryIndex,1);

  return response.status(204).send();

  );

  //Splice: Altera o array, removendo os valores dentro dele e substituindo por outros valores

app.post("/repositories/:id/like", (request, response) => {
    //A rota deve aumentar o número de likes do repositório específico escolhido
    //através do id presente nos parâmetros da rota,
    //a cada chamada dessa rota, o número de likes deve ser aumentado em 1;
  
  const { id } = request.params;

  const repository = repositories.find(repository => repository.id ===id);
  
  if (!repository) {
    return response.status(400).send(); //validação de id
  }
  repository.likes += 1;

  return response.json(repository);
});

module.exports = app;
