import MessageFormUi from "./MessageFormUi";
import { useState } from "react";
import { usePostAiTextMutation } from "@/store/store";
const Ai = ({ props, chatProps }) => {
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState("");
  const [trigger] = usePostAiTextMutation();
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
    trigger(form);
    setMessage("");

    setAttachment("");
  };
  return (
    <MessageFormUi
      handleSubmit={handleSubmit}
      setAttachment={setAttachment}
      message={message}
      handleChange={handleChange}
    />
  );
};

export default Ai;
