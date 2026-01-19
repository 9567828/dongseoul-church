import type { Metadata } from 'next';
import QueryProvider from './providers';
import '@/styles/common.scss';

export const metadata: Metadata = {
  title: {
    default: '...loading',
    template: '하남 동서울교회 | %s',
  },
  description: '하남 동서울교회',
  icons: {
    icon: '/favicon/favicon.ico',
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: '/favicon/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <QueryProvider>{children}</QueryProvider>
        <script
          type="text/javascript"
          src={`/dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAOMAP_KEY}&libraries=services,clusterer`}
        ></script>
      </body>
    </html>
  );
}
