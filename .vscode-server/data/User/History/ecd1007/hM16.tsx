import {Component, ErrorInfo } from 'react';

interface Props{
    fallback: ReactNode;
    child
}
class ErrorBoundary extends Component {
  
    public static getDerivedStateFromError(error) {
     
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