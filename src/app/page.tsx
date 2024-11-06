"use client";

import { Message, MessageSender, useChat } from "@palico-ai/react";
import {
  AgentChatListItem,
  UserChatListItem,
} from "./components/chat_list_item";
import { useState } from "react";
import { Box, Stack } from "@mui/material";
import { ChatInput } from "./components/chat_input";
import MessageList from "./components/message_list";

export default function Chat() {
  const { messages, pendingToolCalls, sendMessage, addResult, loading } =
    useChat({
      apiURL: "/api/palico",
      agentName: "auto_agent",
    });

  const [input, setInput] = useState("");

  const handleSendMessage = async () => {
    if (input.length > 0) {
      await sendMessage({
        userMessage: input,
      });
      setInput("");
    }
  };

  const hasPendingToolCalls = pendingToolCalls && pendingToolCalls.length > 0;

  return (
    <Box
      sx={{
        height: "100vh",
      }}
    >
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="stretch"
        spacing={2}
        sx={{
          width: "100%",
          height: "100%",
          boxSizing: "border-box",
          padding: 12,
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            paddingX: 2,
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <MessageList
            messages={messages}
            addResult={addResult}
            pendingToolCalls={pendingToolCalls}
          />
        </Box>
        {!hasPendingToolCalls && (
          <ChatInput
            enabled={!loading && !hasPendingToolCalls}
            sendMessage={(message) => {
              sendMessage({
                userMessage: message,
              });
            }}
          />
        )}
      </Stack>
    </Box>
  );
}
