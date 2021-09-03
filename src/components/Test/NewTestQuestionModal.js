import React from 'react';
import Modal from '../Modal';
import { useForm } from 'react-hook-form';

const NewTestQuestionModal = ({
  isShow,
  closeModal,
  questions,
  setQuestions,
  setChanged,
}) => {
  const { register, handleSubmit, reset } = useForm();
  const postFillinblankHandler = (data) => {
    if (
      window.confirm(
        `Are you sure to post this question, check the information again please?`
      )
    ) {
      setQuestions([
        ...questions,
        {
          question: data.question,
          question_image: data.question_image,
          correct_answer: data.correct_answer,
          incorrect_answers: [
            {
              incorrect_answer: data.incorrect_answer1,
            },
            {
              incorrect_answer: data.incorrect_answer2,
            },
            {
              incorrect_answer: data.incorrect_answer3,
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
        onSubmit={handleSubmit(postFillinblankHandler)}
      >
        <label className='labelFieldAboutYou'>Question</label>
        <input
          className='fieldAboutYou'
          name='question'
          id='question'
          type='text'
          autoComplete='off'
          required
          ref={register}
        />

        <label className='labelFieldAboutYou'>
          Question's Image (use Google Images' URL only),
        </label>
        <input
          className='fieldAboutYou'
          name='question_image'
          id='question_image'
          type='text'
          autoComplete='off'
          ref={register}
        />

        <label className='mt-1 labelFieldAboutYou'>CORRECT ANSWER</label>
        <input
          className='fieldAboutYou '
          name='correct_answer'
          id='correct_answer'
          type='text'
          autoComplete='off'
          required
          ref={register}
        />

        <label className='labelFieldAboutYou'>Incorrect answer 1</label>
        <input
          className='fieldAboutYou '
          name='incorrect_answer1'
          id='incorrect_answer1'
          type='text'
          autoComplete='off'
          required
          ref={register}
        />
        <label className='labelFieldAboutYou'>Incorrect answer 2</label>
        <input
          className='fieldAboutYou '
          name='incorrect_answer2'
          id='incorrect_answer2'
          type='text'
          autoComplete='off'
          required
          ref={register}
        />
        <label className='labelFieldAboutYou'>Incorrect answer 3</label>
        <input
          className='fieldAboutYou '
          name='incorrect_answer3'
          id='incorrect_answer3'
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

export default NewTestQuestionModal;
