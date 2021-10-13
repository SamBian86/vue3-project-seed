import { getLanguage, setLanguage, getToken, setToken } from './localStorage'

export function useLocalStorage() {
  return {
    getLanguage,
    setLanguage,
    getToken,
    setToken
  }
}