---
date: 2019-05-06
title: 'Como se conectar a uma API com JavaScript'
thumbnail: '../thumbnails/js.png'
categories:
  - JavaScript
  - Popular
tags:
  - api
  - app
  - javascript
---

Uma das maiores partes do trabalho com Javascript está em se conectar com APIs. Se você é um desenvolvedor iniciante, pode ser que já tenham te indicado "brincar com algumas APIs" para ver como funciona e ir se familiarizando em como utilizá-las, talvéz você pode já ter dado uma olhada em algumas documentações mas mesmo assim não saiba por onde começar, não se fruste! Este artigo é para você.

Vamos criar um aplicativo Web muito simples com JavaScript básico que consumirá informações de uma API e as exibirá na página. Não haverá servidores, dependências, ferramentas de construção ou qualquer outra coisa para enlamear ainda mais as águas em um tópico já difícil e confuso para iniciantes.

- [Ver demonstração](https://joaohenriquebarbosa.github.io/sandbox/ghibli/)
- [Código fonte no GitHub](https://github.com/JoaoHenriqueBarbosa/sandbox/tree/master/ghibli)

#### Pré-requisitos

- Conhecimento básico de [HTML e CSS](https://www.treinaweb.com.br/blog/como-comecar-com-html-e-css/).

- Conhecimento básico de [sintaxe e tipos de dados JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Values,_variables,_and_literals).

- Conhecimento básico de trabalho com [objetos JSON e JavaScript](https://developer.mozilla.org/pt-BR/docs/Aprender/JavaScript/Objetos/JSON).

#### Objetivos

Vamos escrever a partir [deste aplicativo Web simples](https://joaohenriquebarbosa.github.io/sandbox/ghibli/) que se conecta a uma [API do Studio Ghibli](https://ghibliapi.herokuapp.com/) , recupera os dados com JavaScript e os exibe no front-end de um website. Isso *não* significa que seja um recurso extensivo em APIs ou REST - apenas o exemplo mais simples possível de ser instalado e executado no futuro. Nós vamos aprender:

- O que é uma API da Web.
- Aprenda a usar a solicitação HTTP `GET`com JavaScript
- Como criar e exibir elementos HTML com JavaScript.

No final ficará assim:

![](../images/print-final-ghibli.png)

Vamos começar.

## Visão geral rápida

**API** significa Application Program Interface, que pode ser definida como um conjunto de métodos de comunicação entre vários componentes de software. Em outras palavras, uma API permite que o software se comunique com outro software.

Estaremos nos concentrando especificamente nas APIs da Web, que permitem que um servidor da Web interaja com softwares de terceiros. Nesse caso, o servidor da Web está usando **solicitações HTTP** para se comunicar com um ponto de extremidade de URL ou ***endpoint*** disponível publicamente contendo dados JSON. Se isso for confuso agora, fará sentido até o final do artigo.

Você pode estar familiarizado com o conceito de um aplicativo **CRUD**, que significa Criar, Ler, Atualizar, Excluir (*Em inglês: Create, Read, Update, Delete*). Qualquer linguagem de programação pode ser usada para fazer um aplicativo CRUD com vários métodos. Uma API da web usa solicitações HTTP que correspondem aos verbos CRUD.

| Açao               | Método HTTP   | Descrição                     |
| :----------------- | :------------ | :---------------------------- |
| Criar / Create     | `POST`        | Cria um novo recurso          |
| Ler / Read         | `GET`         | Recupera um recurso           |
| Atualizar / Update | `PUT`/`PATCH` | Atualiza um recurso existente |
| Excluir / Delete   | `DELETE`      | Exclui um recurso             |

> Se você já ouviu as APIs **REST** e RESTful, isso se refere simplesmente a um conjunto de padrões que obedecem a um estilo arquitetônico específico. A maioria dos aplicativos da Web faz isso, ou tem como objetivo estar em conformidade com os padrões REST. No geral, existem *muitos* termos, acrônimos e conceitos para entender - HTTP, API, REST - então é normal se sentir confuso e frustrado, especialmente quando a documentação da API assume que você já sabe o que fazer.

## Configurando

Qual é o nosso objetivo? Queremos obter os dados de todos os filmes do Studio Ghibli e exibir os títulos e as descrições em uma grade. Só para entender melhor, o Studio Ghibli é um estúdio de animação japonês que produziu vários filmes, como o Spirited Away.

Vamos começar criando um arquivo **index.html** em um novo diretório. O projeto consistirá apenas em **index.html** , **style.css** e **scripts.js** no final. Esse esqueleto HTML apenas vincula a um arquivo CSS e JavaScript, carrega em uma fonte e contém um div com um `root`id. Este arquivo está completo e não será alterado. Nós estaremos usando JavaScript para adicionar tudo daqui para fora.

<div class="filename">index.html</div>

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>Ghibli App</title>

    <link href="https://fonts.googleapis.com/css?family=Dosis:400,700" rel="stylesheet" />
    <link href="style.css" rel="stylesheet" />
  </head>

  <body>
    <div id="root"></div>
    <script src="scripts.js"></script>
  </body>
</html>
```

Como este artigo é focado nos conceitos de APIs e JavaScript, não explicarei como o CSS funciona. Vamos criar um **style.css** que será usado para criar uma grade. Por uma questão de brevidade, eu incluí apenas o CSS **estrutural** mais pertinente abaixo, mas você pode copiar o [código CSS completo aqui](https://raw.githubusercontent.com/JoaoHenriqueBarbosa/sandbox/master/ghibli/style.css).

<div class="filename">style.css</div>

```css
#root {
  max-width: 1200px;
  margin: 0 auto;
}

.container {
  display: flex;
  flex-wrap: wrap;
}

.card {
  margin: 1rem;
  border: 1px solid gray;
}

@media screen and (min-width: 600px) {
  .card {
    flex: 1 1 calc(50% - 2rem);
  }
}

@media screen and (min-width: 900px) {
  .card {
    flex: 1 1 calc(33% - 2rem);
  }
}
```

Agora temos o HTML e CSS configurados, agora você pode criar o arquivo **scripts.js** e continuaremos a partir daí.

## Conectando-se à API

Vamos dar uma olhada na [documentação da API Studio Ghibli](https://ghibliapi.herokuapp.com/) . Essa API foi criada para ajudar os desenvolvedores a aprender como interagir com recursos usando solicitações HTTP, o que é perfeito para nós. Como uma API pode ser acessada por muitos métodos diferentes - JavaScript, PHP, Ruby, Python e assim por diante - a documentação da maioria das APIs não fornece instruções específicas sobre como se conectar.

Podemos ver nesta documentação que ela nos diz que podemos fazer solicitações com `curl`ou chamadas REST regulares, mas podemos não ter a menor idéia de como fazer isso ainda.

### Obtendo o *endpoint* da API

Para começar, vamos até a [seção de filmes](https://ghibliapi.herokuapp.com/#tag/Films) . À direita, você verá `GET /films`. Ele nos mostrará o URL do endpoint da nossa API, <https://ghibliapi.herokuapp.com/films> . Clicar nesse link exibirá uma matriz de objetos no JSON.

> Se você não tiver uma extensão em seu navegador para visualizar arquivos JSON, adicione um agora, como o [JSON View](https://chrome.google.com/webstore/category/extensions?hl=en) . Isso tornará a leitura do JSON muito mais fácil. Lembre-se, se você nunca trabalhou com o JSON, [leia este artigo de pré-requisito](https://developer.mozilla.org/pt-BR/docs/Aprender/JavaScript/Objetos/JSON).

### Recuperando os dados com uma solicitação HTTP

Antes de tentarmos colocar qualquer coisa na frente do site, vamos abrir uma conexão com a API. Faremos isso usando a novíssima Fetch API que é um recurso [interno](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) mais recente do JavaScript que facilita o trabalho com solicitações e respostas.

Por ser uma funcionalidade built-in, ou seja que já vem com o Javascript, você pode simplesmente chamar a função `fetch()` passando como argumento o *endpoint*, ou seja a URL da nossa API. A Fetch trabalha com *promisses*, por isso no objeto de retorno podemos utilizar o método `then()` para lidar com os dados recebidos pela requisição. Aqui utilizamos o método `then()` duas vezes, a primeira para transformar a resposta de texto puro para JSON e depois novamente para trabalharmos com os dados.

Além disso podemos utilizar o método `catch()` para tratar erros.

> Observe que, com a Fetch, um erro `404`ou `500`não retornará um erro. Apenas um erro de rede ou uma solicitação não concluída gerará um erro.

<div class="filename">scripts.js</div>

```js
fetch('https://ghibliapi.herokuapp.com/films')
  .then(response => {
    return response.json()
  })
  .then(data => {
    //Aqui iremos trabalhar com o JSON
    });
  }).catch(err => {
    //Fazer algo com os erros aqui
  });
```

### Trabalhando com a resposta JSON

No nosso método `then()` que interessa (o segundo, caso precise de uma dica), temos um argumento em uma função de flecha, ou seja, uma [arrow function](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Functions/Arrow_functions), este argumento que chamamos de `data` é uma variável que contém todo o JSON como uma matriz de objetos JavaScript. Usando `forEach()`, vamos dar um `console.log()` do título de cada filme para garantir que ele esteja funcionando corretamente.

Além disso vamos mostrar no console também eventuais erros, no método `catch()`.

<div class="filename">scripts.js</div>

```js
fetch('https://ghibliapi.herokuapp.com/films')
  .then(response => {
    return response.json()
  })
  .then(data => {
      //Aqui iremos trabalhar com o JSON
      data.forEach(movie => {
        // Log de cada nome de filme
        console.log(movie.title)
      })
    });
  }).catch(err => {
    //Fazer algo com os erros aqui
    console.log(err)
  });
