declare namespace JSX {
    interface IntrinsicElements {
      'df-messenger': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        intent?: string;
        chatTitle?: string;
        agentId?: string;
        languageCode?: string;
      };
    }
  }
  