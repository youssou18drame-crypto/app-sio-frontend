'use client'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'

export default function ResetPassword() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert('Les mots de passe ne correspondent pas')
      return
    }
    try {
      const response = await fetch('http://localhost:5000/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, nouveauMotDePasse: password })
      })
      if (response.ok) {
        alert('Mot de passe réinitialisé avec succès !')
        document.location.href = '/login'
      }
    } catch (error) {
      console.error('Erreur:', error)
    }
  }

  return (
    <div className="min-h-screen bg-[#f8fbff] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-4 bg-[#002D72]">
        <div className="text-white font-bold text-lg">MDS AVIS MASTER</div>
        <a href="/" className="text-white text-sm hover:underline">Retour à l'accueil</a>
      </div>

      <div className="flex flex-1 items-center justify-center p-6">
        <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-lg border border-gray-100">
          <h1 className="text-2xl font-bold text-[#002D72] mb-2">Nouveau mot de passe</h1>
          <p className="text-gray-600 mb-8 text-sm">Choisissez un nouveau mot de passe sécurisé pour votre compte.</p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[#002D72] text-sm font-medium mb-2">Nouveau mot de passe</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} onChange={(e) => setPassword(e.target.value)} 
                  className="w-full bg-white text-[#002D72] px-4 py-3 rounded-lg border border-[#002D72] focus:outline-none focus:ring-2 focus:ring-[#002D72]" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-[#002D72]">👁</button>
              </div>
            </div>
            
            <div>
              <label className="block text-[#002D72] text-sm font-medium mb-2">Confirmer le mot de passe</label>
              <div className="relative">
                <input type={showConfirm ? 'text' : 'password'} onChange={(e) => setConfirmPassword(e.target.value)} 
                  className="w-full bg-white text-[#002D72] px-4 py-3 rounded-lg border border-[#002D72] focus:outline-none focus:ring-2 focus:ring-[#002D72]" />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-3 text-[#002D72]">👁</button>
              </div>
            </div>
            
            <button type="submit" className="w-full bg-[#002D72] hover:bg-blue-900 text-white font-semibold py-3 rounded-lg transition">
              Réinitialiser
            </button>
          </form>
          
          <div className="text-center mt-6">
            <a href="/login" className="text-[#002D72] font-semibold hover:underline text-sm">Retour à la connexion</a>
          </div>
        </div>
      </div>
    </div>
  )
}