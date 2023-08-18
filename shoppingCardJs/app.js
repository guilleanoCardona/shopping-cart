const cards = document.getElementById("cards");
const items = document.getElementById("items");
const footer = document.getElementById("footer");
const templateCard = document.getElementById("template-card").content;
const fragment = document.createDocumentFragment();
const templateFooter = document.getElementById("template-footer").content;
const templateCarrito = document.getElementById("template-carrito").content;
let carrito = {};

document.addEventListener("DOMContentLoaded", () => {
  fetchData();
});

cards.addEventListener("click", (e) => {
  addCarrito(e);
});

const fetchData = async () => {
  try {
    const res = await fetch("api.json");
    const data = await res.json();
    pintarCards(data);
  } catch (error) {
    console.log(error);
  }
};

const pintarCards = (data) => {
  data.forEach((element) => {
    templateCard.querySelector("h5").textContent = element.title;
    templateCard.querySelector("p").textContent = element.precio;
    templateCard.querySelector("img").setAttribute("src", element.thumbnailUrl);
    templateCard.querySelector(".btn-dark").dataset.id = element.id;

    const clone = templateCard.cloneNode(true);
    fragment.appendChild(clone);
  });
  cards.appendChild(fragment);
};

const addCarrito = (e) => {
  if (e.target.classList.contains("btn-dark")) {
    //console.log(e.target.parentElement);
    setCarrito(e.target.parentElement);
  }
  e.stopPropagation();
};

const setCarrito = (object) => {
  const producto = {
    id: object.querySelector(".btn-dark").dataset.id,
    title: object.querySelector("h5").textContent,
    precio: object.querySelector("p").textContent,
    cantidad: 1,
  };
  if (carrito.hasOwnProperty(producto.id)) {
    producto.cantidad = carrito[producto.id].cantidad + 1;
  }
  carrito[producto.id] = { ...producto };
  pirntarCarrito();
};

const pirntarCarrito = () => {
  console.log(carrito);
  items.innerHTML = "";
  Object.values(carrito).forEach((producto) => {
    templateCarrito.querySelector("th").textContent = producto.id;
    templateCarrito.querySelectorAll("td")[0].textContent = producto.title;
    templateCarrito.querySelectorAll("td")[1].textContent = producto.cantidad;
    templateCarrito.querySelector(".btn-info").dataset.id = producto.id;
    templateCarrito.querySelector(".btn-danger").dataset.id = producto.id;
    templateCarrito.querySelector("span").textContent =
      producto.cantidad * producto.precio;

    const clone = templateCarrito.cloneNode(true);
    fragment.appendChild(clone);
  });
  items.appendChild(fragment);

  const pintarFooter = () => {
    footer.innerHTML = "";
    if (Object.keys(carrito).length === 0) {
      footer.innerHTML = `<th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>`;
    }

    const nCantidades = Object.values(carrito).reduce((act, { cantidad }) => {
      act + (cantidad, 0);
    });
    const nPrecio = Object.values(carrito).reduce(
      (act, { cantidad, precio }) => {}
    );
    console.log(nCantidades);
  };
};
