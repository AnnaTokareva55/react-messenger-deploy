import { createActions } from "redux-actions";

export const {
  chatsRequest,
  chatsSuccess,
  chatsFailure,
  addMessage,
  deleteMessage,
  addChat,
  deleteChat,
  highlightChat
} = createActions({
  CHATS_REQUEST: () => ({}),
  CHATS_SUCCESS: data => data,
  CHATS_FAILURE: error => error,
  ADD_MESSAGE: (chatId, messageId, name, content) => ({
    chatId,
    messageId,
    name,
    content
  }),
  DELETE_MESSAGE: (chatId, messageId) => ({ chatId, messageId }),
  ADD_CHAT: (title, chatId) => ({ title, chatId }),
  DELETE_CHAT: chatId => ({ chatId }),
  HIGHLIGHT_CHAT: chatId => ({ chatId })
});

export const loadChats = () => {
  return async dispatch => {
    try {
      dispatch(chatsRequest());
      const result = await fetch("/api/chats.json");
      dispatch(chatsSuccess(await result.json()));
    } catch (error) {
      dispatch(chatsFailure(error));
    }
  };
};
