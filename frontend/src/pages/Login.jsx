import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api.js';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await api.post('/auth/login', form);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Gabim në login');
    }
  };

  return <main className="auth-page"><form className="auth-card" onSubmit={submit}>
    <h1>BankCare Login</h1>
    <input placeholder="Email" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
    <input placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} />
    {error && <p className="error">{error}</p>}
    <button>Hyr</button>
    <p>Nuk ke llogari? <Link to="/register">Regjistrohu</Link></p>
  </form></main>;
}
