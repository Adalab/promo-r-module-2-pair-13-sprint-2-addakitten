'use strict';


/* Elementos que usamos en el HTML */
const newFormElement = document.querySelector('.js-new-form');
const listElement = document.querySelector('.js-list');
const searchButton = document.querySelector('.js-button-search');
const buttonAdd = document.querySelector('.js-btn-add');
const buttonCancelForm = document.querySelector('.js-btn-cancel');
const inputDesc = document.querySelector('.js-input-desc');
const inputPhoto = document.querySelector('.js-input-photo');
const inputName = document.querySelector('.js-input-name');
const inputRace = document.querySelector('.js-input-race');
const linkNewFormElememt = document.querySelector('.js-button-new-form');
const labelMesageError = document.querySelector('.js-label-error');
const input_search_desc = document.querySelector('.js_in_search_desc');
const input_search_race = document.querySelector ('.js_in_search_race');

//Objetos con cada gatito
// const kittenData_1 = {
//     image: "https://ychef.files.bbci.co.uk/976x549/p07ryyyj.jpg",
//     name: "Anastacio",
//     desc: "Ruiseño, juguetón, le guta estar tranquilo y que nadie le moleste. Es una maravilla acariciarle!",
//     race: "British Shorthair",
// };
// const kittenData_2 = {
//     image: "https://media-cldnry.s-nbcnews.com/image/upload/t_nbcnews-fp-1200-630,f_auto,q_auto:best/newscms/2019_39/3021711/190923-cat-pet-stock-cs-1052a.jpg",
//     name: "Fiona",
//     desc: "Juguetón, le guta estar tranquilo y que nadie le moleste. Es una maravilla acariciarle!",
//     race: "British Shorthair",
// };
// const kittenData_3 = {
//     image: "https://images.emedicinehealth.com/images/article/main_image/cat-scratch-disease.jpg",
//     name: "Cielo",
//     desc: "Ruiseño, juguetón, le guta estar tranquilo y que nadie le moleste. Es una maravilla acariciarle!",
//     race: "British Shorthair",
// };

//const kittenDataList = [kittenData_1, kittenData_2, kittenData_3];

//Funciones
function renderKitten(kittenData) {
 
    const kitten = `<li class="card">
    <article>
      <img
        class="card_img"
        src=${kittenData.image}
        alt="gatito"
      />
      <h3 class="card_title">${kittenData.name}</h3>
      <h3 class="card_race">${kittenData.race}</h3>
      <p class="card_description">
      ${kittenData.desc}
      </p>
    </article>
    </li>`;
    return kitten;
}

function renderKittenList(kittenDataList) {
    listElement.innerHTML = "";
    for (const kittenItem of kittenDataList) {
        listElement.innerHTML += renderKitten(kittenItem);
    }
}

//Mostrar/ocultar el formulario
function showNewCatForm() {
    newFormElement.classList.remove('collapsed');
}
function hideNewCatForm() {
    newFormElement.classList.add('collapsed');
}

function handleClickNewCatForm(event) {
    event.preventDefault();
    if (newFormElement.classList.contains('collapsed')) {
        showNewCatForm();
    } else {
        hideNewCatForm();
    }
}
//Adicionar nuevo gatito
//Ejercicio 1 aarays bucles 2
let gato = {};
function addNewKitten(event) {
    event.preventDefault();
    debugger;
        //obtener la información de los gatitos del formulario
        const newImage = inputPhoto.value;
        const newDescription = inputDesc.value;
        const newName = inputName.value;
        const newRace = inputRace.value;
        //nuevo objeto con la info del gatito
        const newKittenDataObject = {
        image: newImage,
        name: newName,
        desc: newDescription,
        race: newRace,
        };
    if (newDescription === "" &&  newImage === "" && newName === "") {
        labelMesageError.innerHTML = "Debe rellenar todos los valores";
    } else {
        if (newDescription !== "" && newImage !== "" && newName  !== "") {
            labelMesageError.innerHTML =  "Mola! Un nuevo gatito en Adalab!";
        }

    }
    kittenDataList.push(newKittenDataObject);
    renderKittenList(kittenDataList);
  //peticion mandar gatito  
fetch(`https://dev.adalab.es/api/kittens/${GITHUB_USER}`, {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify(newKittenDataObject),
})
  .then((response) => response.json())
  .then((data) => {
    if (data.success) {
       // localStorage
    
      //Completa y/o modifica el código:
      //Agrega el nuevo gatito al listado
      //Guarda el listado actualizado en el local stoarge
      //Visualiza nuevamente el listado de gatitos
      //Limpia los valores de cada input
    } else {
      //muestra un mensaje de error.
    }
  });

}
//Cancelar la búsqueda de un gatito
function cancelNewKitten(event) {
    event.preventDefault();
    newFormElement.classList.add("collapsed");
    inputDesc.value = "";
    inputPhoto.value = "";
    inputName.value = "";
}

//Filtrar por descripción
function filterKitten(event) {
    event.preventDefault();
    //Modifica el código:
    //Haz un filter sobre el listado de gatitos
    //Vuelve a pintar el listado de gatitos filtrados en el HTML.
    const inputDesc = input_search_desc.value;
    const inputRace = input_search_race.value;
    const filteredDesc = kittenDataList
    .filter((kittenDesc) => kittenDesc.desc.includes(inputDesc))
    .filter((kittenRace) => kittenRace.race.includes(inputRace));
    renderKittenList(filteredDesc);
    //si le quitamos el listElement.innerHTML =, funciona
    // listElement.innerHTML = renderKitten(filteredDesc);
}

//Mostrar el litado de gatitos en ell HTML
//renderKittenList(kittenDataList);

const kittenListStored = JSON.parse(localStorage.getItem('kittensList'));

const GITHUB_USER = 'BarbaraGB1';
const SERVER_URL = `https://dev.adalab.es/api/kittens/${GITHUB_USER}`;
let kittenDataList =[];
//Peticiones al servidor 
if (kittenListStored !== null){
    kittenDataList = kittenListStored;
    renderKittenList(kittenDataList);
}
else{ 
fetch(SERVER_URL, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
    }).then(response => response.json())
  .then(data => {
    console.log(data)
    kittenDataList = data.results
    console.log(kittenDataList)
    renderKittenList(kittenDataList);
    localStorage.setItem('kittensList', JSON.stringify( kittenDataList));
   }
  )
}


//Eventos
linkNewFormElememt.addEventListener("click", handleClickNewCatForm);
searchButton.addEventListener("click", filterKitten);
buttonAdd.addEventListener("click", addNewKitten);
buttonCancelForm.addEventListener("click", cancelNewKitten);






