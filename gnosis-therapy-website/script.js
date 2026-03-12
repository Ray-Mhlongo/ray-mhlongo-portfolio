const yearElement = document.getElementById("year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  const fields = {
    name: {
      input: document.getElementById("name"),
      error: document.getElementById("nameError"),
      validate: (value) => value.trim().length >= 2 || "Please enter your full name."
    },
    email: {
      input: document.getElementById("email"),
      error: document.getElementById("emailError"),
      validate: (value) => /\S+@\S+\.\S+/.test(value) || "Please enter a valid email address."
    },
    phone: {
      input: document.getElementById("phone"),
      error: document.getElementById("phoneError"),
      validate: (value) => /^[+]?[\d\s()-]{8,}$/.test(value) || "Please enter a valid phone number."
    },
    service: {
      input: document.getElementById("service"),
      error: document.getElementById("serviceError"),
      validate: (value) => value.trim().length > 0 || "Please select a service."
    },
    message: {
      input: document.getElementById("message"),
      error: document.getElementById("messageError"),
      validate: (value) => value.trim().length >= 10 || "Please enter a message with at least 10 characters."
    }
  };

  const status = document.getElementById("formStatus");

  function showError(field, message) {
    field.error.textContent = message;
    field.input.setAttribute("aria-invalid", "true");
  }

  function clearError(field) {
    field.error.textContent = "";
    field.input.removeAttribute("aria-invalid");
  }

  function validateField(fieldKey) {
    const field = fields[fieldKey];
    const result = field.validate(field.input.value);
    if (result === true) {
      clearError(field);
      return true;
    }
    showError(field, result);
    return false;
  }

  Object.keys(fields).forEach((key) => {
    const field = fields[key];
    field.input.addEventListener("blur", () => validateField(key));
    field.input.addEventListener("input", () => {
      if (field.error.textContent) {
        validateField(key);
      }
    });
  });

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let isValid = true;
    Object.keys(fields).forEach((key) => {
      if (!validateField(key)) {
        isValid = false;
      }
    });

    if (!status) {
      return;
    }

    if (!isValid) {
      status.className = "form-status error";
      status.textContent = "Please correct the highlighted fields before sending.";
      return;
    }

    status.className = "form-status success";
    status.textContent = "Thank you. Your message is ready to be sent.";
    contactForm.reset();
  });
}
