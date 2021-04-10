import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import QuizCard from './../components/QuizCard';
import Meta from './../components/Meta';
import Message from './../components/Message';

const HomeScreen = ({ history }) => {
  const { gameTickets } = useSelector((state) => state.userGameTickets);
  const { userInfo } = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) history.push('/login');
  }, [userInfo]);

  useEffect(() => {
    dispatch({ type: 'QUESTIONS_RESET' });
  }, []);

  return (
    <>
      <Meta title='Home' description='Leo English Quiz App for Kids | Home' />
      <div className='grid lg:grid-cols-2 gap-8 lg:gap-0 mt-8 container mx-auto overflow-auto'>
        <div className='flex flex-col items-center mx-6'>
          <div className=' topHeader bg-white rounded-full px-6'>Games</div>
          <QuizCard
            title='Free Fall'
            description='Answer the questions in time to keep the ball falling as deep as possible!'
            pointSystem='+3 pts/correct answer.'
            image='/images/freefall.png'
            link='/freefall'
            color='rose'
          />
          <QuizCard
            title='Space Invaders'
            description='Play this shooting game with the Game Tickets you got from solving Quizzes!'
            pointSystem='+3 pts/correct answer.'
            image='/images/spaceinvaders.png'
            link='/spaceinvaders'
            color='lime'
          />
          <div className='w-full mt-8'>
            <Message type='info'>
              You have {Math.floor(gameTickets / 2)}{' '}
              <strong>Game Ticket(s)</strong>.
              <br /> Get 1 <strong>Game Ticket</strong> by finishing 2{' '}
              <strong>Quizzes</strong>
            </Message>
          </div>
        </div>
        <div className='flex flex-col items-center mx-6 mb-5'>
          <div className=' topHeader bg-white rounded-full px-6'>Quizzes</div>

          <QuizCard
            title='Reaction Game'
            description='Choose the right answer out of the 2 randomly given answers as fast as possible. '
            pointSystem='+2 pts/correct answer, -1 pt/wrong answer.'
            image='/images/reactiongame.jpg'
            link='/reactiongame'
            color='purple'
          />

          <QuizCard
            title='Multiple Choice'
            description='Choose the right answer out of the 4 given answers.'
            pointSystem='+1 pt/correct answer, -1 pt/wrong answer.'
            image='/images/multiplechoice.png'
            link='/multiplechoice'
            color='cyan'
          />
          <QuizCard
            title='Fill In The Blank'
            description='Fill in the blank to answer the questions. '
            pointSystem='+3 pts/correct answer.'
            image='/images/fillintheblank.jpg'
            link='/fillintheblank'
            color='teal'
          />
        </div>

        {/* <div className='flex flex-col items-center mx-8  bg-gray-100'>
        <div className='text-xl lg:text-2xl text-red-900 font-bold px-12 py-2 rounded-full shadow-lg bg-gray-50 italic'>
        Test
        </div>
        {loadingTests ? (
          <Loader
          className='py-5'
          loader={Math.floor(Math.random() * 10 + 1)}
          color={Math.floor(Math.random() * 10 + 1)}
          />
          ) : errorTests ? (
            <Alert className='mt-8'>{errorTests}</Alert>
            ) : (
              <>
              {tests && tests.length === 0 ? (
                <Message type='info' className='mt-8'>
                There are no tests from any teacher on the schedule
                </Message>
                ) : (
                  <>
                {tests &&
                  tests.map((test) => {
                    return (
                      <QuizCard
                      title={test.test_name}
                      description={test.test_description}
                      image={`/images/${test.teacher}.jpeg`}
                      link={test._id}
                      color='orange'
                      />
                      );
                    })}
                    </>
                    )}
                    </>
                    )}
                  </div> */}
      </div>
    </>
  );
};

export default HomeScreen;
