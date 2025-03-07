(function () {
    // Бургер
    document.addEventListener('click', InitFunction)
    function InitFunction(e) {
        const burgIcon = e.target.closest('.burger-icon')
        //  в данно случае объявляем что при клике на иконку burger-icon в консоли выведется ее кдасс
        const burgNavItem = e.target.closest('.nav-link')
        // Тоже самое с нажатием на строки меню
        if (!burgIcon && !burgNavItem) return
        // Если нажимаем не на иконку или строку, то выполнение кода заканчивается
        if (document.documentElement.clientWidth > 1100) return
        if (!document.body.classList.contains('body--opened-menu')) {

            document.body.classList.add('body--opened-menu')
        }
        else {
            document.body.classList.remove('body--opened-menu')
        }
    }
    // 
    // 
    // Модалка
    const button = document.querySelector('.header__enter')
    const modal = document.querySelector('.modal')
    const body = document.body
    const Removemod = () => {
        body.classList.remove('body--opened-modal')
        // Класс убирается - как переменная Removemod
    }
    const Openmod = () => {
        body.classList.add('body--opened-modal')
    }
    // Класс задается - как переменная Openmod
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
    //
    // 
    // Таймер
    document.addEventListener('DOMContentLoaded', () => {
        // Установите конечную дату
        const deadline = new Date('2026-01-31T23:59:59');

        // Найдите элементы DOM
        const elDays = document.querySelector('.timer__days');
        const elHours = document.querySelector('.timer__hours');
        const elMinutes = document.querySelector('.timer__minutes');
        const elSeconds = document.querySelector('.timer__seconds');

        // Функция склонения числительных
        const declensionNum = (num, words) => {
            return words[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][num % 10 < 5 ? num % 10 : 5]];
        };

        // Функция обновления таймера
        const updateTimer = () => {
            const now = new Date();
            const diff = Math.max(0, deadline - now);

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            elDays.textContent = String(days).padStart(2, '0');
            elHours.textContent = String(hours).padStart(2, '0');
            elMinutes.textContent = String(minutes).padStart(2, '0');
            elSeconds.textContent = String(seconds).padStart(2, '0');

            elDays.dataset.title = declensionNum(days, ['д', 'д', 'д']);
            elHours.dataset.title = declensionNum(hours, ['ч', 'ч', 'ч']);
            elMinutes.dataset.title = declensionNum(minutes, ['м', 'м', 'м']);
            elSeconds.dataset.title = declensionNum(seconds, ['с', 'с', 'с']);

            if (diff === 0) {
                clearInterval(timerId);
            }
        };
        // Запустите таймер
        updateTimer();
        const timerId = setInterval(updateTimer, 1000);
    });
    // Слайдер
    new Swiper('.stocks__slider', {
        spaceBetween: 5,
        slidesPerView: 3.8,
        slidesPerView: 4,
        centeredSlides: true,
        initialSlide: 3,
        spaceBetween: 50,
        loop: true,
        breakpoints: {
            // when window width is >= 1101px
            601: {
                spaceBetween: 50,
            },
            901: {
                spaceBetween: 100,
                slidesPerView: 4.5,
            },
            1101: {
                slidesPerView: 6,
                spaceBetween: 130,
                centeredSlides: false,
                initialSlide: 0,
            }
        },
    });
    // 

    // 
    // Диаграмма
    // 
    const slider = document.getElementById('slider');
    const valueDisplay = document.getElementById('value-display');
    const greenSvgPath = document.querySelector('.bag__ellipse-green path'); // Элемент <path> внутри SVG
    const label = document.querySelector('.diagram__label'); // Элемент с меткой

    // Обновление заполнения
    function updateFill() {
        // Получаем текущее значение ползунка
        let rawPercent = Math.min(100, Math.max(0, slider.value)); // Ограничиваем значение между 0 и 100
        const percent = Math.round(rawPercent / 5) * 5; // Добавляем шаги по 5%

        // Определяем цвет для градиента и ползунка в зависимости от значения ползунка
        let gradientColor;
        let thumbColor;

        if (percent <= 25) {
            gradientColor = '#61bb75'; // Зеленый для значений ≤ 25%
            thumbColor = '#4caf50'; // Зеленый для ползунка
        } else if (percent > 25 && percent <= 50) {
            gradientColor = '#a7af4c'; // Желтый для значений > 25% и ≤ 50%
            thumbColor = '#a7af4c'; // Желтый для ползунка
        } else {
            gradientColor = '#af5b4c'; // Красный для значений > 50%
            thumbColor = '#af5b4c'; // Красный для ползунка
        }

        // Создаем градиент с динамическим цветом
        const gradient = `linear-gradient(90deg, ${gradientColor} 0%, #303030 ${percent}%)`;
        slider.style.background = gradient;

        // Обновляем clip-path для bag__ellipse-green
        const clipPath = `
            polygon(
              0% 0%, 
              ${percent}% 0%, 
              ${percent}% 100%, 
              0% 100%
            )
        `;
        greenSvgPath.parentNode.style.clipPath = clipPath;

        // Обновляем отображаемое значение
        valueDisplay.textContent = percent;

        // Изменяем текст, фон метки и цвет дуги в зависимости от значения ползунка
        if (percent <= 25) {
            label.textContent = "Низкий риск";
            label.style.backgroundColor = "#65cc7d38"; // Возвращаем изначальный фон
            greenSvgPath.setAttribute('fill', '#4caf50'); // Зеленый цвет для низкого риска
        } else if (percent > 25 && percent <= 50) {
            label.textContent = "Средний риск";
            label.style.backgroundColor = "#c9cc6538"; // Желтый цвет для среднего риска
            greenSvgPath.setAttribute('fill', '#a7af4c'); // Желтый цвет для дуги
        } else if (percent > 50) {
            label.textContent = "Высокий риск";
            label.style.backgroundColor = "#cc656538"; // Красный цвет для высокого риска
            greenSvgPath.setAttribute('fill', '#af5b4c'); // Красный цвет для дуги
        }

        // Изменяем цвет ползунка
        slider.style.setProperty('--thumb-color', thumbColor);
    }

    // Инициализация слайдера
    slider.addEventListener('input', updateFill);

    // Запускаем функцию при загрузке страницы
    updateFill();
    // 
    // 
    // 
    // TOGGLES
    // Получаем все кнопки и их родительские блоки
    const toggleBlocks = document.querySelectorAll('.toggles-block');

    // Добавляем обработчик событий для каждого блока
    toggleBlocks.forEach(block => {
        const button = block.querySelector('.toggles-button');

        button.addEventListener('click', () => {
            // Проверяем, является ли текущая кнопка активной
            if (button.classList.contains('active')) {
                // Если активна, убираем класс 'active' у кнопки и её родительского блока
                button.classList.remove('active');
                block.classList.remove('active');
            } else {
                // Если не активна, убираем класс 'active' у всех кнопок и блоков
                toggleBlocks.forEach(b => {
                    b.querySelector('.toggles-button').classList.remove('active');
                    b.classList.remove('active');
                });

                // Добавляем класс 'active' только к текущей кнопке и её родительскому блоку
                button.classList.add('active');
                block.classList.add('active');
            }
        });
    });
    // Аккордеон
    const accordionLists = document.querySelectorAll('.accordion-list')
    // Задаем переменную в виде аккоддион листа
    accordionLists.forEach(el => {
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
    
    const telInput = document.querySelectorAll('input[type="tel"]')
    const im = new Inputmask('+7 (999) 999-99-99')
    im.mask(telInput)
})()
