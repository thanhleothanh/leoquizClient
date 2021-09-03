import React from 'react';
import { useDispatch } from 'react-redux';
import { postQuestion } from '../../actions/questionActions';
import Modal from '../Modal';
import { useForm } from 'react-hook-form';

const NewQuestionReactionModal = ({ isShow, closeModal }) => {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const postReactionHandler = (data) => {
    if (window.confirm(`Are you sure to post this question?`)) {
      dispatch(
        postQuestion({
          question: data.question,
          correct_answer: data.correct_answer,
          incorrect_answers: [
            {
              incorrect_answer: data.incorrect_answer,
            },
          ],
          type: 'reaction',
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
          Create new Reaction Game question
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
              Create question
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default NewQuestionReactionModal;
