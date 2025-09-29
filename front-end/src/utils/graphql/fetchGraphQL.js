// src/utils/graphql/fetchGraphQL.js
export async function fetchGraphQL(query, variables = {}) {
  const res = await fetch("http://localhost:8000/graphql", {
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
