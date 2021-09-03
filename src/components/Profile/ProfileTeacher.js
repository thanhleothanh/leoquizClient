import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Loader from '../Loader';
import Alert from '../Alert';
import Message from '../Message';
import FormUpdateStar from './FormUpdateStar';

const ProfileTeacher = () => {
  const id = useRef('');
  const name = useRef('');
  const Class = useRef('');
  const star = useRef(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { userInfo } = useSelector((state) => state.userLogin);
  const {
    students,
    loading: loadingStudents,
    error: errorStudents,
    success: successStudents,
  } = useSelector((state) => state.getStudents);

  const updateHandler = (user) => {
    id.current = user._id;
    name.current = user.name;
    Class.current = user.class;
    star.current = user.star;
    setModalIsOpen(true);
  };

  return (
    <>
      <div className='flex justify-center mx-5 text-center'>
        <h2 className='text-xl topHeader lg:text-2xl bg-gray-50 dark:bg-backGroundColorLight rounded-t-2xl'>
          Your Students (Teacher{' '}
          {userInfo &&
            userInfo.name[0].toUpperCase() +
              userInfo.name.slice(1).toLowerCase()}
          )
        </h2>
      </div>
      <div className='flex justify-center mx-1'>
        <table className='w-full table-auto'>
          <thead>
            <tr>
              <th className='w-1/12 py-5 tableHead rounded-tl-2xl'>#</th>
              <th className='w-1/12 py-5 tableHead '>Score</th>
              <th className='w-2/12 py-5 tableHead md:w-3/12 '>Taken</th>
              <th className='w-3/12 py-5 tableHead '>Name</th>
              <th className='w-2/12 py-5 tableHead '>Class</th>
              <th className='w-3/12 py-5 tableHead md:w-3/12 rounded-tr-2xl'>
                Teacher's Star
              </th>
            </tr>
          </thead>
          <tbody>
            {userInfo &&
              successStudents &&
              students &&
              students.length !== 0 &&
              students.map((user, i) => {
                if (user.teacher._id === userInfo._id)
                  return (
                    <tr key={user._id}>
                      <td className='tableCell'>{i + 1}</td>
                      <td className='tableCell'>{user.score}</td>
                      <td className='tableCell'>{user.quizTaken}</td>
                      <td className='break-words tableCell'>
                        {user.name[0].toUpperCase() + user.name.slice(1)}
                      </td>
                      <td className='tableCell'>
                        {user.class[0].toUpperCase() + user.class.slice(1)}
                      </td>
                      <td className='tableCell'>
                        <div className='inline' id={`star-${user._id}`}>
                          {user.star}{' '}
                        </div>
                        <i className='text-yellow-400 fas fa-star dark:text-cyan-400' />
                        <i
                          className='ml-1 text-xl text-orange-600 fas fa-highlighter lg:ml-2 lg:text-2xl hover:text-orange-800 dark:text-purple-600 dark:hover:text-purple-800'
                          onClick={() => updateHandler(user)}
                        />
                      </td>
                    </tr>
                  );
              })}
            <tr>
              <td className='tableCell rounded-bl-2xl'></td>
              <td className='tableCell'></td>
              <td className='tableCell'></td>
              <td className='tableCell'></td>
              <td className='tableCell'></td>
              <td className='tableCell rounded-br-2xl'></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='mt-3'>
        {loadingStudents ? (
          <Loader
            loader={Math.floor(Math.random() * 10 + 1)}
            color={Math.floor(Math.random() * 10 + 1)}
          />
        ) : errorStudents ? (
          <Alert>{errorStudents}</Alert>
        ) : userInfo &&
          successStudents &&
          students &&
          students.findIndex(
            (student) => student.teacher._id === userInfo._id
          ) === -1 ? (
          <Message type='info'>You don't have any student</Message>
        ) : (
          ''
        )}
      </div>
      <FormUpdateStar
        userId={id.current}
        userName={name.current}
        userClass={Class.current}
        userStar={star.current}
        isShow={modalIsOpen}
        closeModal={() => setModalIsOpen(false)}
      />
    </>
  );
};

export default ProfileTeacher;
