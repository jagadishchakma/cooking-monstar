// search event handler
document.getElementById('search').addEventListener('click', ()=>{
    const searchKey = document.getElementById('search-input').value;
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchKey}`;
    searchMeals(url);
})

// meals searching  data load
function searchMeals(url) {
    fetch(url)
    .then(res => res.json())
    .then(data => displayMeals(data))
    .catch(error => notFound())
}


// display search meals
displayMeals = (data) => {
    const row = document.querySelector('.row');
    row.innerHTML = " "
    data.meals.forEach((meals) => {
        const col = document.createElement('div');
        col.className = 'col-md-4';
        col.innerHTML = `
        <div class="meal" onclick="mealDetails('https://www.themealdb.com/api/json/v1/1/search.php?s=${meals.strMeal}')" data-bs-toggle="modal" data-bs-target="#exampleModal">
            <div class="card">
                <img src="${meals.strMealThumb}" class="card-img-top" alt="${meals.strMeal}">
                <div class="card-body">
                        <h5 class="card-text text-center">${meals.strMeal}</h5>
                </div>
            </div>
        </div>
        `;
        row.appendChild(col)
    })
}


// not found error display
notFound = () => {
    const row = document.querySelector('.row');
    row.innerHTML = `
    <div class="alert alert-warning alert-dismissible fade show" role="alert">
    <strong>Woops!</strong> Sorry, no meals found.
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    `
}

// meals details data load
 mealDetails = async (url) => {
    await fetch(url)
    .then(res => res.json())
    .then(data => displayMealDetails(data))
    
}

//display meals details with pop ups
displayMealDetails = (data) => {
    document.querySelector('.modal-dialog').innerHTML = " ";
    data.meals.map((meals) => {
        document.querySelector('.modal-dialog').innerHTML =  `
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">${meals.strMeal}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"
                    aria-label="Close"></button>
            </div>
            <div class="modal-body">
                 <img src="${meals.strMealThumb}" width="100%">
            </div>
            <div class="modal-footer">
                <div>
                <h1> ${meals.strMeal}</h1>
                <h4>Ingredient</h4>
                <ul>
                        <li><i class="fas fa-check-square"></i> ${meals.strIngredient1}</li>
                        <li><i class="fas fa-check-square"></i> ${meals.strIngredient2}</li>
                        <li><i class="fas fa-check-square"></i> ${meals.strIngredient3}</li>
                        <li><i class="fas fa-check-square"></i> ${meals.strIngredient4}</li>
                        <li><i class="fas fa-check-square"></i> ${meals.strIngredient5}</li>
                        <li><i class="fas fa-check-square"></i> ${meals.strMeasure1}</li>
                        <li><i class="fas fa-check-square"></i> ${meals.strMeasure2}</li>
                        <li><i class="fas fa-check-square"></i> ${meals.strMeasure3}</li>
                        <li><i class="fas fa-check-square"></i> ${meals.strMeasure4}</li>
                        <li><i class="fas fa-check-square"></i> ${meals.strMeasure5}</li>
                </ul>
                </div>
            </div>
        `;
    })
   
}