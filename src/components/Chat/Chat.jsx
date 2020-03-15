import React from "react";
import PropTypes from "prop-types";
import { Message } from "../Message/Message";
import { MessageField } from "../MessageField/MessageField";
import { ChatForm } from "../ChatForm/ChatForm";

// Компонент-обертка для чата, включающий поле для сообщений и форму отправки нового сообщения.
export const Chat = ({ messages, onSendMessage, deleteMessage }) => {
  if (messages) {
    return (
      <>
        <MessageField messages={messages} deleteMessage={deleteMessage} />
        <ChatForm onSendMessage={onSendMessage} />
      </>
    );
  } else {
    return <span>Необходимо выбрать чат.</span>;
  }
};

Chat.propTypes = {
  messages: PropTypes.objectOf(PropTypes.shape(Message.PropTypes)),
  onSendMessage: PropTypes.func.isRequired,
  deleteMessage: PropTypes.func.isRequired
};
