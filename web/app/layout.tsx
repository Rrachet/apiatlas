import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'apiatlas — Find the right API',
  description: 'A structured, searchable directory of public APIs.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
