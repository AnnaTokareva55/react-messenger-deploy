import { ChatList } from "../components/ChatList/ChatList";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { push } from "connected-react-router";
import { addChat, deleteChat } from "../store/chatAction";

const mapStateToProps = ({ chatReducer, menuReducer }) => {
  const chats = Object.keys(chatReducer.chats).map(chatId => ({
    chatId,
    title: chatReducer.chats[chatId].title
  }));
  const activeChat = +chatReducer.activeChat;
  const menuView = menuReducer.menuView;
  return {
    chats,
    activeChat,
    menuView
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ addChat, deleteChat, push }, dispatch);
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const lastChatId = stateProps.chats.length
    ? parseInt(stateProps.chats[stateProps.chats.length - 1].chatId)
    : 0;
  const newChatId = lastChatId + 1;
  return {
    ...stateProps,
    addChat: ({ title }) => dispatchProps.addChat(title, newChatId),
    deleteChat: chatId => dispatchProps.deleteChat(chatId),
    push: location => dispatchProps.push(location)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(ChatList);
