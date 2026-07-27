'use client'
import { useState } from 'react'
import { Login } from '@/app/services/login'
import Toast from '@/components/toast'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(false)
    try {
      const { response, result } = await Login({ email, password })
      if (response.ok) {
        localStorage.setItem('token', result.token)
        document.location.href = '/avis'
      } else {
        setMessage(result.message || 'Identifiants incorrects.')
        setError(true)
        setTimeout(() => setError(false), 3000)
      }
    } catch (error) {
      setMessage('Erreur réseau, veuillez réessayer.')
      setError(true)
      setTimeout(() => setError(false), 3000)
    }
  }

  return (
    <div className="min-h-screen bg-[#f8fbff] flex flex-col">
      {message && error && <Toast message={message} />}
      
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-[#002D72]">
        <div className="text-white font-bold text-lg">MDS AVIS MASTER</div>
        <a href="/" className="text-white text-sm hover:underline">Retour à l'accueil</a>
      </div>

      <div className="flex flex-col md:flex-row flex-1">
        {/* Branding */}
        <div className="hidden md:flex w-1/2 items-center justify-center bg-[#002D72]">
          <div className="text-white text-center p-10">
            <h2 className="text-4xl font-bold mb-4">Content de vous revoir !</h2>
            <p>Connectez-vous pour accéder à vos avis.</p>
          </div>
        </div>

        {/* Formulaire */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-16 py-8">
          <h1 className="text-4xl font-bold text-[#002D72] mb-2">Connexion</h1>
          <p className="text-gray-600 mb-8">Connectez-vous pour continuer sur MDS AVIS MASTER</p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[#002D72] text-sm mb-2">Email</label>
              <input type="email" placeholder="Entrez votre mail" onChange={(e) => setEmail(e.target.value)} 
                className="w-full bg-white text-[#002D72] px-4 py-3 rounded-lg border border-[#002D72] focus:outline-none focus:ring-2 focus:ring-[#002D72]" />
            </div>
            <div>
              <label className="block text-[#002D72] text-sm mb-2">Mot de passe</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} placeholder="Entrez votre mot de passe" onChange={(e) => setPassword(e.target.value)} 
                  className="w-full bg-white text-[#002D72] px-4 py-3 rounded-lg border border-[#002D72] focus:outline-none focus:ring-2 focus:ring-[#002D72]" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-[#002D72]">👁</button>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="remember" className="accent-[#002D72]" />
                <label htmlFor="remember" className="text-[#002D72] text-sm">Se souvenir de moi</label>
              </div>
              <a href="/password-forgot" className="text-[#002D72] text-sm hover:underline">Mot de passe oublié ?</a>
            </div>
            
            <button type="submit" className="w-full bg-[#002D72] hover:bg-blue-900 text-white font-semibold py-3 rounded-lg transition">Se connecter</button>
          </form>
          
          <p className="text-gray-600 text-center mt-6">
            Pas de compte ? <a href="/register" className="text-[#002D72] font-bold hover:underline">S'inscrire</a>
          </p>
        </div>
      </div>
    </div>
  )
}