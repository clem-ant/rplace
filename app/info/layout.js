import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Contenu principal */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto flex justify-between">
          <Link href="/info/about">
            <span className="hover:underline">À propos</span>
          </Link>
          <Link href="/">
            <span className="hover:underline">Le tableau</span>
          </Link>
        </div>
      </footer>
    </div>
  );
}