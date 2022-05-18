$(window).ready(function(){
       
    var url = ipAddress.ip+'/api/basket/'+ sessionStorage['username'] +'/'+ sessionStorage['productId'];
    var productList = document.getElementById("product-list");
    
    $.ajax({
        type: 'GET',
        url: url,
        dataType:'json',
        success:function(data, textStatus, jqXHR){
            console.log("Basket check - ", data['response']);
            if(data['response'] != null){
                console.log("Disable operation")
                disableAddToCard();
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown){
            console.log("No basket product found")
        }

    });

});


function disableAddToCard(){
    document.getElementById('addToCardBtn').disabled = true;
    document.getElementById('addToCardBtn').innerHTML = "Səbətə əlavə olunub";
    document.getElementById('productQuantity').style.display = "none";
}