import Posts from '../components/Posts';
import Suggestions from '../components/Suggestions';

const Home = () => {
  return (
    <div className='content'>
      <div className='home'>
        <Posts />
        <Suggestions />
      </div>
    </div>
  );
};

export default Home;
