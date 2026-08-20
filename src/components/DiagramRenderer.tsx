import React, { Component, ErrorInfo, ReactNode } from 'react';
import { DiagramSpec } from '../types/diagram';
import { EducationalDiagram } from './EducationalDiagram';
import { AlertCircle, RotateCcw } from 'lucide-react';

interface DiagramRendererProps {
  spec: DiagramSpec;
  className?: string;
  onRetry?: () => void;
}

interface DiagramRendererState {
  hasError: boolean;
  error?: Error;
}

export class DiagramRenderer extends Component<DiagramRendererProps, DiagramRendererState> {
  constructor(props: DiagramRendererProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): DiagramRendererState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[DiagramRenderer Error]:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
    if (this.props.onRetry) {
      this.props.onRetry();
    }
  };

  render(): ReactNode {
    if (this.state.hasError || !this.props.spec) {
      return (
        <div className="rounded-2xl border border-rose-200 bg-rose-50/70 p-4 text-rose-900 flex flex-col items-center justify-center gap-2 text-center my-2 shadow-xs">
          <AlertCircle className="h-6 w-6 text-rose-600" />
          <p className="text-xs font-bold text-slate-800">
            Unable to render this diagram.
          </p>
          <p className="text-[11px] text-slate-600 max-w-sm">
            There was an issue processing the visual diagram specification.
          </p>
          <button
            onClick={this.handleRetry}
            className="mt-1 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs transition active:scale-95"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Retry Diagram</span>
          </button>
        </div>
      );
    }

    return (
      <EducationalDiagram
        spec={this.props.spec}
        className={this.props.className}
      />
    );
  }
}
