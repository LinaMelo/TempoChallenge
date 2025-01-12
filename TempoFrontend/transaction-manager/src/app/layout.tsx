import { CssBaseline, Container } from "@mui/material";

export const metadata = {
  title: "App de Transacciones",
  description: "Gestión de transacciones con Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <CssBaseline />
        <Container maxWidth="lg">{children}</Container>
      </body>
    </html>
  );
}
