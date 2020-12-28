---
date: '2020-12-26'
title: 'A história do meu blog estatico com Next.js e Markdown'
thumbnail: '/images/thumbnails/nextjs.png'
categories:
  - JavaScript
  - Next.js
  - Markdown
tags:
  - api
  - blog
  - next.js
  - markdown
  - javascript
---

Quem perambula bastante pela blogosfera de programadores, ou até mesmo quem só tenha procurado algum tutorial na internet sobre programação, pode ter dado de topa com o [blog da Tania Rascia](https://www.taniarascia.com/), e não é para menos, ela ganhou o prêmio de [Personal Developer Blog of the Year](https://hackernoon.com/personal-developer-blog-of-the-year-hacker-noon-noonies-awards-2019-hz2tu32ql) em terceiro lugar no ano de 2019.

Muito bem, um dia eu estava nessa perambulação e descobri o blog dela, e eu fiquei encantado com a primazia, era tudo muuito bem feito e eu lembro de ter pensado "Caraca! Eu queria que o meu site fosse igual a esse".

> Eu não tinha site, na real eu nem tinha nada, nem sabia direito programar, só achava que sabia, igual hoje 😂

## Gatsby e SSG

**SSG** é uma sigla para **Static Site Generation**, é uma técnica que vem ganhando espaço no mundo do desenvolvimento web, por ser uma ótima maneira de fazer páginas normalmente SPAs com um framework JavaScript, sem afetar o SEO e além disso gerando um belo score de FCP (First Contentful Painting). 

Basicamente as páginas são renderizadas no servidor e ficam guardadas para uso imediato até que seja necessário mudá-las, assim quando um usuário acessa a mesma ele recebe instantaneamente HTML e CSS, JavaScript e dados complementares necessários, sem o navegador ter esforço.

> *FCP* é sigla para *First Contentful Painting*, que consiste em uma das várias métricas que existem para medir quando um site tem boa performance. Mais sobre FCP, em inglês, no [web.dev](https://web.dev/first-contentful-paint/).

Ok! Mas o que isso tem a ver com a história? Acontece que o supracitado site da Tania, era e provavelmente é até hoje feito em [Gatsby](https://www.gatsbyjs.com/), e eu naquele tempo estava ensaiando aprender React, mas mesmo assim, resolvi tentar aprender. E olha, o básico eu aprendi sim, foi muito divertido e eu que tinha visto só o básico do React pude ver como funcionava SSR e SSG na prática. 

Enfim, vasculhando ainda o site da Tania eu descobri que o projeto todo era Open-Source (e meu Deus, como eu amo essa comunidade!) e com o código no [GitHub](https://github.com/taniarascia/taniarascia.com/), contudo, ela mesma adverte no README.md que este projeto não tem a intenção de ser um template ou tema para Gatsby.

Eu clonei o repo, mudei todas as informações para a minha pessoa, escrevi o meu primeiro post e subi para um servidor. Meses depois eu não consegui mais rodar o projeto, e assim, eu até entendo, eu demorei demais, o Gatsby atualizou várias vezes e eu nunca mais mexi no projeto, deu zica. E de novo eu estava sem site.

## O Refactor (v1)

Mas o visual do site construído pela Tania era tão lindo, eu não queria simplesmente abandoná-lo, ainda mais por que era totalmente de boa eu estar usando, a licença é MIT. Então, eu decidi refatorar o site, porém utilizando tecnologias que eu dominava: Laravel.

E cara, tava ótimo, era o mesmo site, era lindo, tudo funcionava. Mas faltava uma coisa... Aquela rapidez, aquela performance que o Gatsby tinha, e além disso o SEO era deplorável, eu não tive nem coragem de publicar essa versão.

Mas daí me rendeu uma boa coisa, fui aprender SEO.

## Next.js

Um ano acumulando conhecimento de React (e programação em geral) depois eu ouvi falar desse Next.js no canal do [Filipe Deschamps](https://www.youtube.com/channel/UCU5JicSrEM5A63jkJ2QvGYw), na real eu já tinha ouvido falar antes, mas não entendia direito o que era, alí foi onde eu vi alguém explicando de fato o que era. 

[Nesse vídeo](https://www.youtube.com/watch?v=EW7m2WIvFgQ) em que ele fala sobre o Next, ele começa falando sobre SSG e SSR, e eu pensei "ai que saco, lá vem o Gatsby de novo", e não me entenda mal, eu aprendi muito com Gatsby, é uma ferramenta ótima e muito bem construída, eu é que fui preguiçoso. Mas para a minha surpresa, ele acabou falando de Next.js e eu fiquei perplexo com a simplicidade.

Li toda a documentação, em alguns dias, por que eu sou bem lento, mas eu lembro que era época de eleições municipais e eu estava lendo a documentação no celular enquanto a minha noiva votava.

Corri atrás e aprendi tudo o que eu podia sobre Next.js, eu estava determinado a fazer o meu site estático, com blog, em Next.js.

## O Refactor (v2)

Em suma, é este site que você está olhando, com a performance desejada, eu utilizei Markdown nos posts, e MongoDB para guardar as inscrições na newsletter e as views dos posts. Ainda pretendo fazer alguns tutoriais sobre como eu fiz tudo isso, mas se você quiser se arriscar, da uma olhada no código fonte, por que uma das coisas que eu aprendi nessa história toda é que o poder da comunidade faz o conhecimento se espalhar. Enfim, é isto! Vlw 🖖