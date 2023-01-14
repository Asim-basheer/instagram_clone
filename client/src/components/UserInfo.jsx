import { useState } from 'react';
import { IoIosSettings } from 'react-icons/io';
import Likes from './Likes';
import Modal from './Modal';
import Setting from './Setting';

const UserInfo = () => {
  const [followers, setFollowers] = useState(false);
  const [follwing, setFollowing] = useState(false);
  const [setting, setSetting] = useState(false);
  return (
    <>
      <div className='user-info'>
        <div>
          <img
            src='https://images.unsplash.com/photo-1661961111184-11317b40adb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80'
            alt=''
            className='user-info__img'
          />
          <p className='user-info__name-sm'>asim basheer</p>
        </div>

        <div className='user-info__box'>
          <div className='user-info__actions'>
            <span>asim basheer alabtah</span>
            <a href='/account/edit/12'>Edit profile</a>
            <div className='user-info__icon' onClick={() => setSetting(true)}>
              <IoIosSettings />
            </div>
          </div>
          <div className='user-info__details'>
            <p>
              <strong>4</strong> posts
            </p>
            <p onClick={() => setFollowers(true)}>
              <strong>117</strong> followers
            </p>
            <p onClick={() => setFollowing(true)}>
              <strong>117</strong> following
            </p>
          </div>
          <p className='user-info__name'>asim basheer</p>
        </div>
      </div>

      <div className='user-actions'>
        <div className='user-actions__item'>
          <span>4</span>
          <span>posts</span>
        </div>
        <div className='user-actions__item' onClick={() => setFollowers(true)}>
          <span>177</span>
          <span>followers</span>
        </div>
        <div className='user-actions__item' onClick={() => setFollowing(true)}>
          <span>255</span>
          <span>following</span>
        </div>
      </div>

      <Modal setHandler={setFollowers} status={followers}>
        <Likes head='flowers' />
      </Modal>
      <Modal setHandler={setFollowing} status={follwing}>
        <Likes head='follwing' />
      </Modal>

      <Modal setHandler={setSetting} status={setting}>
        <Setting />
      </Modal>
    </>
  );
};

export default UserInfo;
