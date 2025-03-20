const navToggle=document.createElement("div");navToggle.className="nav-toggle";navToggle.innerHTML="&#9776;";document.querySelector("nav").prepend(navToggle);navToggle.addEventListener("click",()=>{document.querySelector("nav ul").classList.toggle("show")});document.addEventListener("DOMContentLoaded",function(){const registrationForm=document.getElementById("registrationForm");if(registrationForm){registrationForm.addEventListener("submit",function(e){e.preventDefault();const name=document.getElementById("name").value.trim();const email=document.getElementById("email").value.trim();const phone=document.getElementById("phone").value.trim();const sport=document.getElementById("sport").value;const age=document.getElementById("age").value.trim();if(name===""||email===""||phone===""||sport===""||age===""){alert("Please fill in all fields.");return}
if(!/^[a-zA-Z ]{3,}$/.test(name)){alert("Please enter a valid name (only letters, at least 3 characters).");return}
if(!/^\d{10}$/.test(phone)){alert("Please enter a valid 10-digit phone number.");return}
if(age<10||age>50){alert("Age must be between 10 and 50.");return}
alert("Registration Successful!");registrationForm.reset()})}});document.addEventListener("DOMContentLoaded",function(){const contactForm=document.querySelector(".contact form");if(contactForm){contactForm.addEventListener("submit",function(e){e.preventDefault();const name=document.getElementById("name").value.trim();const email=document.getElementById("email").value.trim();const message=document.getElementById("message").value.trim();if(name===""||email===""||message===""){alert("Please fill in all fields.");return}
alert("Message Sent Successfully!");contactForm.reset()})}})
