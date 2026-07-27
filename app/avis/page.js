'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Avis() {
  const [avis, setAvis] = useState([])
  const [titre, setTitre] = useState('')
  const [description, setDescription] = useState('')
  const [rating, setRating] = useState(5)
  const [page, setPage] = useState('liste')

  // Fonction pour récupérer les avis depuis l'API
  const fetchAvis = () => {
    fetch('http://localhost:4000/avis')
      .then(res => res.json())
      .then(data => {
        const result = data.reviews ? data.reviews : (Array.isArray(data) ? data : [])
        setAvis(result)
      })
      .catch(err => console.error('Erreur:', err))
  }

  useEffect(() => {
    fetchAvis()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:4000/add/avis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          title: titre, 
          name: titre, 
          date: new Date().toISOString(), 
          rating, 
          description 
        })
      })

      if (response.ok) {
        setTitre('')
        setDescription('')
        setRating(5)
        fetchAvis()
        setPage('liste')
      } else {
        console.error('Erreur lors de la publication')
      }
    } catch (error) {
      console.error('Erreur:', error)
    }
  }

  return (
    <div className="min-h-screen bg-[#f8fbff] flex flex-col md:flex-row">
      <div className="hidden md:flex w-72 bg-[#002D72] flex-col justify-between py-8 px-6 text-white">
        <div>
          <div className="font-bold text-xl mb-10 tracking-wider">MDS AVIS MASTER</div>
          <nav className="space-y-2">
            <Link href="/" className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-white/10 transition">
              🏠 Accueil
            </Link>
            <button onClick={() => setPage('liste')} className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-white/10 transition">📬 Avis</button>
            <button onClick={() => setPage('deposer')} className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition ${page === 'deposer' ? 'bg-white text-[#002D72] font-bold' : 'hover:bg-white/10'}`}>✏️ Déposer un avis</button>
          </nav>
        </div>
      </div>

      <div className="flex-1 p-6 md:p-12">
        {page === 'liste' ? (
          <div>
            <h1 className="text-3xl font-bold text-[#002D72] mb-2">Les derniers avis</h1>
            {avis.length === 0 ? (
              <p className="text-gray-500">Aucun avis pour le moment.</p>
            ) : (
              <div className="space-y-4">
                {avis.map((a, index) => (
                  <div key={index} className="bg-white border border-gray-100 shadow-sm rounded-xl p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-bold text-[#002D72]">{a.name || a.title}</span>
                      <span className="text-yellow-500 text-lg">{'★'.repeat(a.rating || 0)}</span>
                    </div>
                    <p className="text-gray-700">{a.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>
            <h1 className="text-3xl font-bold text-[#002D72] mb-2">Déposer un avis</h1>
            <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div>
                <label className="block text-[#002D72] font-medium mb-2">Titre</label>
                <input 
                  type="text" 
                  value={titre} 
                  onChange={(e) => setTitre(e.target.value)} 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#002D72] outline-none" 
                  required 
                />
              </div>
              <div>
                <label className="block text-[#002D72] font-medium mb-2">Votre message</label>
                <textarea 
                  rows={4} 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#002D72] outline-none" 
                  required 
                />
              </div>
              <div>
                <label className="block text-[#002D72] font-medium mb-2">Note</label>
                <div className="flex gap-2">
                  {[1,2,3,4,5].map((star) => (
                    <button key={star} type="button" onClick={() => setRating(star)} className={`text-2xl ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}>★</button>
                  ))}
                </div>
              </div>
              <button type="submit" className="w-full bg-[#002D72] hover:bg-blue-900 text-white font-bold py-3 rounded-lg transition">Publier mon avis</button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}