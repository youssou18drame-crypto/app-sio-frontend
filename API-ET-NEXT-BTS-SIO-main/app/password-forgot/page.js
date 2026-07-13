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
      alert("Lien envoyé si l'email existe !")
    } catch (error) {
      console.error('Erreur:', error)
    }
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="text-white font-bold text-lg">MY DIGITAL SCHOOL</div>
        <button className="text-white text-sm">Retour a l'accueil</button>
      </div>
      <div className="flex flex-col md:flex-row flex-1 items-center px-6 md:px-0">
        <div className="w-full md:w-1/2 md:px-16 mb-8 md:mb-0">
          <img src="/image-forgot.png" alt="forgot" className="max-w-xs w-full mb-6 hidden md:block" />
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Mot de passe oublié</h1>
          <p className="text-gray-400 text-sm">Entrez votre mail et nous vous enverrons un lien pour réinitialisé votre mot de passe.</p>
        </div>
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="bg-[#1a1a2e] rounded-2xl p-8 w-full max-w-md">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-white text-sm mb-2">Email</label>
                <input type="email" placeholder="Entrez votre mail" onChange={(e) => setEmail(e.target.value)} className="w-full bg-[#0a0a1a] text-white px-4 py-3 rounded-lg border border-indigo-500 focus:outline-none" />
              </div>
              <button type="submit" className="w-full bg-indigo-500 hover:bg-indigo-400 text-white font-semibold py-3 rounded-lg">Envoyer le lien</button>
              <div className="text-center">
                <a href="/login" className="text-indigo-400 hover:text-indigo-300 text-sm">Retour à la connexion</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
