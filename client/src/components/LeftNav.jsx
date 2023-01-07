import { useContext, useState } from 'react';
import { DarkModeContext } from '../context/darkMoodContext';
import { IoIosCloseCircle } from 'react-icons/io';

import { MdHome } from 'react-icons/md';
import { HiMenu, HiOutlineSearch } from 'react-icons/hi';
import { FaUserCircle } from 'react-icons/fa';
import {
  AiFillSetting,
  AiOutlineHeart,
  AiOutlineInstagram,
} from 'react-icons/ai';
import { BsPlusSquare, BsMoon } from 'react-icons/bs';
import instagramTextLogo from '../images/insta_logo_text.png';
import instagramTextLogoDark from '../images/insta_logo_text_dark.png';
import LeftNavSearch from './LeftNavSearch';
import LeftNavNotification from './LeftNavNotification';
import Modal from './Modal';
import CreatePost from './CreatePost';
import LeftNavPopLeft from './LeftNavPopLeft';

const LeftNav = () => {
  const { darkMode, toggle } = useContext(DarkModeContext);
  const [notificationToggle, setNotificationToggle] = useState(false);
  const [searchToggle, setSearchToggle] = useState(false);
  const [menuToggle, setMenuToggle] = useState(false);
  const [createPostToggle, setCreatePostToggle] = useState(false);

  const handleToggle = (type) => {
    if (type === 'notification') {
      setNotificationToggle(!notificationToggle);
      setSearchToggle(false);
    } else if (type === 'search') {
      setSearchToggle(!searchToggle);
      setNotificationToggle(false);
    } else {
      setSearchToggle(false);
      setNotificationToggle(false);
      setMenuToggle(false);
    }
  };
  return (
    <>
      <nav
        className={`left-nav background-other text-other border-right ${
          searchToggle ? 'active' : ''
        } ${notificationToggle ? 'active' : ''}`}
      >
        <div className={`left-nav__container ${darkMode ? 'dark' : 'light'}`}>
          <a href='/' className='left-nav__brand' onClick={handleToggle}>
            {darkMode ? (
              <img
                src={instagramTextLogoDark}
                alt='logo'
                className='left-nav__brand-img'
              />
            ) : (
              <img
                src={instagramTextLogo}
                alt='logo'
                className='left-nav__brand-img'
              />
            )}

            <AiOutlineInstagram className='left-nav__brand-icon' />
          </a>

          <div className='left-nav__links'>
            <div className='left-nav__link' onClick={handleToggle}>
              <MdHome className='left-nav__link-icon' />
              <span className='left-nav__link-text'>home</span>
            </div>
            <div
              className={`left-nav__link ${searchToggle ? 'open' : ''}`}
              onClick={() => handleToggle('search')}
            >
              <HiOutlineSearch
                className={`left-nav__link-icon ${searchToggle ? 'open' : ''}`}
              />
              <span className='left-nav__link-text'>search</span>
            </div>
            <div
              className={`left-nav__link ${notificationToggle ? 'open' : ''}`}
              onClick={() => handleToggle('notification')}
            >
              <AiOutlineHeart
                className={`left-nav__link-icon ${
                  notificationToggle ? 'open' : ''
                }`}
              />
              <span className='left-nav__link-text'>notification</span>
            </div>
            <div
              className='left-nav__link'
              onClick={() => setCreatePostToggle(true)}
            >
              <BsPlusSquare className='left-nav__link-icon' />
              <span className='left-nav__link-text'>create</span>
            </div>
            <a href='/' className='left-nav__link' onClick={handleToggle}>
              <FaUserCircle className='left-nav__link-icon' />
              <span className='left-nav__link-text'>profile</span>
            </a>
          </div>

          <div
            className='left-nav__menu left-nav__link'
            onClick={() => setMenuToggle(!menuToggle)}
          >
            <HiMenu className='left-nav__link-icon' />
            <span className='left-nav__link-text'>more</span>
          </div>
          <div
            className={`left-nav__menu-items   ${darkMode ? 'dark' : 'light'} ${
              menuToggle ? 'active' : ''
            }`}
          >
            <div className='left-nav__menu-item'>
              <span className='left-nav__menu-item-text'>settings</span>
              <AiFillSetting className='left-nav__menu-item-icon' />
            </div>
            <div className='left-nav__menu-item' onClick={toggle}>
              <span className='left-nav__menu-item-text'>
                switch appearance
              </span>
              <BsMoon className='left-nav__menu-item-icon' />
            </div>
            <div className='left-nav__menu-item'>
              <span className='left-nav__menu-item-text'>logout</span>
            </div>
          </div>
        </div>

        <LeftNavPopLeft status={searchToggle}>
          <LeftNavSearch />
        </LeftNavPopLeft>
        <LeftNavPopLeft status={notificationToggle}>
          <LeftNavNotification />
        </LeftNavPopLeft>
      </nav>

      <nav className='small-screen-nav-below border-top background-other text-other'>
        <div className='small-screen-nav-below__links'>
          <a href='/' className='small-screen-nav-below__link'>
            <MdHome className='small-screen-nav-below__icon' />
          </a>
          <div
            className='small-screen-nav-below__link'
            onClick={() => setCreatePostToggle(true)}
          >
            <BsPlusSquare className='small-screen-nav-below__icon' />
          </div>
          <a href='/' className='small-screen-nav-below__link'>
            <FaUserCircle className='small-screen-nav-below__icon' />
          </a>
        </div>
      </nav>

      <nav className='small-screen-nav-above'>
        <div className='small-screen-nav-above__brand'>
          <a href='/'>
            {darkMode ? (
              <img
                src={instagramTextLogoDark}
                alt='logo'
                className='small-screen-nav-above__brand-img'
              />
            ) : (
              <img
                src={instagramTextLogo}
                alt='logo'
                className='small-screen-nav-above__brand-img'
              />
            )}
          </a>
        </div>

        <div className='small-screen-nav-above__actions'>
          <div className='small-screen-nav-above__search-box'>
            <input type='text' className='small-screen-nav-above__input' />
            <HiOutlineSearch className='small-screen-nav-above__icon small-screen-nav-above__icon--search ' />
            <IoIosCloseCircle className='small-screen-nav-above__icon small-screen-nav-above__icon--close ' />
          </div>

          <a href='/'>
            <AiOutlineHeart className='small-screen-nav-above__icon-nav' />
          </a>
        </div>
      </nav>

      {searchToggle && (
        <div className='left-nav__overlay' onClick={handleToggle}></div>
      )}
      {notificationToggle && (
        <div className='left-nav__overlay' onClick={handleToggle}></div>
      )}
      {menuToggle && (
        <div className='left-nav__overlay' onClick={handleToggle}></div>
      )}

      <Modal setHandler={setCreatePostToggle} status={createPostToggle}>
        <CreatePost />
      </Modal>
    </>
  );
};

export default LeftNav;
