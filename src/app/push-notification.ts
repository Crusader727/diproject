import {initializeApp as initializeAppFirebase, messaging as messagingFirebase} from 'firebase';
import request from 'core/request/request';

// firebase_subscribe.js
initializeAppFirebase({
    messagingSenderId: '95587940332'
});

// браузер поддерживает уведомления
// вообще, эту проверку должна делать библиотека Firebase, но она этого не делает
if ('Notification' in window) {
    var messaging = messagingFirebase();
    // пользователь уже разрешил получение уведомлений
    // подписываем на уведомления если ещё не подписали
    // if (Notification.permission === 'granted') {
    //     subscribe();
    // }
}

function subscribe() {
    // запрашиваем разрешение на получение уведомлений
    messaging.requestPermission()
        .then(() => {
            // получаем ID устройства
            messaging.getToken()
                .then(currentToken => {
                    if (currentToken) {
                        console.log(currentToken);
                        sendTokenToServer(currentToken);
                    } else {
                        console.warn('couldnt get token');
                        setTokenSentToServer(null);
                    }
                })
                .catch(err => {
                    console.warn('couldnt get token', err);
                    setTokenSentToServer(null);
                });
    })
    .catch(function (err) {
        console.warn('didnt have permission', err);
    });
}

// отправка ID на сервер
function sendTokenToServer(currentToken: string) {
    if (!isTokenSentToServer(currentToken)) {
        request(`/setdevice`, 'POST', {token: currentToken});
        setTokenSentToServer(currentToken);
    }
}

// используем localStorage для отметки того,
// что пользователь уже подписался на уведомления
function isTokenSentToServer(currentToken: string) {
    return window.localStorage.getItem('sentFirebaseMessagingToken') == currentToken;
}

function setTokenSentToServer(currentToken: string | null) {
    window.localStorage.setItem(
        'sentFirebaseMessagingToken',
        currentToken ? currentToken : ''
    );
}

export default subscribe;