# [👻 Guance RUM SDK Quick Start Guide](https://github.com/GuanceCloud/datakit-js)

# Rum Slim

1. 修复了一些 typo，删除了一些 @deprecated
2. 删除了 remoteConfig
3. 删除了 Replay
4. 删除了 telemetry，即 x-jaeger 等
5. 删除了 FTWebViewJavascriptBridge

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
    /* @head.js/snippet-guancecom 3.2.24-4 load-from-cdn */
    !function(){var e,t,n,a;!function(e,t,n,a,r){var o=e[r]=e[r]||{q:[]
    },c=["onReady","init","addAction","setGlobalContext","setUser"];o.factory=function(t){return function(){
    var n=Array.prototype.slice.call(arguments);return o.q.push((function(){var a=e[r];a[t].apply(a,n)})),o}}
    ;for(var i=0;i<c.length;i+=1){var s=c[i];o[s]=o.factory(s)}var d=t.createElement(n);d.async=1,d.src="{{ __sdk__ }}"
    ;var f=t.getElementsByTagName(n)[0];f.parentNode.insertBefore(d,f)}(window,document,"script",0,"DATAFLUX_RUM"),e=window,
    n=e[t="DATAFLUX_RUM"],a=(new Date).getTime(),n.onReady((function(){var r=(new Date).getTime()
    ;(n=e[t]).addAction("PRE_START",{action_message:"cost:"+(r-a)+"ms"})}))}();
    </script>
  </head>

  <body>
    <div id="root"></div>
    
    <script src="/path/to/app.js" async></script>

    <script id="head-agent"></script>
    <script>
    /* @head.js/snippet-guancecom 3.2.24-4 init */
    !function(){var o,e,r;o=window,e=o.DATAFLUX_RUM,r=o.head.agent,e.setGlobalContext({device:{device:r.device.type,
    browser:r.browser.name,browser_version:r.browser.version,browser_version_major:r.browser.major,os:r.os.name,
    os_version:r.os.version,os_version_major:r.os.major}}),window.DATAFLUX_RUM.init({
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
