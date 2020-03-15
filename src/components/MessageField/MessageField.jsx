import React from "react";
import PropTypes from "prop-types";
import { Message } from "../Message/Message";
import "./MessageField.css";

// Компонент поля чата для вывода соощений.
export const MessageField = ({ messages, deleteMessage }) => (
  <div className="MessageField">
    {Object.keys(messages).map(messageId => {
      return (
        <Message
          {...messages[messageId]}
          messageId={messageId}
          deleteMessage={deleteMessage}
          key={messageId}
        />
      );
    })}
  </div>
);

MessageField.propTypes = {
  messages: PropTypes.objectOf(PropTypes.shape(Message.PropTypes)),
  deleteMessage: PropTypes.func.isRequired
};
