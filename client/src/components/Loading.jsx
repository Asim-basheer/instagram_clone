import instagramIcon from '../images/instagram.svg';

const Loading = () => {
  return (
    <div className='loading'>
      <img src={instagramIcon} alt='instagram icon' className='loading__icon' />
    </div>
  );
};

export default Loading;
