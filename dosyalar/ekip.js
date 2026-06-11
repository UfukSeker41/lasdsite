  const MALE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 260" style="width:100%;height:100%;display:block"><rect width="200" height="260" fill="#2e3e1e"/><rect x="60" y="48" width="80" height="14" rx="4" fill="#354920"/><rect x="50" y="60" width="100" height="6" rx="3" fill="#2b3e1a"/><circle cx="100" cy="95" r="38" fill="#4a6030"/><rect x="86" y="131" width="28" height="14" fill="#4a6030"/><path d="M100 145 L82 166 L100 160 L118 166Z" fill="#2b3e1a"/><path d="M0 260 L0 190 Q50 148 100 144 Q150 148 200 190 L200 260Z" fill="#354920"/><polygon points="100,162 94,174 100,222 106,174" fill="#1a2210"/><polygon points="100,175 104,186 116,186 107,193 110,205 100,198 90,205 93,193 84,186 96,186" fill="#e09100"/><circle cx="75" cy="182" r="5" fill="#2b3e1a" opacity="0.5"/><circle cx="125" cy="182" r="5" fill="#2b3e1a" opacity="0.5"/></svg>`;

  const FEMALE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 260" style="width:100%;height:100%;display:block"><rect width="200" height="260" fill="#2e3e1e"/><rect x="60" y="48" width="80" height="14" rx="4" fill="#354920"/><rect x="50" y="60" width="100" height="6" rx="3" fill="#2b3e1a"/><ellipse cx="61" cy="106" rx="14" ry="30" fill="#3a2a1a"/><ellipse cx="139" cy="106" rx="14" ry="30" fill="#3a2a1a"/><circle cx="100" cy="92" r="36" fill="#c9a882"/><rect x="87" y="126" width="26" height="16" fill="#c9a882"/><path d="M100 142 L83 162 L100 156 L117 162Z" fill="#2b3e1a"/><path d="M0 260 L0 190 Q50 146 100 142 Q150 146 200 190 L200 260Z" fill="#354920"/><polygon points="100,172 104,183 116,183 107,190 110,202 100,195 90,202 93,190 84,183 96,183" fill="#e09100"/><circle cx="75" cy="178" r="5" fill="#2b3e1a" opacity="0.5"/><circle cx="125" cy="178" r="5" fill="#2b3e1a" opacity="0.5"/></svg>`;

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.staff-photo-placeholder').forEach(el => {
      const span = el.querySelector('span');
      if (!span) return;
      const isFemale = span.textContent.includes('\u2640');
      const src = isFemale ? 'resimler/maria.jpg' : 'resimler/male_deputy.jpg';
      const alt = isFemale ? 'Female Deputy' : 'Deputy';
      el.outerHTML = `<img src="${src}" alt="${alt}" style="width:100%;height:100%;object-fit:cover;object-position:center top;display:block;">`;
    });
  });