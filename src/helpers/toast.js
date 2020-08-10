export function toast(message, duration = 4000) {
  const toast = document.createElement('ion-toast');
  toast.message = message;
  toast.duration = duration;
  toast.color = 'dark';
  toast.position = 'bottom';
  // toast.header = 'Message: ';
  // toast.buttons = []

  document.body.appendChild(toast);
  return toast.present();
}
