const tabs = (headerSelector, tabSelector, contentSelector, activeClass, display = "block") => {
  const header = document.querySelector(headerSelector),
    tabs = document.querySelectorAll(tabSelector),
    content = document.querySelectorAll(contentSelector);

  function hideTabContent() {
    content.forEach((item) => {
      item.style.display = "none";
    });

    tabs.forEach((item) => {
      item.classList.remove(activeClass);
    });
  }

  function showTabContent(index = 0) {
    content[index].style.display = display;
    tabs[index].classList.add(activeClass);
  }
  hideTabContent();
  showTabContent();

  header.addEventListener('click', (e) => {
    const target = e.target;
    const clazz = tabSelector.replace(/\./, "");
    if(target && (target.classList.contains(clazz) || target.parentNode.classList.contains(clazz))){
        tabs.forEach((item, i) => {
            if(target == item || target.parentNode == item){
                hideTabContent();
                showTabContent(i);
            }
        });
    }
  });
};

export default tabs;
