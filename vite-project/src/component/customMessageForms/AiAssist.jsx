import MessageFormUi from "./MessageFormUi";
import { useState, useEffect } from "react";
import { usePostAiAssistMutation } from "@/store/store";
const useDebounce = (message, time) => {
  const [debounce, setDebounce] = useState(message);
  useEffect(() => {
    const setUp = setTimeout(() => {
      setDebounce(message);
    }, time);
    return () => {
      clearTimeout(setUp);
    };
  }, [message, time]);

  return debounce;
};
const AiAssist = ({ props, chatProps }) => {
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState("");
  const [appendText, setAppendText] = useState("");
  const [trigger, resultAssist] = usePostAiAssistMutation();
  const handleChange = (e) => {
    setMessage(e.target.value);
  };
  const handleSubmit = async () => {
    console.log(props, "jsjsj", chatProps);
    const date = new Date()
      .toISOString()
      .replace("T", " ")
      .replace("Z", `${Math.floor(Math.random() * 1000)}+00:00`);
    const at = attachment ? [{ blob: attachment, file: attachment.name }] : [];
    console.log(at, date);

    const form = {
      attachments: at,
      created: date,
      sender_username: props.username,
      activeChatId: chatProps.activeChatId,
      text: message,
    };
    // return;
    props.onSubmit(form);

    setMessage("");

    setAttachment("");
  };
  const deBounce = useDebounce(message, 1000);
  useEffect(() => {
    if (deBounce) {
      const form = { text: message };
      trigger(form);
    }
  }, [deBounce]);
  const handleKeyDown = (e) => {
    if (e.KeyCode === 9 && e.KeyCode === 12) {
      e.preventDefault();
      setMessage(`${message}  ${appendText}`);
    }
    setAppendText("");
  };
  useEffect(() => {
    if (resultAssist.data?.text) {
      setAppendText(resultAssist.data?.text);
    }
  }, [resultAssist]);
  return (
    <MessageFormUi
      handleSubmit={handleSubmit}
      setAttachment={setAttachment}
      message={message}
      handleChange={handleChange}
      appendText={appendText}
      handleKeyDown={handleKeyDown}
    />
  );
};

export default AiAssist;
