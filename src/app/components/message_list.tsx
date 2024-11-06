import { Message, MessageSender, ToolCall, useChat } from "@palico-ai/react";
import { AgentChatListItem, UserChatListItem } from "./chat_list_item";
import { Box } from "@mui/material";

export interface MessageListProps {
  messages: Message[];
  addResult: ReturnType<typeof useChat>["addResult"];
  pendingToolCalls?: ToolCall[];
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  addResult,
  pendingToolCalls,
}) => {
  return (
    <>
      {messages?.map((message: Message, index) => (
        <Box key={index}>
          {message.sender === MessageSender.User ? (
            <UserChatListItem {...message} />
          ) : (
            <AgentChatListItem
              {...message}
              pendingToolCalls={
                index === messages.length - 1 ? pendingToolCalls : undefined
              }
              addResult={addResult}
            />
          )}
        </Box>
      ))}
    </>
  );
};

export default MessageList;
