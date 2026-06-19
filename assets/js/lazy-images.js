(function() {
    if (!('loading' in HTMLImageElement.prototype)) return;
    var imgs = document.querySelectorAll('img:not([loading])');
    if (!imgs.length) return;
    // Threshold: images whose top edge is beyond 1.5x viewport height
    // are considered below the fold and get lazy loading.
    var foldLine = window.innerHeight * 1.5;
    for (var i = 0; i < imgs.length; i++) {
        var rect = imgs[i].getBoundingClientRect();
        if (rect.top > foldLine) {
            imgs[i].setAttribute('loading', 'lazy');
            imgs[i].setAttribute('decoding', 'async');
        }
    }
})();
