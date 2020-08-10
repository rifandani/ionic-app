// get ONLY the URL hostname
export function getHostName(url) {
  // www gabisa, harus yg berawalan http atau https
  return new URL(url).hostname;
}
