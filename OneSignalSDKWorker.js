//.....
<head>
  <script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" async=""></script>
  <script>
    var OneSignal = window.OneSignal || [];
    OneSignal.push(function() {
      OneSignal.init({
        appId: "YOUR_APP_ID",
        notifyButton: {
          enable: true,
        },
      }),
      OneSignal.showNativePrompt()
    })
  </script>
</head>