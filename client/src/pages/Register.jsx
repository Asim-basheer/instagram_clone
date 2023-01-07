import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';

import registerImg from '../images/registerImg.png';
import instagramTextLogo from '../images/insta_logo_text.png';

const Register = () => {
  const [inputs, setInputs] = useState({
    username: '',
    profilePicture:
      'https://ik.imagekit.io/ievdkoh2e/instagram_clone/profile-default-svgrepo-com_i5bi2A7jW.svg?ik-sdk-version=javascript-1.4.3&updatedAt=1672674525509',
    fullName: '',
    password: '',
    email: '',
  });
  const navigate = useNavigate();

  const [err, setErr] = useState(null);
  //  change the value from the inputs (useState hook)
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // send data to back end to handle
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post('register', inputs);
      navigate('/login', { replace: true });
    } catch (error) {
      setErr(error.response.data);
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
              type='email'
              placeholder='email'
              onChange={handleChange}
              name='email'
              autoFocus
              required
            />
          </div>
          <div className='form-main__input-container'>
            <input
              type='text'
              placeholder='full name'
              onChange={handleChange}
              name='fullName'
              required
            />
          </div>
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

          <input type='submit' value='sign up' />
        </form>
      </div>
    </div>
  );
};

export default Register;
