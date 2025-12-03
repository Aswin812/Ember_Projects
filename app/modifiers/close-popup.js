import { modifier } from 'ember-modifier';

export default modifier(function closePopup(element, [closePopup]) {
  function handleClick(event) {
    if (event.target.className === 'popup') {
      closePopup();
    }
  }

  document.addEventListener('click', handleClick);

  return ()=>{
    document.removeEventListener('click', handleClick);
  }
});
