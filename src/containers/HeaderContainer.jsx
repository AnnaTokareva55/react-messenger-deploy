import { Header } from "../components/Header/Header";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { showMenu } from "../store/menuAction";

const mapStateToProps = (
  { chatReducer, userReducer, menuReducer },
  { match }
) => {
  const chatId = match.params.chatId;
  const title = chatReducer.chats[chatId]
    ? chatReducer.chats[chatId].title
    : `Чат не выбран`;
  const userName = userReducer.user.userName;
  const menuView = menuReducer.menuView;
  return {
    title,
    userName,
    menuView
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ showMenu }, dispatch);
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const menuView = stateProps.menuView;
  return {
    ...stateProps,
    showMenu: () => dispatchProps.showMenu(menuView)
  };
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Header);
