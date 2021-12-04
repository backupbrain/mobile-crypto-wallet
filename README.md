
# Crypto Wallet UI in React Native


## Converting SVG to React Native component.

https://blog.usejournal.com/how-to-use-svg-in-react-native-e581eca59534

https://stackoverflow.com/a/52663626/5671180

## Testing

```console
$ expo start --web
```

## Migrating over to React Native with XCode

Follow tutorials:

https://reactnavigation.org/docs/getting-started

https://github.com/zoontek/react-native-localize#manual-linking


# Crazy things I've had to learn in this project

How to fix [EMFILE: too many open files, watch](https://flaviocopes.com/react-native-emfile-too-many-open-files/) bug where Reat Native app can't compile because it thinks too many files are open.

[How to compile code into an iOS module](https://rlaguilar.com/posts/integrate-c-library-ios-project-swift/)

How to create a Universal "Fat" XCode framework using `lipo`

[Convert a Universal (FAT) Framework to an XCFramework](https://medium.com/strava-engineering/convert-a-universal-fat-framework-to-an-xcframework-39e33b7bd861), which is now required in XCode 12 since 2019

[How to use `defer`](Convert a Universal (FAT) Framework to an XCFramework) to close gRPC connections when a function exits, to [solve the double-close bug in Golang's http2server](https://stackoverflow.com/questions/70185866/react-native-native-module-looping-call-until-crash-on-ios)

How to build code when [Xcode build failing no relevant error messages displayed](https://stackoverflow.com/questions/64939141/xcode-build-failing-no-relevant-error-messages-displayed).

How to [Create an XCode Bridging Header from scratch](Xcode build failing no relevant error messages displayed).

How to [Compile GoLang as a Mobile Library](https://gaitatzis.medium.com/compile-golang-as-a-mobile-library-243e38590f23).

[How to fix the React Native Version Mismatch](https://blog.waldo.io/react-native-version-mismatch/) error

XCode and React Native both compile and deploy the wrong project (Solution appears to be to restart computer)

# Crazy things I haven't figured out how to solve yet

How to fix the [Native module cannot be null](https://stackoverflow.com/questions/38698657/react-native-native-module-cannot-be-null) error ([#2](https://github.com/react-native-push-notification/ios/issues/43)) ([#3](https://johnnn.tech/q/reactnative-swift-nativemodule-for-ios-is-always-null/)) ([#4](https://stackoverflow.com/questions/68376713/swift-nativemodule-for-ios-is-always-null))


[How to get rid of Xcode's "Cannot launch app because device is locked" error](https://code2care.org/tutorial/unlock-your-iphone-to-continue-xcode-cannot-launch-app-on-iphone-because-the-device-is-locked)

["RNLocalize is null" error](https://stackoverflow.com/questions/61045191/how-to-resolve-a-nativemodule-rnlocalize-is-null-error-in-test)

["Application main has not been registered" error](https://stackoverflow.com/questions/49410115/application-main-has-not-been-registered)

