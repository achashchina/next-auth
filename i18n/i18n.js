import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      'Welcome to React': 'Welcome to React',
      lbl_signOut: 'Sign Out',
      lbl_profilePage: 'Profile Page',
      lbl_authUserPage: 'Authorize User Homepage'
    },
  },
  uk: {
    translation: {
      'Welcome to React': 'Ласкаво просимо до реакту',
      lbl_signOut: 'Вийти',
      lbl_profilePage: 'Сторінка профайлу',
      lbl_authUserPage: 'Сторінка авторизованного користувача'
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
