import React from 'react';
import { HiOutlineSearch } from 'react-icons/hi';
import { IoIosCloseCircle } from 'react-icons/io';

const LeftNavSearch = () => {
  return (
    <div>
      <div className='left-nav-search'>
        <h1 className='left-nav-search__heading'>search</h1>

        <div className='left-nav-search__input-container'>
          <input
            type='text'
            name='search'
            placeholder='search'
            className='left-nav-search__input'
          />
          <HiOutlineSearch className='left-nav-search__icon left-nav-search__icon--search' />
          <IoIosCloseCircle className='left-nav-search__icon left-nav-search__icon--close' />
        </div>

        <div className='left-nav-search__results'>
          <div className='left-nav-search__result'>
            <a href='/' className='left-nav-search__user'>
              <img
                src='https://images.unsplash.com/photo-1661961111184-11317b40adb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80'
                alt=''
                className='left-nav-search__user-img'
              />
              <div className='left-nav-search__user-box'>
                <span className='left-nav-search__user-username'>asim</span>
                <span className='left-nav-search__user-fullname'>
                  asim basheer
                </span>
              </div>
            </a>
            <a href='/' className='left-nav-search__user'>
              <img
                src='https://images.unsplash.com/photo-1661961111184-11317b40adb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80'
                alt=''
                className='left-nav-search__user-img'
              />
              <div className='left-nav-search__user-box'>
                <span className='left-nav-search__user-username'>asim</span>
                <span className='left-nav-search__user-fullname'>
                  asim basheer
                </span>
              </div>
            </a>
            <a href='/' className='left-nav-search__user'>
              <img
                src='https://images.unsplash.com/photo-1661961111184-11317b40adb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80'
                alt=''
                className='left-nav-search__user-img'
              />
              <div className='left-nav-search__user-box'>
                <span className='left-nav-search__user-username'>asim</span>
                <span className='left-nav-search__user-fullname'>
                  asim basheer
                </span>
              </div>
            </a>
            <a href='/' className='left-nav-search__user'>
              <img
                src='https://images.unsplash.com/photo-1661961111184-11317b40adb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80'
                alt=''
                className='left-nav-search__user-img'
              />
              <div className='left-nav-search__user-box'>
                <span className='left-nav-search__user-username'>asim</span>
                <span className='left-nav-search__user-fullname'>
                  asim basheer
                </span>
              </div>
            </a>
            <a href='/' className='left-nav-search__user'>
              <img
                src='https://images.unsplash.com/photo-1661961111184-11317b40adb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80'
                alt=''
                className='left-nav-search__user-img'
              />
              <div className='left-nav-search__user-box'>
                <span className='left-nav-search__user-username'>asim</span>
                <span className='left-nav-search__user-fullname'>
                  asim basheer
                </span>
              </div>
            </a>
            <a href='/' className='left-nav-search__user'>
              <img
                src='https://images.unsplash.com/photo-1661961111184-11317b40adb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80'
                alt=''
                className='left-nav-search__user-img'
              />
              <div className='left-nav-search__user-box'>
                <span className='left-nav-search__user-username'>asim</span>
                <span className='left-nav-search__user-fullname'>
                  asim basheer
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftNavSearch;
