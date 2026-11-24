// This website uses JavaScript (not Java) to control the photo gallery.
// Add or rearrange photos by editing this array.
const photos = [
  { src: 'photos/dining-area.jpg', alt: 'Rustic dining and shared seating area', caption: 'Dining and shared seating area' },
  { src: 'photos/kitchenette.jpg', alt: 'Kitchenette and sink', caption: 'Kitchenette and sink' },
  { src: 'photos/property-exterior.jpg', alt: 'Beachside property exterior and room entrances', caption: 'Exterior and room entrances' },
  { src: 'photos/guest-room.jpg', alt: 'Guest room with bunk bed and bathroom entrance', caption: 'Guest room interior' },
  { src: 'photos/roofdeck-stairs.jpg', alt: 'Staircase to the rooftop deck', caption: 'Staircase to the rooftop deck' },
  { src: 'photos/rooftop-deck.jpg', alt: 'Open rooftop terrace with ocean view', caption: 'Open rooftop terrace' },
  { src: 'photos/beach-view-deck.jpg', alt: 'Rooftop terrace overlooking the beach', caption: 'Beach view from the rooftop deck' },
  { src: 'photos/inland-view.jpg', alt: 'Rooftop terrace overlooking tropical greenery', caption: 'Greenery and inland view' },
  { src: 'photos/ocean-view-lounger.jpg', alt: 'Lounge chair overlooking the ocean', caption: 'Ocean view and lounge chair' }
];

const mainPhoto = document.getElementById('mainPhoto');
const strip = document.getElementById('thumbStrip');
const counter = document.getElementById('photoCounter');
const caption = document.getElementById('photoCaption');
const upload = document.getElementById('photoUpload');
const toast = document.getElementById('toast');
let selectedIndex = 4; // 5th photo selected, matching your screenshot
let toastTimeout;

function notify(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove('show'), 2800);
}

function selectPhoto(index) {
  selectedIndex = (index + photos.length) % photos.length;
  const photo = photos[selectedIndex];
  mainPhoto.src = photo.src;
  mainPhoto.alt = photo.alt;
  caption.textContent = photo.caption;
  counter.textContent = `${selectedIndex + 1} / ${photos.length}`;
  strip.querySelectorAll('.thumb').forEach((button, i) => {
    const active = i === selectedIndex;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
    if (active) button.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' });
  });
}

photos.forEach((photo, index) => {
  const button = document.createElement('button');
  button.className = 'thumb';
  button.type = 'button';
  button.setAttribute('aria-label', `View photo ${index + 1}: ${photo.caption}`);
  button.title = photo.caption;
  const img = document.createElement('img');
  img.src = photo.src;
  img.alt = '';
  img.loading = 'lazy';
  button.appendChild(img);
  button.addEventListener('click', () => selectPhoto(index));
  strip.appendChild(button);
});

selectPhoto(selectedIndex);
document.getElementById('prevBtn').addEventListener('click', () => selectPhoto(selectedIndex - 1));
document.getElementById('nextBtn').addEventListener('click', () => selectPhoto(selectedIndex + 1));
document.addEventListener('keydown', (event) => {
  if (event.target instanceof HTMLInputElement) return;
  if (event.key === 'ArrowRight') selectPhoto(selectedIndex + 1);
  if (event.key === 'ArrowLeft') selectPhoto(selectedIndex - 1);
});

// Edit replaces the selected picture only in this browser session.
// To make a permanent change on GitHub, replace the file in /photos and commit.
document.getElementById('editBtn').addEventListener('click', () => upload.click());
upload.addEventListener('change', () => {
  const file = upload.files?.[0];
  if (!file) return;
  if (!file.type.startsWith('image/')) { notify('Please select an image.'); return; }
  const old = photos[selectedIndex].src;
  photos[selectedIndex].src = URL.createObjectURL(file);
  if (old.startsWith('blob:')) URL.revokeObjectURL(old);
  const thumbImg = strip.querySelectorAll('.thumb img')[selectedIndex];
  thumbImg.src = photos[selectedIndex].src;
  selectPhoto(selectedIndex);
  upload.value = '';
  notify('Photo replaced in this browser session. Update the GitHub image file to save permanently.');
});

document.getElementById('shareBtn').addEventListener('click', async () => {
  const url = window.location.href;
  try {
    if (navigator.share) await navigator.share({ title:document.title, url });
    else if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(url);
      notify('Gallery link copied!');
    } else notify('Publish to GitHub Pages to obtain a shareable link.');
  } catch (error) { if (error.name !== 'AbortError') notify('Unable to share.'); }
});
