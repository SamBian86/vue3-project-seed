import { STORAGE_KEYS } from './enums'

function getItem(key: string): any {
  return !!window.localStorage && window.localStorage.getItem(key)
}

function setItem(key: string, value: any) {
  return !!window.localStorage && window.localStorage.setItem(key, value)
}

export function getLanguage(): string {
  return !getItem(STORAGE_KEYS.LANGUAGE) ? STORAGE_KEYS.DEFAULT_LANGUAGE : (getItem(STORAGE_KEYS.LANGUAGE) || STORAGE_KEYS.DEFAULT_LANGUAGE)
}

export function setLanguage(language: string = STORAGE_KEYS.DEFAULT_LANGUAGE): void {
  setItem(STORAGE_KEYS.LANGUAGE, language)
}

export function getToken(): string {
  return !getItem(STORAGE_KEYS.TOKEN) ? STORAGE_KEYS.DEFAULT_TOKEN : (getItem(STORAGE_KEYS.TOKEN) || STORAGE_KEYS.DEFAULT_TOKEN)
}

export function setToken(token: string = STORAGE_KEYS.DEFAULT_TOKEN): void {
  setItem(STORAGE_KEYS.TOKEN, token)
}