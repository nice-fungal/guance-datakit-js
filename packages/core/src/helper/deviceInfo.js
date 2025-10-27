import { monitor } from '../helper/monitor'

var VariableLibrary = {
  navigator:
    typeof window !== 'undefined' && typeof window.navigator != 'undefined'
      ? window.navigator
      : {},
}

// 方法库
var MethodLibrary = {
  // 获取当前语言
  getLanguage: monitor(function () {
    var _this = this
    _this.language = (function () {
      var language =
        VariableLibrary.navigator.browserLanguage ||
        VariableLibrary.navigator.language ||
        ''
      var arr = language.split('-')
      if (arr[1]) {
        arr[1] = arr[1].toUpperCase()
      }
      return arr.join('_')
    })()
    return _this.language
  }),
  // 获取网络状态
  getNetwork: monitor(function () {
    var connection =
      window.navigator.connection ||
      window.navigator.mozConnection ||
      window.navigator.webkitConnection
    var result = 'unknown'
    var type = connection ? connection.type || connection.effectiveType : null
    if (type && typeof type === 'string') {
      switch (type) {
        // possible type values
        case 'bluetooth':
        case 'cellular':
          result = 'cellular'
          break
        case 'none':
          result = 'none'
          break
        case 'ethernet':
        case 'wifi':
        case 'wimax':
          result = 'wifi'
          break
        case 'other':
        case 'unknown':
          result = 'unknown'
          break
        // possible effectiveType values
        case 'slow-2g':
        case '2g':
        case '3g':
          result = 'cellular'
          break
        case '4g':
          result = 'wifi'
          break
        default:
          break
      }
    }
    return result
  }),
  getTimeZone: monitor(function () {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    return timeZone
  }),
}
var _deviceInfo = {}
if (typeof window !== 'undefined') {
  _deviceInfo = {
    screenSize: window.screen.width + '*' + window.screen.height,
    networkType: MethodLibrary.getNetwork(),
    timeZone: MethodLibrary.getTimeZone()
  }
}
export var deviceInfo = _deviceInfo
