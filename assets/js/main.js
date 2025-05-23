const navMenu  = document.getElementById('nav-menu'),
    toggleMenu = document.getElementById('toggle-menu'),
    closeMenu  = document.getElementById('close-menu'),
    email      = document.getElementById('email'),
    langButton = document.querySelector(".lang-buttom"),
    languagesDiv = document.querySelector(".languages")
    

toggleMenu.addEventListener('click', () => {
    navMenu.classList.toggle('show__menu')
} )

closeMenu.addEventListener('click', () => {
    navMenu.classList.remove('show__menu')
} )

email.addEventListener('click', (e) => {
    e.preventDefault();
    const emailAddress = email.getAttribute('data-email')
    navigator.clipboard.writeText(emailAddress).then( () => {
        alert('Email Copied to Clipboard');
    }).catch(err => {
        console.error('Failed to copy: ', err);
    })
})

document.querySelectorAll('.university').forEach(university => {
    university.addEventListener('click', () => {
      const details = university.nextElementSibling;
      details.style.display = details.style.display === 'block' ? 'none' : 'block';
    });
  });

  document.querySelectorAll('.collapsible .toggle').forEach(button => {
    button.addEventListener('click', () => {
        // const box = button.parentElement;
        const box = button.closest('.collapsible');

        box.classList.toggle('open');

        // Get current text and remove leading symbol
        const currentText = button.textContent.trim();
        const currentSymbol = currentText.charAt(0);
        const title = currentText.slice(1).trim();

        // Toggle symbol
        const newSymbol = currentSymbol === '+' ? '−' : '+';

        // Update button text
        button.textContent = `${newSymbol} ${title}`;
    });
});

langButton.addEventListener("click", function () {
      languagesDiv.classList.toggle("active");
    });

document.addEventListener("DOMContentLoaded", function () {
    const base = document.querySelector('base')?.getAttribute('href') || '/academic-portfolio/'; 
    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    const flags = {
      "flag-br": "/",
      "flag-fr": "/fr/",
      "flag-es": "/es/",
      "flag-it": "/it/",
      "flag-us": "/us/"
    };

    for (const [id, langPath] of Object.entries(flags)) {
      const el = document.getElementById(id);
      if (el) {
         console.log(`base: ${base}, path: ${langPath}, page: ${currentPage}`);
        el.href = base + langPath + currentPage;
      }
    }
  });

document.addEventListener("DOMContentLoaded", function () {
    const base = document.querySelector('base')?.getAttribute('href') || '/academic-portfolio/';
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    console.log(`currPage : ${currentPage}`)

    // Detect language from path (e.g. /fr/, /es/)
    const pathParts = window.location.pathname.split('/');
    console.log(`pathParts : ${pathParts}`)
    const lang = ['fr', 'es', 'it', 'us'].includes(pathParts[1]) ? pathParts[1] : '';
    console.log(`lang: ${lang}`)
    const langPath = lang ? `/${lang}/` : '/';
    console.log(`langPath : ${langPath}`)

    // Normalize base to ensure it ends with a single slash
    const normalizedBase = base.replace(/\/+$/, '') + '/';

    // Find all nav and menu links
    const links = document.querySelectorAll('.nav__link, .menu__link a');

    links.forEach(link => {
        const href = link.getAttribute('href');

        // Only modify local ./ links
        if (href && href.startsWith('./')) {
            const filename = href.replace('./', '');
            const newHref = normalizedBase + langPath.replace(/^\/+/, '') + filename;
            link.setAttribute('href', newHref);
            console.log(`Updated: ${href} → ${newHref}`);
        }
    });
});