import { modifier } from 'ember-modifier';

export default modifier(function validatePopup(element) {

  function openPopup(event) {
    let popup = event.target.parentElement.querySelector('#validate-popup');
    popup.classList.remove('hidden');
    popup.classList.add('visible');
  }

  function closePopup(event) {
    let popup = event.target.parentElement.querySelector('#validate-popup');
    popup.classList.add('hidden');
    popup.classList.remove('visible');
  }

  element.addEventListener('focus', openPopup);
  element.addEventListener('blur', closePopup);
  return () => {
    element.removeEventListener('focus', openPopup);
    element.removeEventListener('blur', closePopup);
  }
});
