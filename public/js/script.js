window.onload = () => {
    const profileDropdown = function showProfileDropdown() {
        const dropdownElement = document.getElementById("dropdown-profile")
        const profileHeader = document.getElementsByClassName("user-header")
    
        profileHeader[0].addEventListener("mouseover", () => {
            dropdownElement.style.display = "block"
        })

        profileHeader[0].addEventListener("mouseout", () => {
            dropdownElement.style.display = "none"
        })
    }
    
    profileDropdown()
}

const menuItem = function selectMenuItem() {
    const menuContainer = document.getElementsByClassName('nav-menu')[0]
    const navItems = menuContainer.getElementsByClassName('nav-item')

    for (let i = 0; i < navItems.length; i++) {
        navItems[i].addEventListener('click', () => {
            const currentItem = document.getElementsByClassName('active')
            currentItem[0].className = currentItem[0].className.replace(' active', '')
            navItems[i].className += ' active'
        })
    }
}

menuItem()