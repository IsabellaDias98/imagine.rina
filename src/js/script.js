// Data dos vídeos
    const videos = [
      {
        id: '32si5cfrCNc',
        title: 'How to Find Your Purpose in Life',
        description: 'Discover the practical method to identify your mission and live a more meaningful life.',
        duration: '15:30',
        views: '25K',
      },
      {
        id: '32si5cfrCNc',
        title: '5 Morning Habits That Will Transform Your Life',
        description: 'Learn the morning routine that will revolutionize your days and increase your productivity.',
        duration: '12:45',
        views: '38K',
      },
      {
        id: '32si5cfrCNc',
        title: 'Overcoming the Fear of Failure',
        description: 'How to transform fear into fuel for success and personal growth.',
        duration: '18:20',
        views: '42K',
      },
      {
        id: '32si5cfrCNc',
        title: 'Growth Mindset: The Key to Success',
        description: 'Understand how to develop a winning and resilient mindset.',
        duration: '20:15',
        views: '31K',
      },
      {
        id: '32si5cfrCNc',
        title: 'Building Meaningful Relationships',
        description: 'Practical tips for creating authentic and lasting connections.',
        duration: '16:50',
        views: '28K',
      },
      {
        id: '32si5cfrCNc',
        title: 'The Art of Not Giving Up',
        description: 'Inspiring stories and strategies to stay motivated during difficult times.',
        duration: '14:30',
        views: '45K',
      },
    ];

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

    // Renderizar vídeos
    const videoGrid = document.getElementById('videoGrid');
    videos.forEach(video => {
      const videoCard = document.createElement('div');
      videoCard.className = 'bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2';
      videoCard.innerHTML = `
        <div class="relative aspect-video bg-gradient-to-br from-pink-100 to-rose-100 overflow-hidden">
          <img src="https://img.youtube.com/vi/${video.id}/maxresdefault.jpg" alt="${video.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
          <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <a href="https://www.youtube.com/watch?v=${video.id}" target="_blank" rel="noopener noreferrer" class="bg-white rounded-full p-4 hover:scale-110 transition-transform">
              <svg class="text-rose-400" width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            </a>
          </div>
          <div class="absolute bottom-3 right-3 bg-black/80 text-white px-3 py-1 rounded-lg text-sm font-semibold flex items-center space-x-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1"></circle><path d="M12 8v-2m0 14v-2M4 12H2m18 0h-2"></path></svg>
            <span>${video.duration}</span>
          </div>
        </div>
        <div class="p-6">
          <h3 class="text-xl font-bold text-gray-900 mb-2 line-clamp-2">${video.title}</h3>
          <p class="text-gray-600 mb-4 line-clamp-2">${video.description}</p>
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2 text-gray-500 text-sm">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              <span>${video.views} visualizações</span>
            </div>
            <a href="https://www.youtube.com/watch?v=${video.id}" target="_blank" rel="noopener noreferrer" class="text-rose-400 font-semibold hover:text-rose-600 transition-colors">Assistir</a>
          </div>
        </div>
      `;
      videoGrid.appendChild(videoCard);
    });

    // Renderizar redes sociais
    const socialLinksContainer = document.getElementById('socialLinks');
    socialLinks.forEach(link => {
      const socialLink = document.createElement('a');
      socialLink.href = link.url;
      socialLink.target = '_blank';
      socialLink.rel = 'noopener noreferrer';
      socialLink.className = 'flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300 group';

      let icon = '';
      if (link.icon === 'youtube') {
        icon = '<svg class="text-gray-700" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M23 7l-7 5 7 5V7z"></path><rect x="1" y="5" width="15" height="14" rx="2" ry="2" fill="none" stroke="currentColor" stroke-width="2"></rect></svg>';
      } else if (link.icon === 'instagram') {
        icon = '<svg class="text-gray-700" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><circle cx="17.5" cy="6.5" r="1.5"></circle></svg>';
      } else if (link.icon === 'twitter') {
        icon = '<svg class="text-gray-700" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2s9 5 20 5a9.5 9.5 0 0 0-9-5.5c4.75 2.45 7-7 7-7"></path></svg>';
      } else {
        icon = '<svg class="text-gray-700" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="m22 7-10 5L2 7"></path></svg>';
      }

      socialLink.innerHTML = `
        <div class="bg-gray-100 p-3 rounded-lg group-hover:scale-110 transition-transform">
          ${icon}
        </div>
        <div>
          <div class="font-semibold text-gray-900">${link.name}</div>
          <div class="text-sm text-gray-600">${link.url.replace('https://', '').replace('mailto:', '')}</div>
        </div>
      `;
      socialLinksContainer.appendChild(socialLink);
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

