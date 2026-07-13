'use client'
import { useState } from 'react'
import { Login } from '@/services/login'
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
    <div className="min-h-screen bg-[#0a0a2e] flex flex-col">
      {message && error && <Toast message={message} />}
      <div className="flex items-center justify-between px-6 py-4">
        <div className="text-white font-bold text-lg">MY DIGITAL SCHOOL</div>
        <button className="text-white text-sm">Retour en arrière</button>
      </div>
      <div className="flex flex-col md:flex-row flex-1">
        <div className="hidden md:flex w-1/2 items-center justify-center">
          <img src="/image-login.png" alt="login" className="max-w-md w-full" />
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-16 py-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Bienvenue!</h1>
          <p className="text-indigo-400 mb-8">Connectez vous pour continuer</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white text-sm mb-2">Email</label>
              <input type="email" placeholder="Entrez votre mail" onChange={(e) => setEmail(e.target.value)} className="w-full bg-[#1a1a3e] text-white px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:border-indigo-500" />
            </div>
            <div>
              <label className="block text-white text-sm mb-2">Mot de passe</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} placeholder="Entrez votre mot de passe" onChange={(e) => setPassword(e.target.value)} className="w-full bg-[#1a1a3e] text-white px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:border-indigo-500" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-gray-400">👁</button>
              </div>
            </div>
            <a href="/password-forgot" className="block text-indigo-400 hover:text-indigo-300 text-sm">Mot de passe oublier ?</a>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" className="w-4 h-4" />
              <label htmlFor="remember" className="text-white text-sm">Se souvenir de moi</label>
            </div>
            <button type="submit" className="w-full bg-indigo-500 hover:bg-indigo-400 text-white font-semibold py-3 rounded-lg">Se connecter</button>
          </form>
          <p className="text-gray-400 text-center mt-6">
            Pas de compte ? <a href="/register" className="text-indigo-400 hover:text-indigo-300">S'inscrire</a>
          </p>
        </div>
      </div>
    </div>
  )
}
