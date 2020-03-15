import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import ChatContainer from "../../containers/ChatContainer";
import ChatListContainer from "../../containers/ChatListContainer";
import HeaderContainer from "../../containers/HeaderContainer";
import ProfileContainer from "../../containers/ProfileContainer";
import "./Layout.css";
import { initStore, history } from "../../store/store";
import { loadChats } from "../../store/chatAction";
import { loadUser } from "../../store/userAction";

const { store, persistor } = initStore();
store.dispatch(loadChats());
store.dispatch(loadUser());

// Внешний компонент-обертка для внутренних компонентов приложения.
export class Layout extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ConnectedRouter history={history}>
            <Switch>
              <Route path="/profile" exact component={HeaderContainer} />
              <Route path="/chats" exact component={HeaderContainer} />
              <Route path="/chats/:chatId" exact component={HeaderContainer} />
            </Switch>
            <div className="Chat">
              <ChatListContainer className="ChatList-Position" />
              <div className="ChatField-Position">
                <Switch>
                  <Route path="/profile" exact component={ProfileContainer} />
                  <Route path="/chats" exact component={ChatContainer} />
                  <Route
                    path="/chats/:chatId"
                    exact
                    component={ChatContainer}
                  />
                </Switch>
              </div>
            </div>
          </ConnectedRouter>
        </PersistGate>
      </Provider>
    );
  }
}
