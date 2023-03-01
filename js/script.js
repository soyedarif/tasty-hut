const loadMeals= async(searchText,dataLimit)=>{
    const res=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`);
    const data=await res.json();
    displayMeals(data.meals,dataLimit);
}
const loadMealByID=async(id)=>{
    const res=await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data=await res.json();
    console.log(data.meals[0]);
}
const displayMeals=(meals,dataLimit)=>{
    const foodContainer=document.getElementById('food-container');
    foodContainer.innerHTML='';
    const showAll=document.getElementById('show-all');
    if(dataLimit&&meals.length>5){
        meals=meals.slice(0,6);  //new data value assigned according to condition
        showAll.classList.remove('hidden')
    }else{
        showAll.classList.add('hidden')
    }
    meals.forEach(meal=>{
        console.log(meal);
        const {strMeal,strInstructions,strMealThumb,idMeal}=meal;
        foodContainer.innerHTML+=`
        <div class="card card-side bg-base-100 shadow-xl">
                    <figure><img src="${strMealThumb}" alt="Movie"/></figure>
                    <div class="card-body">
                      <h2 class="card-title mb-4 text-2xl font-bold text-tGrey1">${strMeal}</h2>
                      <p class="text-[#706F6F] text-lg">${strInstructions.slice(0,150)}...</p>
                      <div class="card-actions justify-start">
                        <a href="#meal-modal" onclick="loadMealByID(${idMeal})" class="text-tYellow underline">View Details</a>
                      </div>
                    </div>
                  </div>
        `
    })
}
const searchInput=(dataLimit)=>{
    const searchField=document.getElementById('search-field');
    const searchValue=searchField.value;
    loadMeals(searchValue,dataLimit)
}
document.getElementById('btn-search').addEventListener('click',function(){
    searchInput(6)
})
document.getElementById('search-field').addEventListener('keydown',function(e){
    if(e.key==='Enter'){
        searchInput(6)
    }
})
document.getElementById('show-all').addEventListener('click',function(){
    searchInput()
})

loadMeals('rice')