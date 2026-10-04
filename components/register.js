const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api-avis.vercel.app';

export async function Register(data) {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: data.username,
      email: data.email,
      password: data.password
    })
  });

  const result = await response.json();
  return { response, result };
}
