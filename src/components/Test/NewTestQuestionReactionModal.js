import React from 'react';
import Modal from '../Modal';
import { useForm } from 'react-hook-form';

const NewTestQuestionReactionModal = ({
  isShow,
  closeModal,
  questions,
  setQuestions,
  setChanged,
}) => {
  const { register, handleSubmit, reset } = useForm();
  const postReactionHandler = (data) => {
    if (window.confirm(`Are you sure to post this question?`)) {
      setQuestions([
        ...questions,
        {
          question: data.question,
          correct_answer: data.correct_answer,
          incorrect_answers: [
            {
              incorrect_answer: data.incorrect_answer,
            },
          ],
        },
      ]);
      reset();
      setChanged(true);
      closeModal();
    }
  };

  return (
    <Modal show={isShow} onClose={closeModal}>
      <div className='py-3 text-xl font-bold text-left text-red-900 dark:text-purple-800 lg:text-2xl'>
        Add a new Question
      </div>
      <form
        className='flex flex-col w-full pt-4 pb-8 bg-white rounded-b-2xl'
        onSubmit={handleSubmit(postReactionHandler)}
      >
        <label className='labelFieldAboutYou'>Question</label>
        <input
          className='fieldAboutYou'
          name='question'
          type='text'
          autoComplete='off'
          required
          ref={register}
        />

        <label className='labelFieldAboutYou'>Correct answer</label>
        <input
          className='fieldAboutYou '
          name='correct_answer'
          type='text'
          autoComplete='off'
          required
          ref={register}
        />
        <label className='labelFieldAboutYou'>Incorrect answer</label>
        <input
          className='fieldAboutYou '
          name='incorrect_answer'
          type='text'
          autoComplete='off'
          required
          ref={register}
        />
        <div className='flex items-center justify-between mt-5 outline-none'>
          <button className='buttonAboutYou' type='submit'>
            Add question
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default NewTestQuestionReactionModal;
