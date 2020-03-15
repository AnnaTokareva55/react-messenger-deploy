import { handleActions } from "redux-actions";
import {
  chatsRequest,
  chatsSuccess,
  chatsFailure,
  addMessage,
  deleteMessage,
  addChat,
  deleteChat,
  highlightChat
} from "./chatAction";

const defaultState = {
  chats: {},
  isLoading: false,
  activeChat: 0
};

export default handleActions(
  {
    [chatsRequest]: state => {
      return {
        ...state,
        isLoading: true
      };
    },
    [chatsSuccess]: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        chats: payload
      };
    },
    [chatsFailure]: state => {
      return {
        ...state,
        isLoading: false
      };
    },
    [addMessage]: (
      state,
      { payload: { chatId, messageId, name, content } }
    ) => {
      return {
        ...state,
        chats: {
          ...state.chats,
          [chatId]: {
            title: state.chats[chatId].title,
            messages: {
              ...state.chats[chatId].messages,
              [messageId]: { name, content }
            }
          }
        }
      };
    },
    [deleteMessage]: (state, { payload: { chatId, messageId } }) => {
      let messages = { ...state.chats[chatId].messages };
      delete messages[messageId];
      return {
        ...state,
        chats: {
          ...state.chats,
          [chatId]: { title: state.chats[chatId].title, messages: messages }
        }
      };
    },
    [addChat]: (state, { payload: { title, chatId } }) => {
      return {
        ...state,
        chats: { ...state.chats, [chatId]: { title: title, messages: {} } }
      };
    },
    [deleteChat]: (state, { payload: { chatId } }) => {
      let chats = { ...state.chats };
      delete chats[chatId];
      return { ...state, chats };
    },
    [highlightChat]: (state, { payload: { chatId } }) => {
      return {
        ...state,
        activeChat: chatId
      };
    }
  },
  defaultState
);
