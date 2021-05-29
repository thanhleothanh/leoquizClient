import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import QuizCard from './../components/QuizCard';
import Meta from './../components/Meta';
import Message from './../components/Message';
import Loader from './../components/Loader';
import Alert from './../components/Alert';
import { getActiveTests } from '../actions/testActions';
import { activeTestsReducer } from '../reducers/testReducers';

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
    if (!activeTests) dispatch(getActiveTests());
  }, []);

  return (
    <>
      <Meta title='Home' description='Leo English Quiz App for Kids | Home' />
      <div className='grid lg:grid-cols-2 lg:gap-0 container mx-auto overflow-auto pb-5'>
        <div className='flex flex-col items-center mx-6 mt-8'>
          <div className=' topHeader bg-white rounded-full px-6'>Games</div>
          <QuizCard
            title='Space Invaders'
            description='Play this shooting game using the Game Tickets you got from solving Quizzes!'
            pointSystem='+3 pts/correct answer.'
            image='/images/spaceinvaders.png'
            link='/spaceinvaders'
            color='lime'
          />
          <QuizCard
            title='Free Fall'
            description='Answer the questions in time to keep the ball falling as deep as possible!'
            pointSystem='+3 pts/correct answer.'
            image='/images/freefall.png'
            link='/freefall'
            color='rose'
          />
          <div className='w-full mt-8'>
            <Message type='info'>
              You have <i className='fas fa-ticket-alt' />{' '}
              {Math.floor(gameTickets / 2)} <strong>Game Ticket(s)</strong>
              <br /> Get 1 <strong>Game Ticket</strong> by finishing 2{' '}
              <strong>Quizzes</strong>
            </Message>
          </div>
        </div>
        <div className='flex flex-col items-center mx-6 mt-8'>
          <div className=' topHeader bg-white rounded-full px-6'>Quizzes</div>

          <QuizCard
            title='Reaction Game'
            description='Choose the correct answer out of the 2 randomly given answers as fast as possible.'
            pointSystem='+2 pts/correct answer, -1 pt/wrong answer.'
            image='/images/reactiongame.jpg'
            link='/reactiongame'
            color='purple'
          />

          <QuizCard
            title='Multiple Choice'
            description='Choose the right answer out of the 4 given ones.'
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

        <div className='flex flex-col items-center mx-6 mt-8'>
          <div className=' topHeader bg-white rounded-full px-6'>Tests</div>
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
                  <Message type='info' className='mt-8'>
                    There are no Tests from any teacher on the schedule
                  </Message>
                ) : (
                  <>
                    {activeTests &&
                      activeTests.map((test) => {
                        return (
                          <QuizCard
                            key={test._id}
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
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeScreen;
