import { Chat } from "../components/Chat/Chat";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addMessage, deleteMessage } from "../store/chatAction";

const mapStateToProps = ({ chatReducer }, { match }) => {
  const chatId = match.params.chatId;
  return {
    messages: chatId
      ? chatReducer.chats[chatId]
        ? chatReducer.chats[chatId].messages
        : null
      : null
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ addMessage, deleteMessage }, dispatch);
};

const mergeProps = (stateProps, dispatchProps, { match }) => {
  const chatId = match.params.chatId;
  const messagesIdArr = stateProps.messages
    ? Object.keys(stateProps.messages)
    : [];
  const lastMessageId = messagesIdArr.length
    ? parseInt(messagesIdArr[messagesIdArr.length - 1])
    : 0;
  const newMessageId = lastMessageId + 1;
  return {
    ...stateProps,
    onSendMessage: ({ name, content }) =>
      dispatchProps.addMessage(chatId, newMessageId, name, content),
    deleteMessage: messageId => dispatchProps.deleteMessage(chatId, messageId)
  };
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Chat);
