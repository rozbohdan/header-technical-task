const MENU = '[data-menu]'
const MENU_ACTION = '[data-menu-action]'
const MENU_LINK = '[data-menu-link]'
const MENU_LIST_CHILD = '[data-menu-list-child]'
const OPEN_MENU = 'menuOpen'

const allMenuLinks = document.querySelectorAll(`${MENU_LINK}`)
const allMenuListChildren = document.querySelectorAll(`${MENU_LIST_CHILD}`)

class Menu {
  static attach() {
    const menu = new Menu()
    menu.init()
  }

  init() {
    if (this.findMenu()) {
      this.applyListener()
    }
  }

  applyListener() {
    document.querySelector('*').addEventListener('click', e => {
      const element = e.target.closest(MENU_ACTION)
      const menuBox = e.target.closest(MENU)
      const menuLink = e.target.closest(MENU_LINK)

      if (menuLink && window.matchMedia("(max-width: 1200px)").matches) {
        e.preventDefault()
        const menuListChild = menuLink.nextElementSibling

        if (this.isOpenedMenuListChild(menuLink)) {
          this.closeMenuListChild(menuLink, menuListChild)
        } else {
          this.closeAllMenuListChildren()
          this.openMenuListChild(menuLink, menuListChild)
        }
      } else {
        this.closeAllMenuListChildren()
      }

      if (this.isCallMenuElement(element)) {
        if (this.isOpened()) {
          this.closeMenu()
        } else {
          this.openMenu()
        }
      }

      if (this.isCallMenuElement(element) !== true && this.menuOverlayIsClickedElement(menuBox) !== true) {
        if (this.isOpened()) {
          this.closeMenu()
        }
      }
    })
  }

  isCallMenuElement(element) {
    return element && OPEN_MENU in element.dataset
  }

  findMenu() {
    const menu = document.querySelector(MENU)
    const menuBtn = document.querySelector(MENU_ACTION)

    if (menu || menuBtn) {
      this.menu = menu
      this.menuBtn = menuBtn
      return true
    }
    return false
  }

  isOpened() {
    return this.menu.classList.contains('menu__list_opened')
  }

  isOpenedMenuListChild(menuLink) {
    return menuLink.classList.contains('menu__link_transformed')
  }

  closeAllMenuListChildren() {
    for (let i = 0; i < allMenuLinks.length; i++) {
      allMenuLinks[i].classList.remove('menu__link_transformed')
      allMenuListChildren[i].classList.remove('menu__list-child_opened')
    }
  }

  openMenu() {
    this.menu.classList.add('menu__list_opened')
    this.menuBtn.classList.add('menu__btn_transformed')
  }

  closeMenu() {
    this.menu.classList.remove('menu__list_opened')
    this.menuBtn.classList.remove('menu__btn_transformed')
  }

  openMenuListChild(menuLink, menuListChild) {
    menuListChild.classList.add('menu__list-child_opened')
    menuLink.classList.add('menu__link_transformed')
  }

  closeMenuListChild(menuLink, menuListChild) {
    menuListChild.classList.remove('menu__list-child_opened')
    menuLink.classList.remove('menu__link_transformed')
  }

  menuOverlayIsClickedElement(menuBox) {
    return menuBox && 'menu' in menuBox.dataset
  }
}

Menu.attach()
