'use client'
import { useState } from 'react'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await fetch('http://localhost:5000/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      alert("Si votre adresse existe, un lien a été envoyé !")
    } catch (error) {
      console.error('Erreur:', error)
    }
  }

  return (
    <div className="min-h-screen bg-[#f8fbff] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-[#002D72]">
        <div className="text-white font-bold text-lg">MDS AVIS MASTER</div>
        <a href="/" className="text-white text-sm hover:underline">Retour à l'accueil</a>
      </div>

      <div className="flex flex-col md:flex-row flex-1 items-center px-6 md:px-16 py-12">
        {/* Texte de gauche */}
        <div className="w-full md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl font-bold text-[#002D72] mb-4">Mot de passe oublié ?</h1>
          <p className="text-gray-600 text-sm">Entrez votre adresse email ci-dessous. Nous vous enverrons un lien pour réinitialiser votre accès à la plateforme.</p>
        </div>

        {/* Formulaire */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-lg border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[#002D72] text-sm font-medium mb-2">Email</label>
                <input 
                  type="email" 
                  placeholder="nom.prenom@mydigitalschool.com" 
                  onChange={(e) => setEmail(e.target.value)} 
                  className="w-full bg-white text-[#002D72] px-4 py-3 rounded-lg border border-[#002D72] focus:outline-none focus:ring-2 focus:ring-[#002D72]" 
                />
              </div>
              <button type="submit" className="w-full bg-[#002D72] hover:bg-blue-900 text-white font-semibold py-3 rounded-lg transition">
                Envoyer le lien
              </button>
              <div className="text-center">
                <a href="/login" className="text-[#002D72] font-semibold hover:underline text-sm">Retour à la connexion</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}