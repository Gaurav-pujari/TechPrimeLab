import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './SideBars.css';
import DashboardIcon from './Dashboard.svg';
import ActiveDashboardIcon from './Dashboard-active.svg'; 
import ProjectListIcon from './Project-list.svg';
import ActiveProjectListIcon from './Project-list-active.svg';
import CreateIcon from './create-project.svg';
import ActiveCreateIcon from './create-project-active.svg';
import LogoutIcon from './Logout.svg'; 

export default function Sidebar() {
  const [activeIcon, setActiveIcon] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath === '/dashboard') setActiveIcon('dashboard');
    else if (currentPath === '/projectlist') setActiveIcon('projectList');
    else if (currentPath === '/create') setActiveIcon('create');
    else setActiveIcon(''); 
  }, [location.pathname]);

  const handleIconClick = (icon, path) => {
    setActiveIcon(icon);
    navigate(path);
  };

  return (
    <> 
      <div className="desktop-sidebar">
        <div className='sidebar'>
          <div className='mb-1 my-5'>
            <img 
              src={activeIcon === 'dashboard' ? ActiveDashboardIcon : DashboardIcon} 
              alt="Dashboard Icon" 
              className='sidebar-icon' 
              onClick={() => handleIconClick('dashboard', '/dashboard')} 
            />
          </div>

          <div className='mb-1 my-5'>
            <img 
              src={activeIcon === 'projectList' ? ActiveProjectListIcon : ProjectListIcon} 
              alt="Project List Icon" 
              className='sidebar-icon' 
              onClick={() => handleIconClick('projectList', '/projectlist')} 
            />
          </div>

          <div className='mb-1 my-5'>
            <img 
              src={activeIcon === 'create' ? ActiveCreateIcon : CreateIcon} 
              alt="Create Icon" 
              className='sidebar-icon' 
              onClick={() => handleIconClick('create', '/create')} 
            />
          </div>
          
          <div className='mb-1 my-5'>
            <img 
              src={LogoutIcon} 
              alt="Logout Icon" 
              className='logout'  
              onClick={() => handleIconClick('logout', '/')} 
            />
          </div>
        </div>
      </div>

      <div className="mobile-sidebar">
        <div className='sidebar'>
          <div className='mb-1 my-5 mx-4'>
            <img 
              src={activeIcon === 'dashboard' ? ActiveDashboardIcon : DashboardIcon} 
              alt="Dashboard Icon" 
              className='sidebar-icon' 
              onClick={() => handleIconClick('dashboard', '/dashboard')} 
            />
          </div>

          <div className='mb-1 my-5 mx-5'>
            <img 
              src={activeIcon === 'create' ? ActiveCreateIcon : CreateIcon} 
              alt="Create Icon" 
              className='sidebar-icon' 
              onClick={() => handleIconClick('create', '/create')} 
            />
          </div>

          <div className='mb-1 my-5 '>
            <img 
              src={activeIcon === 'projectList' ? ActiveProjectListIcon : ProjectListIcon} 
              alt="Project List Icon" 
              className='sidebar-icon' 
              onClick={() => handleIconClick('projectList', '/projectlist')} 
            />
          </div>
          
          <div className='mb-1 my-5'>
            <img 
              src={LogoutIcon} 
              alt="Logout Icon" 
              className='logout'  
              onClick={() => handleIconClick('logout', '/')} 
            />
          </div>
        </div>
      </div>
    </>
  );
}
