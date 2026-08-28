/**
 * Dismisses the static boot splash (see index.html) once the web fonts are
 * ready, with a minimum display time so it never flickers and a hard timeout
 * so it never hangs.
 *
 * Exit ("enter the star"): the saffron star (#boot-fx) fades out so the page
 * shows through the star-shaped hole in the indigo overlay (#boot), then #boot
 * scales up so that hole floods the viewport — revealing the page from inside
 * the star. `booted` is added to <html> at that moment so the hero entrance
 * animations play while the page is being revealed.
 */
const MIN_SHOW_MS = 500;
const MAX_WAIT_MS = 4000;

// only the families the page actually renders with
const FAMILIES = ['1rem Marcellus', "1rem 'Reem Kufi'", '1rem Cairo'];

export function dismissBootWhenReady(): void {
  const boot = document.getElementById('boot');
  const fx = document.getElementById('boot-fx');

  const finishNow = () => {
    document.documentElement.classList.add('booted');
    boot?.remove();
    fx?.remove();
  };

  if (!boot) {
    finishNow();
    return;
  }

  const started = performance.now();
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const fontsReady: Promise<unknown> =
    'fonts' in document
      ? Promise.all(FAMILIES.map((f) => document.fonts.load(f)))
          .then(() => document.fonts.ready)
          .catch(() => undefined)
      : Promise.resolve();

  const timeout = new Promise((res) => setTimeout(res, MAX_WAIT_MS));

  Promise.race([fontsReady, timeout]).then(() => {
    const remaining = Math.max(0, MIN_SHOW_MS - (performance.now() - started));
    setTimeout(() => {
      if (reduceMotion) {
        finishNow();
        return;
      }

      // hero entrance plays as the page is revealed through the star
      document.documentElement.classList.add('booted');

      // 1) uncover the hole, 2) scale the hole open across the viewport
      fx?.classList.add('hide');
      boot.classList.add('zoom');

      // near the end, fade the overlay out to clean up the star's concave gaps
      setTimeout(() => boot.classList.add('done'), 620);

      // remove once the flood + fade are done
      setTimeout(finishNow, 1200);
    }, remaining);
  });
}
