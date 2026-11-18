const contactForm = document.querySelector("#contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.querySelector("#name").value.trim();
    const email = document.querySelector("#email").value.trim();
    const message = document.querySelector("#message").value.trim();

    const nameError = document.querySelector("#name-error");
    const emailError = document.querySelector("#email-error");
    const messageError = document.querySelector("#message-error");

    let isValid = true;

    if (name.length < 2) {
      nameError.textContent = "Please enter your name.";
      nameError.hidden = false;
      isValid = false;
    } else {
      nameError.hidden = true;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      emailError.textContent = "Please enter a valid email.";
      emailError.hidden = false;
      isValid = false;
    } else {
      emailError.hidden = true;
    }

    if (message.length < 10) {
      messageError.textContent = "Message must be at least 10 characters.";
      messageError.hidden = false;
      isValid = false;
    } else {
      messageError.hidden = true;
    }

    if (isValid) {
      alert(`Thank you, ${name}!`);
      contactForm.reset();
    }
  });
}
