'use client';
import { useState } from 'react';

export default function RegisterPages() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const Getname = (first, last) => {
    setFirstName(first);
    setLastName(last);
    setName(`${first} ${last}`);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }
            
    try {
      // Appel direct de ton API Backend sur le port 4000
      const response = await fetch('http://localhost:4000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: name, email, password })
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(result.user));
        document.location.href = "/avis";
      } else {
        alert("Erreur lors de l'inscription: " + (result.error || "Erreur inconnue"));
      }
    } catch (error) {
      console.log("Erreur réseau", error);
      alert("Impossible de contacter le serveur. Vérifie que ton API est bien lancée sur le port 4000.");
    }
  }

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 bg-[#f8fbff]">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold text-[#002D72]">
          Créer votre compte étudiant
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm bg-white p-8 rounded-xl shadow-lg border-t-4 border-[#002D72]">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-[#002D72]">Prénom</label>
              <input type="text" required onChange={(e) => Getname(e.target.value, lastName)}
                className="block w-full rounded-md border border-[#002D72] px-3 py-1.5 text-[#002D72] outline-none focus:ring-2 focus:ring-[#002D72]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#002D72]">Nom</label>
              <input type="text" required onChange={(e) => Getname(firstName, e.target.value)}
                className="block w-full rounded-md border border-[#002D72] px-3 py-1.5 text-[#002D72] outline-none focus:ring-2 focus:ring-[#002D72]" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#002D72]">Email</label>
            <input type="email" required onChange={(e) => setEmail(e.target.value)}
              className="block w-full rounded-md border border-[#002D72] px-3 py-1.5 text-[#002D72] outline-none focus:ring-2 focus:ring-[#002D72]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#002D72]">Mot de passe</label>
            <input type="password" required onChange={(e) => setPassword(e.target.value)}
              className="block w-full rounded-md border border-[#002D72] px-3 py-1.5 text-[#002D72] outline-none focus:ring-2 focus:ring-[#002D72]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#002D72]">Confirmer mot de passe</label>
            <input type="password" required onChange={(e) => setConfirmPassword(e.target.value)}
              className="block w-full rounded-md border border-[#002D72] px-3 py-1.5 text-[#002D72] outline-none focus:ring-2 focus:ring-[#002D72]" />
          </div>
          <button type="submit"
            className="flex w-full justify-center rounded-md bg-[#002D72] px-3 py-2 text-sm font-semibold text-white hover:bg-blue-900">
            S'inscrire
          </button>
        </form>
        <p className="mt-10 text-center text-sm text-gray-600">
          Déjà un compte ? <a href="/login" className="font-semibold text-[#002D72] hover:underline">Se connecter</a>
        </p>
      </div>
    </div>
  );
}