const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api-avis.vercel.app";

export async function Login(credentials) {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const result = await response.json();

    return {
      response,
      result,
    };
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    throw error;
  }
}