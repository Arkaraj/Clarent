let auth = "664"; // User must be logged to write the resource. Everyone can read the resource.
let own = "644"; // User must own the resource to write the resource. Everyone can read the resource.

// eslint-disable-next-line
export default {
  getAllProducts: async () => {
    const res = await fetch(`${auth}/products`);
    let data = await res.json();
    return data;
  },
  getSpecificProduct: async (id) => {
    const res = await fetch(`${auth}/products?id=${id}`);
    const data = await res.json();
    return data[0];
  },
  create: async (product, at) => {
    const res = await fetch(`${auth}/product`, {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${at}`,
      },
    });
    let data = {};
    data = await res.json();
    if (res.status == 200) {
      data.success = true;
    } else {
      data.success = false;
    }
    return data;
  },
  // same will be used to remove from cart as well
  addToCart: async (product, at) => {
    const res = await fetch(`carts/`, {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${at}`,
      },
    });
    let dataFrmt = { success: false, message: "", data: null };
    let data = await res.json();
    if (res.status == 201) {
      dataFrmt.success = true;
      dataFrmt.data = data;
      dataFrmt.message = "Successfully Registered!";
    } else {
      dataFrmt.message = data;
      dataFrmt.success = false;
    }
    return dataFrmt;
  },
  addToWishList: async (favs, at) => {
    const res = await fetch(`${own}/favourites`, {
      method: "POST",
      body: JSON.stringify(favs),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${at}`,
      },
    });
    return await res.json();
  },
  order: async (orders, at) => {
    const res = await fetch(`orders/`, {
      method: "POST",
      body: JSON.stringify(orders),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${at}`,
      },
    });
    let dataFrmt = { success: false, data: null };
    let data = await res.json();
    if (res.status == 201) {
      dataFrmt.success = true;
      dataFrmt.data = data;
    } else {
      dataFrmt.data = data;
      dataFrmt.success = false;
    }
    return dataFrmt;
  },
  getAllWishListProducts: async (at, id) => {
    const res = await fetch(`${auth}/favourites?userid=${id}`, {
      headers: {
        Authorization: `Bearer ${at}`,
      },
    });
    return await res.json();
  },
  getAllOrderedProducts: async (at, id) => {
    const res = await fetch(`${auth}/orders?userid=${id}`, {
      headers: {
        Authorization: `Bearer ${at}`,
      },
    });
    return await res.json();
  },
  removeFromCart: async (id, at) => {
    const res = await fetch(`carts/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${at}`,
      },
    });
    let dataFrmt = { success: false, message: "", data: null };
    let data = await res.json();
    if (res.status == 200) {
      dataFrmt.success = true;
      dataFrmt.data = data;
      dataFrmt.message = "Removed!";
    } else {
      dataFrmt.message = data;
      dataFrmt.success = false;
    }
    return dataFrmt;
  },
};
