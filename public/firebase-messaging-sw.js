// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
// Replace 10.13.2 with latest version of the Firebase JS SDK.
importScripts(
  'https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js'
);
importScripts(
  'https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js'
);

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: 'AIzaSyB3kvu4UEEr7dDhMZ4Fla2p9e6I9lMuZBc',
  authDomain: 'fir-with-springboot-b7a67.firebaseapp.com',
  projectId: 'fir-with-springboot-b7a67',
  storageBucket: 'fir-with-springboot-b7a67.firebasestorage.app',
  messagingSenderId: '681956099660',
  appId: '1:681956099660:web:8cbbe2e3fc9e5c189656e9',
  measurementId: 'G-4FRM7780J4'
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage(async (payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    image: payload.notification.image
  };

  const channel = new BroadcastChannel('notification_broadcast_channel');
  channel.postMessage(payload);
  self.registration.showNotification(notificationTitle, notificationOptions);
});
self.addEventListener('notificationclick', function (event) {
  event.notification.close();

  event.waitUntil(
    Promise.all([
      self.registration.getNotifications().then((notifications) => {
        notifications.forEach((element) => {
          element.close();
        });
      }),

      self.clients
        .matchAll({ type: 'window', includeUncontrolled: true })
        .then((clientList) => {
          for (const client of clientList) {
            if (client.url.startsWith(self.location.origin)) {
              return client.focus();
            }
          }

          return self.clients.openWindow('/');
        })
    ])
  );
});
