export function fetchUserData(id) {
  const endpoint = `https://jsonplaceholder.typicode.com/users/${id}`;

  return fetch(endpoint)
    .then((res) => res.json())
    .then((data) => data);
}
