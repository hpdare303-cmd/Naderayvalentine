
export const metadata = {
  title: "For Naderay 💝",
  description: "A little Valentine surprise",
  icons: { apple: "/icons/icon-180.png" }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Naderay 💖" />
        <link rel="apple-touch-icon" href="/icons/icon-180.png" />
      </head>
      <body>{children}</body>
    </html>
  )
}
