import Navbar from '@/components/navbar'
import Form from '@/components/form'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f8fbff]">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg border-t-4 border-[#002D72]">
          <h1 className="text-2xl font-bold text-[#002D72] mb-6 text-center">
            MDS AVIS MASTER
          </h1>
          <p className="text-gray-600 mb-6 text-center text-sm">
            Connectez-vous pour accéder à votre espace étudiant et gérer vos avis.
          </p>
          
          <Form />
        </div>
      </main>
    </div>
  )
}