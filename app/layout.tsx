import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Foundation Analyst (52 Weeks)',
  description: 'Flow-based curriculum planner for the Foundation Analyst course.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
