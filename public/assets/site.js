(() => {
  const supportedLanguages = ["ja", "en"];
  const descriptions = {
    ja: "近藤宇智朗（udzura）。福岡在住のソフトウェアエンジニア。Ruby、mruby、Rust、WebAssembly、eBPFを中心としたOSSプロジェクトと翻訳の紹介。",
    en: "Uchio Kondo (udzura), a software engineer in Fukuoka, Japan. Open-source projects and translation, exploring Ruby, mruby, Rust, WebAssembly, and eBPF.",
  };
  const buttons = document.querySelectorAll("[data-language]");

  function updateReleaseDates(language) {
    const relative = new Intl.RelativeTimeFormat(language, { numeric: "always" });
    document.querySelectorAll("time[data-release-date]").forEach((time) => {
      const published = new Date(time.dateTime);
      const days = Math.max(0, Math.floor((Date.now() - published.getTime()) / 86400000));
      const [unit, length] = days >= 365 ? ["year", 365]
        : days >= 30 ? ["month", 30]
        : days >= 7 ? ["week", 7]
        : ["day", 1];
      time.textContent = days === 0 ? (language === "ja" ? "今日" : "today")
        : relative.format(-Math.floor(days / length), unit);
      time.title = published.toLocaleString(language);
    });
  }

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
    updateReleaseDates(language);
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

  async function loadRelease(link) {
    const repo = link.dataset.releaseRepo;
    const cacheKey = `udzura-release-v2:${repo}`;
    const cacheLifetime = 60 * 60 * 1000;
    let release;
    try {
      const cached = JSON.parse(window.localStorage.getItem(cacheKey));
      const age = Date.now() - cached?.checkedAt;
      if (age >= 0 && age < cacheLifetime &&
          (cached.tag === null || typeof cached.tag === "string" && cached.tag.length > 0)) {
        release = cached;
      }
    } catch {
      // Fetch normally when storage is unavailable or the cached value is invalid.
    }

    if (!release) {
      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), 8000);
      try {
        const response = await fetch(`https://api.github.com/repos/${repo}/releases/latest`, {
          headers: { Accept: "application/vnd.github+json" },
          signal: controller.signal,
          credentials: "omit",
        });
        if (response.status === 404) {
          release = { tag: null, checkedAt: Date.now() };
        } else {
          if (!response.ok) return;
          const data = await response.json();
          if (typeof data.tag_name !== "string" || !data.tag_name || data.draft || data.prerelease) return;
          release = { tag: data.tag_name, publishedAt: data.published_at, checkedAt: Date.now() };
        }
        try {
          window.localStorage.setItem(cacheKey, JSON.stringify(release));
        } catch {
          // The release can still be displayed without a persistent cache.
        }
      } catch {
        // Keep the ordinary Releases link on network errors or API rate limits.
        return;
      } finally {
        window.clearTimeout(timeout);
      }
    }

    const label = link.querySelector("[data-release-label]");
    label.querySelector('[lang="ja"]').textContent = release.tag ? "最新リリース" : "リリース一覧";
    label.querySelector('[lang="en"]').textContent = release.tag ? "Latest release" : "Releases";
    if (release.tag) {
      link.querySelector(".release-version").textContent = release.tag;
      link.href = `https://github.com/${repo}/releases/tag/${encodeURIComponent(release.tag)}`;
      if (typeof release.publishedAt === "string" && Number.isFinite(Date.parse(release.publishedAt))) {
        const time = link.querySelector("time");
        time.dateTime = new Date(release.publishedAt).toISOString();
        time.setAttribute("data-release-date", "");
        time.hidden = false;
        updateReleaseDates(document.documentElement.lang);
      }
    }
  }

  document.querySelectorAll("[data-release-repo]").forEach(loadRelease);
})();
