export async function Login(credentials) {
  try {
    const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })
    
    const result = await response.json()
    return { response, result }
  } catch (error) {
    console.error("Erreur lors de la connexion :", error)
    throw error
  }
}