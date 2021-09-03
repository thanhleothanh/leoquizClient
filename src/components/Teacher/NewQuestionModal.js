import React from 'react';
import { useDispatch } from 'react-redux';
import { postQuestion } from '../../actions/questionActions';
import Modal from '../Modal';
import { useForm } from 'react-hook-form';

const NewQuestionModal = ({ type, isShow, closeModal }) => {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const postFillinblankHandler = (data) => {
    if (window.confirm(`Are you sure to post this question?`)) {
      dispatch(
        postQuestion({
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
          type,
        })
      );
      reset();
      closeModal();
    }
  };

  return (
    <div>
      <Modal show={isShow} onClose={closeModal}>
        <div className='py-3 text-xl font-bold text-left text-red-900 dark:text-purple-800 lg:text-2xl'>
          Create new{' '}
          {type === 'fillintheblank' ? 'Fill in the blank' : 'Multiple Choice'}{' '}
          question
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
            Question's Image (Copy image address, paste it here),
          </label>
          <input
            className='fieldAboutYou'
            name='question_image'
            id='question_image'
            type='text'
            placeholder='Good to have but not required'
            autoComplete='off'
            ref={register}
          />

          <label className='mt-2 labelFieldAboutYou'>CORRECT ANSWER</label>
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
              Create question
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default NewQuestionModal;
