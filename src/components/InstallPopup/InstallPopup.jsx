import React, { Component } from "react";
import Close from "material-ui/svg-icons/navigation/close";
import "./InstallPopup.css";

// Компонент уведомления с предложением об установке приложения на iPhone.
export class InstallPopup extends Component {
  state = {
    popupShow: false
  };

  componentDidMount() {
    /**
     * Проверка типа устройства.
     */
    const isIos = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      return /iphone/.test(userAgent);
    };

    /**
     * Проверка способа открытия приложения.
     */
    const isInStandaloneMode = () => {
      return "standalone" in window.navigator && window.navigator.standalone;
    };

    if (isIos() && !isInStandaloneMode()) {
      this.handleShow();
    }
  }

  /**
   * Показ уведомления с предложением об установке приложения на iPhone.
   */
  handleShow = () => {
    this.setState({ popupShow: true });
  };

  /**
   * Скрытие уведомления с предложением об установке приложения на iPhone.
   */
  handleNotShow = () => {
    this.setState({ popupShow: false });
  };

  render() {
    return (
      <div
        style={{ display: this.state.popupShow ? "block" : "none" }}
        className="Popup"
      >
        <div>
          <Close className="CloseIcon" onClick={this.handleNotShow} />
        </div>
        <div className="PopupText">
          Установи приложение на свой iPhone: нажми «Поделиться» и затем на
          экран «Домой».
        </div>
      </div>
    );
  }
}
