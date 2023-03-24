import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n/i18n';
import NonSSRWrapper from '../components/NonSSRWrapper';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NonSSRWrapper>
      <I18nextProvider i18n={i18n}>
        <SessionProvider session={pageProps.session}>
          <Component {...pageProps} />
        </SessionProvider>
      </I18nextProvider>
    </NonSSRWrapper>
  );
}
