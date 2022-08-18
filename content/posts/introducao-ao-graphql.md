---
date: "2022-07-22"
title: "Aprenda a usar o GraphQL"
thumbnail: "/images/thumbnails/graphql.png"
categories:
  - "JavaScript"
  - "APIs"
tags:
  - "graphql"
  - "api"
  - "rest"
  - "client"
  - "server"
  - "database"
  - "data"
  - "scheme"
  - "type"
  - "query"
---

GraphQL é um novo padrão de API que apresenta uma alternativa mais eficiente, poderosa e flexível ao REST. Ele foi desenvolvido pelo Facebook e é de código aberto. A maioria das aplicações tem a necessidade de buscar dados em um servidor onde esses dados são armazenados em um banco de dados. O GraphQL fornece uma interface para que esses dados se encaixem às necessidades de uma aplicação. O GraphQL é frequentemente confundido com uma tecnologia de banco de dados, mas é uma linguagem de consulta para APIs - não bancos de dados. GraphQL é indiferente ao banco de dados.

No GraphQL define-se um esquema para permitir que os clients descrevam os dados que desejam de uma forma adaptada às suas necessidades.

## Benefícios do GraphQL

O REST foi criado antes que a importância das aplicações front-end tivesse sido descoberta pelo público em geral. REST foi pioneiro como uma forma de expor os dados armazenados em um banco de dados a aplicações web. GraphQL permite que os desenvolvedores exponham os dados que possuem aos clients sem a necessidade do desenvolvedor ter de checar o esquema do banco de dados.

Ao contrário do REST, o GraphQL não exige que o client envie várias solicitações para obter os dados de que necessita. Ele também permite que o client obtenha os dados em qualquer formato desejado. Isto é feito especificando apenas os dados que o client deseja em uma única solicitação. Isto economiza tempo e melhora o desempenho geral da aplicação.

O GraphQL já é o futuro dos aplicativos. As aplicações móveis precisam solicitar os dados muito mais rapidamente. O GraphQL permite que estas aplicações solicitem dados o mais rápido possível.

## Usando o GraphQL

No núcleo do GraphQL está o sistema de tipos, onde um tipo descreve um tipo de dado exposto pelo servidor.

Para se ter uma ideia de como um esquema é definido, aqui está um exemplo:

<div class="filename">schema.graphql</div>

```graphql
type Post { 
	title: String!
	content: String!
	author: String
}

type Query {
	me: User
}

type User {
	id: Int!
	name: String!
}
```

Vamos analisar este esquema...

Ele define três tipos: Post, User e Query.

O tipo Post tem os atributos título, conteúdo e autor. Note que o tipo String! é marcado com ! o que significa que o título e o conteúdo são strings não-nulas.

O tipo User tem apenas os atributos id e nome.

O tipo Query define quais operações estão disponíveis para o client consumir. Neste exemplo, temos uma operação chamada "me" que recupera um único registro do tipo User.

Agora que definimos nosso esquema, precisamos escrever um pouco de código para buscar dados de nossa API. Neste exemplo em Javascript, usaremos a fetch API para buscar dados de nosso servidor.

Em primeiro lugar, precisamos definir nossa query:

```javascript
const query = `query {
  me {
    id
    name
  }
}`; // isso é uma string normal
```

Esta query irá buscar a identificação e o nome do usuário atualmente logado.

Em seguida, precisamos enviar nossa query para o servidor:

<div class="filename">index.js</div>

```javascript
const query = `query {
  me {
    id
    name
  }
}`;

fetch('/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ query })
})
  .then(res => res.json())
  .then(data => console.log(data));
```

E no console devemos ver uma resposta parecida com esta:

```json
{
	"data": {
		"me": {
			"id": 1,
			"name": "Oscar"
		}
	}
}
```

Este é apenas um exemplo simples, mas nos mostra como um esquema pode ser definido e os dados obtidos.

GraphQL é o futuro e já está mudando a maneira como escrevemos APIs para aplicações web.

Você gostaria de saber mais sobre GraphQL? O melhor lugar para começar é o site [How to GraphQL](https://www.howtographql.com/).