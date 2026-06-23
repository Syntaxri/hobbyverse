export function detectWebGL() {
  try {
    const canvas = document.createElement('canvas');
    const gl =
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl');
    if (!gl) return false;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return true;
  } catch {
    return false;
  }
}

export function detectMobile() {
  if (typeof navigator === 'undefined') return false;
  if (/Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) return true;
  if (navigator.maxTouchPoints > 0 && window.innerWidth < 768) return true;
  return false;
}

export function detectLowPower() {
  if (typeof navigator === 'undefined') return false;
  const mem = navigator.deviceMemory;
  if (mem && mem < 4) return true;
  const cores = navigator.hardwareConcurrency;
  if (cores && cores < 4) return true;
  return false;
}

export function shouldEnableWebGL() {
  if (typeof window === 'undefined') return false;
  if (detectMobile()) return false;
  if (detectLowPower()) return false;
  return detectWebGL();
}
