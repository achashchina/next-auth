import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n/i18n';
import NonSSRWrapper from '../components/NonSSRWrapper';
import 'bootstrap/dist/css/bootstrap.css';
import MainLayout from '../layout/main-layout';

export default function App({ Component, pageProps }: AppProps) {
  const { session } = pageProps;
  return (
    <NonSSRWrapper>
      <I18nextProvider i18n={i18n}>
        <SessionProvider session={pageProps.session}>
          {session ? (
            <MainLayout>
              <Component {...pageProps} />
            </MainLayout>
          ) : (
            <Component {...pageProps} />
          )}
        </SessionProvider>
      </I18nextProvider>
    </NonSSRWrapper>
  );
}
