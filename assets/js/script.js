document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("loginBtn").addEventListener("click", function () {
    handleLogin();
  });

  function handleLogin() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const data = {
      Username: email,
      Password: password,
      QuanHuyenID: 9,
    };

    fetch("https://bandoso.vnptnghean.com.vn:9448/api/v1/User/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('data', data)
        if (data.Success) {
          alert(data.Message);
          window.location.href = "home.html";
        } else {
          alert(data.Message);
        }
      })
      .catch((error) => {
        console.error("Lỗi:", error);
        alert("Lỗi đăng nhập");
      });
  }

  document
    .getElementById("password")
    .addEventListener("keyup", function (event) {
      if (event.keyCode === 13) {
        handleLogin();
      }
    });
});
