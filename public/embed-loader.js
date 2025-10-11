const token = document.currentScript.dataset.widgetToken;
const host = "http://192.168.1.12:3000"; // replace it with the deployed url of this nextjs app

// 1️⃣ Create a floating chat button
const btn = document.createElement("div");
btn.innerHTML = "💬"; 
Object.assign(btn.style, {
  position:"fixed", bottom:"20px", right:"20px",
  width:"50px", height:"50px", borderRadius:"50%",
  background:"#0078FF", color:"#fff", display:"flex",
  alignItems:"center", justifyContent:"center",
  cursor:"pointer", zIndex:"999999"
});
document.body.appendChild(btn);

// 2️⃣ Create a hidden iframe pointing to your chat app
const iframe = document.createElement("iframe");
iframe.src = `${host}/chat`;
Object.assign(iframe.style, {
  position:"fixed", bottom:"80px", right:"20px",
  width:"350px", height:"500px",
  border:"none", borderRadius:"10px",
  display:"none", zIndex:"999999",
  boxShadow:"0 4px 8px rgba(0,0,0,0.2)"
});
document.body.appendChild(iframe);

// 3️⃣ Toggle iframe visibility when button is clicked
btn.addEventListener("click", () => {
  iframe.style.display = iframe.style.display==="none"?"block":"none";
});

// // create a button
// const button = document.createElement("button")
// button.innerHTML = "Ask AI"
// document.body.appendChild(button)

// // create an iframe and direct to the /embed page
// const iframe = document.createElement('iframe')
// iframe.src = 'http://localhost:3000/embed'
// iframe.style.display = "none"
// document.body.appendChild(iframe)

// button.addEventListener("click", () =>{
//     iframe.style.display = iframe.style.display == "block" ? "none" : "block";
// })
// // append it