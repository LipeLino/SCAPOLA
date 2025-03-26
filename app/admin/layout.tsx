import 'app/globals.css'

export const metadata = {
  title: 'Painel de Controle - Scapola',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
