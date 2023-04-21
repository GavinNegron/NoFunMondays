const dashboard = (() => {
    const init = () => {
      if (window.innerWidth < 992) {
        const sidebar = document.querySelector('.sidebar');
        sidebar.classList.add('active');
      }
    };
  
    return {
      init,
    };
  })();
  
  export default dashboard;