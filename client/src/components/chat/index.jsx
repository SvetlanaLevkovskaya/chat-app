import React from "react";
import { MultiChatSocket, MultiChatWindow, useMultiChatLogic } from "react-chat-engine-advanced";
import CustomHeader from "@/components/customHeader/index";
import StandardMessageForm from "@/components/customMessageForm/StandardMessageForm";
import Ai from "@/components/customMessageForm/Ai";
import AiCode from "@/components/customMessageForm/AiCode";
import AiAssist from "@/components/customMessageForm/AiAssist";

const Chat = ({user, secret}) => {

    const chatProps = useMultiChatLogic(
      import.meta.env.VITE_PROJECT_ID,
      user,
      secret
    );

    return (
      <div style={{flexBasis: "100%"}}>
          <MultiChatSocket {...chatProps} />
          <MultiChatWindow {...chatProps}
                           style={{height: "100vh"}}
                           renderChatHeader={(chat) => <CustomHeader chat={chat} />}
                           renderMessageForm={(props) => {
                               if (chatProps.chat?.title.startsWith("AiChat_")) {
                                   return <Ai props={props} activeChat={chatProps.chat} />;
                               }
                               if (chatProps.chat?.title.startsWith("AiCode_")) {
                                   return <AiCode props={props} activeChat={chatProps.chat} />;
                               }
                               if (chatProps.chat?.title.startsWith("AiAssist_")) {
                                   return <AiAssist props={props} activeChat={chatProps.chat} />;
                               }
                               return <StandardMessageForm props={props} activeChat={chatProps.chat} />;
                           }}

          />
      </div>
    );
};

export default Chat;