import React from 'react'
import ReactDOM from 'react-dom/client'
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector'
import { Provider } from 'react-redux'
import { initReactI18next } from 'react-i18next'
import createStore from './store/createStore'
import AppContainer from './App'

// translations
import { csLanguage, enLanguage } from './translations'

// ========================================================
// i18n
// ========================================================
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: process.env.NODE_ENV === 'development',
    load: 'languageOnly',
    fallbackLng: 'cs',
    supportedLngs: ['en', 'cs'],
    resources: {
      en: {
        translation: enLanguage,
      },
      cs: {
        translation: csLanguage,
      },
    },
  })

// ========================================================
// Store Instantiation
// ========================================================
const initialState = window.__INITIAL_STATE__
export const store = createStore(initialState)

// ========================================================
// Render Setup
// ========================================================
const mountNode = document.getElementById('app') || document.createElement('div')
const root = ReactDOM.createRoot(mountNode)

// This code is excluded from production bundle
if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.dispose(() => { root.unmount() })
  module.hot.accept()
}

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </React.StrictMode>
)