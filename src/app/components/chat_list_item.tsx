"use client";

import { Box, TextField, Typography } from "@mui/material";
import { AgentMessage, ToolCall, useChat, UserMessage } from "@palico-ai/react";
import { useMemo, useState } from "react";
import ToolCallUI from "./tool_call_ui";

export interface ChatListItemWrapperProps {
  label: string;
  children: React.ReactNode;
}

export const ChatListItemWrapper: React.FC<ChatListItemWrapperProps> = ({
  label,
  children,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        padding: 1,
        border: 1,
        borderRadius: 1,
        borderColor: "grey.300",
      }}
    >
      <Typography variant="subtitle2">{label}</Typography>
      {children}
    </Box>
  );
};

export const UserChatListItem: React.FC<UserMessage> = ({
  message,
  toolCallResults,
}) => {
  return (
    <ChatListItemWrapper label="User">
      {message && <div>{message}</div>}
      {toolCallResults?.map((toolCallResult) => (
        <div key={toolCallResult.toolCall.id}>
          {toolCallResult.toolCall.name}()
          <code>{JSON.stringify(toolCallResult.result)}</code>
        </div>
      ))}
    </ChatListItemWrapper>
  );
};

export interface AgentMessageListItemProps extends AgentMessage {
  pendingToolCalls?: ToolCall[];
  addResult: ReturnType<typeof useChat>["addResult"];
}

export const AgentChatListItem: React.FC<AgentMessageListItemProps> = ({
  message,
  toolCalls,
  addResult,
  pendingToolCalls,
}) => {
  const toolCallContent = useMemo(() => {
    console.log("pendingToolCalls", pendingToolCalls);
    if (pendingToolCalls && pendingToolCalls.length > 0) {
      return pendingToolCalls.map((toolCall) => (
        <ToolCallUI
          key={toolCall.id}
          toolCall={toolCall}
          sendResult={(result) => addResult(toolCall, result)}
        />
      ));
    }
    if (toolCalls && toolCalls.length > 0) {
      return toolCalls.map((toolCall) => (
        <div key={toolCall.id}>Request Toolcall: {toolCall.name}()</div>
      ));
    }
  }, [toolCalls, pendingToolCalls]);

  return (
    <ChatListItemWrapper label="Agent">
      {message && <div>{message}</div>}
      {toolCallContent}
    </ChatListItemWrapper>
  );
};
