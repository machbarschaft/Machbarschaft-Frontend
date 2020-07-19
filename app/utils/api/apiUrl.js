export default function apiUrl() {
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000/';
  }

  return 'https://api.demo.machbarschaft.jetzt/';
}
