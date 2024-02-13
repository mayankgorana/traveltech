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
  if (i > images.length - 1) i = 0;  // If i is greater than or equal to images.length - 1, it means we've reached or exceeded the last index of the array. In that case, i is reset to 0
  imageEl.style.backgroundImage = `url(${images[i]})`;
}

// Animations
function loader() {
  document.body.style.overflow = "hidden";

  var tl = gsap.timeline();
  tl.from("#loader h3", {
    x: 60,
    opacity: 0,
    duration: 1.2,
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

gsap.from(".an-hero", {
  duration: 0.6,
  y: -150,
  stagger: 0.3,
});

gsap.from(".an-services", {
  scrollTrigger: ".an-services",
  duration: 0.5,
  opacity: 1,
  x: -150,
  stagger: 0.12,
});

gsap.from(".an-img", {
  scrollTrigger: ".an-services",
  duration: 1.2,
  opacity: 0,
  x: -200,
});

gsap.from(".an-membership", {
  scrollTrigger: ".an-membership",
  duration: 0.6,
  opacity: 0,
  y: -150,
  stagger: 0.3,
  delay: 0.3,
});

gsap.from(".an-cards", {
  scrollTrigger: ".an-cards",
  duration: 1,
  opacity: 0,
  y: -80,
  stagger: 0.2,
  delay: 1,
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
  scrollTrigger: ".an-email",
  duration: 0.8,
  opacity: 0,
  y: -150,
  stagger: 0.25,
  delay: 0.4,
});

// MailChimp Display and Error Handling
document.addEventListener('DOMContentLoaded', function () {
  const subscribeForm = document.getElementById('subscribeForm');
  const subscribeButton = document.getElementById('subscribeButton');

  subscribeButton.addEventListener('click', async function (event) {
    event.preventDefault();

    const emailInput = document.getElementById('emailInput');
    const email = emailInput.value;

    try {
      // Send a POST request to your server's /subscribe route
      const response = await fetch('/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        // Show SweetAlert success alert
        Swal.fire({
          position: 'center-center',
          icon: 'success',
          title: 'Subscribed',
          text: 'Thank you for subscribing our newsletter',
          showConfirmButton: false,
          timer: 1500,
        });
        // Clear the email input field
        emailInput.value = '';
      } else {
        Swal.fire({
          position: 'center-center',
          icon: 'error',
          title: 'Existing Subscriber',
          text: 'This email is already subscribed our newsletter',
        });

      }
    } catch (error) {
      console.error('Error subscribing:', error);
      // Show SweetAlert error alert for subscription failure
      Swal.fire({
        position: 'center-center',
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong! Please try again later.',
      });
    }
  });
});

// Openweather Display and Error Handling
document.getElementById('get-weather').addEventListener('click', async () => {
  const city = document.getElementById('city').value;

  try {
      const response = await fetch(`/weather?city=${encodeURIComponent(city)}`);
      const weatherData = await response.json();

      document.getElementById('weather-display').innerHTML = `
          <p>Temperature: ${weatherData.temperature}°C</p>
          <p>Description: ${weatherData.weatherDescription}</p>
      `;
  } catch (error) {
      console.error('Error fetching weather:', error);
      document.getElementById('weather-display').innerHTML = '<p>Error fetching weather data</p>';
  }
});
