---
date: "2022-08-08"
title: "Fazendo bind de elementos React a partir de uma string"
thumbnail: "/images/thumbnails/solid.png"
categories:
  - "Solidjs"
tags:
  - "solid"
  - "react"
  - "front-end"
  - "frameworks"
  - "linguagem"
  - "programação"
  - "aplicações"
  - "desktop"
  - "electron"
  - "back-end"
  - "node.js"
  - "dispositivos"
  - "embarcados"
  - "IoT"
  - "interfaces"
  - "gráficas"
  - "funcional"
---

**Typescript** e **React** são duas das minhas tecnologias favoritas. Prefiro o Typescript porque ele é tipado estaticamente, o que significa que posso capturar erros logo no início do processo de desenvolvimento. Enquanto o React é ótimo para criar componentes reutilizáveis que podem ser usados em diferentes projetos. Além disso, uso bibliotecas, como **Lodash** e **Redux**, para me ajudar a resolver problemas de forma mais eficiente. Embora eu goste de trabalhar em problemas desafiadores, às vezes vou longe demais e gasto muito tempo em um único problema. Isso pode levar à frustração e até à exaustão. Como resultado, eu preciso fazer intervalos e voltar ao problema com novos olhos. Dessa forma, posso encontrar soluções mais criativas e evitar ficar preso nos detalhes.

Ontem eu estava lutando com um problema que me exigia converter uma string em um array de elementos JSX. Eu sabia que poderia usar o método map() para iterar sobre cada palavra na string, mas estava tendo dificuldade para descobrir como vincular (ou *bindar*) cada tag de vinculação (que seria assim: {0}) a um elemento React correspondente. Depois de passar algum tempo no problema, decidi terminar o meu dia. Esta manhã acordei e decidi olhar o problema de uma perspectiva diferente. E cheguei a abordagem que vou mostrar a seguir.

Neste artigo, vamos aprender a vincular elementos a uma string no React, criaremos uma mini engine de templates, vamos dizer assim. Primeiro, olharemos como isso pode ser feito com um pseudocódigo que parece JavaScript puro antes de passar para uma solução mais avançada com Typescript e React.

## Problema

Imaginemos que você tem uma string com tags de vinculação (por exemplo: {3}) que deseja substituir por elementos React correspondente, na forma de um `span` para cada palavra na string e um elemento que deve estar no lugar da tag de vinculação.

## Solução

No nosso pseudocódigo, você poderia fazer algo assim:

```javascript
const str = 'I am a {0}';

const element1 = <span>programmer</span>;

const element2 = <span>writer</span>;

const novaString = str.replace('{0}', element1);

escreva(novaString); // "I am a programmer"
```

### Lidando com expressões regulares e índices de arrays

Essa abordagem funciona bem se você tiver apenas uma tag, mas e se tiver múltiplas tags? Você poderia usar uma expressão regular para substituir todas as tags pelos elementos correspondentes e usar o conteúdo da tag como um índice para o array de elementos para vinculação:

```javascript
const string = 'I am a {0} and a {1}';

const palavras = string.split(' ');

const elementosParaVinculacao = ["programmer", "writer"];

const expressaoRegular = /\{(\d+)\}/g; // encontra binding tags tipo {0}, {1}, etc.

var novaString = "";

paraCada (palavra em palavras) {
    se (palavra.combinaCom(expressaoRegular)) {
        novaString = novaString + " " + elementosParaVinculacao[palavra.remove("{", "}")];
    } senão {
        novaString = novaString + " " + palavra;
    }
}

escreva(novaString); // "I am a programmer and a writer"
```

Essa expressão regular corresponde a todas as tags de vinculação e as substitui por elementos do array `elementosParaVinculacao`, usando o número dentro da tag como um índice.

### React com TypeScript

Vejamos agora como podemos fazer isso na vida real com o React com o TypeScript.

O TypeScript é um superset tipado do JavaScript que é compilado para o JavaScript puro no final das contas.

Primeiro, vamos criar um componente de função chamado **Words** que recebe a string contendo as tags de vinculação na posição certa da frase e um array de elementos para vincular como props. O *type* para as props do componente será:

```typescript
type WordsProps = {
  txt: string;
  bindList: JSX.Element[];
};
```

E agora o próprio componente:

```typescript
const Words = ({ txt, bindList }: WordsProps) => {
	// aqui vai o código
};
```

Em seguida, dividimos a string por espaço (" ") e usamos o método map() para transformar o array resultante. Para cada palavra, retornaremos dentro de um `span` em caso de palavras normais ou a tag correspondente ao elemento dentro do array que é o nosso segundo parâmetro.

A tag será identificada pela posição da palavra na frase original. Por exemplo, se tivermos a string "I am a {0}", a primeira palavra seria 0 e seria substituída pelo primeiro elemento do nosso array. Se não houver mais elementos para vincular, continuaremos e retornaremos a palavra não modificada.

```JSX
const Words = ({ txt, bindList }: WordsProps) => {
  const words = txt.split(' ');
  const wordsList = words.map((word, index) => {
    return (
      <span key={index} className="word">
        {
          // checa se a palavra é uma binding markup. Ex: {0}
          word.match(/\{[0-9]\}/)
            ? // se for, substitua-o pelo elemento no array bindList
              bindList[Number(word.replace(/[{}]/g, ''))]
            : // se não for, basta exibir a palavra
              word
        }
        &nbsp;
      </span>
    );
  });
  return <>{wordsList}</>;
};
```

## Resultado final

Deixe-me mostrar um exemplo do resultado da mistura de palavras e elementos:

![](/images/posts/print-bee-byte-chat.png)

Essa é uma forma simples e eficaz de vincular elementos a uma string no React, embora eu tenha precisado dar um passo para trás e ter uma perspectiva diferente sobre o problema. Espero que este artigo seja útil e que você possa usar essa abordagem para resolver problemas semelhantes em seus projetos. Obrigado por ler!