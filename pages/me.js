import matter from 'gray-matter';
import React from 'react';
import Page from '../components/Page';
import Podcast from '../components/Podcast';

const Me = ({ title, podcastData }) => {
  return (
    <Page
      siteTitle={title}
      pageTitle="Sobre mim"
    >
      <article className="container">
        <header className="page-header">
          <h1>Sobre mim</h1>
        </header>
        <div className="page">
          <p>Sou João Henrique Barbosa, um desenvolvedor de software full-stack com foco em JavaScript moderno.</p>
          <p>
            Aprendi a programar com 13 anos com Python em um site chamado Code Academy, desde então sou apaixonado por programação. Estudei Análise e Desenvolvimento de Software pela <a href="http://www.univale.com.br">Univale</a>, onde
            confirmei a minha paixão e aprendi muita coisa, formalmente, mas também em casa pesquisando sobre tudo o que os professores falavam em sala.
          </p>
          <p>
            Eu resolvi criar este site para ser um lugar onde eu documento tudo o que eu aprendo enquanto corro através da minha carreira. Meu objetivo é trazer todo conhecimento que encontro em inglês sobre novas tecnologias, e técnicas
            modernas para a comunidade e espero ajudar muitos desenvolvedores.
          </p>
          <p>
            <img src="/images/joaofull.jpg" alt="Me" />
          </p>
          <h2>Pela web</h2>
          <ul>
            <li>Email: <a href="mailto:jhenrique@aktienow.com">jhenrique@aktienow.com</a></li>
            <li>GitHub: <a href="https://github.com/JoaoHenriqueBarbosa">JoaoHenriqueBarbosa</a></li>
            <li>Twitter: <a href="https://twitter.com/codingjon">codingjon</a></li>
            <li>LinkedIn: <a href="https://www.linkedin.com/in/jo%C3%A3o-henrique-barbosa-ba1322124/">João Henrique Barbosa</a></li>
          </ul>
          <h2>Podcast</h2>
          <Podcast podcastData={podcastData} />
          <h2>Links</h2>
          <p>Uma lista nada exaustiva.</p>
          <ul>
            <li><a href="https://www.alura.com.br/">Alura</a> – uma plataforma de ensino muito eficiente</li>
            <li><a href="https://hipsters.tech/">Hisptes.tech</a> – um podcast que pode te revelar novos horizontes</li>
            <li><a href="https://www.cursoemvideo.com/">Curso em vídeo - Com Gustavo Guanabara</a> – onde dei os meu primeiros passos</li>
          </ul>
          <h2>Linha do tempo</h2>
          <ul>
            <li><strong>1997</strong> - Nasci em Faxinal - PR. Sou o mais velho de um casal de irmãos</li>
            <li><strong>1998</strong> - Meus pais se mudaram para um cidade com menos de 2000 habitantes recém criada chamada Cruzmaltina, também no paraná.</li>
            <li><strong>2006</strong> - Assisti na TV o filme <em>Mensagem para você</em> com o Tom Hanks, o filme já era velho mas eu não fazia idéia, lembro do meu encantamento em saber que as pessoas se comunicavam pelo computador, através de uma coisa chamada e-mail</li>
            <li><strong>2007</strong> - Minha família compra o primeiro computador, um genérico, sem marca, veio com uma distro totalmente desconhecida pra mim até hoje de Linux chamada Phoenix, mas magicamente eu lembro dele se transformarem Windows XP (meus pais devem ter chamado o "menino do computador")</li>
            <li><strong>2009</strong> - Fiz a minha conta no Orkut</li>
            <li><strong>2010</strong> - Star Trek entrou na minha vida em formato de filme - Star Trek Genreations</li>
            <li><strong>2011</strong> - Prestes a iniciar o ensino médio, resolvi fazer o Curso de Formação de Docentes, apesar de cobiçar o Técnico em Informática, a cidade mais próxima que tinha era muito distante</li>
            <li><strong>também 2011</strong> - Conheci minha grande amiga Maria Luiza, ela era <em>heavy user</em> de <a href="https://www.tumblr.com/">Tumblr</a>, e na intenção de impressionar resolvi fazer um <em>microblog</em> no site elá eu conheci o HTML, é claro que já tinha ouvido falar, mas nunca tinha procurado aprender a fundo. <strong>Vlw Maria!</strong></li>
            <li><strong>2015</strong> - Comecei no primeiro ano de Tecnologia Análise e Desenvolvimento de Sistemas, descobri o Delphi 🤦‍♂️, aprendi a programar a moda antiga com os algoritmos no papel, com o famoso professor <a href="https://www.escavador.com/sobre/633976/claudio-dei-ricardi">Cláudio Dei Ricardi</a></li>
            <li><strong>2018</strong> - Me graduei em TADS, abri minha MEI <a href="https://www.janxtech.com.br/">Janx Technologies</a>, aprendi muito sobre PHP MVC, APIs, e front-end. E dei minhas primeiras investidas no que se tornaria aminha grande paixão que é Javascript moderno</li>
            <li><strong>2019</strong> - Criei um blog para documentar minhas incursões no mundo da programação</li>
          </ul>
          <h2>Atualmente usando</h2>
          <ul>
            <li><strong>Computador:</strong> Dell Vostro</li>
            <li><strong>Hospedagem:</strong> <a href="https://www.hostgator.com.br">Hostagor</a></li>
            <li><strong>Editor:</strong> <a href="https://code.visualstudio.com/">Visual Studio Code</a></li>
            <li><strong>Static Site Generator:</strong> <a href="https://gatsbyjs.org">Gatsby</a></li>
            <li><strong>Syntax highlighting:</strong> <a href="http://prismjs.com/">PrismJS</a></li>
            <li><strong>Notas:</strong> <a href="https://keep.google.com/">Google Keep</a></li>
          </ul>
        </div>
      </article>
    </Page>
  )
}

export default Me;

export async function getStaticProps() {

  // const siteData = await import(`../data/config.json`);
  // const content = await import(`../content/pages/me.md`);
  // const data = matter(content.default);

  // delete data.orig;

  // return {
  //   props: {
  //     ...data,
  //     title: siteData.default.title,
  //   },
  // };

  const feed = require('rss-to-json');
  const siteData = await import(`../data/config.json`);

  const podcastData = await feed.load('https://anchor.fm/s/25239504/podcast/rss');

  return {
    props: {
      podcastData,
      title: siteData.default.title,
    },
  };
}
