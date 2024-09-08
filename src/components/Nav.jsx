import React, { useEffect } from 'react';

const Nav = () => {
  
  useEffect(() => {
    const menuUI = document.getElementById('openEditor');
    const closeUI = document.getElementById('closebtn');

    if (menuUI && closeUI) {  // Check if the elements exist before adding event listeners
      menuUI.addEventListener('mousedown', openNav);
      closeUI.addEventListener('mousedown', closeNav);
    }

    // Cleanup event listeners when component unmounts
    return () => {
      if (menuUI && closeUI) {
        menuUI.removeEventListener('mousedown', openNav);
        closeUI.removeEventListener('mousedown', closeNav);
      }
    };
  }, []); // Empty dependency array ensures this runs once when the component mounts

  function openNav() {
    document.getElementById("mySidenav").style.width = "250px";  // Adjust width to what you desire
  }

  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

  return null; // If this component doesn't render anything directly
};

export default Nav;
