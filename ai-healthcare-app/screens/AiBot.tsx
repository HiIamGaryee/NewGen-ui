import React, { useState } from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message as ChatMessage,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import { Box, IconButton } from "@mui/material";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";

interface IMessage {
  message: string;
  sender: string;
  direction?: "incoming" | "outgoing";
}

interface AiBotProps {
  onClose: () => void;
}

const AiBotUrl = process.env.REACT_APP_AIBOT_API_KEY;

const systemMessage = {
  role: "system",
  content:
    "You are an AI healthcare assistant. Provide responses in a professional yet friendly tone with clear, simple explanations.",
};

const AiBot = ({ onClose }: AiBotProps) => {
  const [messages, setMessages] = useState<IMessage[]>([
    {
      message: "Welcome to AI Healthcare Chatbot! How can I assist you today?",
      sender: "ChatGPT",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message: string) => {
    const newMessage: IMessage = {
      message,
      direction: "outgoing",
      sender: "user",
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages: IMessage[]) {
    let apiMessages = chatMessages.map((messageObject) => {
      return {
        role: messageObject.sender === "ChatGPT" ? "assistant" : "user",
        content: messageObject.message,
      };
    });

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [systemMessage, ...apiMessages],
    };

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${AiBotUrl}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiRequestBody),
      });

      const data = await response.json();
      setMessages([
        ...chatMessages,
        {
          message: data.choices[0].message.content,
          sender: "ChatGPT",
        },
      ]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages([
        ...chatMessages,
        {
          message: "Sorry, there was an error processing your request.",
          sender: "ChatGPT",
        },
      ]);
    }
    setIsTyping(false);
  }

  return (
    <Box sx={{ pr: 2, position: "relative" }}>
      <IconButton
        onClick={onClose}
        style={{ position: "absolute", right: 0, top: 0 }}
      >
        <HighlightOffRoundedIcon />
      </IconButton>
      <Box sx={{ position: "relative", height: "450px", width: "500px" }}>
        <MainContainer>
          <ChatContainer>
            <MessageList
              scrollBehavior="smooth"
              typingIndicator={isTyping ? <TypingIndicator content="AI Healthcare Assistant is typing..." /> : null}
            >
              {messages.map((message, index) => (
                <ChatMessage
                  key={index}
                  model={{
                    message: message.message,
                    direction: message.direction ?? "incoming",
                    position: "single",
                  }}
                />
              ))}
            </MessageList>
            <MessageInput placeholder="Ask a healthcare question..." onSend={handleSend} />
          </ChatContainer>
        </MainContainer>
      </Box>
    </Box>
  );
};

export default AiBot;
