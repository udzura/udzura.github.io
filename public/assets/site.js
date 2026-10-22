(() => {
  const supportedLanguages = ["ja", "en"];
  const descriptions = {
    ja: "近藤宇智朗（udzura）。福岡在住のソフトウェアエンジニア。Ruby、mruby、Rust、WebAssembly、eBPFを中心としたOSSプロジェクトと翻訳の紹介。",
    en: "Uchio Kondo (udzura), a software engineer in Fukuoka, Japan. Open-source projects and translation, exploring Ruby, mruby, Rust, WebAssembly, and eBPF.",
  };
  const buttons = document.querySelectorAll("[data-language]");

  function preferredLanguage() {
    const requested = new URL(window.location.href).searchParams.get("lang");
    if (supportedLanguages.includes(requested)) return requested;
    try {
      const saved = window.localStorage.getItem("udzura-language");
      if (supportedLanguages.includes(saved)) return saved;
    } catch {
      // Language switching also works when browser storage is unavailable.
    }
    return navigator.language?.toLowerCase().startsWith("ja") ? "ja" : "en";
  }

  function setLanguage(language) {
    document.documentElement.lang = language;
    document.querySelector('meta[name="description"]').content = descriptions[language];
    document.querySelector('meta[property="og:description"]').content = descriptions[language];
    buttons.forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.language === language));
    });
    document.querySelectorAll("[data-label-ja]").forEach((element) => {
      element.setAttribute("aria-label", element.getAttribute(`data-label-${language}`));
    });
    document.querySelectorAll("[data-alt-ja]").forEach((element) => {
      element.alt = element.getAttribute(`data-alt-${language}`);
    });
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const language = button.dataset.language;
      const url = new URL(window.location.href);
      url.searchParams.set("lang", language);
      window.history.replaceState(null, "", url);
      try {
        window.localStorage.setItem("udzura-language", language);
      } catch {
        // The URL still preserves the chosen language for sharing and reloading.
      }
      setLanguage(language);
    });
  });

  window.addEventListener("popstate", () => setLanguage(preferredLanguage()));
  setLanguage(preferredLanguage());
  document.querySelector(".language-switch").hidden = false;
  document.getElementById("copyright-year").textContent = new Date().getFullYear();
})();