```

Usamos com êxito uma `GET`solicitação HTTP para recuperar (ou consumir) o *endpoint* da API, que consistia em dados no formato JSON. No entanto, ainda estamos presos no console - queremos exibir esses dados no front end do site, o que faremos modificando o DOM.

## Exibindo os dados

Para exibir informações no front end de um site, trabalharemos com o DOM, que é na verdade uma API que permite que o JavaScript se comunique com o HTML. Caso você nunca tenha ouvido falar sobre o DOM, siga este muito esclarecedor [artigo da Tabless](https://tableless.com.br/entendendo-o-dom-document-object-model/).

No final, nossa página consistirá em uma imagem de logotipo seguida por um contêiner com vários elementos de cartão - um para cada filme. Cada cartão terá um título e um parágrafo, que contém o título e a descrição de cada filme. Aqui está o que parece, com apenas CSS essencial carregado:

![](../images/print-medio-ghibli.png)

Se você se lembra, nosso **index.html** só tem um div raiz - `<div id="root">` agora. Nós vamos acessá-lo com `getElementById()`. Podemos remover brevemente todo o código anterior que escrevemos, não se preocupe, adicionaremos novamente em breve.

<div class="filename">scripts.js</div>

```js
const app = document.getElementById('root')
```

Se você não está ciente do que faz `getElementById()`, use o código acima e `console.log(app)`. Isso deve ajudar a esclarecer o que realmente está acontecendo alí.

A primeira coisa em nosso site é o logotipo, que é um elemento `img`. Nós vamos criar o elemento de imagem com o `createElement()`.

```js
const logo = document.createElement('img')
```

Um `img` vazio não é bom, então vamos definir o atributo  `src `para `logo.png`. (Encontrado [aqui](https://github.com/JoaoHenriqueBarbosa/sandbox/blob/master/ghibli/logo.png))

```js
logo.src = 'logo.png'
```

Vamos criar outro elemento, `div` desta vez, e definir o atributo  `class` para `container`.

```js
const container = document.createElement('div')
container.setAttribute('class', 'container')
```

Agora temos um logotipo e um contêiner, e só precisamos colocá-los no site. Usaremos o método  `appendChild()` para anexar a imagem do logotipo e a div do contêiner à raiz do aplicativo.

```js
app.appendChild(logo)
app.appendChild(container)
```

Aqui está o código completo para isso.

<div class="filename">scripts.js</div>

```js
const app = document.getElementById('root')

