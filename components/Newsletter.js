import { useState } from "react";
import { validateEmail } from "../utils/utils";

const Newsletter = () => {

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
    <div>
      <h2>Newsletter</h2>
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
            placeholder="Email" />
          <input onClick={onSubmit} type="submit" name="submit" id="submit-sidebar" value="Inscrever-se" />
        </div>
      )}
    </div>
  )
};

export default Newsletter;