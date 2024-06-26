import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../components/OAuth';

const SignIn = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart());
    try {
      const res = await fetch("/api/auth/signin", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || data.success === false) {
        dispatch(signInFailure(data.message || 'Something went wrong!'));
        return;
      }

      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure('Network error'));
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type="email"
          placeholder='Enter your email'
          id='email'
          value={formData.email}
          className='bg-slate-100 p-3 rounded-lg'
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder='Password'
          id='password'
          value={formData.password}
          className='bg-slate-100 p-3 rounded-lg'
          onChange={handleChange}
          required
        />
        <button disabled={loading} className='bg-sky-300 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? 'Loading...' : 'Sign In'}
        </button>
        <OAuth />
      </form>
      {error && <div className='text-red-500 mt-2'>{error}</div>}
      <div className='flex gap-2 mt-5'>
        <p>Don't have an account?</p>
        <Link to='/SignUp'>
          <span className='text-blue-500'>Sign Up</span>
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
