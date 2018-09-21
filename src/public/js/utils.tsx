interface Options {
  expires?: string,
  path?: string,
  domain?: string,
}

// 获取cookie
export function getCookie(key: string): string | null {
  let value = null;
  const eachParam = document.cookie.split(";");
  eachParam && eachParam.forEach(v => {
    let tempArr = v.split('=');
    if (tempArr[0].trim() === String(key)) value = tempArr[1]
  })
  return value
}

// 设置cookie
export function setCookie(name: string, value: string, options: Options) {
  let { expires, path, domain } = options
  const date = new Date();
  if (expires) {
    date.setTime(date.getTime() + (Number(expires) * 24 * 60 * 60 * 1000));
    expires = `expires=${date.toUTCString()};`;
  } else expires = ''
  if (path) path = `path=${path};`
  else path = ''
  if (domain) domain = `domain=${domain};`
  else domain = ''
  document.cookie = `${name}=${value};${expires}${path}${domain}`
}

// 移除cookie
export function removeCookie(key: any) {
  let date = new Date()
  date.setTime(date.getTime() - 30 * 24 * 60 * 60 * 1000);
  const newDate = date.toUTCString()

  if (typeof (key) === 'string') {
    setCookie(key, '', { expires: newDate, domain: window.location.hostname, path: '/' });
  }
  if (!!key && Object.prototype.toString.call(key) === '[object Array]' && key.length > 0) {
    key.forEach((v: any) => {
      setCookie(v, '', { expires: newDate, domain: window.location.hostname, path: '/' });
    })
  }
}

// 获取url参数值
export function getUrlParamValue(key: string) {
  const url = window.location.href
  const paramObj: any = {}
  const paramStr = url.split('?')[1]
  paramStr && paramStr.split('&').forEach(v => {
    let temp = v.split('=');
    paramObj[temp[0]] = temp[1]
  })
  return paramObj[key]
}

// 判断设备为wechat,pc,mobile
export function getDevice() {
  const userAgentInfo: string = navigator.userAgent;
  const Agents: any = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
  if (userAgentInfo.toLowerCase().match(/MicroMessenger/i)[0] === "micromessenger") {
    return 'wechat'
  }
  if ((Agents.find((v: string) => userAgentInfo.indexOf(Agents[v]) > 0))) {
    return 'pc'
  } else {
    return 'mobile'
  }
};

// 分割数组
export function apartArray(arr: Array<object>, fn: Function) {
  const outerArr: any = [];
  let innerArr: any = [];
  arr.forEach(oldItem => {
    const index = outerArr.findIndex((v: any) => (v && v.find((newItem: any) => fn(oldItem, newItem))))
    if (index >= 0) {
      outerArr[index].push(oldItem);
    } else {
      innerArr = []
      innerArr.push(oldItem)
      outerArr.push(innerArr);
    }
  })
  return outerArr
}