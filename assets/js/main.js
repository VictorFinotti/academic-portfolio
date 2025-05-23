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

    // Define your language folder logic here
    const lang = base.match(/\/(fr|es|it|us)\//)?.[1] || '';
    const langPath = lang ? `/${lang}/` : '/';

    // Select all <a> tags in .nav__link and inside .menu__link
    const links = document.querySelectorAll('.nav__link, .menu__link a');

    links.forEach(link => {
        const originalHref = link.getAttribute('href');
        if (originalHref && originalHref.startsWith('./')) {
            const filename = originalHref.replace('./', '');
            const newHref = base + langPath + filename;
            console.log(`Updated link: ${originalHref} ➜ ${newHref}`);
            link.setAttribute('href', newHref);
        }
    });
});