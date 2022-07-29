import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'ptBR',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      ptBR: {
        translation: {
          "Olá, sou João Henrique": "Olá, sou João Henrique",
          "welcome.txt": "<0>Sou <1>João Henrique Barbosa</1>, um desenvolvedor de software <3>full-stack</3> com foco em <5>JavaScript moderno</5>. Gosto de programar, aprender e escrever. Seja bem vinde ao meu site e <7>sinta-se a vontade</7>!</0>",
          "Sobre mim": "Sobre mim",
          "Artigos": "Artigos",
          "Contato": "Contato",
          "Últimos artigos": "Últimos artigos",
          "Ver todos": "Ver todos",
          "Mais populares": "Mais populares",
          "Projetos Open Source": "Projetos Open Source",
          "Eu escrevo sobre o que eu aprendo e compartilho. Inscreva-se na minha newsletter para ser notificado sobre novos conteúdos!": "Eu escrevo sobre o que eu aprendo e compartilho. Inscreva-se na minha newsletter para ser notificado sobre novos conteúdos!",
          "João Henrique Barbosa": "João Henrique Barbosa",
          "Novo": "Novo",
          "Código-fonte": "Código-fonte",
          "Inscrever-se": "Inscrever-se",
          "Obrigado": "Obrigado",
        }
      },
      en: {
        translation: {
          "Olá, sou João Henrique": "Hello, I'm John Barbosa",
          "welcome.txt": "<0>I'm <1>John Barbosa</1>, a <3>full-stack</3> developer focused in <5>Modern JavaScript</5>. I love to program, learn and write. Be welcome to my website and <7>have fun</7>!</0>",
          "Sobre mim": "About me",
          "Artigos": "Articles",
          "Contato": "Contact",
          "Últimos artigos": "Last articles",
          "Ver todos": "See all",
          "Mais populares": "Popular",
          "Projetos Open Source": "Open Source Projects",
          "Eu escrevo sobre o que eu aprendo e compartilho. Inscreva-se na minha newsletter para ser notificado sobre novos conteúdos!": "I write about what I learn and share. Subscribe to my newsletter to be notified about new content!",
          "João Henrique Barbosa": "John Barbosa",
          "Novo": "New",
          "Código-fonte": "Source code",
          "Inscrever-se": "Subscribe",
          "Obrigado": "Thank you",
        }
      },
    }
  });

export default i18n;