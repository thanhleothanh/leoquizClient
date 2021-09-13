import React, { useEffect, useState, useRef } from 'react';
import { useTransition, animated } from 'react-spring';
import { useSelector, useDispatch } from 'react-redux';
import CountdownTimer from '../components/CountdownTimer';
import EndGame from '../components/EndGame';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import { getQuestions } from './../actions/questionActions';
import shuffle from '../utils/shuffleArray';

const FreeFall = ({ history }) => {
  //game related
  const [playing, setPlaying] = useState(false);
  const [over, setOver] = useState(false);
  const [end, setEnd] = useState(false);
  const [next, setNext] = useState(true); //next question
  const [timerRun, setTimerRun] = useState(0);
  //no rerendering
  const playPressed = useRef(false);
  const shuffled = useRef(false); //shuffle question array at the beginning, once
  const timerLeft = useRef(null); //points to the current timer
  const intervalLeft = useRef(null); // animating stars
  const question = useRef(0); // index of the current question
  const maxQuestion = useRef(0); // index of the current question
  const answered = useRef(false);
  const answer1 = useRef(0); // correct answer
  const answer2 = useRef(0); // incorrect answer
  const score = useRef(0); // current score

  //redux stuffs
  const dispatch = useDispatch();
  const { questions, loading, error } = useSelector((state) => state.questions);
  const { userInfo } = useSelector((state) => state.userLogin);

  //ANIMATION
  const transition = useTransition(playing, {
    from: { opacity: 0, y: -200, scale: 0.8 },
    enter: { opacity: 1, y: 0, scale: 1 },
  });

  useEffect(() => {
    if (!userInfo) history.push('/login');
  }, [userInfo]);

  useEffect(() => {
    //REMOVE STATE OF THE PREVIOUS QUESTION
    const remove = () => {
      const allItems = document.querySelectorAll('.items');
      Array.from(allItems).forEach((e) => {
        e.classList.remove('showFreeFall');
        e.classList.remove('wrong');
        e.classList.remove('correct-chosen');
      });
      const allAnswers = document.querySelectorAll('.answers');
      Array.from(allAnswers).forEach((e) => {
        e.innerHTML = '';
      });
    };

    if (playing && !loading && !end && !error) {
      //if pressed PLAY button
      if (!shuffled.current) {
        shuffle(questions);
        maxQuestion.current = questions.length;
        shuffled.current = true;
      }

      if (question.current === questions.length && !loading) {
        setEnd(true);
      } else {
        remove(); //REMOVE STATE OF THE PREVIOUS QUESTION
        let ans1, ans2;
        ans1 = Math.random() < 0.5 ? 1 : 2;
        ans2 = ans1 === 1 ? 2 : 1;
        answer1.current = ans1;
        answer2.current = ans2;

        document.getElementById(`item-${ans1}`).classList.add('showFreeFall');
        document.getElementById(`item-${ans2}`).classList.add('showFreeFall');
        document.getElementById(`item-ans-${ans1}`).innerHTML =
          questions[question.current].correct_answer;
        document.getElementById(`item-ans-${ans2}`).innerHTML =
          questions[question.current].incorrect_answers[0].incorrect_answer;

        const idTimeout = setTimeout(() => {
          answered.current = 'Game Over!';
          setTimerRun(0);
          setOver(true);
        }, 15000);
        timerLeft.current = idTimeout;
        setTimerRun(15);
      }
    }
  }, [next, playing, loading]);

  useEffect(() => {
    let animationId;
    if (playing) {
      //game
      const canvas = document.querySelector('canvas');
      const c = canvas.getContext('2d');
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      let faster = 0.1;

      //class class class class class class class class class class
      //class class class class class class class class class class
      class Player {
        constructor(x, y, radius, color) {
          this.x = x;
          this.y = y;
          this.radius = radius;
          this.color = color;
        }
        draw() {
          c.beginPath();
          c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
          c.fillStyle = this.color;
          if (over) {
            this.y += 7;
          }
          c.fill();
        }
      }
      class Particle {
        constructor(x, y, radius, color, velocity) {
          this.x = x;
          this.y = y;
          this.radius = radius;
          this.color = color;
          this.velocity = velocity;
          this.alpha = 1;
        }
        draw() {
          c.save();
          c.globalAlpha = this.alpha;
          c.beginPath();
          c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
          c.fillStyle = this.color;
          c.fill();
          c.restore();
        }
        update() {
          this.draw();
          this.velocity.x *= 0.99;
          this.velocity.y *= 0.99;
          this.x = this.x + this.velocity.x;
          this.y = this.y + this.velocity.y - 0.5;
          this.alpha -= 0.01;
        }
      }
      class Star {
        constructor(x, y, radius, color, velocity) {
          this.x = x;
          this.y = y;
          this.radius = radius;
          this.color = color;
          this.velocity = velocity;
          this.alpha = 1;
        }
        draw() {
          c.save();
          c.globalAlpha = this.alpha;
          c.beginPath();
          c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
          c.fillStyle = this.color;
          c.fill();
          c.restore();
        }
        update() {
          if (!over) {
            faster += 0.00007;
            this.y -= 8 + faster;
            this.alpha -= 0.003;
          } else {
            this.y -= 1;
          }
          this.draw();
        }
      }
      //class class class class class class class class class class class
      //class class class class class class class class class class class
      const w = canvas.width / 2;
      const h = canvas.height / 4;

      let player = new Player(w, h, 25, 'white');
      let stars = [];
      let particles = [];

      //spawn stars spawn stars spawn stars spawn stars spawn stars spawn stars
      function spawnStars() {
        const intervalId = () => {
          const radius = Math.random() * (4 - 1) + 1;
          const color = `hsl(${Math.random() * 360}, 60%, 60%)`;
          if (!over) {
            stars.push(
              new Star(
                Math.random() * canvas.width,
                canvas.height - 3,
                radius,
                color
              )
            );
            const timeoutId = setTimeout(intervalId, 40);
            intervalLeft.current = timeoutId;
          }
        };
        setTimeout(intervalId, 200);
      }

      //animate animate animate animate animate animate animate animate
      const animate = () => {
        animationId = requestAnimationFrame(animate);
        c.fillStyle = 'rgba(0, 0, 0)';
        c.fillRect(0, 0, canvas.width, canvas.height);
        if (player) {
          player.draw();
          if (
            player.y + player.radius > canvas.height &&
            question.current !== maxQuestion.current - 1
          ) {
            for (let i = 0; i < 500; i++) {
              particles.push(
                new Particle(
                  canvas.width / 2,
                  canvas.height - 20,
                  Math.random() * 3,
                  `hsl(${Math.random() * 360}, 60%, 60%)`,
                  {
                    x: (Math.random() - 0.5) * Math.random() * 15,
                    y: (Math.random() - 0.5) * Math.random() * 15,
                  }
                )
              );
            }
            player = null;
            if (intervalLeft.current !== null)
              clearInterval(intervalLeft.current);
            setTimeout(() => {
              cancelAnimationFrame(animationId);
              setEnd(true);
            }, 2500);
          }
        }
        particles.forEach((particle, iParticle) => {
          if (particle.alpha <= 0) {
            setTimeout(() => {
              particles.splice(iParticle, 1);
            }, 0);
          } else {
            particle.update();
          }
        });
        stars.forEach((star, iStar) => {
          star.update();
          if (
            star.x + star.radius < 0 ||
            star.x - star.radius > canvas.width ||
            star.y + star.radius > canvas.height ||
            star.y - star.radius < 0
          ) {
            setTimeout(() => {
              stars.splice(iStar, 1);
            }, 0);
          }
        });
      };
      spawnStars();
      animate();
    }
    return () => {
      if (timerLeft.current) clearTimeout(timerLeft.current); //clear timeout
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [playing, over]);

  const playHandler = () => {
    if (!playPressed.current) {
      playPressed.current = true;
      dispatch(getQuestions({ type: 'reaction', preference: 'random' }));
      document.querySelector('.playButton').classList.add('playButtonPressed');
      setTimeout(() => {
        setPlaying(true);
      }, 1500);
    }
  };

  const clickHandler = (id) => {
    if (id === answer1.current) {
      clearTimeout(timerLeft.current); //clear timeout
      document
        .getElementById(`item-${answer1.current}`)
        .classList.remove('showFreeFall');
      document
        .getElementById(`item-${answer2.current}`)
        .classList.remove('showFreeFall');
      document.getElementById(`item-${id}`).classList.add('correct-chosen');

      answered.current = 'Very cool!';
      setTimerRun(0);
      if (question.current + 1 === maxQuestion.current) setOver(true);
      setTimeout(() => {
        question.current = question.current + 1;
        score.current = score.current + 2;
        setNext(!next);
      }, 2500);
    } else if (id === answer2.current) {
      clearTimeout(timerLeft.current); //clear timeout
      document
        .getElementById(`item-${answer1.current}`)
        .classList.remove('showFreeFall');
      document
        .getElementById(`item-${answer2.current}`)
        .classList.remove('showFreeFall');
      document.getElementById(`item-${id}`).classList.add('wrong');

      answered.current = 'Game Over!';
      setTimerRun(0);
      setOver(true);
    }
  };
  return (
    <div className='flex flex-col h-auto md:flex-row'>
      <Meta
        title='Free Fall'
        description='Leo English Quiz App for Kids | Free Fall Game'
      />
      {!playing ? (
        <div className='flex flex-col items-center justify-center w-full h-screen'>
          <button
            className='playButton bg-emerald-600 hover:bg-emerald-700'
            onClick={playHandler}
          >
            Play <i className='ml-3 fas fa-play' />
          </button>
          <div className='mt-5 text-base text-center md:text-lg text-emerald-800 dark:text-emerald-50'>
            You can play this game without{' '}
            <strong className='font-bold'>Game Ticket(s)</strong>!
          </div>
        </div>
      ) : end ? (
        <div className='w-full'>
          <EndGame
            title={'Congratulations!'}
            message='Very cool! Do some more Quizzes for more Tickets'
            history={history}
            score={score.current}
            color='emerald'
            game={true}
            freegame={true}
          />
        </div>
      ) : (
        <>
          {transition((style) => (
            <animated.div
              style={style}
              className='container flex flex-col w-full mx-auto md:flex-row'
            >
              <div className='w-full mt-1 select-none md:w-2/5 md:h-screen md:mt-6'>
                <canvas className='w-full px-1 overflow-hidden h-68 md:h-3/4 lg:h-2/3 rounded-3xl'></canvas>
              </div>
              <div className='w-full h-auto md:w-3/5 bg-backGroundColorLight dark:bg-backGroundColorDark'>
                {loading ? (
                  <div className='mt-3'>
                    <Loader
                      loader={Math.floor(Math.random() * 10 + 1)}
                      color={Math.floor(Math.random() * 10 + 1)}
                    />
                  </div>
                ) : (
                  <div className='mx-1 mt-4 md:mx-5'>
                    <div className='flex items-center justify-center '>
                      <div
                        className='px-4 py-2 mt-2 font-sans text-lg italic font-bold text-center rounded-lg shadow-sm bg-backGroundColorLight dark:bg-backGroundColorDark sm:text-xl lg:text-2xl text-emerald-900 dark:text-emerald-50'
                        id='question'
                      >
                        {question.current < maxQuestion.current &&
                          maxQuestion.current !== 0 &&
                          questions[question.current] &&
                          questions[question.current].question}
                      </div>
                    </div>

                    <div className='flex items-center mt-4 bg-backGroundColorLight dark:bg-backGroundColorDark'>
                      <div className='flex-1 max-w-2xl mx-auto'>
                        <ul className='grid grid-cols-1 gap-1 lg:grid-cols-2 md:gap-2 question-answer-container'>
                          <li
                            className='answerTilesFreeFall items'
                            id='item-1'
                            onClick={() => clickHandler(1)}
                          >
                            <div
                              id='item-ans-1'
                              className='answersFreeFall'
                            ></div>
                          </li>
                          <li
                            className='answerTilesFreeFall items'
                            id='item-2'
                            onClick={() => clickHandler(2)}
                          >
                            <div
                              id='item-ans-2'
                              className='answersFreeFall'
                            ></div>
                          </li>
                        </ul>
                        <div className='flex justify-between mt-6'>
                          <div className='w-5/12 font-mono italic font-bold text-left lg:text-lg text-emerald-900 dark:text-emerald-50'>
                            Score:{' '}
                            {score.current > 9
                              ? score.current
                              : '0' + score.current}
                          </div>

                          {
                            timerRun ? (
                              <div className='w-3/12'>
                                <CountdownTimer
                                  color='emerald'
                                  initialMinute={0}
                                  initialSeconds={timerRun * 1}
                                />
                              </div>
                            ) : (
                              <>
                                {answered.current === 'Game Over!' ? (
                                  <div className='px-2 py-2 font-sans italic font-bold text-center text-white bg-red-600 rounded-full lg:text-lg'>
                                    {answered.current}
                                  </div>
                                ) : (
                                  <div className='px-2 py-2 font-sans italic font-bold text-center text-white rounded-full bg-lime-600 lg:text-lg'>
                                    {answered.current}
                                  </div>
                                )}
                              </>
                            )

                            // <div className='px-2 py-2 font-sans italic font-bold text-center text-white rounded-full bg-emerald-700 lg:text-lg'>
                            //   {answered.current}
                            // </div>
                          }
                          <div className='w-5/12 font-mono italic font-bold text-right lg:text-lg text-emerald-900 dark:text-emerald-50'>
                            Quiz: {question.current + 1}/{maxQuestion.current}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </animated.div>
          ))}
        </>
      )}
    </div>
  );
};

export default FreeFall;