const logo = document.createElement('img')
logo.src = 'logo.png'

const container = document.createElement('div')
container.setAttribute('class', 'container')

app.appendChild(logo)
app.appendChild(container)
```

Depois de salvar, no front do site, você verá o seguinte.

<div class="filename">Elementos</div>

```html
<div id="root">
  <img src="logo.png" />
  <div class="container"></div>
</div>
```

Isso só será visível na guia *Elements* da Inspeção dos elementos do seu browser (F12 no Chrome), não no código-fonte HTML, conforme explicado no artigo do DOM recomendado lá em cima.

Agora vamos colar todo o nosso código de antes. O último passo será pegar o que só estava mostrando no console anteriormente e transformá-los em elementos de cartão.

Cole tudo de volta, mas vamos apenas olhar o que está dentro do `forEach()`.

```js
data.forEach(movie => {
  console.log(movie.title)
})
```

Em vez disso `console.log`, usaremos `textContent`para definir o texto de um elemento HTML para os dados da API. Eu estou usando `substring()`no elemento `p` para limitar a descrição e manter cada cartão do mesmo tamanho.

<div class="filename">scripts.js</div>

```js
data.forEach(movie => {
  // Criamos uma div com a classe card
  const card = document.createElement('div')
  card.setAttribute('class', 'card')

  // Criamos um h1 e setamos o seu textContent para o titulo do filme
  const h1 = document.createElement('h1')
  h1.textContent = movie.title

  // Criamos um elemento p e setamos o seu textContent para a descrição do filme
  const p = document.createElement('p')
  movie.description = movie.description.substring(0, 300) // Limitamos para 300 chars
  p.textContent = `${movie.description}...` // Concatenamos com reticências

  // Damos Append dos cartões para o elemento contêiner
  container.appendChild(card)

  // Cada cartão terá seu h1 e p
  card.appendChild(h1)
  card.appendChild(p)
})
```

Também substituirei o erro do console por um erro no front end, usando o melhor elemento HTML [`marquee`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/marquee)! (Eu só estou fazendo isso como uma brincadeira para fins divertidos e demonstrativos, não uso realmente `marquee`em qualquer tipo de aplicação real, ou me leve a sério aqui.)

```js
const errorMessage = document.createElement('marquee')
errorMessage.textContent = `Aah, não está funcionando!`
app.appendChild(errorMessage)
```

E acabamos! Aqui está o código final do **scripts.js** .

scripts.js

```js
const app = document.getElementById('root');

