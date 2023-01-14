import { AiOutlineClose } from 'react-icons/ai';

const Modal = ({ children, status = false, setHandler, close = null }) => {
  return (
    <div
      className={`modal background-other text-other ${status ? 'active' : ''}`}
    >
      {children}
      <div className='modal__overlay' onClick={() => setHandler(false)}></div>
      {close && (
        <AiOutlineClose
          className='modal__close'
          onClick={() => setHandler(false)}
        />
      )}
    </div>
  );
};

export default Modal;
