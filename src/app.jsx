import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { BrowserRouter } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { InstallPopup } from "./components/InstallPopup/InstallPopup";

export class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <BrowserRouter basename="/react-messenger-deploy">
          <Layout />
          <InstallPopup />
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}
