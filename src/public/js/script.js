window.onload = () => {
  const profileDropdown = function showProfileDropdown() {
    const dropdownElement = document.getElementById("dropdown-profile");
    const profileHeader = document.getElementsByClassName("user-header");

    profileHeader[0].addEventListener("mouseover", () => {
      dropdownElement.style.display = "block";
    });

    profileHeader[0].addEventListener("mouseout", () => {
      dropdownElement.style.display = "none";
    });
  };

  profileDropdown();
};

const menuItem = function selectMenuItem() {
  const menuContainer = document.getElementsByClassName("nav-menu")[0];
  const navItems = menuContainer.getElementsByClassName("nav-item");

  for (let i = 0; i < navItems.length; i++) {
    navItems[i].addEventListener("click", () => {
      const currentItem = document.getElementsByClassName("active");
      currentItem[0].className = currentItem[0].className.replace(
        " active",
        ""
      );
      navItems[i].className += " active";
    });
  }
};

menuItem();

const sairButton = document.getElementById("sair");

sairButton.addEventListener("click", sairDoApp);

async function sairDoApp(event) {
  event.preventDefault();

  const result = await fetch("/sair", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((result) => result.json());

  if (result.status === "ok") {
    let base_url = window.location.origin;
    location.href = base_url;
  } else {
    alert(result.error);
  }
}
