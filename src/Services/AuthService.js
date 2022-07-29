// eslint-disable-next-line
export default {
  register: async (user) => {
    const res = await fetch(`register`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let data;
    data = await res.json();
    if (res.status == 200) {
      data.success = true;
    } else {
      data.success = false;
    }
    return data;
  },
  login: async (user) => {
    const res = await fetch(`login`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let dataFrmt = { success: false, message: "", data: null };
    let data = await res.json();
    if (res.status == 200) {
      dataFrmt.success = true;
      dataFrmt.data = data;
    } else {
      dataFrmt.message = data;
      dataFrmt.success = false;
    }
    return dataFrmt;
  },
  logout: async (at) => {
    const res = await fetch(`660/logout`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${at}`,
      },
    });

    let data = await res.json();
    return data;
  },
};
