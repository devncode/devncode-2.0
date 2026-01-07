"use client";

import { Component } from "react";
import { event } from "../lib/mixpanel";
import { IS_DEVELOPMENT } from "../lib/config";

export class ErrorBoundary extends Component {
  state = { hasError: false, error: null, errorInfo: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("App error:", error, errorInfo);
    
    // Store error info for development display
    this.setState({ errorInfo });
    
    // Track error to Mixpanel for observability
    try {
      event({
        action: "error",
        category: "application",
        label: error?.message || "Unknown error",
        value: error?.stack?.substring(0, 200) || null,
      });
    } catch (trackingError) {
      // Silently fail if analytics fails
      console.warn("Failed to track error:", trackingError);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center px-6">
          <div className="text-center max-w-md">
            <h1 className="text-3xl font-space-grotesk font-semibold mb-4 text-custom-black dark:text-beige">
              Something went wrong
            </h1>
            <p className="mb-6 text-custom-black/70 dark:text-beige/70">
              We encountered an unexpected error. Please try reloading the page.
            </p>
            {IS_DEVELOPMENT && this.state.error && (
              <details className="text-left mb-6 p-4 bg-red-50 dark:bg-red-900/20 rounded overflow-auto max-h-64">
                <summary className="cursor-pointer font-semibold text-sm mb-2 text-red-700 dark:text-red-400">
                  Error Details (Development Only)
                </summary>
                <pre className="text-xs text-red-800 dark:text-red-300 whitespace-pre-wrap break-words">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack && (
                    <>
                      {"\n\nComponent Stack:\n"}
                      {this.state.errorInfo.componentStack}
                    </>
                  )}
                </pre>
              </details>
            )}
            <button
              onClick={() => window.location.reload()}
              className="inline-block bg-custom-black text-white dark:bg-beige dark:text-custom-black px-6 py-3 rounded-full font-medium transition-all duration-200 hover:bg-terracotta dark:hover:bg-terracotta"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

