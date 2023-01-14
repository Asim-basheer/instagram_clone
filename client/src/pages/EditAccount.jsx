import EditBar from '../components/EditBar';

const EditAccount = () => {
  return (
    <div className='content'>
      <div className='account-page border background--other text pages'>
        <EditBar />
        <div className='edit-profile'>
          <div className='edit-profile__user'>user</div>

          <form className='edit-profile__form'>
            <div className='edit-profile__input-box'>
              <label htmlFor='name' className='edit-profile__label'>
                name
              </label>
              <input type='text' className='edit-profile__input' id='name' />
            </div>
            <div className='edit-profile__input-box'>
              <label htmlFor='name' className='edit-profile__label'>
                username
              </label>
              <input
                type='text'
                className='edit-profile__input'
                id='username'
              />
            </div>
            <div className='edit-profile__input-box'>
              <label htmlFor='name' className='edit-profile__label'>
                email
              </label>
              <input type='text' className='edit-profile__input' id='email' />
            </div>
            <div className='edit-profile__input-box'>
              <label htmlFor='bio' className='edit-profile__label'>
                bio
              </label>
              <textarea id='bio' rows='10'></textarea>
            </div>
            <div className='edit-profile__input-box'>
              <label htmlFor='name' className='edit-profile__label'>
                gender
              </label>
              <select id='name'>
                <option value='male'>male</option>
                <option value='female'>female</option>
              </select>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditAccount;
