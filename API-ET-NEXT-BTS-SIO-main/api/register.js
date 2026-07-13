export async function Register(data) {
  try {
    const response = await fetch('http://localhost:3000/register', {
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