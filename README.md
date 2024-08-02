# Web Push Notifications with React and Firebase Cloud Messaging (FCM)

Welcome to a comprehensive master series on implementing push notifications across web and mobile platforms! In this journey, we'll explore the intricacies of push notifications, from basic concepts to advanced implementations. Whether you're a seasoned developer or just starting out, this series will equip you with the knowledge and skills to integrate powerful push notification systems into your applications.

## What We'll Cover

Throughout this series, we'll dive into:

1. Web Push Notifications with React, Vite, and Firebase Cloud Messaging (FCM).
2. Building a NestJS Server for remote control Web Push Notifications.
3. Mobile Push Notifications with Expo and FCM
4. Setting up a Node.js Server for Remote Control Mobile Push Notifications

By the end of this series, you'll have a robust understanding of push notification systems and the ability to implement them across different platforms.


## Outline
1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
3. [Project Set Up](#setting-up-the-project)
4. [Firebase (FCM)](#)
    - [Firebase Cloud Messaging](#what-is-firebase-cloud-messaging-fcm)
    - [Firebase Configuration](#configuring-firebase)
    - [Firebase Initialization](#initializing-firebase-in-your-app)
5. [Background Notification](#)
    - [How to Handle Background Notification](#handling-background-notifications)
    - [How to Setup Firebase Service Worker](#setting-up-the-firebase-service-worker)
    - [How to configure Firebase Service Worker](#configuring-firebase-service-worker)
    -[How Firebase Service Worker Works](#how-it-works)
6. [Testing](#testing-push-notifications)
7. [Conclusion](#conclusion)



### Introduction

Push notifications have become an integral part of modern web applications, allowing developers to engage users with timely updates even when they're not actively using the app. In this article, we'll walk through the process of implementing web push notifications using React, Vite, and Firebase Cloud Messaging (FCM).

### Prerequisites

Before we begin, make sure you have the following installed:

- Node.js (v14 or later)
- npm (v6 or later)
- A code editor of your choice (e.g [VSCode](https://code.visualstudio.com/Download))

### Setting Up the Project

Let's start by creating a new React project using Vite:

```bash
npm create vite@latest web-push-notification -- --template react
cd web-push-notification
npm install
```

This will create a new React project using Vite as the build tool. Now, let's install the necessary dependencies for FCM:

```bash
npm install firebase
```

### What is Firebase Cloud Messaging (FCM)?

**Firebase Cloud Messaging (FCM)** is a cross-platform messaging solution that lets you reliably send messages at no cost. Here's what you need to know:

- **Purpose**: FCM allows you to send notifications and data messages to users across platforms — Android, iOS, and web applications.

- **Key Features**:
  1. **Cross-Platform**: Works seamlessly across mobile and web.
  2. **Reliability**: Delivers messages in real-time with high reliability.
  3. **Scalability**: Handles messaging for millions of devices without additional setup.
  4. **Flexibility**: Supports various message types including notification messages and data messages.

- **How it Works**:
  1. Your app registers with FCM and receives a unique token.
  2. This token is sent to your server.
  3. Your server uses this token to send messages to the specific device via FCM.

- **Benefits**:
  - Free to use
  - Easy integration with other Firebase services
  - Supports targeted messaging and analytics

By leveraging FCM, we can implement robust push notifications in our React applications with minimal setup and maximum efficiency.

### Configuring Firebase

1. Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project (or use an existing one).
   ![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/i2f7lknjeag15oaf237o.png)
2. Navigate to Project Settings > General and scroll down to "Your apps".
   ![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/6ju4qe0r40d8w4i9unmp.png)
3. Click on the web icon (</>) to add a new web app to your project.
   ![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/8x3izsvrpude6xpu9uxv.png)
4. Follow the prompts to register your app. You'll receive a configuration object that looks like this:
   ![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/r0qy07br94hepnl0dkf4.png)
5. Create a new file called `config/firebase.js` in your `src` directory and paste the following code.

```javascript
// src/config/firebase.js

import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

export const FIREBASE_VAPID_KEY = import.meta.env.VITE_VAPID_KEY;

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestForToken = () => {
  return getToken(messaging, { vapidKey: FIREBASE_VAPID_KEY })
    .then((currentToken) => {
      if (currentToken) {
        return currentToken;
      } else {
        alert(
          "No registration token available. Request permission to generate one."
        );
        return null;
      }
    })
    .catch((err) => {
      alert("An error occurred while retrieving token - " + err);
      return null;
    });
};

onMessage(messaging, ({ notification }) => {
  new Notification(notification.title, {
    body: notification.body,
    icon: notification.icon,
  });
});
```

### Let's break this down:

1. **Imports**: We import necessary functions from Firebase, including `initializeApp` for initializing the Firebase app, and `getMessaging`, `getToken`, and `onMessage` for handling push notifications.

2. **Configuration**: The `firebaseConfig` object contains your Firebase project's configuration. Here, we're using Vite's environment variables (prefixed with `import.meta.env.VITE_`) to securely store these values. This approach keeps your sensitive data out of your codebase.

3. **VAPID Key**: The Voluntary Application Server Identification (VAPID) key is also stored as an environment variable. This key is used for identifying your server to push services. You can generate yours on your firebase project page by navigating to the [`Cloud Message`](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/zfc9wz892aftwumgtols.png) tab under the  [`Project Setting Page`](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/92qth9abn02m0jcuxs6o.png), click on the `Generate key pair` button, then click on the menu by the right hand side of the newly generated string and click on `Show private key` and then copy your [`VAPID key`](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/638tf65p2plo7p9l86ko.png).

4. **Firebase Initialization**: We initialize the Firebase app with `initializeApp(firebaseConfig)` and get the messaging instance with `getMessaging(app)`.

5. **Token Request Function**: The `requestForToken` function is crucial for push notifications. It does the following:

   - Calls `getToken` with the messaging instance and VAPID key.
   - If successful, it returns the token, which you'd typically send to your server.
   - If no token is available, it alerts the user and returns null.
   - If an error occurs, it logs the error and returns null.

6. **Message Handling**: The `onMessage` function sets up a listener for incoming messages when the app is in the foreground (that is, you are currently active on the page/website). When a message is received, it creates a new [`Notification`](https://developer.mozilla.org/en-US/docs/Web/API/Notification) with the received title, body, and icon.

This setup allows your app to request permission for notifications, receive a token for the device (which you'd send to your server to target this device for notifications), and handle incoming messages when the app is open.

### Initializing Firebase in Your App

Now, let's initialize Firebase in our app. Now, paste the code below in your `App.jsx` in your `src` directory:

```javascript
// src/App.jsx

import React, { useEffect, useState } from "react";
import { requestForToken } from "../config/firebase";

function App() {
  const [token, setToken] = useState("");

  useEffect(() => {
    const getToken = async () => {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        const token = await requestForToken();
        if (token) {
          setToken(token);
        }
      }
    };

    getToken();
  }, []);

  return (
    <div className="App">
      <h1>Push Notification with React & FCM</h1>
      <p>
        Device Token 👉 <span style={{ fontSize: "11px" }}> {token} </span>
      </p>
      {token && <h2>Notification permission enabled 👍🏻</h2>}
      {!token && <h2>Need notification permission ❗️ </h2>}
    </div>
  );
}

export default App;
```

### Let's break down this component

1. **State Management**:
   We use the `useState` hook to manage the device token state:

   ```jsx
   const [token, setToken] = useState("");
   ```

2. **Effect Hook**:
   We use the `useEffect` hook to request notification permission and fetch the device token when the component mounts:

   ```jsx
   useEffect(() => {
     const getToken = async () => {
       // ... token request logic
     };

     getToken();
   }, []);
   ```

3. **Permission Request**:
   Inside the effect, we first request notification permission from the user:

   ```jsx
   const permission = await Notification.requestPermission();
   ```

4. **Token Retrieval**:
   If permission is granted, we call our `requestForToken` function (from our Firebase configuration) to get the device token:

   ```jsx
   if (permission === "granted") {
     const token = await requestForToken();
     if (token) {
       setToken(token);
     }
   }
   ```
 
5. **Render Logic**:
   The component renders different content based on whether a token has been received:
   - It always displays the heading and the device token (if available).
   - If a token is present, it shows a success message.
   - If no token is present, it shows a message indicating that notification permission is needed.

This component provides a simple interface for requesting push notification permissions and displaying the status to the user. The device token, once received, could be sent to your backend server for storing and later use in sending targeted push notifications.
  

### Handling Background Notifications

An essential aspect of push notifications is the ability to receive and handle them when your web app is not actively open in the browser. This is where the Firebase service worker comes into play. Let's look at how to set this up:

#### Setting up the Firebase Service Worker

Create a file named `firebase-messaging-sw.js` in your `public` directory with the following content:

```javascript
// src/public/firebase-messaging-sw.js

importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

fetch("/firebase-config.json")
  .then((response) => {
    return response.json();
  })
  .then((jsContent) => {
    const config = eval(jsContent);
    firebase.initializeApp(config.firebaseConfig);
    firebase.messaging();
  })
  .catch((error) => {
    console.error("Error initializing Firebase in service worker:", error);
  });
```

This script does the following:
1. Imports the necessary Firebase scripts using CDN (direct `import` is not allowed in service worker file).
2. Fetches the Firebase configuration from a JSON file `firebase-config.json`.
3. Initializes Firebase with the fetched configuration.
4. Sets up Firebase Cloud Messaging.

#### Configuring Firebase Service Worker 

Create a file named `firebase-config.json` in your `public` directory:

```json
// src/public/firebase-config.json

{
  "firebaseConfig": {
    "apiKey": "API_KEY",
    "authDomain": "AUTH_DOMAIN",
    "projectId": "PROJECT_ID",
    "storageBucket": "STORAGE_BUCKET",
    "messagingSenderId": "MESSAGING_SENDER_ID",
    "appId": "APP_ID",
    "vapidKey": "VAPID_KEY"
  }
}
```

This file contains your Firebase configuration details. 

**Important Security Note 📍:** Make sure to add `firebase-config.json` to your `.gitignore` file as it contains sensitive information. You should never commit this file to your version control system.

#### How It Works

1. When a push notification is received and your web app is not active, the service worker intercepts the notification.
2. The service worker uses the Firebase configuration to properly handle the notification.
3. It then display a notification to the user using the user's browser notification notification API.

By setting up your service worker this way, you ensure that your web app can receive and handle push notifications even when it's not actively running in the browser. This significantly enhances the user experience and the effectiveness of your push notification strategy.



### Testing Push Notifications

In preparing for this article, I created a Nest Js server to send push notification from the server using Firebase Cloud Messaging (FCM). To test your push notifications, follow the steps below ⤵️:

1. Run your app with `npm run dev`
2. Open the app in a browser `http://localhost:5173/` and accept the notification permission prompt. As soon as you grant the notification permission, an fcm device token will be generated and displayed on the screen for you to copy.
3. Go to [`Push Notification Server APIs Doc`](https://push-notification-with-fcm.onrender.com/api/docs#/Notification/AppController_SendPushNotification), and fill in the body of the API.

![Fill in your parameters](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/advod3i3dou9g9agq2lw.png)

![See your notification in action](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/u5h8a2oiehs6e3xzd57h.png)

### Conclusion

Congratulations! You've successfully set up web push notifications using React, Vite, and Firebase Cloud Messaging. This is just the beginning of our journey into the world of push notifications.

In the next article, we'll dive into building a NestJS server to handle sending push notifications, giving you more control over when and how notifications are sent.

Stay tuned for more in this series on mastering push notifications across web and mobile platforms!

---

### Stay Updated and Connected

To ensure you don't miss any part of this series and to connect with me for more in-depth discussions on Software Development (Web, Server, Mobile or Scraping / Automation), push notifications, and other exciting tech topics, **follow me on [**Linkedin**](https://www.linkedin.com/in/emmanuelayinde/) and [**X (Twitter)**](https://twitter.com/_emmanuelayinde)**

---

Your engagement and feedback drive this series forward. I'm excited to continue this journey with you and help you master the art of push notifications across web and mobile platforms.
Don't hesitate to reach out with questions, suggestions, or your own experiences with push notifications.

Stay tuned and happy coding 👨‍💻🚀
