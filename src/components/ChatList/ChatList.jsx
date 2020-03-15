import React, { useState } from "react";
import PropTypes from "prop-types";
import "./ChatList.css";
import classnames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SendIcon from "@material-ui/icons/Send";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

// Компонент бокового меню со списком чатов.
export const ChatList = ({
  chats,
  activeChat,
  menuView,
  addChat,
  deleteChat,
  push
}) => {
  const classes = useStyles();
  const [title, setTitle] = useState("");

  const classNames = classnames("ChatList", {
    ChatListView: menuView
  });

  /**
   * Переход в другой чат по переданному адресу.
   * @param {string} link - относительный адрес чата.
   */
  const handleNavigate = link => {
    push(link);
  };

  /**
   * Обработка клика на кнопку добавления нового чата.
   */
  const handleClick = () => {
    if (title) {
      addChat({ title });
      setTitle("");
    }
  };

  /**
   * Обработка события нажатия ctrl+enter в форме создания нового чата.
   */
  const handleKeyUp = () => {
    if (title && event.keyCode === 13 && event.ctrlKey) {
      addChat({ title });
      setTitle("");
    }
  };

  /**
   * Обработка события клика на кнопке удаления чата.
   * @param {number} chatId - id чата для удаления.
   */
  const handleDeleteClick = chatId => {
    deleteChat(chatId);
  };

  const chatElements = chats.map(({ chatId, title }) => (
    <ListItem button selected={chatId === activeChat} key={chatId}>
      <ListItemIcon onClick={() => handleNavigate(`/chats/${chatId}`)}>
        <SendIcon color="primary" />
      </ListItemIcon>
      <ListItemText
        onClick={() => handleNavigate(`/chats/${chatId}`)}
        primary={title}
      />
      <DeleteIcon color="primary" onClick={() => handleDeleteClick(chatId)} />
    </ListItem>
  ));

  return (
    <List className={classNames}>
      {chatElements}
      <ListItem>
        <ListItemIcon>
          <AddIcon color="primary" onClick={handleClick} />
        </ListItemIcon>
        <TextField
          id="standard-basic"
          label="Новый чат"
          value={title}
          onChange={({ currentTarget: { value } }) => setTitle(value)}
          onKeyUp={handleKeyUp}
        />
      </ListItem>
    </List>
  );
};

ChatList.propTypes = {
  chats: PropTypes.array.isRequired,
  activeChat: PropTypes.number.isRequired,
  menuView: PropTypes.bool.isRequired,
  addChat: PropTypes.func.isRequired,
  deleteChat: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired
};
