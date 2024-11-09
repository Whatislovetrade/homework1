const modal = () => {
    function bindModal(trigger, classModal, closeButton, closeOverflow) {

    }
    const button = document.querySelector('.popup_engineer_btn'),
          modal = document.querySelector('.popup_engineer'),
          closeBtn = document.querySelectorAll('.popup_close'),
          body = document.querySelector('body')
    
    button.addEventListener('click', () => {
        modal.style.display = 'block'
        body.style.overflow = 'hidden'
    })

    closeBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.style.display = 'none'
            body.style.overflow = ''
        })
    })

    modal.addEventListener('click', (event) => {
        if(event.target.classList.contains('popup_engineer')) {
            modal.style.display = 'none'
            body.style.overflow = ''
        }
    })
}

export default modal