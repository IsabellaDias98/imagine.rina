const sanityConfig = {
  projectId: 'gqkdumnk',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
}

const query = `
*[_type == "hero"][0]{
  badge,
  title,
  subtitle,
  youtubeUrl
}
`

function getYoutubeId(url) {
  if (!url) return null

  // suporta: youtu.be | watch?v= | embed/
  const regex =
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  const match = url.match(regex)

  return match ? match[1] : null
}

async function loadHero() {
  const url = `https://${sanityConfig.projectId}.api.sanity.io/v${sanityConfig.apiVersion}/data/query/${sanityConfig.dataset}?query=${encodeURIComponent(
    query
  )}`

  const res = await fetch(url)
  const data = await res.json()

  if (!data.result) return

  const hero = data.result

  // TEXTOS
  if (hero.badge)
    document.getElementById('hero-badge').textContent = hero.badge

  if (hero.title)
    document.getElementById('hero-title').innerHTML = hero.title

  if (hero.subtitle)
    document.getElementById('hero-subtitle').textContent = hero.subtitle

  // BOTÃO YOUTUBE (Subscribe)
  if (hero.youtubeUrl) {
    document.getElementById('hero-youtube').href = hero.youtubeUrl
  }

  // VÍDEO DESTACADO
  const videoId = getYoutubeId(hero.youtubeUrl)

  if (videoId) {
    document.getElementById(
      'hero-video'
    ).href = `https://www.youtube.com/watch?v=${videoId}`

    document.getElementById(
      'hero-thumbnail'
    ).src = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
  }
}

loadHero()

const aboutQuery = `
*[_type == "about"][0]{
  title,
  description,
  cards[]{
    title,
    text
  },
  missionTitle,
  missionText
}
`

async function loadAbout() {
  const url = `https://${sanityConfig.projectId}.api.sanity.io/v${sanityConfig.apiVersion}/data/query/${sanityConfig.dataset}?query=${encodeURIComponent(aboutQuery)}`
  const res = await fetch(url)
  const data = await res.json()

  if (!data.result) return

  document.getElementById('about-title').textContent = data.result.title
  document.getElementById('about-description').textContent = data.result.description

  if (data.result.cards) {
  data.result.cards.forEach((card, index) => {
    const title = document.getElementById(`about-card-${index + 1}-title`)
    const text = document.getElementById(`about-card-${index + 1}-text`)
    if (title) title.textContent = card.title
    if (text) text.textContent = card.text
  })
}

  document.getElementById('about-mission-title').textContent = data.result.missionTitle
  document.getElementById('about-mission-text').textContent = data.result.missionText
}

loadAbout()

const videosQuery = `
*[_type == "video"] | order(order asc){
  youtubeId,
  title,
  description,
  duration,
  views
}
`
async function loadVideos() {
  const url = `https://${sanityConfig.projectId}.api.sanity.io/v${sanityConfig.apiVersion}/data/query/${sanityConfig.dataset}?query=${encodeURIComponent(videosQuery)}`

  const res = await fetch(url)
  const data = await res.json()

  if (!data.result) return

  const videoGrid = document.getElementById('videoGrid')
  if (!videoGrid) return
  videoGrid.innerHTML = ''

  data.result.forEach(video => {
    const videoCard = document.createElement('div')
    videoCard.className =
      'bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2'

    videoCard.innerHTML = `
      <div class="relative aspect-video bg-gradient-to-br from-pink-100 to-rose-100 overflow-hidden">
        <img src="https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg"
             alt="${video.title}"
             class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">

        <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <a href="https://www.youtube.com/watch?v=${video.youtubeId}" target="_blank"
             class="bg-white rounded-full p-4 hover:scale-110 transition-transform">
            ▶
          </a>
        </div>

        <div class="absolute bottom-3 right-3 bg-black/80 text-white px-3 py-1 rounded-lg text-sm font-semibold">
          ${video.duration || ''}
        </div>
      </div>

      <div class="p-6">
        <h3 class="text-xl font-bold text-gray-900 mb-2">${video.title}</h3>
        <p class="text-gray-600 mb-4">${video.description || ''}</p>

        <div class="flex items-center justify-between text-sm text-gray-500">
          <span>${video.views || ''} visualizações</span>
          <a href="https://www.youtube.com/watch?v=${video.youtubeId}" target="_blank"
             class="text-rose-400 font-semibold hover:text-rose-600">
            Assistir
          </a>
        </div>
      </div>
    `

    videoGrid.appendChild(videoCard)
  })
}

loadVideos()

const contactQuery = `
*[_type == "contact"][0]{
  title,
  description,
  ctaTitle,
  ctaText,
  ctaYoutubeUrl
}
`
const socialQuery = `
*[_type == "socialLink"] | order(order asc){
  name,
  url,
  icon
}
`
async function loadContact() {
  const url = `https://${sanityConfig.projectId}.api.sanity.io/v${sanityConfig.apiVersion}/data/query/${sanityConfig.dataset}?query=${encodeURIComponent(contactQuery)}`

  const res = await fetch(url)
  const data = await res.json()
  if (!data.result) return

  document.querySelector('#contact h2').textContent = data.result.title
  document.querySelector('#contact p').textContent = data.result.description

  document.querySelector('#contact .bg-gradient-to-r h3').textContent =
    data.result.ctaTitle

  document.querySelector('#contact .bg-gradient-to-r p').textContent =
    data.result.ctaText

  document.querySelector('#contact .bg-gradient-to-r a').href =
    data.result.ctaYoutubeUrl
}

loadContact()

function getSocialIcon(icon) {
  if (icon === 'youtube') {
    return `<svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.5 6.2s-.2-1.6-.9-2.3c-.9-.9-1.9-.9-2.4-1C16.9 2.5 12 2.5 12 2.5h0s-4.9 0-8.2.4c-.5.1-1.5.1-2.4 1-.7.7-.9 2.3-.9 2.3S.3 8 .3 9.7v1.6c0 1.7.2 3.5.2 3.5s.2 1.6.9 2.3c.9.9 2.1.9 2.6 1 1.9.2 8 .4 8 .4s4.9 0 8.2-.4c.5-.1 1.5-.1 2.4-1 .7-.7.9-2.3.9-2.3s.2-1.7.2-3.5V9.7c0-1.7-.2-3.5-.2-3.5z"/>
      <polygon points="9.75,15.02 15.5,11.75 9.75,8.48"/>
    </svg>`
  }

  if (icon === 'instagram') {
    return `<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
      <rect x="2" y="2" width="20" height="20" rx="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1"/>
    </svg>`
  }

  return `<svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10"/>
  </svg>`
}

async function loadSocialLinks() {
  const url = `https://${sanityConfig.projectId}.api.sanity.io/v${sanityConfig.apiVersion}/data/query/${sanityConfig.dataset}?query=${encodeURIComponent(socialQuery)}`

  const res = await fetch(url)
  const data = await res.json()
  if (!data.result) return

  const container = document.getElementById('socialLinks')
  container.innerHTML = ''

  data.result.forEach(link => {
    const a = document.createElement('a')
    a.href = link.url
    a.target = '_blank'
    a.rel = 'noopener noreferrer'
    a.className =
      'flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-all group'

    a.innerHTML = `
      <div class="bg-gray-100 p-3 rounded-lg">
        ${getSocialIcon(link.icon)}
      </div>
      <div>
        <div class="font-semibold text-gray-900">${link.name}</div>
        <div class="text-sm text-gray-600">${link.url}</div>
      </div>
    `

    container.appendChild(a)
  })
}

loadSocialLinks()










