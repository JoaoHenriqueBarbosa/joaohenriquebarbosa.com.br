import React, { useState } from 'react';
import Page from '../components/Page';
import SEO from '../components/SEO';
import { validateEmail } from '../utils/utils';

const Contact = ({ config }) => {

  const [email, setEmail] = useState("");
  const [submited, setSubmited] = useState(false);
  const [success, setSuccess] = useState(false);

  const onSubmit = (ev) => {
    ev.preventDefault();
    setSubmited(true);

    if (validateEmail(email)) {
      fetch("/api/subscribe", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "Content-type": "application/json;charset=UTF-8" }
      }).then(() => setSuccess(true));
    }
  }

  return (
    <Page
      config={config}
    >
      <SEO
        title="Artigos"
        siteTitle={config.title}
        description={config.description}
        image="/images/joaofull.png"
        pathname={config.siteUrl}
        siteLanguage="pt-BR"
        siteLocale="BR"
        twitterUsername={config.twitter}
      />
      <div className="page container">
        <div>
          <h1>Contato</h1>
          {/* <h2>Newsletter</h2> */}
          <p>Eu escrevo sobre o que eu aprendo e compartilho. Inscreva-se na minha newsletter para ser notificado sobre novos conteúdos!</p>
          {success && <p className="email-success">Obrigado!</p>}
          {!success && (
            <div className="newsletter-form">
              <input
                type="email"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                onKeyDown={(ev) => ev.key === "Enter" && onSubmit(ev)}
                required
                className={`email ${!validateEmail(email) && submited ? "error" : ""}`}
                placeholder="Email"
              />
              <input onClick={onSubmit} type="submit" name="submit" id="submit-sidebar" value="Inscrever-se" />
            </div>
          )}
          <h2>Pela web</h2>
          <ul>
            <li>Email: <a href="mailto:jhenrique@aktienow.com">jhenrique@aktienow.com</a></li>
            <li>GitHub: <a href="https://github.com/JoaoHenriqueBarbosa">JoaoHenriqueBarbosa</a></li>
            <li>Twitter: <a href="https://twitter.com/codingjon">codingjon</a></li>
            <li>LinkedIn: <a href="https://www.linkedin.com/in/jo%C3%A3o-henrique-barbosa-ba1322124/">João Henrique Barbosa</a></li>
          </ul>

        </div>
      </div>
    </Page>
  )
}

export default Contact;

export async function getStaticProps() {

  const siteData = await import(`../content/data/config.json`);

  return {
    props: {
      config: siteData.default,
      revalidate: 10
    },
  };
}
