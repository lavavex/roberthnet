document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".xmb-item");
  let currentIndex = 0; // Active main menu item
  let currentSubIndex = -1; // Active submenu item (-1 means none)
  let isSubmenuActive = false; // Whether navigating submenu

  // Set initial active main menu item
  items[currentIndex].classList.add("active");

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    const currentSubmenu = items[currentIndex].querySelector(".xmb-submenu");
    const submenuItems = currentSubmenu
      ? currentSubmenu.querySelectorAll("a")
      : [];

    if (e.key === "ArrowRight" && !isSubmenuActive) {
      items[currentIndex].classList.remove("active");
      currentIndex = Math.min(currentIndex + 1, items.length - 1);
      items[currentIndex].classList.add("active");
      currentSubIndex = -1;
      isSubmenuActive = false;
      clearSubmenuActive();
    } else if (e.key === "ArrowLeft" && !isSubmenuActive) {
      items[currentIndex].classList.remove("active");
      currentIndex = Math.max(currentIndex - 1, 0);
      items[currentIndex].classList.add("active");
      currentSubIndex = -1;
      isSubmenuActive = false;
      clearSubmenuActive();
    } else if (e.key === "ArrowDown" && submenuItems.length > 0) {
      isSubmenuActive = true;
      clearSubmenuActive();
      currentSubIndex = Math.min(currentSubIndex + 1, submenuItems.length - 1);
      submenuItems[currentSubIndex].classList.add("active");
    } else if (e.key === "ArrowUp" && submenuItems.length > 0) {
      if (currentSubIndex > 0) {
        clearSubmenuActive();
        currentSubIndex--;
        submenuItems[currentSubIndex].classList.add("active");
      } else {
        isSubmenuActive = false;
        currentSubIndex = -1;
        clearSubmenuActive();
      }
    } else if (e.key === "Enter" && isSubmenuActive && currentSubIndex >= 0) {
      submenuItems[currentSubIndex].click();
    }
  });

  // Mouse hover for main menu
  items.forEach((item, index) => {
    item.addEventListener("mouseenter", () => {
      items[currentIndex].classList.remove("active");
      currentIndex = index;
      item.classList.add("active");
    });
  });

  // Mouse click navigation for main menu
  items.forEach((item, index) => {
    item.addEventListener("click", (e) => {
      if (!e.target.closest(".xmb-submenu")) {
        items[currentIndex].classList.remove("active");
        currentIndex = index;
        item.classList.add("active");
        currentSubIndex = -1;
        isSubmenuActive = false;
        clearSubmenuActive();
      }
    });
  });

  // Mouse click for submenu items
  document.querySelectorAll(".xmb-submenu a").forEach((submenuItem) => {
    submenuItem.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  });

  // Clear active state from all submenu items
  function clearSubmenuActive() {
    document.querySelectorAll(".xmb-submenu a.active").forEach((el) => {
      el.classList.remove("active");
    });
  }
});
