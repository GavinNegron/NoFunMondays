const dashboard = (() => {
    const init = () => {
      function sidebarScreenWidth() {
        if (window.innerWidth < 992) 
        {
          const sidebar = document.querySelector('.sidebar');
          sidebar.classList.add('active');
        } else 
        {
          if (window.innerWidth >= 992) 
          {
            const sidebar = document.querySelector('.sidebar');
            sidebar.classList.remove('active');
          }
        }
      }
      sidebarScreenWidth();
      window.addEventListener('resize', sidebarScreenWidth);
    };
  
    return {
      init,
    };
  })();
  
  export default dashboard;