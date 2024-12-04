import maskForTel from './modules/imask'
import './slider'
import modal from "./modules/modal"
import tabs from "./modules/tabs"
import form from './modules/form'
import modalState from './modules/state'
import images from './modules/images'
import timer from './modules/timer'

window.addEventListener('DOMContentLoaded', () => {
    'use strict'

    const data = {}
    let deadline = '2024-12-05'

    modalState(data)
    maskForTel()
    modal()
    tabs('.glazing_slider', '.glazing_block', '.glazing_content', 'active')
    tabs('.decoration_slider', '.no_click', '.decoration_content-active', 'after_click')
    tabs('.balcon_icons', '.balcon_icons_img', '.big_img > img', 'do_image_more', 'inline-block')
    form(data)
    images()
    timer('.container1', deadline)
})