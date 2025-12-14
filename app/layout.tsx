import "@/app/globals.css";

export const metadata = {
  title: "Routine Game",
  description: "3-month routine tracker (tick = done, unticked = distracted)"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-zinc-950 text-zinc-100">
        {children}
      </body>
    </html>
  );
}
