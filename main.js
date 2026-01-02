let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'create';
let temp;
//getTotal
function getTotal(){
    if(price.value != '' && taxes.value != '' && ads.value != ''){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value
        total.innerHTML = result;
        total.style.background = "green";
    }
    else{
          total.innerHTML = '';
          total.style.background = "blue";
    }
    getTotal();
}
//create product
let dataProduct;
if(localStorage.product != null){
    dataProduct = JSON.parse(localStorage.product);
}
else{
    dataProduct = [];
}
submit.onclick = function(){
    let newProduct = {
title : title.value.toLowerCase(),
price : price.value,
taxes : taxes.value,
ads : ads.value,
discount : discount.value,
total : total.innerHTML,
 count : count.value,
 category : category.value.toLowerCase(),
     
    }
    //(count) if user want to create one or more product
    if(title.value != '' && price.value != '' && category.value != ''){
        if(mood ==='create'){
          if(newProduct.count > 1){
        for(i = 0; i < newProduct.count; i++){
            dataProduct.push(newProduct);
        }
    }else{
        dataProduct.push(newProduct);
    }
}else{
           dataProduct[temp] = newProduct;
           mood = 'create';
           submit.innerHTML = "create";
           count.style.display = 'block';
    }
    }else{
        clearData();
    }
  

    
//save local storage
    localStorage.setItem('product', JSON.stringify(dataProduct))
    
    clearData();
    showData();
}


//clear inputs
//clear data
function clearData(){
    title.value = '';
    price.value = '';
    taxes. value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}
//read
function showData(){

    let table = '';
       for(i =0; i < dataProduct.length; i++){
        table += `
        <tr>
        <td>${i+1}</td>
        <td>${dataProduct[i].title}</td>
        <td>${dataProduct[i].price}</td>
        <td>${dataProduct[i].taxes}</td>
        <td>${dataProduct[i].ads}</td>
        <td>${dataProduct[i].discount}</td>
        <td>${dataProduct[i].total}</td>
        <td>${dataProduct[i].category}</td>
        
        <td><button onClick="updateData(${i})" id="update">update</button></td>
        <td><button onClick="deleteData(${i})" id="delete">delete</button></td>
        


        </tr>
        `
       }

    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll');
    if(dataProduct.length > 0){
        btnDelete.innerHTML = `
        <button onClick="deleteAll()">delete All(${dataProduct.length})</button>
        `
    }
    else{
        btnDelete.innerHTML = '';
    }
    getTotal();
}
showData();


//delete
function deleteData(i){
dataProduct.splice(i,1);
localStorage.product = JSON.stringify(dataProduct);
showData();
}
function deleteAll(){
    localStorage.clear()
    dataProduct.splice(0)
    showData();
}
//update
function updateData(i){
title.value = dataProduct[i].title;
price.value = dataProduct[i].price;
taxes.value = dataProduct[i].taxes;
ads.value = dataProduct[i].ads
discount.value = dataProduct[i].discount;
count.style.display = 'none';
category.value = dataProduct[i].category;
submit.innerHTML = 'update';
mood = 'update';
temp = i;
scroll({
    top : 0,
    behavior: 'smooth',

});
getTotal();
}
//search

function getSearchMoood(id){
     let searchMood = 'title';
    
    let search = document.getElementById('search');
  
    
    if(id == "searchTitle"){
        searchMood = 'title';
        search.placeholder = 'search by title'
    }else{
        searchMood = 'category';
          search.placeholder = 'search by catgory'
    }
    search.focus();
    search.value = '';
    showData();
}

function searchData(value){
    let table = '';
    let searchMood = 'title';
    if(searchMood == 'title'){
           for(i =  0; i < dataProduct.length;i++){
            if(dataProduct[i].title.includes(value.toLowerCase())){
                 table += `
        <tr>
        <td>${i}</td>
        <td>${dataProduct[i].title}</td>
        <td>${dataProduct[i].price}</td>
        <td>${dataProduct[i].taxes}</td>
        <td>${dataProduct[i].ads}</td>
        <td>${dataProduct[i].discount}</td>
        <td>${dataProduct[i].total}</td>
        <td>${dataProduct[i].category}</td>
        
        <td><button onClick="updateData(${i})" id="update">update</button></td>
        <td><button onClick="deleteData(${i})" id="delete">delete</button></td>
        


        </tr>
        `
            }
           }







    }else{
              for(i =  0; i < dataProduct.length;i++){
            if(dataProduct[i].category.includes(value.toLowerCase())){
                 table += `
        <tr>
        <td>${i}</td>
        <td>${dataProduct[i].title}</td>
        <td>${dataProduct[i].price}</td>
        <td>${dataProduct[i].taxes}</td>
        <td>${dataProduct[i].ads}</td>
        <td>${dataProduct[i].discount}</td>
        <td>${dataProduct[i].total}</td>
        <td>${dataProduct[i].category}</td>
        
        <td><button onClick="updateData(${i})" id="update">update</button></td>
        <td><button onClick="deleteData(${i})" id="delete">delete</button></td>
        


        </tr>
        `
            }
           }







    }
    
    document.getElementById('tbody').innerHTML = table;
}

