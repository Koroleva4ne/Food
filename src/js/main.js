import tabs from './modules/tabs';
import timer from './modules/timer';
import modal from './modules/modal';
import menu from './modules/menu';
import forms from './modules/forms';
import slider from './modules/slider';
import calc from './modules/calc';
import { openModal } from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {    
    const modalTimerId = setTimeout(() => openModal(modalSelector, modalTimerId), 300000);

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    timer('.timer', '2023-12-31');
    modal('[data-modal]', '.modal', modalTimerId);
    menu();
    forms(modalTimerId, 'form');
    slider({
        container: '.offer__slider',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    calc();
});