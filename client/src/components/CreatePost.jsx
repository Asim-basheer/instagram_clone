import { useContext } from 'react';
import { DarkModeContext } from '../context/darkMoodContext';
import { MdOutlinePhotoSizeSelectActual } from 'react-icons/md';

const CreatePost = () => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={`create-post ${darkMode ? 'dark' : 'light'}`}>
      <h3 className='create-post__heading'>Create new post</h3>

      <div className='create-post__body'>
        <MdOutlinePhotoSizeSelectActual className='create-post__icon' />
        <p className='create-post__text'>Drag photo here</p>
      </div>
    </div>
  );
};

export default CreatePost;
