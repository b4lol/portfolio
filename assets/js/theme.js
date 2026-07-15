function loadPreferredTheme() {
    let preferredTheme = null;
    try {
        preferredTheme = localStorage.getItem("pref-theme");
    } catch (e) {
        // localStorage may be unavailable (private browsing, disabled storage).
    }
    const isDarkTheme = document.body.classList.contains("dark");

    if (preferredTheme === "light" && isDarkTheme) {
        document.body.classList.remove('dark')
    } else if (preferredTheme === "dark" && !isDarkTheme) {
        document.body.classList.add('dark')
    }
}

loadPreferredTheme();
