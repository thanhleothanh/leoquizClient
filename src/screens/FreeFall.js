import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CountdownTimer from '../components/CountdownTimer';
import EndGame from '../components/EndGame';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import { getQuestions } from './../actions/questionActions';

//shuffle questions fisher-yates
const shuffle = (array) => {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

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
            }, 3500);
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
    <div className='h-auto flex flex-col md:flex-row'>
      <Meta
        title='Free Fall'
        description='Leo English Quiz App for Kids | Free Fall Game'
      />
      {!playing ? (
        <div className='w-full h-screen flex flex-col justify-center items-center'>
          <button
            className='playButton bg-rose-600 hover:bg-rose-700'
            onClick={playHandler}
          >
            Play <i className='ml-3 fas fa-play' />
          </button>
          <div className='text-base md:text-lg text-rose-800 dark:text-rose-50 mt-5 text-center'>
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
            color='rose'
            game={true}
            freegame={true}
          />
        </div>
      ) : (
        <>
          <div className='w-full md:w-2/5 md:h-screen mt-1 select-none'>
            <canvas className='w-full h-96 md:h-4/5 px-1 rounded-3xl overflow-hidden'></canvas>
          </div>
          <div className='w-full md:w-3/5 h-auto bg-backGroundColorLight dark:bg-backGroundColorDark'>
            {loading ? (
              <div className='mt-3'>
                <Loader
                  loader={Math.floor(Math.random() * 10 + 1)}
                  color={Math.floor(Math.random() * 10 + 1)}
                />
              </div>
            ) : (
              <div className='mx-1 md:mx-5 mt-4'>
                <div className='flex justify-center items-center '>
                  <div
                    className='text-center bg-backGroundColorLight dark:bg-backGroundColorDark text-xl lg:text-2xl italic font-sans font-bold text-rose-900 dark:text-rose-50 shadow-md rounded-lg py-2 px-4'
                    id='question'
                  >
                    {question.current < maxQuestion.current &&
                      maxQuestion.current !== 0 &&
                      questions[question.current] &&
                      questions[question.current].question}
                  </div>
                </div>

                <div className='mt-4 flex items-center bg-backGroundColorLight dark:bg-backGroundColorDark'>
                  <div className='flex-1 max-w-2xl mx-auto'>
                    <ul className='grid grid-cols-1 lg:grid-cols-2 gap-1 md:gap-2 question-answer-container'>
                      <li
                        className='answerTilesFreeFall items'
                        id='item-1'
                        onClick={() => clickHandler(1)}
                      >
                        <div id='item-ans-1' className='answersFreeFall'></div>
                      </li>
                      <li
                        className='answerTilesFreeFall items'
                        id='item-2'
                        onClick={() => clickHandler(2)}
                      >
                        <div id='item-ans-2' className='answersFreeFall'></div>
                      </li>
                    </ul>
                    <div className='flex justify-between mt-6'>
                      <div className='text-left italic font-mono lg:text-lg font-bold w-5/12 text-rose-900 dark:text-rose-50'>
                        Your Score:{' '}
                        {score.current > 9
                          ? score.current
                          : '0' + score.current}
                      </div>

                      {timerRun ? (
                        <div className='w-3/12'>
                          <CountdownTimer
                            color='rose'
                            initialMinute={0}
                            initialSeconds={timerRun * 1}
                          />
                        </div>
                      ) : (
                        <div className='bg-rose-700 text-center lg:text-lg font-bold italic font-sans text-white px-2 py-2 rounded-full'>
                          {answered.current}
                        </div>
                      )}
                      <div className='text-right italic font-mono lg:text-lg font-bold w-5/12 text-rose-900 dark:text-rose-50'>
                        Question: {question.current + 1}/{maxQuestion.current}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default FreeFall;
