import { ProtectedRoute } from '../components/ProtectedRoute';

const Home = () => {
  return (
    <ProtectedRoute>
      <div>text for dark mode</div>
    </ProtectedRoute>
  );
};

export default Home;
