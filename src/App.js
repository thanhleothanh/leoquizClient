import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Loader from './components/Loader';

const WelcomeScreen = lazy(() => import('./screens/WelcomeScreen'));
const HomeScreen = lazy(() => import('./screens/HomeScreen'));
const LoginScreen = lazy(() => import('./screens/LoginScreen'));
const SignupScreen = lazy(() => import('./screens/SignupScreen'));
const Scoreboard = lazy(() => import('./screens/Scoreboard'));
const ProfileScreen = lazy(() => import('./screens/ProfileScreen'));
const TeacherScreen = lazy(() => import('./screens/TeacherScreen'));
const ReactionGame = lazy(() => import('./screens/ReactionGame'));
const MultipleChoice = lazy(() => import('./screens/MultipleChoice'));
const FillInTheBlank = lazy(() => import('./screens/FillInTheBlank'));
const SpaceInvaders = lazy(() => import('./screens/SpaceInvaders'));
const FreeFall = lazy(() => import('./screens/FreeFall'));

const App = () => {
  return (
    <Router basename='/'>
      <div
        className='relative'
        style={{ WebkitTapHighlightColor: 'transparent' }}
      >
        {localStorage.theme === 'dark' ||
        (!('theme' in localStorage) &&
          window.matchMedia('(prefers-color-scheme: dark)').matches) ? (
          <meta name='theme-color' content='#0e6990' />
        ) : (
          <meta name='theme-color' content='#ab113c' />
        )}
        <Header />
        <main className='h-auto min-h-screen pt-14 md:pt-16'>
          <Suspense
            fallback={
              <div className='h-screen w-full flex justify-center items-center'>
                <Loader
                  loader={Math.floor(Math.random() * 10) + 1}
                  color={Math.floor(Math.random() * 10) + 1}
                />
              </div>
            }
          >
            <Route path='/home' component={HomeScreen} />
            <Route path='/login' component={LoginScreen} />
            <Route path='/signup' component={SignupScreen} />
            <Route path='/scoreboard' component={Scoreboard} />
            <Route path='/profile' component={ProfileScreen} />
            <Route path='/teacher' component={TeacherScreen} />
            <Route path='/reactiongame' component={ReactionGame} exact />
            <Route path='/multiplechoice' component={MultipleChoice} exact />
            <Route path='/fillintheblank' component={FillInTheBlank} exact />
            <Route path='/spaceinvaders' component={SpaceInvaders} exact />
            <Route path='/freefall' component={FreeFall} exact />
            <Route path='/' component={WelcomeScreen} exact />
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
