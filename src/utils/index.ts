import type { App, Plugin } from 'vue';

export const withInstall = <T>(component: T, alias?: string) => {
  const comp = component as any;
  comp.install = (app: App) => {
    app.component(comp.name || comp.displayName, component);
    if (alias) {
      app.config.globalProperties[alias] = component;
    }
  };
  return component as T & Plugin;
};

export const withInstallDirective = <T>(directive: T, alias?: string) => {
  const _directive = directive as any;
  console.log(_directive.name)
  _directive.install = (app: App) => {
    app.directive(_directive.name, directive);
    if (alias) {
      app.config.globalProperties[alias] = directive;
    }
  };
  return directive as T & Plugin;
};

const hexList: string[] = [];
for (let i = 0; i <= 15; i++) {
  hexList[i] = i.toString(16);
}


export function buildUUID(): string {
  let uuid = '';
  for (let i = 1; i <= 36; i++) {
    if (i === 9 || i === 14 || i === 19 || i === 24) {
      uuid += '-';
    } else if (i === 15) {
      uuid += 4;
    } else if (i === 20) {
      uuid += hexList[(Math.random() * 4) | 8];
    } else {
      uuid += hexList[(Math.random() * 16) | 0];
    }
  }
  return uuid.replace(/-/g, '');
}

export function getCaptcha() {
  return `${import.meta.env.VITE_APP_API_URL}/auth/captcha?uuid=`
}

export function isFunction(fn: Function) {
  return typeof fn === 'function'
}

export function getIconList() {
  const res: { name: string; }[] = []
  document.querySelectorAll('svg symbol').forEach(item => {
    res.push({ name: item.id })
  })
  return res
}

export function paramsToObject(str: any) {
  const arr = str.split('&')
  let obj = {}
  arr.forEach((item: any) => {
    const i = item.split('=')
    obj[i[0]] = i[1]
  })
  return obj
}

export function checkDevice() {
  const browser = {
    versions: function () {
      const u = navigator.userAgent;
      return { //移动终端浏览器版本信息
        trident: u.indexOf("Trident") > -1, //IE内核
        presto: u.indexOf("Presto") > -1, //opera内核
        webKit: u.indexOf("AppleWebKit") > -1, //苹果、谷歌内核
        gecko: u.indexOf("Gecko") > -1 && u.indexOf("KHTML") === -1, //火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        android: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1, //android终端或者uc浏览器
        iPhone: u.indexOf("iPhone") > -1 || u.indexOf("Mac") > -1, //是否为iPhone或者QQHD浏览器
        iPad: u.indexOf("iPad") > -1, //是否iPad
        webApp: u.indexOf("Safari") === -1 //是否web应该程序，没有头部与底部
      }
    }()
  }
  return browser
}

export function getSplitIndexInArray(arr: any, value: any) {
  let index = 0
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > value) {
      if (i === 0) {
        index = 0
      } else {
        index = i - 1
      }
      break
    }
  }
  return index
} 