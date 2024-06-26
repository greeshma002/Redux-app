import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className='bg-sky-100'>
      <div className='flex justify-between items-center max-w-9xl mx-4 p-5'>
        <Link to='/'>
          <h1 className='font-bold'>REDUX</h1>
        </Link>
        <ul className='flex gap-4'>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/about'>About</Link>
          </li>
          <li>
            {currentUser ? (
              <Link to='/profile'>
                <img
                  src={currentUser.profilePicture}
                  alt='profile'
                  className='h-7 w-7 rounded-full object-cover'
                />
              </Link>
            ) : (
              <Link to='/signin'>Sign In</Link>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
