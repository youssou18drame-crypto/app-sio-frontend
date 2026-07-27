'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Register } from '../services/register'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert('Les mots de passe ne correspondent pas')
      return
    }
    try {
      const { response } = await Register({ username: name, email, password })
      if (response.ok) {
        document.location.href = '/login'
      }
    } catch (error) {
      console.log('Erreur réseau', error)
    }
  }

  return (
    <div className="min-h-screen bg-[#f8fbff] flex flex-col">
      <div className="flex items-center justify-between px-6 py-4 bg-[#002D72]">
        <div className="text-white font-bold text-lg">MDS AVIS MASTER</div>
        <Link href="/" className="text-white text-sm hover:underline">Retour à l'accueil</Link>
      </div>

      <div className="flex flex-col md:flex-row flex-1">
        <div className="hidden md:flex w-1/2 items-center justify-center bg-[#002D72]">
           <div className="text-white text-center p-10">
              <h2 className="text-4xl font-bold mb-4">Rejoignez la communauté</h2>
              <p>Partagez vos avis et progressez ensemble.</p>
           </div>
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-16 py-8">
          <h1 className="text-4xl font-bold text-[#002D72] mb-2">Créer votre compte</h1>
          <p className="text-gray-600 mb-8 text-sm">Inscrivez-vous pour accéder à la plateforme MDS AVIS MASTER.</p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[#002D72] text-sm mb-2">Nom complet</label>
              <input type="text" placeholder="Entrez votre nom" onChange={(e) => setName(e.target.value)} 
                className="w-full bg-white text-[#002D72] px-4 py-3 rounded-lg border border-[#002D72] focus:outline-none focus:ring-2 focus:ring-[#002D72]" />
            </div>
            <div>
              <label className="block text-[#002D72] text-sm mb-2">Email</label>
              <input type="email" placeholder="Entrez votre mail" onChange={(e) => setEmail(e.target.value)} 
                className="w-full bg-white text-[#002D72] px-4 py-3 rounded-lg border border-[#002D72] focus:outline-none focus:ring-2 focus:ring-[#002D72]" />
            </div>
            <div>
              <label className="block text-[#002D72] text-sm mb-2">Mot de passe</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} placeholder="Créez un mot de passe" onChange={(e) => setPassword(e.target.value)} 
                  className="w-full bg-white text-[#002D72] px-4 py-3 rounded-lg border border-[#002D72] focus:outline-none focus:ring-2 focus:ring-[#002D72]" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-[#002D72]">👁</button>
              </div>
            </div>
            <div>
              <label className="block text-[#002D72] text-sm mb-2">Confirmer le mot de passe</label>
              <div className="relative">
                <input type={showConfirm ? 'text' : 'password'} placeholder="Confirmez votre mot de passe" onChange={(e) => setConfirmPassword(e.target.value)} 
                  className="w-full bg-white text-[#002D72] px-4 py-3 rounded-lg border border-[#002D72] focus:outline-none focus:ring-2 focus:ring-[#002D72]" />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-3 text-[#002D72]">👁</button>
              </div>
            </div>
            <button type="submit" className="w-full bg-[#002D72] hover:bg-blue-900 text-white font-semibold py-3 rounded-lg transition">S'inscrire</button>
          </form>
          
          <p className="text-gray-600 text-center mt-6 text-sm">
            Déjà un compte ? <Link href="/login" className="text-[#002D72] font-bold hover:underline">Se connecter</Link>
          </p>
        </div>
      </div>
    </div>
  )
}