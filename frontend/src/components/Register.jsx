import { useState } from 'react';
import { register }  from '../api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ username:'', email:'', password:'' });
  const [err, setErr]   = useState('');
  const nav            = useNavigate();

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = async e => {
    e.preventDefault();
    try {
      await register(form);
      nav('/login');
    } catch (e) {
      setErr(e.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <form onSubmit={onSubmit} className="form">
      <h2>Register</h2>
      {err && <p className="error">{err}</p>}
      <input name="username" placeholder="Username" onChange={onChange} />
      <input name="email"    placeholder="Email"    onChange={onChange} />
      <input name="password" type="password" placeholder="Password" onChange={onChange} />
      <button type="submit">Sign Up</button>
    </form>
  );
}
