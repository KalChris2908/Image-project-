// NEXADEV INTERACTIVE SCRIPT (FINAL & CLEAN)

document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelector(".nav-links");

  /* -----------------------------------------
     CREATE AUTH BUTTON + USER DISPLAY
  ------------------------------------------ */
  const authBtn = document.createElement("button");
  authBtn.textContent = "Sign In";
  authBtn.style.marginLeft = "20px";
  authBtn.style.padding = "8px 16px";
  authBtn.style.background = "#00b7ff";
  authBtn.style.color = "white";
  authBtn.style.border = "none";
  authBtn.style.borderRadius = "5px";
  authBtn.style.cursor = "pointer";
  authBtn.style.fontSize = "16px";

  const userBubble = document.createElement("span");
  userBubble.style.color = "white";
  userBubble.style.marginLeft = "12px";
  userBubble.style.display = "none";

  navbar.appendChild(authBtn);
  navbar.appendChild(userBubble);

  /* -----------------------------------------
     SIGN-IN MODAL (CREATED BY JS)
  ------------------------------------------ */
  const modal = document.createElement("div");
  modal.id = "authModal";
  modal.style.position = "fixed";
  modal.style.inset = "0";
  modal.style.display = "none";
  modal.style.justifyContent = "center";
  modal.style.alignItems = "center";
  modal.style.background = "rgba(0,0,0,0.5)";
  modal.style.zIndex = "9999";

  modal.innerHTML = `
    <div style="
      background:white;
      width:90%;
      max-width:350px;
      padding:20px;
      border-radius:10px;
      text-align:center;
    ">
      <h3 style="margin-bottom:15px;">Sign In</h3>
      <input type="text" id="username" placeholder="Enter your name" 
        style="width:100%;padding:10px;margin-bottom:15px;border:1px solid #ccc;border-radius:5px;">
      <button id="submitUser" style="
        width:100%;
        padding:10px;
        background:#00b7ff;
        color:white;
        border:none;
        border-radius:5px;
        cursor:pointer;
      ">Continue</button>
      <button id="closeModal" style="
        width:100%;
        padding:10px;
        margin-top:10px;
        background:#ccc;
        border:none;
        border-radius:5px;
        cursor:pointer;
      ">Cancel</button>
    </div>
  `;

  document.body.appendChild(modal);

  const usernameInput = modal.querySelector("#username");
  const submitUser = modal.querySelector("#submitUser");
  const closeModal = modal.querySelector("#closeModal");

  /* -----------------------------------------
     LOCAL STORAGE HANDLER
  ------------------------------------------ */
  function saveUser(name) {
    localStorage.setItem("nexadevUser", name);
  }

  function loadUser() {
    return localStorage.getItem("nexadevUser");
  }

  function removeUser() {
    localStorage.removeItem("nexadevUser");
  }

  /* -----------------------------------------
     UI UPDATE ON LOGIN/LOGOUT
  ------------------------------------------ */
  function refreshUI() {
    const user = loadUser();

    if (user) {
      authBtn.textContent = "Log Out";
      userBubble.textContent = `Hi, ${user}`;
      userBubble.style.display = "inline-block";
    } else {
      authBtn.textContent = "Sign In";
      userBubble.style.display = "none";
    }
  }

  refreshUI();

  /* -----------------------------------------
     AUTH BUTTON HANDLER
  ------------------------------------------ */
  authBtn.addEventListener("click", () => {
    if (loadUser()) {
      // Log out
      removeUser();
      refreshUI();
      alert("You have logged out.");
    } else {
      modal.style.display = "flex";
      usernameInput.value = "";
      usernameInput.focus();
    }
  });

  /* -----------------------------------------
     MODAL BUTTONS
  ------------------------------------------ */

  submitUser.addEventListener("click", () => {
    const name = usernameInput.value.trim();
    if (name.length < 2) {
      alert("Enter a valid name.");
      return;
    }

    saveUser(name);
    refreshUI();
    modal.style.display = "none";
    alert(`Welcome, ${name}!`);
  });

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });

  /* -----------------------------------------
     RESPONSIVE MOBILE MENU
  ------------------------------------------ */
  const menuBtn = document.createElement("button");
  menuBtn.textContent = "☰";
  menuBtn.style.fontSize = "28px";
  menuBtn.style.color = "white";
  menuBtn.style.background = "transparent";
  menuBtn.style.border = "none";
  menuBtn.style.cursor = "pointer";
  menuBtn.style.display = "none";

  navbar.insertBefore(menuBtn, navLinks);

  function updateMenuUI() {
    if (window.innerWidth <= 768) {
      menuBtn.style.display = "block";
      navLinks.style.display = "none";
      navLinks.style.position = "absolute";
      navLinks.style.top = "70px";
      navLinks.style.right = "20px";
      navLinks.style.background = "black";
      navLinks.style.flexDirection = "column";
      navLinks.style.padding = "15px";
      navLinks.style.borderRadius = "8px";
      navLinks.style.gap = "15px";
      navLinks.style.zIndex = "1000";
    } else {
      menuBtn.style.display = "none";
      navLinks.style.display = "flex";
      navLinks.style.position = "";
      navLinks.style.background = "";
      navLinks.style.padding = "";
      navLinks.style.borderRadius = "";
      navLinks.style.flexDirection = "row";
      navLinks.style.gap = "30px";
    }
  }

  updateMenuUI();
  window.addEventListener("resize", updateMenuUI);

  menuBtn.addEventListener("click", () => {
    const current = navLinks.style.display === "none" ? "flex" : "none";
    navLinks.style.display = current;
  });

  navLinks.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      navLinks.style.display = "none";
    }
  });
});
