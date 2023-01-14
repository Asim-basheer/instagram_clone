// import { useContext } from 'react';
// import { AuthContext } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const ProtectedRoute = ({ children }) => {
  // const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const currentUser = true;

  useEffect(() => {
    if (!currentUser) {
      return navigate('/login', { replace: true });
    }
  });

  return children;
};
