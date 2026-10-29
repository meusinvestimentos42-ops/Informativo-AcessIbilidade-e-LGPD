/* ==========================================================================
   1. INICIALIZAÇÃO E CONTROLE GERAL
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  // Inicializa os ícones do Lucide
  lucide.createIcons();

  // Elementos do DOM
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const themeIcon = document.getElementById("themeIcon");
  const htmlElement = document.documentElement;
  const progressBar = document.getElementById("progressBar");
  const searchInput = document.getElementById("searchInput");
  const sections = document.querySelectorAll(".article-section");
  const navItems = document.querySelectorAll(".nav-item");
  const currentSectionName = document.getElementById("currentSectionName");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  // --------------------------------------------------------------------------
  // 2. ALTERNÂNCIA DE TEMA (LIGHT / DARK MODE)
  // --------------------------------------------------------------------------
  themeToggleBtn.addEventListener("click", () => {
    const currentTheme = htmlElement.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";
    
    htmlElement.setAttribute("data-theme", newTheme);
    
    // Atualiza o ícone do botão
    if (newTheme === "dark") {
      themeIcon.setAttribute("data-lucide", "sun");
    } else {
      themeIcon.setAttribute("data-lucide", "moon");
    }
    lucide.createIcons();
  });

  // --------------------------------------------------------------------------
  // 3. BARRA DE PROGRESSO DE LEITURA E SCROLLSPY (MENU LATERAL)
  // --------------------------------------------------------------------------
  const mainWrapper = document.querySelector(".main-wrapper");

  window.addEventListener("scroll", () => {
    // Cálculo da barra de progresso
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    progressBar.style.width = `${progress}%`;

    // Atualização do ScrollSpy (Item ativo no menu lateral)
    let currentActiveId = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentActiveId = section.getAttribute("id");
      }
    });

    if (currentActiveId) {
      navItems.forEach((item) => {
        item.classList.remove("active");
        if (item.getAttribute("data-section") === currentActiveId) {
          item.classList.add("active");
          // Atualiza o nome da seção no rodapé fixo
          const linkText = item.querySelector("a").textContent.trim();
          currentSectionName.textContent = linkText;
        }
      });
    }
  });

  // --------------------------------------------------------------------------
  // 4. ABAS DO VISUALIZADOR DE CÓDIGO
  // --------------------------------------------------------------------------
  window.switchTab = function(type) {
    const btnInaccessible = document.getElementById("tabInaccessible");
    const btnAccessible = document.getElementById("tabAccessible");
    const codeInaccessible = document.getElementById("codeInaccessible");
    const codeAccessible = document.getElementById("codeAccessible");

    if (type === "inaccessible") {
      btnInaccessible.classList.add("active");
      btnAccessible.classList.remove("active");
      codeInaccessible.style.display = "block";
      codeAccessible.style.display = "none";
    } else {
      btnAccessible.classList.add("active");
      btnInaccessible.classList.remove("active");
      codeAccessible.style.display = "block";
      codeInaccessible.style.display = "none";
    }
  };

  // --------------------------------------------------------------------------
  // 5. NAVEGAÇÃO DO RODAPÉ (BOTÕES ANTERIOR / PRÓXIMO)
  // --------------------------------------------------------------------------
  const sectionIds = Array.from(sections).map(s => s.getAttribute("id"));

  function getCurrentSectionIndex() {
    const activeItem = document.querySelector(".nav-item.active");
    if (!activeItem) return 0;
    const currentId = activeItem.getAttribute("data-section");
    return sectionIds.indexOf(currentId);
  }

  nextBtn.addEventListener("click", () => {
    let index = getCurrentSectionIndex();
    if (index < sectionIds.length - 1) {
      const targetSection = document.getElementById(sectionIds[index + 1]);
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  });

  prevBtn.addEventListener("click", () => {
    let index = getCurrentSectionIndex();
    if (index > 0) {
      const targetSection = document.getElementById(sectionIds[index - 1]);
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  });

  // --------------------------------------------------------------------------
  // 6. BUSCA RÁPIDA NO ARTIGO
  // --------------------------------------------------------------------------
  searchInput.addEventListener("input", (e) => {
    const term = e.target.value.toLowerCase().trim();
    sections.forEach((section) => {
      const text = section.textContent.toLowerCase();
      if (term === "" || text.includes(term)) {
        section.style.opacity = "1";
        section.style.pointerEvents = "auto";
      } else {
        section.style.opacity = "0.3"; // Diminui o destaque dos blocos que não contêm o termo
      }
    });
  });
});