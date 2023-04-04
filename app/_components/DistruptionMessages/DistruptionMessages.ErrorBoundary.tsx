"use client"

import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="w-full">
          <div className="w-full px-4 py-4 text-center bg-orange-500 dark:bg-orange-500 border-b border-b-slate-200 dark:border-b-slate-900">
            <p className="text-sm text-slate-200 dark:text-slate-200">
              Kunde inte hämta trafik meddelanden
            </p>
          </div>
        </div>
      )
    }

    return this.props.children;
  }
}

export default ErrorBoundary;