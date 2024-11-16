import './slider'
import modal from "./modules/modal"
import tabs from "./modules/tabs"

window.addEventListener('DOMContentLoaded', () => {
    'use strict'

    modal()
    tabs('.glazing_slider', '.glazing_block', '.glazing_content', 'active')
    tabs('.decoration_slider', '.no_click', '.decoration_content-active', 'after_click')
    tabs('.balcon_icons', '.balcon_icons_img', '.big_img > img', 'do_image_more', 'inline-block')
})