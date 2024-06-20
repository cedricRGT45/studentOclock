import {Component, ErrorInfo, ReactNode } from 'react';

interface Props{
    fallback: ReactNode;
    children: ReactNode;
}

interface State {
    hasError: boolean;
}
class ErrorBoundary extends Component<Props, State>  {
    public state: State {
        haserror: false
    }
    public static getDerivedStateFromError(error) {
        return {hasErros: true}
    }
  
    componentDidCatch(error, errorInfo) {
      // You can also log the error to an error reporting service
      logErrorToMyService(error, errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return <h1>Something went wrong.</h1>;
      }
  
      return this.props.children; 
    }
  }