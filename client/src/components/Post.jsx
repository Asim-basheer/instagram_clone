import { useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { BsThreeDots } from 'react-icons/bs';
import { BiMessageRounded } from 'react-icons/bi';
import { HiOutlineEmojiHappy } from 'react-icons/hi';
import Modal from './Modal';
import DetailsPost from './DetailsPost';
import Likes from './Likes';
const Post = () => {
  const [editModal, setEditModal] = useState(false);
  const [likeModal, setLikeModal] = useState(false);
  return (
    <>
      <div className='post border'>
        <div className='post__head'>
          <div className='post__user-info'>
            <img
              src='https://images.unsplash.com/photo-1661961111184-11317b40adb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80'
              alt=''
              className='post__user-img img-fluid'
            />
            <span className='post__username'>asim basheer</span>
          </div>
          <div
            className='post__icon post__icon--dots'
            onClick={() => setEditModal(true)}
          >
            <BsThreeDots />
          </div>
        </div>
        <div className='post__body'>
          <img
            src='https://images.unsplash.com/photo-1661961111184-11317b40adb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80'
            alt=''
            className='post__post-img img-fluid'
          />
        </div>
        <div className='post__actions'>
          <div className='post__icon'>
            <AiOutlineHeart />
          </div>
          <div className='post__icon'>
            <BiMessageRounded />
          </div>
        </div>
        <div className='post__like' onClick={() => setLikeModal(true)}>
          96 likes
        </div>
        <p className='post__caption'>
          <span>asim basheer</span> Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Beatae ad in unde architecto temporibus suscipit
          provident iusto nostrum modi vel distinctio libero sed, cum debitis
          magnam assumenda omnis dolores dignissimos non nesciunt vitae,
          voluptatum quibusdam? At ipsa earum assumenda dolorem?
        </p>
        <div className='post__comments'>View all 3 comments</div>
        <p className='post__date'>2 days ago</p>
        <div className='post__add-comment'>
          <div className='post__icon'>
            <HiOutlineEmojiHappy />
          </div>
          <div className='post__input-box'>
            <input
              type='text'
              className='post__input'
              placeholder='add a comment'
            />
          </div>
          <button className='post__btn'>post</button>
        </div>
      </div>

      <Modal setHandler={setEditModal} status={editModal}>
        <DetailsPost />
      </Modal>

      <Modal setHandler={setLikeModal} status={likeModal}>
        <Likes head='likes' />
      </Modal>
    </>
  );
};

export default Post;
