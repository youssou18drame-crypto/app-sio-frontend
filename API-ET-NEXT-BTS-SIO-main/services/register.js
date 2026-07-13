export async function Register({ username, email, password }) {
  const response = await fetch('http://localhost:5000/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      motDePasse: password
    })
  })

  const result = await response.json()

  return { response, result }
}