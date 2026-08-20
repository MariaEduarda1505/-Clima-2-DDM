import { useEffect } from 'react';

export default function Login() {
  useEffect(() => {
    window.location.href = 'http://localhost:3000/index.html';
  }, []);

  return null;
}