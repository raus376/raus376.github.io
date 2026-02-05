// Disable native scroll restoration immediately to prevent browser interference
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

$(document).ready(function () {
  $(window).scroll(function () {
    // sticky navbar on scroll script
    if (this.scrollY > 20) {
      $(".navbar").addClass("sticky");
    } else {
      $(".navbar").removeClass("sticky");
    }

    // scroll-up button show/hide script
    if (this.scrollY > 500) {
      $(".scroll-up-btn").addClass("show");
    } else {
      $(".scroll-up-btn").removeClass("show");
    }
  });

  // slide-up script
  $(".scroll-up-btn").click(function () {
    $("html").animate({ scrollTop: 0 });
    // removing smooth scroll on slide-up button click
    $("html").css("scrollBehavior", "auto");
  });

  $(".navbar .menu li a").click(function () {
    // applying again smooth scroll on menu items click
    $("html").css("scrollBehavior", "smooth");
  });

  // toggle menu/navbar script
  $(".menu-btn").click(function () {
    $(".navbar .menu").toggleClass("active");
    $(".menu-btn i").toggleClass("active");
  });

  // typing text animation script
  var typed = new Typed(".typing", {
    strings: [
      "Java Full Stack Developer",
      "Spring Boot Microservices Developer",
      "RESTful API & Backend Engineer",
      "Angular Full Stack Engineer",
      "Building Scalable, Secure, and High-Performance Web Applications"
    ],
    typeSpeed: 90,
    backSpeed: 120,
    loop: true,
  });

  var typed = new Typed(".typing-2", {
    strings: [
      "Java Full Stack Developer",
      "Secure API Developer",
      "AWS & Cloud-Ready Developer",
      "Agile Team Collaborator"
    ],
    typeSpeed: 90,
    backSpeed: 120,
    loop: true,
  });


  // owl carousel script for projects
  $(".project .carousel").owlCarousel({
    margin: 20,
    loop: true,
    autoplay: true,
    autoplayTimeOut: 2000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
        nav: false,
      },
      600: {
        items: 2,
        nav: false,
      },
      1000: {
        items: 3,
        nav: false,
      },
    },
  });

  // owl carousel script for experience - show only 1 card at a time
  $(".experience .carousel").owlCarousel({
    margin: 20,
    loop: true,
    autoplay: true,
    autoplayTimeOut: 4000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
        nav: false,
      },
      600: {
        items: 1,
        nav: false,
      },
      1000: {
        items: 1,
        nav: false,
      },
    },
  });

  // owl carousel script for skills - 6 items
  $(".skills .carousel").owlCarousel({
    margin: 10,
    loop: true,
    autoplay: true,
    autoplayTimeOut: 2000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 2,
        nav: false,
      },
      600: {
        items: 4,
        nav: false,
      },
      1000: {
        items: 6,
        nav: false,
      },
    },
  });

  // owl carousel script for education - 4 items
  $(".services .carousel").owlCarousel({
    margin: 20,
    loop: true,
    autoplay: true,
    autoplayTimeOut: 2000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
        nav: false,
      },
      600: {
        items: 2,
        nav: false,
      },
      1000: {
        items: 4,
        nav: false,
      },
    },
  });

  // owl carousel script for statistics - 6 items
  $("#staticgit .carousel").owlCarousel({
    margin: 20,
    loop: true,
    autoplay: true,
    autoplayTimeOut: 2000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
        nav: false,
      },
      600: {
        items: 3,
        nav: false,
      },
      1000: {
        items: 5,
        nav: false,
      },
    },
  });

  // owl carousel script for awards - 3 items
  $("#awards .carousel").owlCarousel({
    margin: 20,
    loop: true,
    autoplay: true,
    autoplayTimeOut: 2000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
        nav: false,
      },
      600: {
        items: 2,
        nav: false,
      },
      1000: {
        items: 3,
        nav: false,
      },
    },
  });

  // Contact Form AJAX Submission
  const contactForm = document.getElementById("contact-form");
  const emailInput = document.getElementById("email");

  if (emailInput) {
    let hasBeenInteracted = false;

    emailInput.addEventListener("blur", function () {
      if (this.value.trim() !== "") {
        hasBeenInteracted = true;
      }
      validateEmail(this);
    });

    emailInput.addEventListener("input", function () {
      if (hasBeenInteracted) {
        validateEmail(this);
      } else {
        // Just handle border colors while typing if not yet blurred
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (this.value.trim() === "") {
          this.classList.remove("invalid", "valid");
        } else if (emailRegex.test(this.value.trim())) {
          this.classList.remove("invalid");
          this.classList.add("valid");
        }
      }
    });

    function validateEmail(input) {
      const emailValue = input.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (emailValue === "") {
        input.classList.remove("invalid", "valid");
      } else if (emailRegex.test(emailValue)) {
        input.classList.remove("invalid");
        input.classList.add("valid");
      } else {
        input.classList.remove("valid");
        input.classList.add("invalid");
      }
    }
  }

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const emailValue = emailInput.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(emailValue)) {
        showToast("Validation Error: Please provide a valid email.", "error");
        emailInput.classList.add("invalid");
        return;
      }

      const formData = new FormData(this);
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerText;

      submitBtn.innerText = "Processing...";
      submitBtn.disabled = true;

      fetch(this.action, {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
        .then(response => {
          if (response.ok) {
            showToast("Success! Your message has been sent.", "success");
            contactForm.reset();
            emailInput.classList.remove("valid", "invalid");
          } else {
            showToast("Error: Submission failed. Make sure you are using a web server.", "error");
          }
        })
        .catch(error => {
          if (window.location.protocol === 'file:') {
            showToast("Submission Error: AJAX requires a web server. Please open via Live Server.", "error");
          } else {
            showToast("Network Error: Check your connection.", "error");
          }
        })
        .finally(() => {
          submitBtn.innerText = originalBtnText;
          submitBtn.disabled = false;
        });
    });
  }

  function showToast(message, type) {
    const toastContainer = document.getElementById("toast-container");
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;

    const icon = type === "success" ? "fa-check-double" : "fa-shield-alt";

    toast.innerHTML = `
      <div class="toast-content">
        <i class="fas ${icon}"></i>
        <span class="message">${message}</span>
      </div>
      <div class="progress"></div>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("fade-out");
      setTimeout(() => {
        toast.remove();
      }, 500);
    }, 3000);
  }

  // Handle Navbar active class and smooth scroll on page refresh
  function performHashScroll(instant = false) {
    if (window.location.hash) {
      var hash = window.location.hash;
      var target = $(hash);
      if (target.length) {
        var offset = 70;
        var targetPosition = target.offset().top - offset;

        if (instant) {
          window.scrollTo(0, targetPosition);
        } else {
          $('html, body').stop().animate({
            scrollTop: targetPosition
          }, 600);
        }
      }
    }
  }

  // Nuclear approach: Multi-stage, multi-method scroll recovery
  if (window.location.hash) {
    // Stage 1: Immediate snap (before everything)
    performHashScroll(true);

    // Stage 2: When document is ready
    performHashScroll(false);

    // Stage 3: On full window load (including images/carousels)
    $(window).on('load', function () {
      performHashScroll(false);

      // Stage 4: Safety fallback for dynamic layouts
      setTimeout(function () {
        performHashScroll(false);
      }, 500);
    });
  }
});


