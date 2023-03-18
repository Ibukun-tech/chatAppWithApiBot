import React from "react";

import Header from "@/component/header/index.jsx";
import StandardMessageForm from "@/component/customMessageForms/StandardMessageForm";
import {
  useMultiChatLogic,
  MultiChatSocket,
  MultiChatWindow,
} from "react-chat-engine-advanced";
import Ai from "@/component/customMessageForms/Ai";
import AiCode from "@/component/customMessageForms/AiCode";
import AiAssist from "@/component/customMessageForms/AiAssist";
export const Chat = ({ user, secret }) => {
  import.meta.env.VITE_PROJECT_ID,
    console.log(
      "b7c1acba-c6de-4041-a38b-6ccb762a9b64",
      import.meta.env.VITE_PROJECT_ID
    );
  const chatProps = useMultiChatLogic(
    "b7c1acba-c6de-4041-a38b-6ccb762a9b64",
    user,
    secret
  );
  return (
    <div style={{ flexBasis: "100%" }}>
      <MultiChatSocket {...chatProps} />
      <MultiChatWindow
        {...chatProps}
        style={{ height: "100vh" }}
        renderChatHeader={(chat) => <Header chat={chat} />}
        renderMessageForm={(props) => {
          if (chatProps.chat?.title.startsWith("AiChat")) {
            return <Ai props={props} chatProps={chatProps} />;
          }
          if (chatProps.chat?.title.startsWith("AiCode")) {
            return <AiCode props={props} chatProps={chatProps} />;
          }

          if (chatProps.chat?.title.startsWith("AiAssist")) {
            return <AiAssist props={props} chatProps={chatProps} />;
          }
          return <StandardMessageForm props={props} chatProps={chatProps} />;
        }}
      />
    </div>
  );
};
export default Chat;
