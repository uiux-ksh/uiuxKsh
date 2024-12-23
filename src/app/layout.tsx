import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.scss'
import localFont from 'next/font/local'

const inter = Inter({ subsets: ['latin'] })

const pretendard = localFont({
  src: '../../public/_assets/font/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
})
export const metadata: Metadata = {
  title: '김성훈',
  description: '포트폴리오',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <html lang='en' className={`${pretendard.variable}`}>
        <body className={`${inter.className} `}>{children}</body>
      </html>
    </>
  )
}
