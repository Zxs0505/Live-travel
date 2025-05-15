import { useState } from 'react';
import { login }     from '../api';
import { useNavigate } from 'react-router-dom';

export default function Login({ setUser }) {
  const [form, setForm] = useState({ email:'', password:'' });
  const [err, setErr]   = useState('');
  const nav            = useNavigate();

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await login(form);
      setUser(res.data.user);
      nav('/profile');
    } catch (e) {
      setErr(e.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <form onSubmit={onSubmit} className="form">
      <h2>Login</h2>
      {err && <p className="error">{err}</p>}
      <input name="email"    placeholder="Email"    onChange={onChange} />
      <input name="password" type="password" placeholder="Password" onChange={onChange} />
      <button type="submit">Sign In</button>
    </form>
  );
}
