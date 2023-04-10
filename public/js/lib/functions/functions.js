// HamburgerToggle()
export function HamburgerToggle() 
{
  const dropdown = $(".navbar__dropdown");
  const navbar = $(".navbar");
  const menuIcon = $(".navbar__hamburger-img img");

  $(".navbar__hamburger-img").on("click", function() {
    dropdown.toggleClass("active");
    navbar.toggleClass("active");
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
      await WaitForMs(delay);
      $(eleRef).append(letters[i]);
      i++
  }
  return;
}

// DeleteSentance()
export async function DeleteSentence(eleRef) {
  const sentence = $(eleRef).html();
  const letters = sentence.split("");
  let i = 0;
  while (letters.length > 0) {
      await WaitForMs(100);
      letters.pop();
      $(eleRef).html(letters.join(""));
  }
}

// WaitForMs()
export function WaitForMs(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// TextCarousel()
export async function TextCarousel(carouselList, eleRef) {
  var i = 0;
  while (true) {
      await TypeSentence(carouselList[i], eleRef);
      await WaitForMs(1500);
      await DeleteSentence(eleRef);
      await WaitForMs(500);
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

// GoogleLogin
export function GoogleLogin() {
  const googleBtn = document.getElementById('google-sign-in');

  googleBtn.addEventListener('click', () => {
    document.querySelector('.g_id_signin div[role=button]').click();
  });
}

// MicrosoftLogin
export function MicrosoftLogin() {
  $("#microsoft-sign-in").on("click", function() {
    const msalConfig = {
      auth: {
        clientId: "da5ca64f-e82f-4c83-a0e4-e247f0ffd647",
        authority: "https://login.microsoftonline.com/84eda06a-27ae-43dd-897a-2e010d69813c",
        redirectUri: "http://localhost:3000/dashboard",
      },
    };

    const msalInstance = new msal.PublicClientApplication(msalConfig);
    const authRequest = {
      scopes: ["openid", "profile", "email"],
    };

    msalInstance.loginPopup(authRequest)
      .then((response) => {
        console.log("User logged in:", response);
      })
      .catch((error) => {
        console.error("Login error:", error);
      });
  });
}