import { Box, TextField, Typography } from "@mui/material";
import { ToolCall } from "@palico-ai/react";
import { useState } from "react";

interface ToolCallUIProps {
  toolCall: ToolCall;
  sendResult: (result: any) => void;
}

const ToolCallUI: React.FC<ToolCallUIProps> = ({ toolCall, sendResult }) => {
  switch (toolCall.name) {
    case "askForConfirmation":
      return <AskForConfirmation toolCall={toolCall} sendResult={sendResult} />;
    case "getLocation":
      return <GetLocation toolCall={toolCall} sendResult={sendResult} />;
    default:
      return (
        <Box>
          <Typography variant="body2" color="error">
            Tool Call UI for {toolCall.name} is not defined
          </Typography>
        </Box>
      );
  }
};

const AskForConfirmation: React.FC<ToolCallUIProps> = ({
  toolCall,
  sendResult,
}) => {
  const { parameters } = toolCall;

  return (
    <div>
      <Typography gutterBottom>
        {parameters?.message ?? "Do you want to run external tool"}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          gap: 2,
        }}
      >
        <button
          onClick={() =>
            sendResult({
              result: "Yes",
            })
          }
        >
          Yes
        </button>
        <button
          onClick={() =>
            sendResult({
              result: "No",
            })
          }
        >
          No
        </button>
      </Box>
    </div>
  );
};

const GetLocation: React.FC<ToolCallUIProps> = ({ toolCall, sendResult }) => {
  const [location, setLocation] = useState<string>("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        sendResult({
          result: location,
        });
      }}
    >
      <TextField
        type="text"
        variant="standard"
        fullWidth
        autoComplete="off"
        value={location || ""}
        onChange={(e) => {
          setLocation(e.target.value);
        }}
        placeholder="What is your location?"
      />
    </form>
  );
};

export default ToolCallUI;