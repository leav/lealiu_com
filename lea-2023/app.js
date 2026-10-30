
(function () {
  const slides = document.querySelectorAll(".hero .slides img");
  if (slides.length) {
    let i = 0;
    slides[0].classList.add("on");
    setInterval(() => {
      slides[i].classList.remove("on");
      i = (i + 1) % slides.length;
      slides[i].classList.add("on");
    }, 4800);
  }

  const dialog = document.querySelector("#lightbox");
  if (!dialog) return;
  const view = dialog.querySelector("img");
  const tiles = [...document.querySelectorAll(".tile img")];
  let index = 0;
  function show(next) {
    if (!tiles.length) return;
    index = (next + tiles.length) % tiles.length;
    view.src = tiles[index].src;
    view.alt = tiles[index].alt;
    if (!dialog.open) dialog.showModal();
  }
  document.addEventListener("click", (event) => {
    const button = event.target.closest(".tile");
    if (!button) return;
    const img = button.querySelector("img");
    show(tiles.indexOf(img));
  });
  dialog.querySelector(".close").addEventListener("click", () => dialog.close());
  dialog.querySelector(".prev").addEventListener("click", () => show(index - 1));
  dialog.querySelector(".next").addEventListener("click", () => show(index + 1));
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  document.addEventListener("keydown", (event) => {
    if (!dialog.open) return;
    if (event.key === "ArrowRight") show(index + 1);
    if (event.key === "ArrowLeft") show(index - 1);
  });
})();
