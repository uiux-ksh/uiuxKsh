import type { Metadata } from 'next';
import './globals.scss';

export const metadata: Metadata = {
  title: '김성훈 | Frontend Developer Portfolio',
  description:
    '버그는 참지 못하지만 사람에게 경청하는 개발자 — 4년차 프론트엔드 개발자 김성훈의 포트폴리오',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
