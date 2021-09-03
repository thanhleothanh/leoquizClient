import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updatePassword } from '../../actions/userActions';
import Loader from '../Loader';
import Alert from '../Alert';
import Message from '../Message';
import { useForm } from 'react-hook-form';

const ProfileForm = () => {
  //state
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm(); // initialize the hook
  const { userInfo } = useSelector((state) => state.userLogin);

  const {
    loading: loadingUpdatePassword,
    error: errorUpdatePassword,
    success: successUpdatePassword,
  } = useSelector((state) => state.userUpdatePassword);

  const changePassword = (data) => {
    if (data.newPassword !== data.confirmedNewPassword)
      window.alert('Make sure you confirm your password properly!');
    else if (!loadingUpdatePassword) {
      if (window.confirm('Are you sure to update password?')) {
        dispatch(
          updatePassword({
            currentPassword: data.currentPassword,
            newPassword: data.newPassword,
          })
        );
      }
    }
  };

  return (
    <div className='mx-1'>
      <div className='w-full pt-2 text-xl font-bold text-left text-red-800 shadow-md dark:text-purple-800 lg:text-2xl bg-gray-50 dark:bg-backGroundColorLight rounded-t-2xl pl-7'>
        About You <div className='inline'>👁👄👁</div>
      </div>
      <form
        className='flex flex-col w-full px-8 pt-6 pb-8 mb-3 shadow-sm bg-gray-50 dark:bg-backGroundColorLight rounded-b-2xl'
        onSubmit={handleSubmit(changePassword)}
      >
        <div>
          <label className='labelFieldAboutYou'>Your username</label>
          <input
            className='fieldAboutYou'
            id='username'
            type='text'
            disabled
            readOnly
            placeholder={userInfo.username}
          />
        </div>
        <div className='mt-2'>
          <label className='labelFieldAboutYou'>Your name</label>
          <input
            className='fieldAboutYou'
            id='name'
            type='text'
            disabled
            readOnly
            placeholder={
              userInfo.name[0].toUpperCase() +
              userInfo.name.slice(1).toLowerCase()
            }
          />
        </div>
        <div className='mt-2'>
          <label className='labelFieldAboutYou'>Your class</label>
          <input
            className='fieldAboutYou'
            id='class'
            type='text'
            disabled
            readOnly
            placeholder={
              userInfo.class[0].toUpperCase() +
              userInfo.class.slice(1).toLowerCase()
            }
          />
        </div>
        <div className='mt-2'>
          <label className='labelFieldAboutYou'>Total score</label>
          <input
            className='fieldAboutYou'
            id='score'
            type='text'
            disabled
            readOnly
            placeholder={userInfo.score}
          />
        </div>
        <div className='mt-2'>
          <label className='labelFieldAboutYou'>Quiz Taken</label>
          <input
            className='fieldAboutYou'
            id='quizTaken'
            type='text'
            disabled
            readOnly
            placeholder={userInfo.quizTaken}
          />
        </div>
        <div className='mt-2'>
          <label className='labelFieldAboutYou'>Password</label>
          <input
            className='fieldAboutYou'
            name='currentPassword'
            type='password'
            required
            placeholder='Current password'
            ref={register}
          />
        </div>
        <div className='mt-2'>
          <label className='labelFieldAboutYou'>New password</label>
          <input
            className='fieldAboutYou'
            name='newPassword'
            type='password'
            required
            placeholder='New password'
            ref={register}
          />
        </div>
        <div className='mt-2'>
          <label className='labelFieldAboutYou'>
            Confirm your new password
          </label>
          <input
            className='fieldAboutYou'
            name='confirmedNewPassword'
            type='password'
            required
            placeholder='Confirm password'
            ref={register}
          />
        </div>
        <div className='flex items-center justify-between mt-5 outline-none'>
          <button className='buttonAboutYou' type='submit'>
            Change Password
          </button>
        </div>
        <div>
          {loadingUpdatePassword ? (
            <Loader
              className='mt-5'
              loader={Math.floor(Math.random() * 10 + 1)}
              color={Math.floor(Math.random() * 10 + 1)}
            />
          ) : errorUpdatePassword ? (
            <Alert className='mt-4'>{errorUpdatePassword}</Alert>
          ) : (
            successUpdatePassword && (
              <Message className='mt-4' type='success'>
                Password Updated Recently
              </Message>
            )
          )}
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
