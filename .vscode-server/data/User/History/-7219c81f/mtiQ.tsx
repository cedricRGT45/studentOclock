import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): State {
    // Mettez à jour l'état pour afficher l'UI de repli lors du prochain rendu.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Vous pouvez aussi enregistrer l'erreur dans un service de rapport.
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Vous pouvez rendre n'importe quel UI de repli.
      return <h1>Quelque chose a mal tourné.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
