import React, { useState } from "react";
import PropTypes from "prop-types";
import "./ChatForm.css";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  }
}));

export const ChatForm = ({ onSendMessage }) => {
  const [name, setName] = useState("Я");
  const [content, setContent] = useState("");
  const classes = useStyles();

  /**
   * Обработка события клика на кнопку отправки сообщения.
   */
  const handleClick = () => {
    onSendMessage({ name, content });
    setContent("");
  };

  /**
   * Обработка события нажатия ctrl+enter в форме отправки сообщения.
   */
  const handleKeyUp = () => {
    if (event.keyCode === 13 && event.ctrlKey) {
      onSendMessage({ name, content });
      setContent("");
    }
  };

  return (
    <div className="ChatForm">
      <TextField
        className="TextField"
        value={content}
        onChange={({ currentTarget: { value } }) => setContent(value)}
        onKeyUp={handleKeyUp}
        id="outlined-multiline-static"
        label="Мое сообщение"
        multiline
        autoFocus
        rows="1"
        variant="outlined"
      />
      <Button variant="contained" color="primary" onClick={handleClick}>
        Отправить
      </Button>
    </div>
  );
};

ChatForm.propTypes = {
  onSendMessage: PropTypes.func.isRequired
};
