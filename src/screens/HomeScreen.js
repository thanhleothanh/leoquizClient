import React, { useEffect, useState } from 'react';
import { useTransition, animated } from 'react-spring';
import { useSelector, useDispatch } from 'react-redux';
import QuizCard from './../components/QuizCard';
import Meta from './../components/Meta';
import Message from './../components/Message';
import Loader from './../components/Loader';
import Alert from './../components/Alert';
import { getActiveTests } from '../actions/testActions';
import TestCard from '../components/TestCard';

const HomeScreen = ({ history }) => {
  const [animation] = useState(false);
  const { gameTickets } = useSelector((state) => state.userGameTickets);
  const { userInfo } = useSelector((state) => state.userLogin);
  const {
    activeTests,
    loading: loadingTests,
    error: errorTests,
  } = useSelector((state) => state.activeTests);
  const dispatch = useDispatch();

  //ANIMATION
  const transition = useTransition(animation, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
  });

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
      <div>
        {transition((style) => (
          <animated.div
            style={style}
            className='grid md:grid-cols-2 md:gap-5 lg:gap-9 px-6 sm:px-12 md:px-7 lg:px-20  overflow-auto pb-5'
          >
            <div className='flex flex-col items-center'>
              <div className=' topHeader bg-white rounded-full mt-8 mb-5 select-none'>
                Quizzes
              </div>

              <QuizCard
                title='Reaction Game'
                description='Choose the correct answers as fast as possible'
                image='/images/reactiongame.jpg'
                link='/reactiongame'
                color='purple'
              />
              <QuizCard
                title='Fill In The Blank'
                description='Fill in the blank to answer the quizzes. '
                image='/images/fillintheblank.jpg'
                link='/fillintheblank'
                color='indigo'
              />
              <QuizCard
                title='Multiple Choice'
                description='Choose the right answers for the quizzes. '
                image='/images/multiplechoice.jpg'
                link='/multiplechoice'
                color='sky'
              />
              <div className='topHeader bg-white rounded-full mt-8 mb-5 hidden md:inline select-none'>
                <i className='fas fa-info' />
              </div>
              <div className='w-full mt-3'>
                <Message type='info'>
                  You have <i className='fas fa-ticket-alt' />{' '}
                  {Math.floor(gameTickets)} <strong>Game Ticket(s)</strong>
                  <br /> Get 1 <strong>Game Ticket</strong> by finishing 1{' '}
                  <strong>Quizzes</strong>
                </Message>
              </div>
            </div>
            <div className='flex flex-col items-center'>
              <div className=' topHeader bg-white rounded-full mt-8 mb-5 select-none'>
                Games
              </div>
              <QuizCard
                title='Space Invaders'
                description='Play this shooting game! '
                image='/images/spaceinvaders.png'
                link='/spaceinvaders'
                color='lime'
              />
              <QuizCard
                title='Free Fall'
                description='Keep the ball falling! '
                image='/images/freefall.png'
                link='/freefall'
                color='emerald'
              />
              <div className=' topHeader bg-white rounded-full mt-8 mb-5 select-none'>
                Tests |{' '}
                <i
                  className='fas fa-redo-alt hover:text-orange-400 dark:hover:text-purple-400'
                  onClick={() => dispatch(getActiveTests())}
                />
              </div>
              <div className='w-full'>
                {loadingTests ? (
                  <Loader
                    className='mt-3'
                    loader={Math.floor(Math.random() * 10 + 1)}
                    color={Math.floor(Math.random() * 10 + 1)}
                  />
                ) : errorTests ? (
                  <Alert className='mt-3'>{errorTests}</Alert>
                ) : (
                  <>
                    {activeTests && activeTests.length === 0 ? (
                      <Message type='info' className='mt-3'>
                        There is no test from any teacher on the schedule!
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
          </animated.div>
        ))}
      </div>
    </>
  );
};

export default HomeScreen;
