import React from 'react';
import Modal from '../Modal';
import { useForm } from 'react-hook-form';

const DeleteTestQuestion = ({
  isShow,
  closeModal,
  questions,
  setQuestions,
  setChanged,
}) => {
  const { register, handleSubmit, reset } = useForm();

  const deleteQuestion = (index) => {
    let tempQuestions = questions;
    tempQuestions.splice(index, 1);
    setQuestions([...tempQuestions]);
  };
  const deleteQuestionHandler = (data) => {
    if (window.confirm(`Are you sure to delete question #${data.index}?`)) {
      deleteQuestion(data.index * 1 - 1);
      setChanged(true);
      closeModal();
    }
  };

  return (
    <Modal show={isShow} onClose={closeModal}>
      <div className='py-3 text-xl font-bold text-left text-red-900 dark:text-purple-800 lg:text-2xl'>
        Delete a Question
      </div>
      <form
        className='flex flex-col w-full pt-4 pb-8 bg-white rounded-b-2xl'
        onSubmit={handleSubmit(deleteQuestionHandler)}
      >
        <label className='labelFieldAboutYou'>Question Number</label>
        <input
          className='fieldAboutYou'
          name='index'
          id='index'
          type='number'
          autoComplete='off'
          placeholder='#'
          required
          ref={register}
        />

        <div className='flex items-center justify-between mt-5 outline-none'>
          <button className='buttonAboutYou' type='submit'>
            Delete question
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default DeleteTestQuestion;
