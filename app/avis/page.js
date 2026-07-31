'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const API_URL = "https://api-avis.vercel.app";

export default function Avis() {
  const [avis, setAvis] = useState([])
  const [titre, setTitre] = useState('')
  const [description, setDescription] = useState('')
  const [rating, setRating] = useState(5)
  const [page, setPage] = useState('liste')
  const [estConnecte, setEstConnecte] = useState(false)

  const fetchAvis = async () => {
    try {
      const response = await fetch(`${API_URL}/avis`)
      const data = await response.json()

      const result = Array.isArray(data)
        ? data
        : (data.reviews || [])

      setAvis(result)

    } catch (error) {
      console.error("Erreur récupération avis :", error)
    }
  }


  useEffect(() => {
    fetchAvis()

    const token = localStorage.getItem('token')

    if (token) {
      setEstConnecte(true)
    } else {
      setEstConnecte(false)
    }

  }, [])


  const handleLogout = () => {
    localStorage.removeItem('token')
    setEstConnecte(false)
    window.location.reload()
  }


  const handleDelete = async (id) => {

    if (!confirm("Voulez-vous vraiment supprimer cet avis ?")) return

    const token = localStorage.getItem('token')

    try {

      const response = await fetch(`${API_URL}/avis/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })


      if(response.ok){
        fetchAvis()
      }
      else{
        alert("Impossible de supprimer l'avis")
      }

    } catch(error){
      console.error(error)
    }
  }



  const handleEdit = async (id) => {

    const nouveauTexte = prompt(
      "Entrez la nouvelle description pour cet avis :"
    )

    if(!nouveauTexte) return


    const token = localStorage.getItem('token')


    try {

      const response = await fetch(`${API_URL}/avis/${id}`, {
        method:'PUT',
        headers:{
          'Content-Type':'application/json',
          'Authorization':`Bearer ${token}`
        },
        body:JSON.stringify({
          description:nouveauTexte
        })
      })


      if(response.ok){
        fetchAvis()
      }

    } catch(error){
      console.error(error)
    }

  }



  const handleSubmit = async (e) => {

    e.preventDefault()


    try {

      const response = await fetch(`${API_URL}/add/avis`, {

        method:'POST',

        headers:{
          'Content-Type':'application/json'
        },


        body:JSON.stringify({

          title:titre,
          name:titre,
          date:new Date().toISOString(),
          rating:Number(rating),
          description:description

        })

      })


      const data = await response.json()


      if(response.ok){

        setTitre('')
        setDescription('')
        setRating(5)

        await fetchAvis()

        setPage('liste')

      }
      else{

        console.error(
          "Erreur ajout avis :",
          data
        )

        alert(
          "Erreur lors de la publication de l'avis"
        )

      }


    } catch(error){

      console.error(
        "Erreur réseau :",
        error
      )

      alert(
        "Impossible de contacter le serveur"
      )

    }

  }




  return (

    <div className="min-h-screen bg-[#f8fbff] flex flex-col md:flex-row">


      <div className="hidden md:flex w-72 bg-[#002D72] flex-col justify-between py-8 px-6 text-white">

        <div>

          <div className="font-bold text-xl mb-10 tracking-wider">
            MDS AVIS MASTER
          </div>


          <nav className="space-y-2">


            <Link 
              href="/"
              className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-white/10"
            >
              🏠 Accueil
            </Link>


            <button
              onClick={()=>setPage('liste')}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-white/10"
            >
              📬 Avis
            </button>



            <button
              onClick={()=>setPage('deposer')}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-white/10"
            >
              ✏️ Déposer un avis
            </button>



            {estConnecte && (

              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-red-300"
              >
                🚪 Se déconnecter
              </button>

            )}


          </nav>


        </div>


      </div>



      <div className="flex-1 p-6 md:p-12">


        {page === 'liste' ? (

          <div>

            <h1 className="text-3xl font-bold text-[#002D72] mb-2">
              Les derniers avis
            </h1>


            {avis.length === 0 ? (

              <p className="text-gray-500">
                Aucun avis pour le moment.
              </p>

            ):(


              <div className="space-y-4">

                {avis.map((a)=>(

                  <div 
                    key={a.id}
                    className="bg-white shadow rounded-xl p-6 flex justify-between"
                  >

                    <div>

                      <div className="font-bold text-[#002D72]">
                        {a.name}
                      </div>


                      <div className="text-yellow-500">
                        {'★'.repeat(a.rating || 0)}
                      </div>


                      <p className="text-gray-700">
                        {a.description}
                      </p>


                    </div>



                    {estConnecte && (

                      <div>

                        <button
                          onClick={()=>handleDelete(a.id)}
                          className="text-red-500"
                        >
                          Supprimer
                        </button>


                      </div>

                    )}


                  </div>

                ))}


              </div>

            )}


          </div>


        ):(


          <div>


            <h1 className="text-3xl font-bold text-[#002D72] mb-5">
              Déposer un avis
            </h1>


            <form
              onSubmit={handleSubmit}
              className="space-y-5 bg-white p-8 rounded-xl"
            >


              <input
                value={titre}
                onChange={(e)=>setTitre(e.target.value)}
                placeholder="Titre / Nom"
                className="w-full border p-3 rounded"
                required
              />


              <textarea
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
                placeholder="Votre message"
                className="w-full border p-3 rounded"
                required
              />


              <div>

                {[1,2,3,4,5].map(star=>(

                  <button
                    type="button"
                    key={star}
                    onClick={()=>setRating(star)}
                    className="text-2xl"
                  >
                    {star <= rating ? '★':'☆'}
                  </button>

                ))}

              </div>


              <button
                type="submit"
                className="w-full bg-[#002D72] text-white py-3 rounded"
              >
                Publier mon avis
              </button>


            </form>


          </div>

        )}


      </div>


    </div>

  )

}