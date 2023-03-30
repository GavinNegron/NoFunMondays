export function HamburgerToggle() {
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