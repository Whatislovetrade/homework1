const modal = () => {
    function bindModal(trigger, classModal, closeButton, closeOverlay = null) {
        const button = document.querySelectorAll(trigger),
              modal = document.querySelector(classModal),
              closeBtn = document.querySelectorAll(closeButton),
              body = document.querySelector('body'),
              windows = document.querySelectorAll('[data-modal]')

        function closePrevModal() {
            windows.forEach(item => {
                item.style.display = 'none'
            })
        }
        
        function showModal() {
            modal.style.display = 'block'
            body.style.overflow = 'hidden'
        }

        function closeModal() {
            modal.style.display = 'none'
            body.style.overflow = ''
        }
        
        button.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault()
                closePrevModal()
                showModal()
 
            })
        })

        closeBtn.forEach(btn => {
            btn.addEventListener('click', () => {
                closePrevModal()
                closeModal()
            })
        })

        modal.addEventListener('click', (e) => {
            if(e.target.classList.contains(closeOverlay)) {
                closePrevModal()
                closeModal()
            }
        })
    }

    bindModal('.popup_engineer_btn', '.popup_engineer','.popup_close','popup_engineer')
    bindModal('.phone_link', '.popup','.popup_close','popup')
    bindModal('.popup_calc_btn', '.popup_calc','.popup_calc_close')
    bindModal('.popup_calc_button', '.popup_calc_profile ','.popup_calc_profile_close')
    bindModal('.popup_calc_profile_button', '.popup_calc_end','.popup_calc_end_close')
}

export default modal