window.sr=ScrollReveal();
            sr.reveal('#quality',{duration:3000,origin:'top',distance:'200px',viewFactor:0.4})
            sr.reveal('#fresh',{duration:3000,origin:'bottom',distance:'200px',viewFactor:0.4})
            sr.reveal('#home',{duration:3000,origin:'top',distance:'200px',viewFactor:0.4})
            sr.reveal('#support',{duration:3000,origin:'bottom',distance:'200px',viewFactor:0.4})
            sr.reveal('#content',{duration:3000,origin:'bottom',distance:'200px',viewFactor:0.4})
            sr.reveal('.card',{duration:3000,origin:'bottom',distance:'200px',viewFactor:0.4})


console.log('Heyyyyy');


let products=[
    {
        name:'Thin Crust',
        tag:'thin',
        price:150,
        inCart:0
    },
    {
        name:'Brick Oven',
        tag:'thbrickin',
        price:199,
        inCart:0
    },
    {
        name:'Margherita',
        tag:'mar',
        price:120,
        inCart:0
    },
    {
        name:'calzone',
        tag:'cal',
        price:210,
        inCart:0
    },
    {
        name:'Stromboli',
        tag:'str',
        price:250,
        inCart:0
    },
    {
        name:'Marinara',
        tag:'mari',
        price:230,
        inCart:0
    },
    {
        name:'Chain',
        tag:'chn',
        price:149,
        inCart:0
    },
    {
        name:'Deep Dish',
        tag:'deep',
        price:250,
        inCart:0
    },
    {
        name:'New Heaven',
        tag:'new',
        price:299,
        inCart:0
    },
    {
        name:'California',
        tag:'cali',
        price:260,
        inCart:0
    },
    {
        name:'Soloman',
        tag:'solo',
        price:199,
        inCart:0
    },
    {
        name:'Old Style',
        tag:'old',
        price:170,
        inCart:0
    },
];

let carts=document.querySelectorAll('.add-to-cart');

for(let i=0;i<carts.length;i++){
    carts[i].addEventListener('click',() =>{
        cartNumber(products[i]);
        totalcost(products[i]);
    })
}

function onLoad()
{
    let productNumbers=localStorage.getItem('cartNumber');

    if(productNumbers)
    {
        
        document.getElementById('total_count').textContent=productNumbers;
    }
    

}


function cartNumber(product){
    
    let productNumbers=localStorage.getItem('cartNumber');
    productNumbers=parseInt(productNumbers);

    if(productNumbers)
    {
        localStorage.setItem('cartNumber',productNumbers+1);
        document.getElementById('total_count').textContent=productNumbers+1;
    }
    else{
        localStorage.setItem('cartNumber',1);
        document.getElementById('total_count').textContent=1;
}

    setItems(product);
}

function setItems(product)
{
    let cartitems=localStorage.getItem('productsinCart');
    cartitems=JSON.parse(cartitems);
    console.log('Inside',product);

    if(cartitems !=null)
    {
        if(cartitems[product.tag] == undefined)
        {
            cartitems={
                ...cartitems,
                [product.tag]:product
            }
        }
        cartitems[product.tag].inCart +=1;
    }
    else{
        product.inCart=1;
         cartitems={
            [product.tag]:product
        }
    }
    
    
    localStorage.setItem('productsinCart',JSON.stringify(cartitems));
}


function totalcost(product)
{   
    let cartcost=localStorage.getItem('totalCost');
    
    console.log(product.price);

    if(cartcost !=null)
    {
        cartcost=parseInt(cartcost);
        localStorage.setItem('totalCost',cartcost+product.price)
    }
    else{
        localStorage.setItem("totalCost",product.price);
    }
    
}



function displaycart()
{
    let cartcost=localStorage.getItem('totalCost');
    let cartitems=localStorage.getItem('productsinCart');
    cartitems=JSON.parse(cartitems);

    let productContainer=document.querySelector('.products');

    if(cartitems && productContainer)
    {
        productContainer.innerHTML='';
        Object.values(cartitems).map(item =>{
            productContainer.innerHTML +=
            `<div class="container pro">
            <button type="button" class="btn close" 
                data-dismiss="alert" aria-label="Close"> 
                  
                <span aria-hidden="true">×</span> 
            </button> 
            <div class="row">

              <div class="col-sm cartname">
              <img src="${item.tag}.jpg">
              <span id="cartname"><b>${item.name}</b></span>
              </div>
              <div class="col-sm cartprice">
              <b>₹${item.price}</b>
              </div>
              <div class="col-sm cartquantity">
              <span id="cartnumber"><b>${item.inCart}</b></span>
              </div>
              <div class="col-sm carttotal">
                <span><b>₹${item.inCart * item.price}.00</b></span>
              </div>
            </div>
          </div>`
        });

        productContainer.innerHTML +=`
        <div class="Totalamount">
            <h4 class="totaltitle">Grand Total</h4>
            <h4 class="totalmoney">₹${cartcost}.00
        </div>
        `
    }

    console.log(cartitems);
}

onLoad();
displaycart();
    


var removebutton=document.querySelectorAll('.close');
console.log(removebutton);

for(let i=0;i<removebutton.length;i++)
{
    var button=removebutton[i];
    button.addEventListener('click',removeCartItem)
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    document.getElementById('cartno').innerHTML='Cart';
   
    updateCartTotal();
}


function updateCartTotal()
{
    var cartrows=document.getElementsByClassName('pro');
    var total=0;
    for(let i=0;i<cartrows.length;i++)
    {
        var cartrow=cartrows[i];
        var priceelement=cartrow.getElementsByClassName('cartprice')[0];
        var quantityelement=cartrow.getElementsByClassName('cartquantity')[0];
        console.log(priceelement);

        var price=parseFloat(priceelement.innerText.replace('₹',''));
        var quantity=quantityelement.innerText;
        console.log(quantity);
        console.log(price);
        total=total+(price*quantity);
    }

    document.getElementsByClassName('totalmoney')[0].innerText='₹'+total + '.00';

}



