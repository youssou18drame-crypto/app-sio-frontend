export async function Register(data) {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
    
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: data.email,
        motDePasse: data.password
      })
    })

    if (!response.ok) {
      return true // il y a eu une erreur
    }

    return false // tout s'est bien passé
  } catch (error) {
    console.error('Erreur:', error)
    return true
  }
}