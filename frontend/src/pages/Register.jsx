import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api.js';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await api.post('/auth/register', form);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Gabim në regjistrim');
    }
  };

  return <main className="auth-page"><form className="auth-card" onSubmit={submit}>
    <h1>Krijo llogari</h1>
    <input placeholder="Emri" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
    <input placeholder="Email" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
    <input placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} />
    {error && <p className="error">{error}</p>}
    <button>Regjistrohu</button>
    <p>Ke llogari? <Link to="/login">Hyr</Link></p>
  </form></main>;
}
