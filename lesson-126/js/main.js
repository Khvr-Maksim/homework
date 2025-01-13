(function () {
    document.addEventListener('click', InitFunction)
    function InitFunction(e) {
        const burgIcon = e.target.closest('.burger-icon')
        //  в данно случае объявляем что при клике на иконку burger-icon в консоли выведется ее кдасс
        const burgNavItem = e.target.closest('.nav__link')
        // Тоже самое с нажатием на строки меню
        if (!burgIcon && !burgNavItem) return
        // Если нажимаем не на иконку или строку, то выполнение кода заканчивается
        if (document.documentElement.clientWidth > 900) return
        if (!document.body.classList.contains('body--opened-menu')) {

            document.body.classList.add('body--opened-menu')
        }
        else {
            document.body.classList.remove('body--opened-menu')
        }
    }
    // БУРГЕР-МЕНЮ
    // 
    // 
    // 
    const button = document.querySelector('.about__img-button')
    const modal = document.querySelector('.modal')
    const body = document.body
    const Removemod = () => {
        body.classList.remove('body--opened-modal')
        // Класс убирается - как переменная Removemod
    }
    const Openmod = () => {
        body.classList.add('body--opened-modal')
    }
    // Класс задается - как переменная Removemod
    button.addEventListener('click', Openmod)
    //При клике на кнопку происходит Openmod
    modal.addEventListener('click', event => {
        const target = event.target
        if (target && target.classList.contains('modal') || target.closest('.modal__cancel')) {
            Removemod()
        }
    })
    //При клике на за пределы модалки и на крестик окно будет закрываться
    document.addEventListener('keydown', event => {
        if (event.code === 'Escape' && modal.classList.contains('modal')) {
            Removemod()
        }
    })
    //При клике Esc окно будет закрываться
    // МОДАЛКА
    // 
    // 
    // ТАБЫ
    const tabControls = document.querySelector('.tab-controls')
    tabControls.addEventListener('click', toggleTab)
    function toggleTab(event) {
        const tabControl = event.target.closest('.tab-controls__link')
        if (!tabControl) return
        event.preventDefault()
        if (tabControl.classList.contains('tab-controls__link--active')) return
        // чтоб не выполнять код когда активный селектор уже нажат и по активной кнопке нажимают еще раз

        const tabContentID = tabControl.getAttribute('href')
        const tabContent = document.querySelector(tabContentID)
        // Сопоставляет href и находит в файле элемент с необходимым значением
        const tabContshow = document.querySelector('.tab-content--show')
        const tabContentActive = document.querySelector('.tab-controls__link--active')
        // Сопоставляет элементы с классами для активных кнопок
        if (tabContshow) {
            tabContshow.classList.remove('tab-content--show')
        }
        document.querySelector(tabContentID).classList.add('tab-content--show')
        // Убирает с одного элемента класс и навешивает на другой 
        if (tabContentActive) {
            tabContentActive.classList.remove('tab-controls__link--active')
        }
        tabControl.classList.add('tab-controls__link--active')
    }
    // Убирает с одного элемента класс и навешивает на другой 
    // 
    // 
    // 
    // Аккордеон
    const accordionLists = document.querySelectorAll('.accordion-list')
    // Задаем переменную в виде аккоддион листа
    accordionLists.forEach(el => {
        // document.querySelector('accordion-list__item--opened .accordion-list__content').style.maxHeight = document.querySelector('accordion-list__item--opened .accordion-list__content').scrollHeight + 'px';
        // Можно было бы организовать чтоб сразу одна вкаладка была открыта
        el.addEventListener('click', (e) => {
            const accordionList = e.currentTarget
            const accordionOpenedItem = accordionList.querySelector('.accordion-list__item--opened')
            const accordionOpenedContent = accordionList.querySelector('.accordion-list__item--opened .accordion-list__content')

            const accordionControl = e.target.closest('.accordion-list__controls');
            // Добавляем слушатель события при клике на аккордион лист и записываем таргет куда кликнули, если вне то код прекращается
            if (!accordionControl) return
            const accordionItem = accordionControl.parentElement;
            e.preventDefault()
            // Если мы ткнули на кнопку accordion-list__controls то мы записываем в переменную родительский элемент accordion-list__item 
            const accordionContent = accordionControl.nextElementSibling;
            // А также следующий элемент accordion-list__content
            if (accordionOpenedItem && accordionItem != accordionOpenedItem) {
                accordionOpenedItem.classList.remove('accordion-list__item--opened');
                accordionOpenedContent.style.maxHeight = null;

            }
            accordionItem.classList.toggle('accordion-list__item--opened');

            if (accordionItem.classList.contains('accordion-list__item--opened')) {
                accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
            }
            // Если у родителя, то есть accordion-list__item есть тэг accordion-list__item--opened то разворачивается на всю высоту не смотря на то сколько было задано до этого
            else {
                accordionContent.style.maxHeight = null;
                // Если ткнуть снова то тэг (из-за togle) пропадет и все свернется
            }

        });
    });
    // Слайдер-галлерея
    new Swiper('.gallery__slider', {
        spaceBetween: 15,
        slidesPerView: 1.5,
        breakpoints: {
            451: {
                slidesPerView: 2,
            },
            601: {
                slidesPerView: 3,
            },
            801: {
                spaceBetween: 32,
            },
            // when window width is >= 1101px
            1101: {
                slidesPerView: 4,
            }
        },
        pagination: {
            el: '.gallery__pagination',
            type: 'fraction',

        },

        navigation: {
            nextEl: '.gallery__next',
            prevEl: '.gallery__prev',
        },
    });
    // Слайдер-отзывы
    new Swiper('.testimonials__slider', {
        spaceBetween: 0,
        slidesPerView: 1,
        centeredSlides: true,

        breakpoints: {
            // when window width is >= 1101px
            1201: {
                slidesPerView: 2.1,
            },
            901: {
                slidesPerView: 1.5,
            }
        },

        navigation: {
            nextEl: '.testimonials__next',
            prevEl: '.testimonials__prev',
        },
        scrollbar: {
            el: '.testimonials__scrollbar',
            draggable: true,

        },
    });
    // Маска для телефона

    const telInput = document.querySelectorAll('input[type="tel"]')
    const im = new Inputmask('+7 (999) 999-99-99')
    im.mask(telInput)
})()
