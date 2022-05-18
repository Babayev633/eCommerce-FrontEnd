$(window).ready(function(){
       
    var url = ipAddress.ip+'/api/basket/'+sessionStorage['username'];
    var productCount = 0;
    var costSum = 0;

    $.ajax({
        type: 'GET',
        url: url,
        dataType:'json',
        success:function(data, textStatus, jqXHR){
            console.log("Basket check - ", data);
            $.each(data, function(index, item){
                $('#basket-list').append(
                    getBasketItem(item)
                );
                costSum += item['basketAmount']*item['cost'];
                productCount++;
            });
            console.log(costSum)
            document.getElementById("product-count").innerHTML = productCount;
            document.getElementById("cost-sum").innerHTML = costSum;
        },
        error: function (XMLHttpRequest, textStatus, errorThrown){
            console.log("No basket product found")
        }

    });

});


function getBasketItem(product){
    // const {ipAddress} = require('./constants.js');
    
    var item = `
    <div class="row mb-4 d-flex justify-content-between align-items-center">
        <div class="col-md-2 col-lg-2 col-xl-2">
            <img
            src="`+ipAddress.ip+`/api/product/get-product-picture/`+product['productPhotoUrl']+`"
            class="img-fluid rounded-3" alt="Cotton T-shirt">
        </div>
        <div class="col-md-3 col-lg-3 col-xl-3">
            <h6 class="text-muted">`+product['productName']+`</h6>
            <h6 class="text-black mb-0">`+product['productDetails']+`</h6>
        </div>
        <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
        
            <input id="form1" type="number" min="0" name="quantity" min="1" max="`+product['productAmount']+`" value="`+product['basketAmount']+`" type="number"
            class="form-control form-control-sm form1" data-id=`+ product['id'] +` onchange="updateAmount(`+ product['id'] +`)" />

        </div>
        <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
            <h6 class="mb-0">$ `+ product['cost'] + ` x ` + product['basketAmount'] +`</h6>
        </div>
        <div class="col-md-1 col-lg-1 col-xl-1 text-end">
            <a href="" class="text-muted" onclick="deleteBasketProduct(`+ product['id'] +`)"><i class="fas fa-times"></i></a>
        </div>
    </div>

    <hr class="my-4">
    `
    return item;
}

$("input[type='number'] .form1").change(function() { console.log("update ---") });

function updateAmount(id){
    var url = ipAddress.ip+'/api/basket';
    $.ajax({
        type: 'PUT',
        url: url,
        data: JSON.stringify({
            "amount": document.querySelector('[data-id="'+id+'"]').value,
            "id": id
        }),
        contentType : 'application/json; charset=utf-8',
        success:function(data, textStatus, jqXHR){
            console.log("Updated");
            window.location.reload();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown){
            console.log("Could not update")
        }

    });
}

function deleteBasketProduct(id){
    var url = ipAddress.ip+'/api/basket/'+id;
    
    $.ajax({
        type: 'DELETE',
        url: url,
        dataType:'json',
        success:function(data, textStatus, jqXHR){
            console.log("Deleted from basket")
        },
        error: function (XMLHttpRequest, textStatus, errorThrown){
            console.log("No basket product found")
        }

    });
}

function order(){
    var url = ipAddress.ip+'/api/order';
    
    $.ajax({
        type: 'POST',
        url: url,
        contentType : 'application/json; charset=utf-8',
        data: JSON.stringify({
            username: sessionStorage['username']
        }),
        success:function(data, textStatus, jqXHR){
            console.log("Ordered");
            window.location.reload();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown){
            console.log("Order could not be completed");
            alert("Order could not be completed");
        }

    });
}
