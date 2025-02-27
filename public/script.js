// Menu Responsive propery
const menu = document.getElementById("mobile-menu");
const menuLinks = document.querySelector(".navbar__menu");
const body = document.querySelector("body");

const menuActive = () => {
  menu.classList.toggle("active");
  menuLinks.classList.toggle("active");
  body.classList.toggle("active");
};

menu.addEventListener("click", menuActive);

// Image Fade and Change

const imageEl = document.querySelector(".services__img");
const images = [
  "https://img.freepik.com/free-photo/hiker-going-up-aiguille-du-midi_53876-139593.jpg?size=626&ext=jpg&ga=GA1.1.1255861728.1707232844&semt=sph",
  "https://img.freepik.com/free-photo/group-friends-winter-trip-with-tent_23-2148375109.jpg?size=626&ext=jpg&ga=GA1.1.1255861728.1707232844&semt=sph",
  "https://img.freepik.com/free-photo/beautiful-girl-standing-boat-looking-mountains-ratchaprapha-dam-khao-sok-national-park-surat-thani-province-thailand_335224-849.jpg?size=626&ext=jpg&ga=GA1.1.1255861728.1707232844&semt=sph",
];

window.setInterval(changePicture, 5000);
let i = 0;
function changePicture() {
  i++;
  if (i > images.length - 1) i = 0;  // If i is greater than images.lengxth - 1, it means we've reached or exceeded the last index of the array. In that case, i is reset to 0
  imageEl.style.backgroundImage = `url(${images[i]})`;
}

// Animations
function loader() {
  document.body.style.overflow = "hidden";

  var tl = gsap.timeline();
  tl.from("#loader h3", {
    x: 60,
    opacity: 0,
    duration: 1,
    stagger: 0.1,
  })
  tl.to("#loader h3", {
    x: -40,
    opacity: 0,
    duration: 1,
    stagger: 0.1,
  })
  tl.to("#loader", {
    opacity: 0,
  })
  tl.to("#loader", {
    display: "none",
  })
  tl.add(() => {
    document.body.style.overflow = "auto";
  });
}

loader();

gsap.registerPlugin(ScrollTrigger);

gsap.from(".an-hero, .motion-button", {
  duration: 1.0,
  delay: 2,
  y: -150,
  stagger: 0.3,
});

gsap.from(".an-services", {
  scrollTrigger: {
    trigger: ".an-services",
    // markers: true,
    end: "center 40%",
    scrub: 2
  },
  duration: 1.6,
  opacity: 1,
  x: -150,
  stagger: 0.12,
});

gsap.from(".an-img", {
  scrollTrigger: {
    trigger: ".an-services",
    // markers: true,
    end: "center 40%",
    scrub: 2
  },
  duration: 1.2,
  opacity: 0,
  x: 200,
});

gsap.from(".an-membership", {
  duration: 0.6,
  opacity: 0,
  y: -150,
  scrollTrigger: {
    trigger: ".an-membership",
    start: "top 30%",
    // markers:true,
    end: "center 20%",
    scrub: 2
  }
});

gsap.from(".an-cards", {
  scrollTrigger: {
    trigger: ".an-membership",
    start: "top 10%",
    // markers:true,
    end: "top 40%",
    scrub: 2
  },
  duration: 1,
  opacity: 0,
  y: -80,
  stagger: 0.2,
});

gsap.from(".an-team", {
  scrollTrigger: ".an-team",
  duration: 1,
  opacity: 0,
  y: -150,
  stagger: 0.3,
  delay: 0.2,
});

gsap.from(".an-team-end", {
  scrollTrigger: ".an-team-end",
  duration: 1,
  opacity: 0,
  y: -150,
  stagger: 0.3,
  delay: 0.2,
});

gsap.from(".an-email", {
  scrollTrigger: {
    trigger: ".an-email",
    start: "top 70%",
    end: "center 50%",
    // markers  : true,
    scrub: 2
  },
  duration: 0.8,
  opacity: 0,
  x: -150,
  stagger: 0.25,
  delay: 0.4,
});


gsap.from(".footer__link , .footer__title", {
  scrollTrigger: {
    trigger: ".footer__links",
    start: "top 80%",
    // markers:true,
    end: "top 81%",
    scrub: 2
  },
  duration: 1.5,
  opacity: 0,
  y: -80,
  delay: 2,
  stagger: 0.2,
});

gsap.from(".footer_content", {
  scrollTrigger: {
    trigger: ".footer__links",
    start: "top 80%",
    // markers:true,
    end: "top 81%",
    scrub: 2
  },
  duration: 1.5,
  opacity: 0,
  x: -80,
  delay: 2,
  stagger: 0.2,
});

// MailChimp Display and Error Handling
document.addEventListener('DOMContentLoaded', function () {
  const subscribeButton = document.getElementById('subscribeButton');

  subscribeButton.addEventListener('click', async function (event) {
    event.preventDefault();

    const emailInput = document.getElementById('emailInput');
    const email = emailInput.value;

    try {
      const response = await fetch('/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        Swal.fire({
          position: 'center-center',
          icon: 'success',
          title: 'Subscribed',
          text: 'Thank you for subscribing our newsletter',
          showConfirmButton: false,
          timer: 1500,
        });
        emailInput.value = '';
      } else {
        Swal.fire({
          position: 'center-center',
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong! Please try again.',
        });

      }
    } catch (error) {
      console.error('Error subscribing:', error);
      Swal.fire({
        position: 'center-center',
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong! Please try again later.',
      });
    }
  });
});

// Contact us form
document.getElementById("contactForm").addEventListener("submit", function(event) {
  event.preventDefault(); 
  let formData = new FormData(this);
  for (let [name, value] of formData.entries()) {
    console.log(name + ": " + value);
  }
  Swal.fire({
    position: 'center-center',
    icon: 'success',
    title: 'Subscribed',
    text: 'Thank you for Contacting Us',
    showConfirmButton: false,
    timer: 2000,
  });
  this.reset(); 
});