let auth = "664"; // User must be logged to write the resource. Everyone can read the resource.

// eslint-disable-next-line
export default {
  getAllProducts: async () => {
    const res = await fetch(`${auth}/products`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
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
  getSpecificProduct: async (at, id) => {
    const res = await fetch(`${auth}/products/${id}`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
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
};
