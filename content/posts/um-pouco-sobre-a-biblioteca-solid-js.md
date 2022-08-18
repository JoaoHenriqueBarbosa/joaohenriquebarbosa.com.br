---
date: "2022-08-03"
title: "Um pouco sobre a biblioteca Solid.js"
thumbnail: '/images/thumbnails/solid.png'
categories:
  - Solidjs
tags:
  - solid
  - react
  - front-end
  - frameworks
  - linguagem
  - programação
  - aplicações
  - desktop
  - electron
  - back-end
  - node.js
  - dispositivos
  - embarcados
  - IoT
  - interfaces
  - gráficas
  - funcional
---

O JavaScript tem se tornado frequentemente uma linguagem de programação em alta,
principalmente com o surgimento de frameworks para o front-end como o React e o Angular,
atualmente a linguagem está presente em várias áreas como aplicações para desktop (Electron),
back-end (Node.js) e até mesmo para dispositivos embarcados (IoT).

Este post é uma breve introdução ao Solid.js, uma biblioteca baseada no React,
focada em desenvolvimento de aplicações de desktop, como eu tenho me interessado
por aplicações com interfaces gráficas, e por programação funcional, achei
interessante conhecer um pouco mais sobre essa biblioteca.

## Introdução

O Solid é uma biblioteca baseada no React, para desenvolvimento de aplicações de desktop,
ele foi desenvolvido para facilitar o desenvolvimento de aplicações de desktop,
já que o React é uma biblioteca voltada para o desenvolvimento de aplicações web.

## Componentes

Ao invés de utilizar tags como `<div>` e `<span>`, o Solid utiliza componentes,
como `<Button>`, `<Window>`, `<Text>`, `<Box>` e `<Stack>`, Podemos criar os nossos próprios
componentes também.

Os componentes podem conter outros componentes, por exemplo:

```jsx
function App() {
  return (
    <Window>
      <Box>
        <Text>Hello, world!</Text>
        <Button>Click me!</Button>
      </Box>
    </Window>
  );
}

render(<App />, document.getElementById("root"));
```

A função `App` retorna um `<Window>` que contém um `<Box>`, o `<Box>` contém
um `<Text>` e um `<Button>`, o `<Text>` é renderizado como um elemento `<span>`
e o `<Button>` é renderizado como um elemento `<button>`.

## Estado

O Solid utiliza o conceito de estado para atualizar os valores de uma propriedade de um
componente através de um evento, como um `click` do mouse, por exemplo:

```jsx
<Button
  onClick={() => {
    setCount(count + 1);
  }}
>
  {count}
</Button>
```

A propriedade `onClick` do `<Button>` atualiza o valor do estado `count` no retorno
de uma função, o valor do estado `count` é renderizado dentro do `<Button>`.

## Conclusão

O Solid é uma biblioteca interessante para a criação de aplicações de desktop,
podemos criar nossos próprios componentes, utilizar o estado para atualizar o valor de
uma propriedade e ainda suporta o TypeScript.
