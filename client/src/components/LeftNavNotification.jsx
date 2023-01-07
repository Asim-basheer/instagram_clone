import React from 'react';

const LeftNavNotification = () => {
  return (
    <div className='left-nav-notification'>
      <h1 className='left-nav-search__heading'>notification</h1>

      <div className='left-nav-notification__types'>
        <a
          href='/'
          className='left-nav-notification__type left-nav-notification__type--follow'
        >
          <img
            src='https://images.unsplash.com/photo-1661961111184-11317b40adb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80'
            alt=''
            className='left-nav-notification__user-img'
          />
          <p className='left-nav-notification__message'>
            <span>asim basheer</span>
            <span>started following you</span>
            <span>4d</span>
          </p>
          <button className='left-nav-notification__btn left-nav-notification__btn--follow'>
            follow
          </button>
        </a>
        <a
          href='/'
          className='left-nav-notification__type left-nav-notification__type--follow'
        >
          <img
            src='https://images.unsplash.com/photo-1661961111184-11317b40adb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80'
            alt=''
            className='left-nav-notification__user-img'
          />
          <p className='left-nav-notification__message'>
            <span>asim basheer</span>
            <span>started following you</span>
            <span>4d</span>
          </p>
          <button className='left-nav-notification__btn left-nav-notification__btn--following'>
            following
          </button>
        </a>
        <a href='/' className='left-nav-notification__type'>
          <img
            src='https://images.unsplash.com/photo-1661961111184-11317b40adb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80'
            alt=''
            className='left-nav-notification__user-img'
          />
          <p className='left-nav-notification__message'>
            <span>asim basheer</span>
            <span>started following you</span>
            <span>4d</span>
          </p>
          <img
            src='https://images.unsplash.com/photo-1661961111184-11317b40adb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80'
            alt=''
            className='left-nav-notification__notification-img'
          />
        </a>
      </div>
    </div>
  );
};

export default LeftNavNotification;
