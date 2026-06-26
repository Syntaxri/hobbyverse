'use client';

import { Component } from 'react';
import { Card } from './Card';
import { Button } from './Button';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-8 flex items-center justify-center min-h-[200px]">
          <Card className="p-8 text-center max-w-md" hoverEffect={false}>
            <div className="w-12 h-12 rounded-xl bg-hv-coral/10 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-hv-coral" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-hv-foreground mb-2">Something went wrong</h3>
            <p className="text-sm text-hv-muted mb-6">This section encountered an error. Please try again.</p>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => this.setState({ hasError: false, error: null })}
            >
              Try Again
            </Button>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
