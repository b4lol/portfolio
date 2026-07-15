import * as params from '@params';

function scrollToTop() {
    const topButton = document.getElementById("top-link");

    document.addEventListener('scroll', () => {
        if (document.body.scrollTop > 600 || document.documentElement.scrollTop > 600) {
            topButton.style.visibility = "visible";
            topButton.style.opacity = "1";
        } else {
            topButton.style.visibility = "hidden";
            topButton.style.opacity = "0";
        }
    }, {passive: true})
}

function themeToggle() {
    const themeButton = document.getElementById("theme-toggle");

    themeButton.addEventListener("click", () => {
        if (document.body.className.includes("dark")) {
            document.body.classList.remove('dark');
            try { localStorage.setItem("pref-theme", 'light'); } catch (e) {}
        } else {
            document.body.classList.add('dark');
            try { localStorage.setItem("pref-theme", 'dark'); } catch (e) {}
        }
    })
}

function showCodeCopyButtons() {
    document.querySelectorAll('pre > code').forEach((codeblock) => {
        const container = codeblock.parentNode.parentNode;

        const copyLabel = params.codeCopy || 'copy';
        const copiedLabel = params.codeCopied || 'copied!';

        const copybutton = document.createElement('button');
        copybutton.classList.add('copy-code');
        copybutton.textContent = copyLabel;

        function copyingDone() {
            copybutton.textContent = copiedLabel;
            setTimeout(() => {
                copybutton.textContent = copyLabel;
            }, 2000);
        }

        copybutton.addEventListener('click', (cb) => {
            if ('clipboard' in navigator) {
                navigator.clipboard.writeText(codeblock.textContent);
                copyingDone();
                return;
            }

            const range = document.createRange();
            range.selectNodeContents(codeblock);
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
            try {
                document.execCommand('copy');
                copyingDone();
            } catch (e) { };
            selection.removeRange(range);
        });

        if (container.classList.contains("highlight")) {
            container.appendChild(copybutton);
        } else if (container.parentNode.firstChild == container) {
            // td containing LineNos
        } else if (codeblock.parentNode.parentNode.parentNode.parentNode.parentNode.nodeName == "TABLE") {
            // table containing LineNos and code
            codeblock.parentNode.parentNode.parentNode.parentNode.parentNode.appendChild(copybutton);
        } else {
            // code blocks not having highlight as parent class
            codeblock.parentNode.appendChild(copybutton);
        }
    });
}

function openToc() {
    const toc = document.getElementById("toc");

    if (!toc) return;

    if (window.innerWidth > 1500 && window.innerHeight > 800) {
        toc.open = true;
    }
}

function progressBar() {
    const bar = document.getElementById("progressBar");

    if (!bar) return;

    document.addEventListener('scroll', () => {
        let scrollPercent = document.documentElement.scrollTop / (document.documentElement.scrollHeight - window.innerHeight) * 100;
        if (scrollPercent >= 99) { scrollPercent = 0 };
        bar.style.setProperty("--scrollAmount", scrollPercent + '%');
    }, {passive: true})
}


if (params.scrollToTop) scrollToTop();
if (params.themeToggle) themeToggle();
if (params.showCodeCopyButtons) showCodeCopyButtons();
openToc();
progressBar();

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js');
    });
}
