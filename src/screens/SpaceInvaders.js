import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import CountdownTimer from '../components/CountdownTimer';
import EndGame from '../components/EndGame';
import Meta from '../components/Meta';

const SpaceInvaders = ({ history }) => {
  const [preparedForEndScreen, setPreparedForEndScreen] = useState(false);
  const [end, setEnd] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [score, setScore] = useState(0);

  //timer
  const timerLeft = useRef(null);
  const intervalLeft = useRef(null);
  const difficulty = useRef(2500);

  const { userInfo } = useSelector((state) => state.userLogin);
  const { gameTickets } = useSelector((state) => state.userGameTickets);

  useEffect(() => {
    let animationId;
    if (!userInfo) history.push('/login');
    else {
      if (playing) {
        //timer
        if (!timerLeft.current) {
          const idTimeout = setTimeout(() => {
            setEnd(true);
          }, 300000);
          timerLeft.current = idTimeout; //useRef for clearing timeout on unmount
        }

        //game
        const canvas = document.querySelector('canvas');
        const c = canvas.getContext('2d');
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

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
            c.fill();
          }
        }
        class Projectile {
          constructor(x, y, radius, color, velocity) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.color = color;
            this.velocity = velocity;
          }
          draw() {
            c.beginPath();
            c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            c.fillStyle = this.color;
            c.fill();
          }
          update() {
            this.draw();
            this.x = this.x + this.velocity.x;
            this.y = this.y + this.velocity.y;
          }
        }
        class Enemy {
          constructor(x, y, radius, color, velocity) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.color = color;
            this.velocity = velocity;
          }
          draw() {
            c.beginPath();
            c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            c.fillStyle = this.color;
            c.fill();
          }
          update() {
            this.draw();
            this.x = this.x + this.velocity.x;
            this.y = this.y + this.velocity.y;
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
            this.y = this.y + this.velocity.y;
            this.alpha -= 0.01;
          }
        }
        //class class class class class class class class class class class
        //class class class class class class class class class class class
        //class class class class class class class class class class class
        const w = canvas.width / 2;
        const h = canvas.height / 2;

        const player = new Player(w, h, 20, 'white');
        let projectiles = [];
        let particles = [];
        let enemies = [];

        //spawn enemies spawn enemies spawn enemies
        function spawnEnimies() {
          let round = 1;
          const levelUp = difficulty.current === 1700 ? 7 : 10;
          const maxLevel = difficulty.current === 1700 ? 600 : 1000;
          const intervalId = () => {
            if (!end) {
              round++;
              const radius = Math.random() * (70 - 10) + 10;
              let x, y, velocityRandomized;
              if (Math.random() < 0.5) {
                x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
                y = Math.random() * canvas.height;
              } else {
                x = Math.random() * canvas.width;
                y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
              }
              const color = `hsl(${Math.random() * 360}, 50%, 50%)`;
              const angle = Math.atan2(h - y, w - x);

              if (radius < 25) velocityRandomized = Math.random() + 2.3;
              else if (radius < 50) velocityRandomized = Math.random() + 0.7;
              else velocityRandomized = 0.5;
              const velocity = {
                x: Math.cos(angle) * velocityRandomized,
                y: Math.sin(angle) * velocityRandomized,
              };
              enemies.push(new Enemy(x, y, radius, color, velocity));
              const timeoutId = setTimeout(
                intervalId,
                difficulty.current - round * levelUp > maxLevel
                  ? difficulty.current - round * levelUp
                  : maxLevel
              );
              intervalLeft.current = timeoutId;
            }
          };
          setTimeout(intervalId, 500);
        }

        //animate animate animate animate animate animate animate animate
        const animate = () => {
          animationId = requestAnimationFrame(animate);
          c.fillStyle = 'rgba(0, 0, 0, 0.3)';
          c.fillRect(0, 0, canvas.width, canvas.height);
          player.draw();
          particles.forEach((particle, iParticle) => {
            if (particle.alpha <= 0) {
              particles.splice(iParticle, 1);
            } else {
              particle.update();
            }
          });

          //loop through each projectile to see if it's out of screen
          projectiles.forEach((projectile, iProjectile) => {
            projectile.update();
            if (
              projectile.x + projectile.radius < 0 ||
              projectile.x - projectile.radius > canvas.width ||
              projectile.y + projectile.radius > canvas.height ||
              projectile.y - projectile.radius < 0
            ) {
              setTimeout(() => {
                projectiles.splice(iProjectile, 1);
              }, 0);
            }
          });

          //loop through each enemy
          enemies.forEach((enemy, iEnemy) => {
            enemy.update();
            const distance = Math.hypot(player.x - enemy.x, player.y - enemy.y);

            //player collided with enemies
            if (distance - enemy.radius - player.radius < 1) {
              for (let i = 0; i < 400; i++) {
                particles.push(
                  new Particle(
                    player.x,
                    player.y,
                    Math.random() * 4,
                    enemy.color,
                    {
                      x: (Math.random() - 0.5) * Math.random() * 15,
                      y: (Math.random() - 0.5) * Math.random() * 15,
                    }
                  )
                );
              }
              enemies.splice(iEnemy, 1);
              if (!preparedForEndScreen) {
                setPreparedForEndScreen(true);
                clearInterval(intervalLeft.current);
                setTimeout(() => {
                  if (animationId) cancelAnimationFrame(animationId);
                  setEnd(true);
                }, 1500);
              }
            }

            //for each enemy, loop through projectiles to see if there's collision
            projectiles.forEach((projectile, iProjectile) => {
              //distance
              const distance = Math.hypot(
                projectile.x - enemy.x,
                projectile.y - enemy.y
              );
              //collision detected
              if (distance - enemy.radius - projectile.radius < 1) {
                //particles explosion
                for (let i = 0; i < enemy.radius; i++) {
                  particles.push(
                    new Particle(
                      projectile.x,
                      projectile.y,
                      Math.random() * 2,
                      enemy.color,
                      {
                        x: (Math.random() - 0.5) * Math.random() * 12,
                        y: (Math.random() - 0.5) * Math.random() * 12,
                      }
                    )
                  );
                }
                //collided
                if (enemy.radius - 10 > 9) {
                  enemy.radius -= 10;
                  setTimeout(() => {
                    projectiles.splice(iProjectile, 1);
                  }, 0);
                } else {
                  setTimeout(() => {
                    enemies.splice(iEnemy, 1);
                    projectiles.splice(iProjectile, 1);
                  }, 0);
                  setScore((currentScore) => currentScore + 1);
                }
              }
            });
          });
        };

        //click listener
        window.addEventListener('click', (e) => {
          const angle = Math.atan2(e.offsetY - h, e.offsetX - w);
          const velocity = {
            x: Math.cos(angle) * 13,
            y: Math.sin(angle) * 13,
          };
          projectiles.push(new Projectile(w, h, 9, 'white', velocity));
        });

        spawnEnimies();
        animate();
      }
      return () => {
        if (animationId) cancelAnimationFrame(animationId);
      };
    }
    return () => {
      clearTimeout(timerLeft.current);
    };
  }, [playing, userInfo]);

  const playHandler = () => {
    document.querySelector('.playButton').classList.add('playButtonPressed');
    setTimeout(() => {
      setPlaying(true);
    }, 1000);
  };
  return (
    <div className='h-screen container mx-auto'>
      <Meta
        title='Space Invaders'
        description='Leo English Quiz App for Kids | Space Invaders Game'
      />
      {!playing ? (
        <div className='w-full h-screen flex flex-col justify-center items-center'>
          {gameTickets >= 2 || (userInfo && userInfo.role) !== 'student' ? (
            <button
              className='playButton bg-lime-600 hover:bg-lime-700'
              onClick={playHandler}
            >
              Play <i className='ml-3 fas fa-play' />
            </button>
          ) : (
            <button className='playButton bg-lime-600 bg-opacity-40' disabled>
              Play <i className='ml-3 fas fa-play' />
            </button>
          )}
          <div className='mt-4 flex flex-col'>
            <label className='preferences text-lime-800 dark:text-lime-50'>
              <input
                type='radio'
                className='form-radio w-4 h-4 md:w-7 md:h-7'
                name='preference'
                value='2500'
                onChange={(e) => (difficulty.current = e.target.value)}
              />
              <span className='ml-2'>Easy</span>
            </label>
            <label className='preferences text-lime-800 dark:text-lime-50 mt-2'>
              <input
                type='radio'
                className='form-radio w-4 h-4 md:w-7 md:h-7'
                name='preference'
                value='1700'
                onChange={(e) => (difficulty.current = e.target.value)}
              />
              <span className='ml-2'>Hard</span>
            </label>
          </div>
          <div className='text-base md:text-lg text-lime-800 dark:text-lime-50 mt-5 text-center'>
            You have {Math.floor(gameTickets / 2)}{' '}
            <strong className='font-bold'>Game Ticket(s)</strong> to play this
            Game
          </div>
          <div className='text-base md:text-lg text-lime-800 dark:text-lime-50 text-center'>
            Get 1 <strong className='font-bold'>Game Ticket</strong> by doing 2
            Quizzes
          </div>
          <div className='mt-3 text-xs text-lime-800 dark:text-lime-50 text-center'>
            All credit to @Christopher Lis
          </div>
        </div>
      ) : end ? (
        <EndGame
          title={'Congratulations!'}
          message='Very cool! Do some more Quizzes for more Tickets to play this game'
          history={history}
          score={score}
          color='lime'
          game={true}
        />
      ) : (
        <>
          <div className='w-full h-4/5 mt-1 select-none'>
            <canvas className='w-full h-full rounded-3xl px-1 overflow-hidden'></canvas>
          </div>
          <div className='flex justify-between mt-3 mx-1 select-none'>
            <div className='text-left italic font-mono text-base lg:text-lg font-bold w-1/2 text-lime-800 dark:text-lime-50'>
              Your Score: {score > 9 ? score : '0' + score}
            </div>

            {
              <div className='w-1/2'>
                <CountdownTimer
                  color='lime'
                  initialMinute={4}
                  initialSeconds={0}
                />
              </div>
            }
          </div>
        </>
      )}
    </div>
  );
};

export default SpaceInvaders;
