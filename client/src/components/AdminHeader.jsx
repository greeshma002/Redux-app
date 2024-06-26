
import React from 'react';
import { Link } from 'react-router-dom';

const AdminHeader = () => {
  return (
    <header className='bg-violet-400' style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', color: '#fff' }}>
      <div className="font-bold text-lg">Admin Dashboard</div>
      <div>
        <Link >REDUX</Link>
      </div>
    </header>
  );
};

export default AdminHeader;
