import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, errorInfo) {
    if (import.meta.env?.DEV) {
      console.error('ANN route render failed', error, errorInfo);
    }
  }

  render() {
    const { error } = this.state;
    const { children } = this.props;

    if (!error) return children;

    return (
      <main id="main-content" className="ann-page" tabIndex={-1}>
        <section className="ann-page__hero" aria-labelledby="error-boundary-title" role="alert">
          <p className="ann-page__eyebrow">Recovery</p>
          <h1 id="error-boundary-title">We could not load this news page.</h1>
          <p className="ann-page__description">
            The newsroom app caught a rendering issue before it reached readers. Refresh the page or return home.
          </p>
          <a className="ann-page__button" href="/">Return home</a>
        </section>
      </main>
    );
  }
}
