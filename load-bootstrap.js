(function () {
  var SKELETON_TIMEOUT = 8000;
  var SHOW_SKELETON_DELAY = 200;
  var skeletonTimer = setTimeout(function () {
    if (!document.documentElement.classList.contains('app-ready')) {
      document.documentElement.classList.add('skeleton-visible');
    }
  }, SHOW_SKELETON_DELAY);

  window.whenStylesReady = function (callback) {
    var link = document.querySelector('link[rel="stylesheet"][href="styles.css"]');
    if (!link || link.sheet) {
      callback();
      return;
    }
    link.addEventListener('load', callback, { once: true });
    link.addEventListener('error', callback, { once: true });
  };

  window.markAppReady = function () {
    clearTimeout(skeletonTimer);
    var skeleton = document.getElementById('page-skeleton');
    document.documentElement.classList.add('app-ready');
    if (skeleton) {
      skeleton.setAttribute('aria-hidden', 'true');
      skeleton.removeAttribute('aria-busy');
    }
  };

  window.mountWhenReady = function (renderFn) {
    whenStylesReady(function () {
      renderFn();
      requestAnimationFrame(function () {
        requestAnimationFrame(markAppReady);
      });
    });
  };

  setTimeout(function () {
    if (!document.documentElement.classList.contains('app-ready')) {
      markAppReady();
    }
  }, SKELETON_TIMEOUT);
})();
