import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api.js';

export default function Dashboard() {
  const [tab, setTab] = useState('overview');
  const [faqs, setFaqs] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [ticket, setTicket] = useState({ type: 'Kartë bankare', message: '' });
  const [chat, setChat] = useState([{ from: 'bot', text: 'Përshëndetje! Si mund të të ndihmoj?' }]);
  const [chatText, setChatText] = useState('');
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const loadTickets = async () => { const { data } = await api.get('/tickets'); setTickets(data); };

  useEffect(() => {
    api.get('/faqs').then(res => setFaqs(res.data));
    loadTickets();
  }, []);

  const logout = () => { localStorage.clear(); navigate('/login'); };

  const createTicket = async (e) => {
    e.preventDefault();
    if (!ticket.message.trim()) return;
    await api.post('/tickets', ticket);
    setTicket({ type: 'Kartë bankare', message: '' });
    await loadTickets();
    setTab('tickets');
  };

  const sendChat = async (e) => {
    e.preventDefault();
    if (!chatText.trim()) return;
    const current = chatText;
    setChat(prev => [...prev, { from: 'user', text: current }]);
    setChatText('');
    const { data } = await api.post('/chat', { message: current });
    setChat(prev => [...prev, { from: 'bot', text: data.reply }]);
  };

  return <main className="dashboard">
    <aside>
      <h2>🏦 BankCare</h2>
      <p>{user.name}</p>
      {['overview','faq','new','tickets','chat'].map(x => <button key={x} className={tab===x?'active':''} onClick={()=>setTab(x)}>{labels[x]}</button>)}
      <button onClick={logout}>Dil</button>
    </aside>

    <section className="panel">
      {tab==='overview' && <div><h1>Paneli kryesor</h1><div className="cards"><div><b>{tickets.length}</b><span>Kërkesa</span></div><div><b>{faqs.length}</b><span>FAQ</span></div><div><b>API</b><span>Interaktive</span></div></div></div>}
      {tab==='faq' && <div><h1>FAQ</h1>{faqs.map((f,i)=><details key={i}><summary>{f.question}</summary><p>{f.answer}</p></details>)}</div>}
      {tab==='new' && <form onSubmit={createTicket}><h1>Dërgo kërkesë</h1><select value={ticket.type} onChange={e=>setTicket({...ticket,type:e.target.value})}><option>Kartë bankare</option><option>Kredi</option><option>Transfertë</option><option>Llogari bankare</option><option>Tjetër</option></select><textarea placeholder="Shkruaj problemin..." value={ticket.message} onChange={e=>setTicket({...ticket,message:e.target.value})}/><button>Dërgo</button></form>}
      {tab==='tickets' && <div><h1>Kërkesat e mia</h1>{tickets.length===0?<p>Nuk ka kërkesa.</p>:tickets.map(t=><article className="ticket" key={t._id}><b>{t.type}</b><p>{t.message}</p><small>{t.status} • {new Date(t.createdAt).toLocaleString()}</small></article>)}</div>}
      {tab==='chat' && <div><h1>Chat API</h1><div className="chatbox">{chat.map((m,i)=><p key={i} className={m.from}>{m.text}</p>)}</div><form className="chat-form" onSubmit={sendChat}><input value={chatText} onChange={e=>setChatText(e.target.value)} placeholder="Shkruaj..."/><button>Dërgo</button></form></div>}
    </section>
  </main>;
}

const labels = { overview:'Paneli', faq:'FAQ', new:'Kërkesë e re', tickets:'Kërkesat', chat:'Chat' };
