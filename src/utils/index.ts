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