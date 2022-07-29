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
    let dataFrmt = { success: false, message: "", data: null };
    let data = await res.json();
    if (res.status == 200) {
      dataFrmt.success = true;
      dataFrmt.data = data;
      dataFrmt.message = "Successfully Registered!";
    } else {
      dataFrmt.message = data;
      dataFrmt.success = false;
    }
    return dataFrmt;
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
};
