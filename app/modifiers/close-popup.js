import { modifier } from 'ember-modifier';

export default modifier(function closePopup(element, [closePopup]) {
  function handleClick(event) {
    if (event.key === 'Escape' || event.target.className === 'popup') {
      closePopup();
    }
  }

  document.addEventListener('click', handleClick);
  document.addEventListener('keydown', handleClick);

  return ()=>{
    document.removeEventListener('click', handleClick);
    document.removeEventListener('keydown', handleClick);
  }
});
