import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import registerImg from '../images/registerImg.png';
import instagramTextLogo from '../images/insta_logo_text.png';
import { AuthContext } from '../context/authContext';

const Login = () => {
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });
  const [err, setErr] = useState(null);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  //  change the value from the inputs (useState hook)
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // send data to back end to handle
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate('/');
    } catch (err) {
      setErr(err.response.data);
    }
  };

  return (
    <div className='form-container'>
      <div className='form-img'>
        <img src={registerImg} alt='register Img' className='img-fluid' />
      </div>

      <div className='form-main'>
        <div className='form-main__logo'>
          <img
            src={instagramTextLogo}
            alt='instagram logo writing'
            className='img-fluid'
          />
          <p>Sign up to see photos from your friends.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className='form-main__input-container'>
            <input
              type='text'
              placeholder='username'
              onChange={handleChange}
              name='username'
              required
            />
          </div>
          <div className='form-main__input-container'>
            <input
              type='password'
              placeholder='password'
              onChange={handleChange}
              name='password'
              required
            />
          </div>
          {err && <div className='alert-input'>{err}</div>}

          <input type='submit' value='sign in' />
        </form>
      </div>
    </div>
  );
};

export default Login;
