---
date: "2022-12-07"
title: "React Query: o gerenciador de dados assíncronos que sua aplicação React precisa!"
thumbnail: "/images/thumbnails/react-query.png"
categories:
  - "JavaScript"
  - "APIs"
  - "React"
tags:
  - "React" 
  - "ReactQuery" 
  - "gerenciamentoDeDados" 
  - "dadosAssíncronos" 
  - "javascript" 
  - "frontend" 
  - "biblioteca" 
  - "desenvolvimentoWeb" 
  - "desenvolvimentoDeAplicações"
---

React Query é uma biblioteca que facilita o gerenciamento de dados assíncronos em aplicações React. Ele oferece recursos como cache, paginação, atualizações em tempo real e retentativas de erro, entre outros, que ajudam a tornar a manipulação de dados em aplicações React mais fácil e eficiente.

React Query é especialmente útil em aplicações que precisam fazer múltiplas requisições de dados de diferentes fontes e gerenciar as informações de forma eficiente e confiável. Ele pode ser usado com diferentes bibliotecas de requisição, como Axios, fetch e GraphQL.

Para que você leitor entenda melhor como funciona o React Query, vamos a um exemplo simples utilizando a fetch API.

Para utilizar a lib React Query com fetch, basta importar a lib e o método fetch e, em seguida, utilizar o método useQuery para realizar a requisição.

Exemplo:

```javascript
import React from 'react';
import { useQuery } from 'react-query';
import fetch from 'node-fetch';

const App = () => {
  const { data, isLoading, error } = useQuery(
    'todos',
    () => fetch('https://jsonplaceholder.typicode.com/todos')
      .then(res => res.json())
  );

  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error.message}</p>;

  return (
    <ul>
      {data.map(todo => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}

export default App;
```

Neste exemplo, a função useQuery é utilizada para fazer a requisição para a URL `https://jsonplaceholder.typicode.com/todos` e retorna os dados, o estado de carregamento e possíveis erros. O resultado é exibido em uma lista na tela.

Em um projeto da vida real, as coisas não ficam todas no mesmo arquivo certo?

Uma boa forma de estruturar o código ao utilizar a lib React Query e fetch é criar um arquivo separado para a função que realiza a requisição e utilizá-la em outro arquivo que contém o componente que exibe os dados.

Exemplo:

<div class="filename">service.js</div>

```javascript
import fetch from 'node-fetch';

export const fetchTodos = () =>
  fetch('https://jsonplaceholder.typicode.com/todos')
    .then(res => res.json());
```

<div class="filename">App.js</div>

```javascript
import React from 'react';
import { useQuery } from 'react-query';
import { fetchTodos } from './service';

const App = () => {
  const { data, isLoading, error } = useQuery(
    'todos',
    fetchTodos
  );

  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error.message}</p>;

  return (
    <ul>
      {data.map(todo => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}

export default App;
```

Neste exemplo, a função `fetchTodos` é criada em um arquivo separado e é importada no componente App. Ela é passada como argumento para o método useQuery, que é responsável por fazer a requisição e retornar os dados, o estado de carregamento e possíveis erros. O resultado é exibido em uma lista na tela.

Mas e no caso de um endpoint que precisa de parâmetros? Sem problemas, digamos que para a requisição dos `todos` precisaremos passar um parâmetro na url, ou seja uma `query param` chamada `userId` que será utilizado na URL da requisição para filtrar os todos por um usuário específico. Nesse caso, vamos refatorar o nosso código da segunte maneira:


<div class="filename">service.js</div>

```javascript
import fetch from 'node-fetch';

export const fetchTodos = async (userId) => {
  fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`)
    .then(res => res.json());
```

<div class="filename">App.js</div>

```javascript
import React from 'react';
import { useQuery } from 'react-query';
import { fetchTodos } from './service';

const userId = 1; // Vamos manter como uma constante apenas para fins didáticos

const App = () => {
  const { data, isLoading, error } = useQuery(
    ['todos', userId],
    () => fetchTodos(userId)
  );

  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error.message}</p>;

  return (
    <ul>
      {data.map(todo => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}

export default App;
```

Desta forma, o código está estruturado em arquivos separados e é possível passar parâmetros para a requisição de dados utilizando a lib React Query e fetch.
