const measure = () => {
  const spaces = Array.from(document.getElementsByClassName("measurable"));

  spaces.forEach(space => {
    const sizeX = space.getElementsByClassName("size-x").item(0);
    const sizeY = space.getElementsByClassName("size-y").item(0);

    sizeX && (sizeX.textContent = space.clientWidth + "px");
    sizeY && (sizeY.textContent = space.clientHeight + "px");
  })
};

window.addEventListener("load", measure);
window.addEventListener("resize", measure);