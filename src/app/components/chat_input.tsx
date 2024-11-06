"use client";

import { Box, TextField } from "@mui/material";
import { useState } from "react";

export interface ChatInputProps {
  sendMessage: (message: string) => void;
  enabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  sendMessage,
  enabled,
}) => {
  const [message, setMessage] = useState<string>("");

  const handleSendMessage = () => {
    sendMessage(message);
    setMessage("");
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSendMessage();
      }}
    >
      <TextField
        fullWidth
        autoFocus
        type="text"
        label="message"
        placeholder="Send a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={!enabled}
      />
    </form>
  );
};
