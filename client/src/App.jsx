import { useContext } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import LeftNav from './components/LeftNav';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { DarkModeContext } from './context/darkMoodContext';
import Profile from './pages/Profile';
import { ProtectedRoute } from './components/ProtectedRoute';
import EditAccount from './pages/EditAccount';

const App = () => {
  const { darkMode } = useContext(DarkModeContext);
  const queryClient = new QueryClient();
  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <div className={`${darkMode ? 'dark' : 'light'}`}>
          <main className='background text'>
            <LeftNav />
            <Outlet />
          </main>
        </div>
      </QueryClientProvider>
    );
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/profile/:id',
          element: <Profile />,
        },
        {
          path: 'account/edit/:id',
          element: <EditAccount />,
        },
      ],
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
