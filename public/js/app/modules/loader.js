const loader = (() => {
    const init = () => {
        //Set min-height of MAIN
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const footerHeight = document.querySelector('.footer').offsetHeight;
        const main = document.querySelector('.main');
        console.log(footerHeight, navbarHeight)
        main.style.minHeight = `calc(100vh - ${navbarHeight}px - ${footerHeight}px)`;
    };
  
    return {
      init,
    };
  })();
  
  export default loader;