import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="error-boundary-box" style={{
          padding: '40px 20px',
          textAlign: 'center',
          background: 'var(--charcoal)',
          border: '1px solid var(--hairline)',
          borderRadius: '8px',
          margin: '20px auto',
          maxWidth: '600px',
          color: 'var(--white)'
        }}>
          <span style={{ fontSize: '36px', display: 'block', marginBottom: '12px' }}>✝️</span>
          <h3 style={{ fontFamily: 'Fraunces, serif', marginBottom: '8px', color: 'var(--gold)' }}>
            Something went wrong
          </h3>
          <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '20px' }}>
            We encountered an unexpected issue displaying this section.
          </p>
          <button
            onClick={this.handleReload}
            className="btn btn-primary"
            style={{ padding: '10px 22px', fontSize: '13px' }}
          >
            ↻ Refresh Page / பக்கத்தை புதுப்பிக்கவும்
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
