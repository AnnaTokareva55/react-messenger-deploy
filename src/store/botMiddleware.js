import { addMessage, highlightChat } from "./chatAction";

const timers = {};

export default store => next => action => {
  if (
    action.type === addMessage.toString() &&
    action.payload.name !== "Робот"
  ) {
    const { chatId, messageId, name } = action.payload;
    const messageBotId = +messageId + 1;
    clearTimeout(timers[chatId]);
    timers[chatId] = setTimeout(
      () =>
        store.dispatch(
          addMessage(chatId, messageBotId, "Робот", "Привет! Я робот.")
        ),
      500
    );
  } else if (
    action.type === addMessage.toString() &&
    action.payload.name === "Робот"
  ) {
    const { chatId } = action.payload;
    store.dispatch(highlightChat(chatId));
    setTimeout(() => store.dispatch(highlightChat(0)), 500);
  }
  next(action);
};
