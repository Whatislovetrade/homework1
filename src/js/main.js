import './slider'
import modal from "./modules/modal"
import tabs from "./modules/tabs"

window.addEventListener('DOMContentLoaded', () => {
    'use strict'

    modal()
    tabs('.glazing_slider', '.glazing_block', '.glazing_content', 'active')
})