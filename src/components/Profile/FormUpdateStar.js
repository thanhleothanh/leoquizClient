import React from 'react';
import { useDispatch } from 'react-redux';
import { updateStar } from '../../actions/userActions';
import Modal from '../Modal';
import { useForm } from 'react-hook-form';

const FormUpdateStar = ({
  userId,
  userName,
  userClass,
  userStar,
  isShow,
  closeModal,
}) => {
  const { register, handleSubmit } = useForm(); // initialize the hook

  const dispatch = useDispatch();
  const actualUpdateHandler = (data) => {
    if (window.confirm(`Are you sure to update ${userName}?`)) {
      dispatch(updateStar({ star: data.star * 1 }, userId));
      document.getElementById(`star-${userId}`).innerHTML = data.star * 1 + ' ';
      closeModal();
    }
  };

  return (
    <Modal onClose={closeModal} show={isShow}>
      <div className='py-3 text-xl font-bold text-left text-red-800 dark:text-purple-800 lg:text-2xl'>
        Update Student
      </div>
      <form
        className='flex flex-col w-full pt-4 pb-8 bg-white rounded-b-2xl'
        onSubmit={handleSubmit(actualUpdateHandler)}
      >
        <label className='labelFieldAboutYou'>Name</label>
        <input
          className='fieldAboutYou'
          name='name'
          type='text'
          placeholder={`Student's name`}
          defaultValue={userName}
          readOnly
          disabled
        />
        <label className='labelFieldAboutYou'>Class</label>
        <input
          className='fieldAboutYou'
          name='class'
          type='text'
          placeholder={`Student's class`}
          defaultValue={userClass}
          readOnly
          disabled
        />
        <label className='labelFieldAboutYou'>Star</label>
        <input
          className='fieldAboutYou'
          name='star'
          type='number'
          placeholder='Star'
          ref={register}
          defaultValue={userStar}
        />
        <div className='flex items-center justify-between mt-5 outline-none'>
          <button className='buttonAboutYou' type='submit'>
            Update
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default FormUpdateStar;
