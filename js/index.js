document.addEventListener("DOMContentLoaded", () => {
  // creating new Monsters

  let form = document.querySelector("#create-monster");
  form.innerHTML = `
  <div>
<label for="monsterName">Name:</label>
<input type= "text" id="monsterName" placeholder="enter the name" required/>
</div>
<div>
<label for="monsterAge">Age:</label>
<input type="number" id="monsterAge" placeholder="enter the age" required>
</div>
<div>
<label for="monsterDescription">Description:</label>
<input type="text" id="monsterDescription" placeholder="enter the description" required/>
</div>

<button id="submit">Create</button>
`;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let monsterObj = {
      name: e.target.monsterName.value,
      age: e.target.monsterAge.value,
      descripttion: e.target.monsterDescription.value,
    };
    postMonsters(monsterObj);
  });

  let currentPage = 1;
  const itemsPerPage = 50;
  // displaying to the DOM
  function displayMonsters(data) {
    let container = document.querySelector("#monster-container");
    let containerHolder = document.createElement("ul");
    containerHolder.style = " list-style: none; border: 1px solid ;";

    for (let i = 0; i < currentPage * itemsPerPage; i++) {
      if (data[i]) {
        let containerList = document.createElement("li");
        containerList.innerHTML = `
            <h2>Name: ${data[i].name}</h2>
            <p>Age: ${data[i].age}</p>
            <p>Description: ${data[i].description}</p>
          `;
        containerHolder.appendChild(containerList);
      }
    }

    container.appendChild(containerHolder);

    // This button is to go backwards
    let backwards = document.querySelector("#back");
    backwards.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
      }
      fetchMonsters();
    });

    // This button is to show 50 more monster names
    let forward = document.querySelector("#forward");
    forward.addEventListener("click", () => {
      currentPage++;
      fetchMonsters();
    });

    if (currentPage === 1) {
      backwards.disabled = true;
    } else {
      backwards.disabled = false;
    }
  }
  // Firstly i want to fetch all monsters

  const baseUrl = "http://localhost:3000/monsters";

  function fetchMonsters() {
    fetch(baseUrl)
      .then((res) => res.json())
      .then((data) => displayMonsters(data))
      .catch((error) => console.error("error", error));
  }
  // This is to create new monsters
  function postMonsters(monsterObj) {
    fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(monsterObj),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("error", error));
  }
  // calling the fetch GET request
  fetchMonsters();
});
