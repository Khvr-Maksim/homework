const btn = document.querySelector('.btn-open')
const mod = document.querySelector('.modal')
const body = document.body
const Rmod = () =>{
    mod.classList.remove('modal-open')
    body.classList.add('body--fixed')
}
const Opmod = ()=> {
    mod.classList.add('modal-open')
    body.classList.add('body--fixed')
}
btn.addEventListener('click', Opmod)
mod.addEventListener('click', event => {
    const target = event.target
    if (target && target.classList.contains('modal') || target.classList.contains('modal__close-btn') ) {
        Rmod ()
    }
})
document.addEventListener('keydown',event =>{
    if (event.code==='Escape' && mod.classList.contains('modal-open') ){
        Rmod ()
    }
})
