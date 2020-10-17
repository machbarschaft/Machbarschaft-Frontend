export default function apiUrl() {
  if (process.env.NODE_ENV === 'development') {
    return 'https://api.demo.machbarschaft.jetzt/';
  }

  return 'https://api.demo.machbarschaft.jetzt/';
}
