/*KOD ZAWIERA DZIAŁANIA NA ELEMENTY W HEADERZE*/
const plus = document.querySelector(".plus-category");
const tiles = document.querySelector(".tiles");
const icon = document.querySelector(".icon-search");
const search = document.querySelector(".search");


const modalPlus = (body, category) => {
  return `<div class="modal-plus">
    <p class="modal-title">
      ${body.title}
    </p>
    <div class="modal-category-plus">
      <form action="/words?category=${category}" method="POST">
        <div class="form-group">
          <input type="text" name="question" placeholder="Pytanie">
        </div>
        <div class="form-group">
          <input type="text" name="choice1" placeholder="Odpowiedz 1">
        </div>
        <div class="form-group">
          <input type="text" name="choice2" placeholder="Odpowiedz 2">
        </div>
        <div class="form-group">
          <input type="text" name="choice3" placeholder="Odpowiedz 3">
        </div>
        <div class="form-group">
          <input type="number" name="answer" placeholder="Odpowiedz">
        </div>
        <div class="form-group">
          <input type="text" name="category" placeholder="Kategoria">
        </div>
        <span class="btn-plus"><input type="submit" value="Dodaj pytanie"></span>
      </form>
    </div>
  
  </div>`;
};




const createModalPlus = (value) => {
  const modalContainerKropki = document.createElement("div");
  modalContainerKropki.className = "modal-container-plus";
  modalContainerKropki.innerHTML = modalPlus(value);
  document.body.appendChild(modalContainerKropki);

  const modalActiveCointainerKropki = document.querySelector(
    ".modal-container-plus"
  );
  modalActiveCointainerKropki.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal-container-plus")) {
      e.target.remove();
      document.body.style.overflow = "auto";
    }
  });

  document.body.style.overflow = "hidden";
  
  const addButton = modalContainerKropki.querySelector(".btn-plus");
  addButton.addEventListener("click", () => {
    const input = modalContainerKropki.querySelector(".input-plus");
    const newDiv = document.createElement("div");
    newDiv.innerText = input.value;
    tiles.appendChild(newDiv);
    newDiv.classList.add('tile1');
    modalContainerKropki.remove();
    document.body.style.overflow = "auto";
  });
};

const showPlus = () => {
  createModalPlus({
    title: "Dodaj kategorię",
    description: "W budowie!!!",
  });
};

plus.addEventListener("click", showPlus);

/*FUNKCJA DO KLASY SEARCH*/
icon.onclick = function(){
  search.classList.toggle('active');
}
/**WYSZUKIWANIE ELEMENTÓW NA STRONIE I CZYSZCZENIE INPUTA Z FILTRA WYSZUKIWANIA*/

function searchElement() {
  const input = document.getElementById("mysearch");
  const filter = input.value.toUpperCase();
  const items = document.querySelectorAll(".tile1");

  for (let i = 0; i < items.length; i++) {
    if (!filter) {
      items[i].style.display = "";
      continue;
    }
    const text = items[i].textContent.toUpperCase();
    if (text.includes(filter)) {
      items[i].style.display = "";
    } else {
      items[i].style.display = "none";
    }
  }
}

const clear = document.querySelector('.filtr');
const clearSearch = () => {
  const items = document.querySelectorAll(".tile1");

  for (let i = 0; i < items.length; i++) {
    items[i].style.display = "";
  }

  const input = document.getElementById("mysearch");
  input.value = "";
}
clear.addEventListener("click",clearSearch);








