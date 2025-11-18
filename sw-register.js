if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(() => console.log('SW registrado correctamente'))
      .catch(err => console.log('Error al registrar SW', err));
  });
}