// HamburgerToggle()
export function HamburgerToggle() 
{
  const dropdown = $(".navbar__dropdown");
  const menuIcon = $(".navbar__hamburger-img img");

  $(".navbar__hamburger-img").on("click", function() {
    dropdown.toggleClass("active");
    if (dropdown.hasClass("active")) {
      dropdown.fadeIn();
      menuIcon.attr("src", "/img/hamburger-open.png");
    } else {
      dropdown.fadeOut();
      menuIcon.attr("src", "/img/hamburger-icon.png");
    }
  });

  $(window).on('resize', function() {
    if ($(window).width() >= 576) {
      $('.navbar__dropdown').removeClass('active');
      $('.navbar__hamburger-img img').attr('src', '/img/hamburger-icon.png');
    }
  });
}

// SetMainHeight()
export function SetMainHeight()
{
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    const footerHeight = document.querySelector('.footer').offsetHeight;
    const main = document.querySelector('.main');
    main.style.minHeight = `calc(100vh - ${navbarHeight}px - ${footerHeight}px)`;
}

// TypeSentance
export async function TypeSentence(sentence, eleRef, delay = 100) {
  const letters = sentence.split("");
  let i = 0;
  while (i < letters.length) {
      await waitForMs(delay);
      $(eleRef).append(letters[i]);
      i++
  }
  return;
}

// DeleteSentance()
export async function deleteSentence(eleRef) {
  const sentence = $(eleRef).html();
  const letters = sentence.split("");
  let i = 0;
  while (letters.length > 0) {
      await waitForMs(100);
      letters.pop();
      $(eleRef).html(letters.join(""));
  }
}

// WaitForMS()
export function waitForMs(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// TextCarousel()
export async function TextCarousel(carouselList, eleRef) {
  var i = 0;
  while (true) {
      await TypeSentence(carouselList[i], eleRef);
      await waitForMs(1500);
      await deleteSentence(eleRef);
      await waitForMs(500);
      i++
      if (i >= carouselList.length) { i = 0; }
  }
}

// GetParam()
export function GetParam() {
  let urlString = window.location.search;
  let paramString = urlString.split('?')[1];
  let queryString = new URLSearchParams(paramString);
  for (let pair of queryString.entries()) {
      return pair[1];
  }
}