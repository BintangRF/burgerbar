document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      { id: 1, name: "Super Burger", img: "burger.jpeg", price: 45000 },
      { id: 2, name: "Golden Fries", img: "fries.jpeg", price: 15000 },
      { id: 3, name: "Big Hotdog", img: "hotdog.jpeg", price: 25000 },
      { id: 4, name: "Just Nuggets", img: "nuggets.jpeg", price: 25000 },
      { id: 5, name: "Onion Ring", img: "onion.jpeg", price: 15000 },
      { id: 6, name: "Quesadilla", img: "quesadilla.jpeg", price: 35000 },
      { id: 7, name: "Sand Sandwich", img: "sandwich.jpeg", price: 45000 },
      { id: 8, name: "Potato Wedges", img: "wedges.jpeg", price: 25000 },
    ],
  }));
  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      const cartItem = this.items.find((item) => item.id === newItem.id);
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        this.items = this.items.map((item) => {
          if (item.id !== newItem.id) {
            return item;
          } else {
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
    },
    remove(id) {
      const cartItem = this.items.find((item) => item.id === id);
      if (cartItem.quantity > 1) {
        this.items = this.items.map((item) => {
          if (item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (cartItem.quantity === 1) {
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
  });
});

// Payment Gateway
const checkoutBtn = document.getElementById("checkoutBtn");
const form = document.querySelector("#checkoutForm");

checkoutBtn.addEventListener("click", async function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const data = new URLSearchParams(formData);
  const objData = Object.fromEntries(data);
  console.log(objData);
  try {
    const response = await fetch("midtrans/midtrans.php", {
      method: "POST",
      body: data,
    });
    const token = await response.text();
    console.log(token);
    window.snap.pay(token);
  } catch (error) {
    console.log(error.message);
  }
});

const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
