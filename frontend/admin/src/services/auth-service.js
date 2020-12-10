const API_URL = "http://localhost:8000/graphql";

class AuthService {
  login(email, password) {
    let requestBody = {
      query: `
              query {
                login(email: "${email}", password: "${password}") {
                  userId
                  token
                  tokenExpiration
                }
              }
            `,
    };

    fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then((resData) => {
        if (resData.data.login.token) {
          localStorage.setItem("user", JSON.stringify(resData.data.login));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
