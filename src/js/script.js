    // Preencher ano no footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Scroll suave para seções
    function scrollToSection(id) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }

    // Atualizar header ao fazer scroll
    window.addEventListener('scroll', () => {
      const header = document.getElementById('header');
      if (window.scrollY > 50) {
        header.classList.add('bg-white/95', 'backdrop-blur-md', 'shadow-lg');
        header.classList.remove('bg-transparent');
      } else {
        header.classList.remove('bg-white/95', 'backdrop-blur-md', 'shadow-lg');
        header.classList.add('bg-transparent');
      }
    });

    // Form submission
    const form = document.getElementById("contactForm");
    const status = document.getElementById("formStatus");

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      status.textContent = "Sending...";
      status.className = "text-purple-600";

      emailjs.sendForm(
        "service_mctcegv",
        "template_df0u4v4",
        this
      )
      .then(() => {
        status.textContent = "Message sent successfully!";
        status.className = "text-green-600";
        form.reset();
      })
      .catch((error) => {
        status.textContent = "Error sending message.";
        status.className = "text-red-600";
        console.error("EmailJS error:", error);
      });
    });

