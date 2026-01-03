console.log("sanity.js carregou ✅")

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

  data.result.cards.forEach((card, index) => {
    document.getElementById(`about-card-${index + 1}-title`).textContent = card.title
    document.getElementById(`about-card-${index + 1}-text`).textContent = card.text
  })

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

