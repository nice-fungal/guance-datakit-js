# [👻 Guance RUM SDK Quick Start Guide](https://github.com/GuanceCloud/datakit-js)

# Rum Slim

1. 修复了一些 typo，删除了一些 @deprecated
2. 删除了 remoteConfig
3. 删除了 Replay
4. 删除了 telemetry，即 x-jaeger 等
5. 删除了 FTWebViewJavascriptBridge
6. 删除了 trackUserInteractions / 全埋点
7. 删除了 performance.longtask，实践下来意义不大

# Logs

实测没有明显收益，建议改用 `DATAFLUS_RUM.addAction("INFO", { "action_message": "Hello World", ...extra })`

# User Agent

改用 [ua-parser-js](https://github.com/nice-fungal/ua-parser-js)，[AGPLv3](https://github.com/faisalman/ua-parser-js/issues/680)

```javascript
DATAFLUX_RUM.setGlobalContext({
  "device": {
    "device": "...",
    "browser": "...",
    "browser_version": "...",
    "browser_version_major": "...",
    "os": "...",
    "os_version": "...",
    "os_version_major": "...",
  }
})

Bridge.ready(() => {
  DATAFLUX_RUM.setGlobalContextProperty('webview', {
    "webview": "...",
    "webview_version": "...",
    "webview_version_major": "...",
  })
})
```

# User Id

`anoymouseId` 机制没做好，建议使用 `email` 字段保存登录后的 `userId`，保留后续通过滑动窗口洗数据的可能性

```javascript
DATAFLUX_RUM.setUser({ "email": currentUserId, "name":: currentUserName })
```

# CDN 异步接入

```html
<html>
  <head>
    <script>
    /* @head.js/snippet-guancecom 3.2.24-8 load-from-cdn */
    !function(){var e,t,n,r;!function(e,t,n,r,a){var o=e[a]=e[a]||{q:[]
    },c=["onReady","init","addAction","addError","setGlobalContext","setGlobalContextProperty","setUser"]
    ;o.factory=function(t){return function(){var n=Array.prototype.slice.call(arguments);return o.q.push((function(){
    var r=e[a];r[t].apply(r,n)})),o}};for(var i=0;i<c.length;i+=1){var s=c[i];o[s]=o.factory(s)}var d=t.createElement(n)
    ;d.async=1,d.src="https://cdn.example.com/guancecom-browser-rum-slim.min.js";var l=t.getElementsByTagName(n)[0];l.parentNode.insertBefore(d,l)
    }(window,document,"script",0,"DATAFLUX_RUM"),e=window,n=e[t="DATAFLUX_RUM"],r=(new Date).getTime(),
    n.onReady((function(){var a=(new Date).getTime();(n=e[t]).addAction("PRE_START",{action_message:"cost:"+(a-r)+"ms"})}))
    }();
    </script>
  </head>

  <body>
    <div id="root"></div>
    
    <script src="/path/to/app.js" async></script>

    <script id="head-agent"></script>
    <script>
    /* @head.js/snippet-guancecom 3.2.24-8 init */
    !function(){var e,o,r;e=window,o=e.DATAFLUX_RUM,r=e.head.agent,o.setGlobalContext({device:{device:r.device.type,
    device_vendor:r.device.vendor,device_model:r.device.model,browser:r.browser.name,browser_version:r.browser.version,
    browser_version_major:r.browser.major,os:r.os.name,os_version:r.os.version,os_version_major:r.os.major}}),
    "UNKNOWN"===r.device.type&&o.addAction("UNKNOW_DEVICE",{action_message:e.navigator.userAgent}),
    window.DATAFLUX_RUM.init({
      applicationId: '{{ applicationId }}',
      site: 'https://rum-openway.guance.com',
      clientToken: '{{ clientToken }}',
      service: 'browser',
      env: 'production',
      version: '1.0.0',
      sessionSampleRate: 100,
      sessionOnErrorSampleRate: 100,
      sessionReplaySampleRate: 0,
      sessionReplayOnErrorSampleRate: 0,
      trackInteractions: false,
      compressIntakeRequests: false,
      remoteConfiguration: false,
    })}();
    </script>
  </body>
</html>
```
