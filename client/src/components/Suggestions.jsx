const Suggestions = () => {
  return (
    <div className='suggestions'>
      <div className='suggestions__user-info'>
        <img
          src='https://images.unsplash.com/photo-1661961111184-11317b40adb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80'
          alt=''
          className='suggestions__user-info-img'
        />

        <p className='suggestions__container'>
          <span className='suggestions__user-info-fullname'>
            asim basheer alabtah
          </span>
          <span className='suggestions__user-info-username'>asim basheer</span>
        </p>
      </div>
      <div className='suggestions__heading'>
        <p>Suggestions for you</p>
        <a href='/' className='btn btn--secondary'>
          see all
        </a>
      </div>
      <div className='suggestions__users'>
        <div className='suggestions__user'>
          <img
            src='https://images.unsplash.com/photo-1661961111184-11317b40adb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80'
            alt=''
            className='suggestions__user-img'
          />

          <p className='suggestions__container'>
            <span className='suggestions__user-fullname'>
              asim basheer alabtah
            </span>
            <span className='suggestions__user-suggested'>
              Suggested for you
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Suggestions;
