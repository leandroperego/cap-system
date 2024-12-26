import "./globals.css";
import LayoutResponsivo from "./components/LayoutResponsivo";

export const metadata = {
  title: "CapSystem - HOME",
  description: "Sistema para corretores de imóveis",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <LayoutResponsivo />
        <section className="lg:absolute top-0 left-1/3 lg:w-2/3 2xl:w-3/4 2xl:left-1/4">
          <main>
            {children}
          </main>
          <footer className="rodape-principal">

          </footer>
        </section>
      </body>
    </html>
  );
}
