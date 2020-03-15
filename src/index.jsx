import React from "react";
import ReactDom from "react-dom";
import { App } from "./App";

ReactDom.render(<App />, document.getElementById("root"));

// Подключение service-worker.js к приложению.
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(registration =>
        console.log(
          `Успешно зерегистрирован ServiceWorker с областью действия ${registration.scope}.`
        )
      )
      .catch(error =>
        console.error(`Не удалось зерегистрировать ServiceWorker. ${error}.`)
      );
  });
} else console.info(`ServiceWorker не поддерживается.`);

// Отслеживание события установки приложения. В качестве url'а - заглушка.
window.addEventListener("appinstalled", event => {
  fetch("/api/app.json", {
    method: "GET",
    credentials: "include"
  });
});

// Добавление функционала push-уведомлений.
window.addEventListener("load", event => notifications(window));

/**
 * Реализация функционала подписки на push-уведомления.
 * @param {object} window - глобальный объект window после загрузки.
 */
function notifications(window) {
  // Кнопка подписки/отписки
  const pushElement = document.querySelector(".push");
  const pushImgElement = document.querySelector(".push-img");

  /**
   * Проверка поддержки push-уведомлений браузером, наличия разрешения на отправку и подписки.
   */
  function isPushSupported() {
    if (Notification.permission === "denied") {
      alert("Вы заблокировали push-уведомления.");
      return;
    }

    if (!("PushManager" in window)) {
      alert("Push-уведомления не поддерживаются браузером.");
      return;
    }

    navigator.serviceWorker.ready.then(registration => {
      registration.pushManager
        .getSubscription()
        .then(subscription => {
          if (subscription) {
            changePushStatus(true);
          } else {
            changePushStatus(false);
          }
        })
        .catch(error => console.error(`Ошибка: ${error}`));
    });
  }

  /**
   * Предложение подписки на push-уведомления и подписка.
   */
  function subscribePush() {
    navigator.serviceWorker.ready.then(registration => {
      if (!registration.pushManager) {
        alert("Push-уведомления не поддерживаются браузером.");
        return false;
      }

      registration.pushManager
        .subscribe({ userVisibleOnly: true })
        .then(subscription => {
          alert("Подписка успешно оформлена.");
          console.log(subscription);
          changePushStatus(true);
        })
        .catch(error => {
          console.log(`При подписке возникла ошибка: ${error}`);
          changePushStatus(false);
        });
    });
  }

  /**
   * Отписка от push-уведомлений.
   */
  function unSubscribePush() {
    navigator.serviceWorker.ready.then(registration => {
      registration.pushManager.getSubscription().then(subscription => {
        if (!subscription) {
          alert("Невозможно отписаться от push-уведомлений");
          return;
        }
        subscription
          .unsubscribe()
          .then(() => {
            alert("Подписка успешно отменена.");
            console.log(subscription);
            changePushStatus(false);
          })
          .catch(error =>
            console.error(
              `Невозможно отписаться от push-уведомлений. Ошибка: ${error}`
            )
          );
      });
    });
  }

  /**
   * Изменеие статуса подписки на push-уведомления.
   * @param {boolean} status - новый статус подписки.
   */
  function changePushStatus(status) {
    pushElement.dataset.checked = status;
    pushElement.checked = status;
    if (status) {
      pushElement.classList.add("active");
      pushImgElement.src = "image/PushButton/push-on.png";
    } else {
      pushElement.classList.remove("active");
      pushImgElement.src = "image/PushButton/push-off.png";
    }
  }

  // Обработка события клика на кнопку подписки.
  pushElement.addEventListener("click", event => {
    let isSubscribeId = pushElement.dataset.checked === "true";
    if (isSubscribeId) {
      unSubscribePush();
    } else {
      subscribePush();
    }
    isPushSupported();
  });
}
