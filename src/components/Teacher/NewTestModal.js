import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { postTest } from '../../actions/testActions';
import Modal from '../Modal';
import { useForm } from 'react-hook-form';

const NewTestModal = ({ isShow, closeModal }) => {
  const testType = useRef('');
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const postNewTestHandler = (data) => {
    if (
      window.confirm(
        `Are you sure to create this new test, check the information again please?`
      )
    ) {
      dispatch(
        postTest({
          test_name: data.test_name,
          test_description: data.test_description,
          questions: [],
          type: testType.current,
        })
      );
      testType.current = '';
      reset();
      closeModal();
    }
  };

  return (
    <Modal show={isShow} onClose={closeModal}>
      <div className='py-3 text-xl font-bold text-left text-red-900 dark:text-purple-800 lg:text-2xl'>
        Create a Custom Test
      </div>
      <form
        className='flex flex-col w-full pt-4 pb-8 bg-white rounded-b-2xl'
        onSubmit={handleSubmit(postNewTestHandler)}
      >
        <label className='labelFieldAboutYou'>Test's Name</label>
        <input
          className='fieldAboutYou'
          name='test_name'
          id='test_name'
          type='text'
          autoComplete='off'
          required
          ref={register}
        />

        <label className='labelFieldAboutYou'>Test's Description</label>
        <input
          className='fieldAboutYou'
          name='test_description'
          id='test_description'
          type='text'
          autoComplete='off'
          required
          ref={register}
        />

        <label className='mt-1 labelFieldAboutYou'>Type of the Test</label>
        <label className='text-orange-800 preferences dark:text-purple-800'>
          <input
            type='radio'
            className='w-4 h-4 form-radio md:w-7 md:h-7'
            name='testType'
            value='reactiongame'
            onChange={(e) => (testType.current = e.target.value)}
          />
          <span className='ml-2'>Reaction Game</span>
        </label>
        <label className='mt-2 text-orange-800 preferences dark:text-purple-800'>
          <input
            type='radio'
            className='w-4 h-4 form-radio md:w-7 md:h-7'
            name='testType'
            value='multiplechoice'
            onChange={(e) => (testType.current = e.target.value)}
          />
          <span className='ml-2'>Multiple Choice</span>
        </label>
        <label className='mt-2 text-orange-800 preferences dark:text-purple-800'>
          <input
            type='radio'
            className='w-4 h-4 form-radio md:w-7 md:h-7'
            name='testType'
            value='fillintheblank'
            onChange={(e) => (testType.current = e.target.value)}
          />
          <span className='ml-2'>Fill In The Blank</span>
        </label>

        <div className='flex items-center justify-between mt-5 outline-none'>
          <button className='buttonAboutYou' type='submit'>
            Create test
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default NewTestModal;
