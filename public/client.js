const BASE_URL = "/users";

const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");
const statusDiv = document.getElementById("status");

registerForm.addEventListener("submit",async(e)=>{
    e.preventDefault();
    const username = document.getElementById("regUsername").value;
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;

    try{
        const res = await fetch(`${BASE_URL}/register`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({username,email,password})
        });
        const data = await res.json();

        if(res.ok){
            localStorage.setItem("token",data.token);
            localStorage.setItem("user",JSON.stringify(data.user));
            statusDiv.innerText = "Registered and loggedIn!";
            window.location.href = "chat.html"
        }else{
            statusDiv.innerText=data.message;
        }
    }catch(err){
        console.log(err);
    }
});

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("loginUsername").value;
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    try {
      const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ username, email, password })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        statusDiv.innerText = ":white_check_mark: Logged in!";
        window.location.href = "chat.html"; // redirect to chat page
      } else {
        statusDiv.innerText = ":x: " + data.message;
      }
    } catch (err) {
      console.error(err);
    }}
)