import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-[#002D72] p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <img 
              src="/logo-mds.png" 
              alt="Logo My Digital School" 
              className="h-10 w-auto object-contain" 
            />
          </Link>
        </div>
        <ul className="flex space-x-6">
          <li>
            <Link href="/" className="hover:text-blue-200">Accueil</Link>
          </li>
          <li>
            <Link href="/avis" className="hover:text-blue-200">Avis</Link>
          </li>
          <li>
            <Link href="/login" className="hover:text-blue-200">Connexion</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}