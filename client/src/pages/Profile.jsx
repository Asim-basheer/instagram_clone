import UserInfo from '../components/UserInfo';
import UserPosts from '../components/UserPosts';

const Profile = () => {
  return (
    <div className='content'>
      <div className='pages'>
        <UserInfo />
        <UserPosts />
      </div>
    </div>
  );
};

export default Profile;
