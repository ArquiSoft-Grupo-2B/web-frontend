const API_BASE_AUTH = import.meta.env.VITE_API_AUTH_URL || "http://localhost:8000";

export async function fetchGraphQL(query, variables = {}) {
  const res = await fetch(`${API_BASE_AUTH}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
    },
    body: JSON.stringify({
      query,    
      variables, 
    }),
  });

  const json = await res.json();
  return json; ;
}
