/**
 * This code is just to read the json file.
 * Write your own code in the renderCards function.
 */

fetch("./data/heroes.json")
  .then((response) => {
    return response.json();
  })
  .then((jsondata) => {
    console.log(jsondata);
    renderCards(jsondata);
  })
  .catch((e) => {
    console.log(e);
  });

function renderCards(jsondata) {
  const container = document.querySelector("#characters");

  let html = "";

  for (let char of jsondata.data.results) {
    let description = char.description;

    if (description === "") {
      description = "No description available.";
    }

    let comics = "";

    for (let comic of char.comics.items) {
      comics += "<li>" + comic.name + "</li>";
    }

    html += `
      <div class="col">
        <div class="card h-100">
          <img
            src="${char.thumbnail.path}.${char.thumbnail.extension}"
            class="card-img-top"
            alt="${char.name}"
          >

          <div class="card-body">
            <h5 class="card-title">${char.name}</h5>
            <p class="card-text">${description}</p>

            <div class="accordion" id="accordion${char.id}">
              <div class="accordion-item">
                <h2 class="accordion-header" id="heading${char.id}">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse${char.id}"
                    aria-expanded="false"
                    aria-controls="collapse${char.id}"
                  >
                    Comics
                  </button>
                </h2>

                <div
                  id="collapse${char.id}"
                  class="accordion-collapse collapse"
                  aria-labelledby="heading${char.id}"
                >
                  <div class="accordion-body">
                    <ul>
                      ${comics}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  container.innerHTML = html;
}