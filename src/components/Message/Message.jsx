import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Message.css";
import classnames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1)
    }
  }
}));

// Компонент одного сообщения в чате.
export const Message = ({ name, content, messageId, deleteMessage }) => {
  const classes = useStyles();
  const [del, setDel] = useState(false);
  const classNames = classnames("Message", {
    "Message--user": name === "Я"
  });
  const classNamesDeleteIcon = classnames("DeleteIcon", {
    "DeleteIcon--user": name === "Я" && del
  });

  /**
   * Обработка клика на кнопку удаления сообщения.
   * @param {string} messageId - id сообщения.
   */
  const handleDeleteClik = messageId => {
    deleteMessage(messageId);
  };

  return (
    <div
      onMouseOver={() => setDel(true)}
      onMouseLeave={() => setDel(false)}
      className={classNames}
    >
      <strong>{name}: </strong>
      <div>{content}</div>
      <span className={classNamesDeleteIcon}>
        <DeleteIcon
          aria-label="delete"
          disabled
          color="primary"
          onClick={() => handleDeleteClik(messageId)}
        />
      </span>
    </div>
  );
};

Message.propTypes = {
  name: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  messageId: PropTypes.string.isRequired,
  deleteMessage: PropTypes.func.isRequired
};
