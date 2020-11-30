export default function apiUrl() {
  if (process.env.NODE_ENV === 'development') {
    return '/v1';
  }

  return 'https://api.demo.machbarschaft.jetzt';
}
