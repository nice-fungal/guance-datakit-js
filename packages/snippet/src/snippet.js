// ;(function (h, o, u, n, d) {
//   h = h[d] = h[d] || {
//     q: [],
//     onReady: function (c) {
//       h.q.push(c)
//     },
//   }
//   d = o.createElement(u)
//   d.async = 1
//   d.src = n
//   n = o.getElementsByTagName(u)[0]
//   n.parentNode.insertBefore(d, n)
// })(
//   window,
//   document,
//   "script",
//   "https://static.guance.com/browser-sdk/v3/dataflux-rum.js",
//   "DATAFLUX_RUM"
// )
/* guancecom load from cdn */
;(function (win, doc, tag, url, api) {
  var h = win[api] = win[api] || {
    q: [],
  };

  var methods = [ 'onReady', 'init', 'addAction', 'setGlobalContext', 'setUser' ];
  h.factory = function (m) {
    return function () {
      var args = Array.prototype.slice.call(arguments);
      h.q.push(function () {
        var h1 = win[api];
        h1[m].apply(h1, args)
      });
      return h
    }
  }
  for (var i = 0; i < methods.length; i += 1) {
    var key = methods[i]
    h[key] = h.factory(key)
  }

  var d = doc.createElement(tag)
  d.async = 1
  d.src = url
  var n = doc.getElementsByTagName(tag)[0]
  n.parentNode.insertBefore(d, n)
})(
  window,
  document,
  "script",
  "https://static.guance.com/browser-sdk/v3/dataflux-rum.js",
  "DATAFLUX_RUM"
)


/* guancecom pre-start */
;(function (win, api) {
  var h = win[api];
  var p = new Date().getTime();
  h.onReady(function () {
    var s = new Date().getTime();
    h = win[api];
    h.addAction('PRE_START', { 'action_message': 'cost:' + (s - p) + 'ms' });
  });
})(
  window,
  "DATAFLUX_RUM"
)


/* guancecom set-agent */
;(function (win, api) {
  var h = win[api];
  var a = win['head']['agent'];
  h.setGlobalContext({
    device: {
      device: a.device.type,
      browser: a.browser.name,
      browser_version: a.browser.version,
      browser_version_major: a.browser.major,
      os: a.os.name,
      os_version: a.os.version,
      os_version_major: a.os.major,
    },
  });
})(
  window,
  "DATAFLUX_RUM"
)


/* guancecom init */
;(function (win, api) {
  var h = win[api];
  h.init({});
})(
  window,
  "DATAFLUX_RUM"
)
