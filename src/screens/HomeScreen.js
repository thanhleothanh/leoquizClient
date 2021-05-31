import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import QuizCard from './../components/QuizCard';
import Meta from './../components/Meta';
import Message from './../components/Message';
import Loader from './../components/Loader';
import Alert from './../components/Alert';
import { getActiveTests } from '../actions/testActions';
import { activeTestsReducer } from '../reducers/testReducers';
import TestCard from '../components/TestCard';

const HomeScreen = ({ history }) => {
  const { gameTickets } = useSelector((state) => state.userGameTickets);
  const { userInfo } = useSelector((state) => state.userLogin);
  const {
    activeTests,
    loading: loadingTests,
    error: errorTests,
  } = useSelector((state) => state.activeTests);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) history.push('/login');
  }, [userInfo]);

  useEffect(() => {
    dispatch({ type: 'QUESTIONS_RESET' });
    dispatch({ type: 'GET_TEST_RESET' });
    dispatch({ type: 'GET_TEST_RESULT_RESET' });
    if (!activeTests) dispatch(getActiveTests());
  }, []);

  return (
    <>
      <Meta title='Home' description='Leo English Quiz App for Kids | Home' />
      <div className='grid lg:grid-cols-2 lg:gap-0 container mx-auto overflow-auto pb-5'>
        <div className='flex flex-col items-center mx-6'>
          <div className=' topHeader bg-white rounded-full mt-8 mb-5'>
            Quizzes
          </div>

          <QuizCard
            title='Reaction Game'
            description='Choose the correct answer as fast as possible'
            pointSystem='+2 pts/correct answer, -1 pt/wrong answer. '
            image='/images/reactiongame.jpg'
            link='/reactiongame'
            color='purple'
          />

          <QuizCard
            title='Fill In The Blank'
            description='Fill in the blank to answer the questions. '
            pointSystem='+3 pts/correct answer.'
            image='/images/fillintheblank.jpg'
            link='/fillintheblank'
            color='lightBlue'
          />
          <QuizCard
            title='Multiple Choice'
            description='Choose the right answers for the questions. '
            pointSystem='+1 pt/correct answer, -1 pt/wrong answer.'
            image='/images/multiplechoice.jpg'
            link='/multiplechoice'
            color='cyan'
          />
          <div className='topHeader bg-white rounded-full mt-8 mb-5 hidden lg:inline'>
            <i className='fas fa-info' />
          </div>
          <div className='w-full mt-3'>
            <Message type='info'>
              You have <i className='fas fa-ticket-alt' />{' '}
              {Math.floor(gameTickets / 2)} <strong>Game Ticket(s)</strong>
              <br /> Get 1 <strong>Game Ticket</strong> by finishing 2{' '}
              <strong>Quizzes</strong>
            </Message>
          </div>
        </div>
        <div className='flex flex-col items-center mx-6'>
          <div className=' topHeader bg-white rounded-full mt-8 mb-5'>
            Games
          </div>
          <QuizCard
            title='Space Invaders'
            description='Play this shooting game! '
            pointSystem='+3 pts/correct answer.'
            image='/images/spaceinvaders.png'
            link='/spaceinvaders'
            color='lime'
          />
          <QuizCard
            title='Free Fall'
            description='Keep the ball falling! '
            pointSystem='+3 pts/correct answer.'
            image='/images/freefall.png'
            link='/freefall'
            color='emerald'
          />
          <div className=' topHeader bg-white rounded-full mt-8 mb-5'>
            Tests
          </div>
          <div className='w-full'>
            {loadingTests ? (
              <Loader
                className='mt-8'
                loader={Math.floor(Math.random() * 10 + 1)}
                color={Math.floor(Math.random() * 10 + 1)}
              />
            ) : errorTests ? (
              <Alert className='mt-8'>{errorTests}</Alert>
            ) : (
              <>
                {activeTests && activeTests.length === 0 ? (
                  <Message type='info' className='mt-3'>
                    There are no Tests from any teacher on the schedule!
                  </Message>
                ) : (
                  <>
                    {activeTests &&
                      activeTests.map((test) => {
                        return (
                          <TestCard
                            key={test._id}
                            teacher={test.teacher.name}
                            name={test.test_name}
                            description={test.test_description}
                            type={test.type}
                            image={`/images/${test.type}-test.jpg`}
                            link={test._id}
                            color={
                              test.type === 'reactiongame'
                                ? 'yellow'
                                : test.type === 'multiplechoice'
                                ? 'pink'
                                : 'red'
                            }
                          />
                        );
                      })}
                  </>
                )}
              </>
            )}
          </div>
        </div>

        <div className='flex flex-col items-center mx-6'></div>
      </div>
    </>
  );
};

export default HomeScreen;
