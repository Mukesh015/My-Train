"use client";

import { useEffect } from "react";

const DialogflowMessenger: React.FC = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    // @ts-ignore
    <df-messenger
      intent="WELCOME"
      chat-title="Tour-Guide-chat-bot"
      agent-id="aa68d465-6f42-4835-ac78-a05f84ac7d89"
      language-code="en"
    // @ts-ignore
    ></df-messenger>
  );
};

export default DialogflowMessenger;