const logo = document.createElement('img');
logo.src = 'logo.png';

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(logo);
app.appendChild(container);

fetch('https://ghibliapi.herokuapp.com/films')
  .then(response => {
    return response.json()
  })
  .then(data => {
    data.forEach(movie => {
      const card = document.createElement('div');
      card.setAttribute('class', 'card');

      const h1 = document.createElement('h1');
      h1.textContent = movie.title;

      const p = document.createElement('p');
      movie.description = movie.description.substring(0, 300);
      p.textContent = `${movie.description}...`;

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
    });
  }).catch(err => {
    const errorMessage = document.createElement('marquee')
    errorMessage.textContent = `Aah, não está funcionando!`
    app.appendChild(errorMessage)
  });
```

E com os CSS completos, aqui está o resultado final do produto:

![](../images/print-final-ghibli.png)



Mais uma vez, aqui está um link para o aplicativo online e o código-fonte.

- [Ver demonstração](https://joaohenriquebarbosa.github.io/sandbox/ghibli/)

- [Código fonte no GitHub](https://github.com/JoaoHenriqueBarbosa/sandbox/tree/master/ghibli)

## Conclusão

Parabéns, você usou JavaScript simples para se conectar a uma API usando solicitações HTTP. Espero que você tenha uma melhor compreensão do que é um endpoint de API, como o navegador se comunica com dados de API de terceiros com solicitações e respostas, como analisar JSON em arrays e objetos que o JavaScript entende e como construir um front end inteiramente com JavaScript.

Fizemos isso tudo sem ter que nos preocupar com nada como Node.js, npm, Webpack, React, Angular, ferramentas de construção, Axios e outros termos de desenvolvimento populares, dependências e estruturas que podem confundi-lo sobre o que está acontecendo por baixo dos panos de forma mais simples.

Espero que você tenha achado este artigo útil e sinta-se à vontade para compartilhar ou me corrigir.