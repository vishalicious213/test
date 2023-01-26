import {menuArray} from "./data.js"

const modal = document.getElementById("modal")
const confirmationMsg = document.getElementById("confirmation-msg")
const infoForm = document.getElementById("info-form")


let myOrderArray = []
let totalPrice = 0
    
document.addEventListener('click', function(e){
    if(e.target.dataset.add){
        createOrderArray(e.target.dataset.add)
    } else if (e.target.dataset.remove){
        removeOrderItems(e.target.dataset.remove)
    } else if (e.target.id === "complete-btn"){
        openModal()
    } 
})

//  Get initial menu HTML for homepage
function getMenuItems() {
    
    let menuHtml = ""
    
    menuArray.forEach(function(food){
        menuHtml += `

    <div class="food-inner">
        <p class="food-emoji">${food.emoji}</p>
        <div class="food-details">
            <p class="food-name">${food.name}</p>
            <p class="food-ingredients">${food.ingredients}</p>
            <p class="food-price">$${food.price}</p>   
        </div> 
         <i class="fa-solid fa-circle-plus add-food" data-add="${food.id}"></i>
                
    </div>

`
    })
    
    return menuHtml
}

// Render initial menu HTML to DOM
function renderMenu() {
    const menuSection = document.getElementById("menu-section")
    menuSection.innerHTML = getMenuItems()
}


renderMenu()


// Create new order array when Add button is clicked
function createOrderArray(foodId){ 
    const targetFoodObj = menuArray.filter(function(food){
        return food.id.toString() === foodId
    })[0]
    
    myOrderArray.push(targetFoodObj)
    
    totalPrice = 0
    myOrderArray.forEach(function(food){
        totalPrice += food.price
    })
    
    getOrderItems()
    
}

// Creates Order Menu HTML and adds it to the DOM
function getOrderItems() {
    
    let foodAddedHtml = ""
    let orderMenuHtml = ""
    
    
    myOrderArray.forEach(function(food){
        foodAddedHtml += `
        <div class = "food-added">
            <div>
                ${food.name}
                <button id="remove-btn" data-remove="${food.id}">remove<button>
            </div>
            <div class="food-price">
                $${food.price}
            </div>
        </div>
`

    orderMenuHtml = `
    
    <div class= "container" id="container">
        <h2>Your Order</h2>
        <div class="order-inner">
            ${foodAddedHtml}
        </div>
        <hr>
        <div class= "total-price">
            <div>
                <p>Total Price</p>
            </div>
            <div class="food-price">
                $${totalPrice}
            </div>
        </div>
        
        <button class="complete-btn" id="complete-btn">Complete order</button>
    </div>
    `  
    
    return orderMenuHtml  
    })

    
    document.getElementById("order-section").innerHTML = orderMenuHtml
    
}

// Remove selected food item from new Order Array

function removeOrderItems(foodId) {
    const targetFoodObj = menuArray.filter(function(food){
        return food.id.toString() === foodId
    })[0]
    myOrderArray.splice(myOrderArray.indexOf(targetFoodObj),1)
    
    totalPrice = 0
    myOrderArray.forEach(function(item){
        totalPrice += item.price
    })
    
    getOrderItems()
    }
    

// Open Modal when Complete Button is clicked

function openModal() {
    modal.classList.toggle("hidden")

}

// Close modal & display thank you message when Pay button is clicked
    
    infoForm.addEventListener("submit", function(e){
        e.preventDefault()
        
        const infoFormData = new FormData(infoForm)
        const fullName = infoFormData.get("full-name")
        
        let container = document.getElementById("container")
        container.classList.add("hidden") 
        modal.classList.toggle("hidden") 
        confirmationMsg.classList.toggle("hidden")
        
      
        confirmationMsg.innerHTML += `
        <h4>Thanks, ${fullName}! Your order is on its way!</h4>
        `
    })



 
