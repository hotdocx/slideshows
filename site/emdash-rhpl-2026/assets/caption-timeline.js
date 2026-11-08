/* HyperFrames caption layer bridge. The authored HTML/GSAP is the renderer.
 * Adapted from HyperFrames' caption-pill-karaoke composition pattern; supports
 * arbitrary authored typography, wipes, transforms, SVG and other timed graphics.
 * The parent supplies only narration time and visibility, never caption code. */
(function () {
  window.__nativeCaptionTimeline = function (rootTimeline, captionTimeline, layer) {
    if (!rootTimeline || !captionTimeline || !layer) throw new Error('Caption layer requires a composition and authored timeline.');
    let external = false;
    // Direct HyperFrames render/preview seeks the single root timeline, as in
    // the Kitty film. Browser replay may override only this child clock while
    // reduced motion holds the main teaching picture at a later still frame.
    rootTimeline.add(captionTimeline, 0);
    captionTimeline.paused(false);
    function controls(value) {
      if (!value || !Number.isFinite(value.time) || typeof value.enabled !== 'boolean') return;
      if (!external) { rootTimeline.remove(captionTimeline); captionTimeline.pause(); external = true; }
      captionTimeline.seek(Math.max(0, Math.min(value.time, captionTimeline.duration())), false);
      layer.style.visibility = value.enabled ? 'visible' : 'hidden';
    }
    const register = () => {
      if (!window.__hyperframes?.registerRuntimeDataHandler) throw new Error('This caption layer requires the pinned HyperFrames runtime-data API.');
      window.__hyperframes.registerRuntimeDataHandler('native-captions', controls);
    };
    if (window.__hyperframes) register();
    else window.addEventListener('DOMContentLoaded', register, { once: true });
  };
})();
