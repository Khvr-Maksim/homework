(function(){
document.addEventListener('click',InitFunction)
function InitFunction(e) {
    const burgIcon = e.target.closest ('.burger-icon')
    //  в данно случае объявляем что при клике на иконку burger-icon в консоли выведется ее кдасс
    const burgNavItem = e.target.closest ('.nav__link')
    // Тоже самое с нажатием на строки меню
    if (!burgIcon && !burgNavItem) return
    // Если нажимаем не на иконку или строку, то выполнение кода заканчивается
    if (!document.body.classList.contains ('body--opened-menu')){

        document.body.classList.add('body--opened-menu')
    }
    else {
        document.body.classList.remove('body--opened-menu')
    }
}
})()