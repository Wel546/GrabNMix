const items = document.querySelectorAll(".item");
const slots = document.querySelectorAll(".slot");
const roupasContainer = document.querySelector(".roupas");

let draggedItem = null;
let origem = null;

// Começar a arrastar
items.forEach(item => {
  item.addEventListener("dragstart", () => {
    draggedItem = item;
    origem = "lista";
  });
});

// Permitir soltar nos slots
slots.forEach(slot => {
  slot.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  slot.addEventListener("drop", () => {
    if (!draggedItem) return;

    const itemType = draggedItem.getAttribute("data-type");
    const slotType = slot.getAttribute("data-type");

    if (itemType === slotType) {
      slot.innerHTML = "";

      const clone = draggedItem.cloneNode(true);
      clone.classList.add("no-slot");

      // Permitir arrastar de volta
      clone.addEventListener("dragstart", () => {
        draggedItem = clone;
        origem = "slot";
      });

      // Clique remove também
      clone.addEventListener("click", () => {
        clone.remove();
      });

      slot.appendChild(clone);
    } else {
      alert("Essa peça não combina com essa parte!");
    }
  });
});

// Permitir devolver para a lista
roupasContainer.addEventListener("dragover", (e) => {
  e.preventDefault();
});

roupasContainer.addEventListener("drop", () => {
  if (!draggedItem) return;

  if (origem === "slot") {
    draggedItem.remove();
  }
});