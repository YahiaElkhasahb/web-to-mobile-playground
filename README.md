# web-to-mobile-playground

Experimenting with cross-platform mobile frameworks — Ionic/Capacitor, React Native, Expo, and PWA —comparing approaches, architectures, and how each bridges the gap between web code and native mobile.

---

## Experiments

### React Native & Expo
A practical introduction to React Native and Expo for React developers. Covers what React Native is, how it differs from React web, what Expo adds on top, and everything you need to write your first screen — components, styling, layout, navigation, lists, and device APIs — ending with how to build and ship your app to the App Store.

**Topics Covered**
- Why React Native is a framework, not just a library
- How React Native differs from React web (native components vs HTML)
- What Expo adds on top of React Native and why it is recommended
- Writing your first screen — View, Text, Pressable
- Styling with StyleSheet and Tailwind-style libraries (NativeWind, Gluestack, Tamagui)
- Layout with Flexbox and the column-first default
- File-based navigation with Expo Router
- Lists and scrolling — FlatList vs ScrollView
- Device APIs — Camera, GPS, and local SQLite storage
- Shipping — Expo Go, EAS Build, EAS Update, EAS Submit


**Key Learnings**

- React Native uses the same React syntax but renders real native iOS and Android UI instead of HTML
- Expo handles all the complex setup, builds, and device API integration with simple install commands
- StyleSheet styles are JavaScript objects — there are no CSS files or class names
- flexDirection defaults to column in React Native, unlike the web default of row
- File name equals screen URL in Expo Router, just like Next.js
- FlatList should always be used for data from an API or state — ScrollView renders everything at once
- Device features like camera, GPS, and storage each require just one install command and one import
- You can go from code to a real phone in under 60 seconds using Expo Go


**Resources**

> Presentation: [React Native & Expo presentation](https://github.com/YahiaElkhasahb/web-to-mobile-playground/blob/master/React%20Native%20%26%20Expo/ReactNative%20%26Expo.pptx)

> [Meeting Recording](https://drive.google.com/file/d/1zm0WSOU6GOp9uXYYA0sJKcDRIrcYXRgM/view?usp=drive_link)
---

### Capacitor & Ionic
A hands-on experiment with Ionic and Capacitor — exploring how to wrap a web app into a native mobile shell. Covers the Ionic component library, how Capacitor acts as a bridge between web code and native device APIs, and how to build and run the app on Android and iOS.


**Topics Covered**

- What Ionic is and how its component library works across platforms
- What a Capacitor is and how it replaced Cordova as the native bridge
- How a web app gets packaged into a real iOS and Android app
- Accessing native device features through Capacitor plugins
- Setting up and running the app on a real device


**Key Learnings**

- Capacitor acts as a bridge between web code and native phone hardware
- Ionic provides ready-made mobile UI components that look native on each platform
- The same web codebase can be deployed to iOS, Android, and the browser simultaneously
- Capacitor plugins give access to device APIs without writing any native code
- Hybrid apps run inside a WebView, making them easier to build for web developers

**Resources**

> Project: [Cypher Game](https://github.com/YahiaElkhasahb/web-to-mobile-playground/tree/master/Capacitor%20%26%20Ionic/Cypher-game-main)

> [Meeting Recording](https://drive.google.com/file/d/16n3puxYpZtEVkN4FOUGn5WiLyF7tX9j-/view?usp=drive_link)

---

### PWA (Progressive Web Apps)

**Research & Experiment Summary**

This experiment was done to learn more about Progressive Web Apps (PWAs) and how they work.

**Topics Covered**

- What a PWA is and its main features
- The Web App Manifest and how it helps users install the app
- Service Workers and their role in the application
- The Service Worker lifecycle: Registration → Installation → Activation
- Offline support and caching
- Benefits of PWAs compared to regular web applications

**Key Learnings**

- PWAs provide an app-like experience while running in a web browser
- The Web App Manifest allows the application to be installed on a device
- Service Workers help applications work faster and support offline usage
- Caching improves performance and reduces the need for network requests
- PWAs can improve the user experience without requiring a separate mobile application

**Resources**

> Presentation: [PWA presentation](https://github.com/YahiaElkhasahb/web-to-mobile-playground/blob/master/PWA/PWA.pdf)

> [Meeting Recording](https://drive.google.com/file/d/1ualz-Qw7myoaD6mvrn1yTwxxjLkAg6sw/view?usp=drive_link)


### Outcome

By completing this experiment, we gained a better understanding of the main technologies behind PWAs and how they help create fast, reliable, and installable web applications, and how to make a native mobile bridge 
