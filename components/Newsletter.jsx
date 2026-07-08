import React, { useId, useState } from 'react';

export default function Newsletter({ title = 'Get the Daily Brief', description = 'Fact-checked headlines delivered to your inbox.', action = '#newsletter', className = '' }) {
  const inputId = useId();
  const helpId = useId();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const validate = () => /^\S+@\S+\.\S+$/.test(email.trim());
  const handleSubmit = (event) => {
    if (!validate()) {
      event.preventDefault();
      setError('Enter a valid email address.');
    } else {
      setError('');
    }
  };
  return (
    <section className={`ann-newsletter${className ? ` ${className}` : ''}`} aria-labelledby={`${inputId}-heading`}>
      <h2 id={`${inputId}-heading`}>{title}</h2><p id={helpId}>{description}</p>
      <form action={action} method="post" onSubmit={handleSubmit} noValidate>
        <label htmlFor={inputId}>Email address</label>
        <div className="ann-newsletter__row"><input id={inputId} name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" aria-describedby={`${helpId}${error ? ` ${inputId}-error` : ''}`} aria-invalid={error ? 'true' : 'false'} required /><button type="submit">Subscribe</button></div>
        {error ? <p className="ann-newsletter__error" id={`${inputId}-error`} role="alert">{error}</p> : null}
      </form><style>{styles}</style>
    </section>
  );
}
const styles = `.ann-newsletter{background:linear-gradient(135deg,#991b1b,#1e293b);border-radius:1.25rem;color:#fff;padding:clamp(1.25rem,4vw,2rem)}.ann-newsletter h2{font-size:clamp(1.6rem,4vw,2.7rem);letter-spacing:-.045em;margin:0}.ann-newsletter p{color:#fee2e2;margin:.5rem 0 1rem}.ann-newsletter label{display:block;font-weight:850;margin-bottom:.45rem}.ann-newsletter__row{display:flex;gap:.75rem}.ann-newsletter input{border:0;border-radius:999px;flex:1;font:inherit;min-height:2.85rem;min-width:0;padding:.75rem 1rem}.ann-newsletter button{background:#fff;border:0;border-radius:999px;color:#991b1b;cursor:pointer;font:inherit;font-weight:900;padding:.75rem 1.1rem}.ann-newsletter__error{color:#fecaca!important;font-weight:800}@media(max-width:560px){.ann-newsletter__row{flex-direction:column}}`;
