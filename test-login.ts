fetch("http://127.0.0.1:3000/api/admin/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({username: "admin", password: "uttc2024"})
}).then(res => res.json()).then(console.log).catch(console.error);
