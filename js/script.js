var focusedElementBeforeModal;
var modal = document.querySelector('.modal');
var modalOverlay = document.querySelector('.modal-overlay');
var modalToggle = document.querySelector('.modal-toggle');

modalToggle.addEventListener('click', openModal);

function openModal(){
  focusedElementBeforeModal = document.activeElement;
  
  modal.addEventListener('keydown', trapTabKey);
  modalOverlay.addEventListener('click', closeModal);
  var focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
  var focusableElements = modal.querySelectorAll(focusableElementsString);
  var focusableElementsArray = [];
  for (let i=0;i<focusableElements.length;i++){
    focusableElementsArray.push(focusableElements[i])
  }
  // focusableElements = Array.prototype.slice.call(focusableElements);
  
  var firstTabStop = focusableElements[0];
  var lastTabStop = focusableElements[focusableElements.length - 1];

  console.log(lastTabStop)

  modal.style.display = 'block';
  modalOverlay.style.display = 'block';

  function trapTabKey(e){
    
    if(e.keyCode === 9){
      if(e.shiftKey){
        if(document.activeElement === firstTabStop){
          e.preventDefault();
          lastTabStop.focus();
        }
        
      }else{
        if(document.activeElement === lastTabStop){
          console.log(document.activeElement)
          e.preventDefault();
          firstTabStop.focus();
        }
      }
    }

    if(e.keyCode === 27){
      closeModal();
    }
  }
}

function closeModal(){
  modal.style.display = 'none';
  modalOverlay.style.display = 'none';

  focusedElementBeforeModal.focus();
}