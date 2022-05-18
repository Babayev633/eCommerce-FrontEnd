$(window).ready(function(){
            
    var url = ipAddress.ip+'/api/product/'+sessionStorage['productId'];
    var productList = document.getElementById("product-list");
    
    $.ajax({
        type: 'GET',
        url: url,
        dataType:'json',
        success:function(data, textStatus, jqXHR){
            console.log(data);
            document.getElementById("product-name").innerHTML = data['name'];
            document.getElementById("product-cost").innerHTML = "$"+data['cost'];
            document.getElementById("product-details").innerHTML = data['details'];
            document.getElementById("product-image").src = ipAddress.ip + "/api/product/get-product-picture/"+data['photoUrl'];
            document.getElementById("productQuantity").max = data['amount'];        
        },
        error: function (XMLHttpRequest, textStatus, errorThrown){
            console.log("Yükləyə bilmədi")
        }

    });

});

$.get("header.html", function(fileData){
    $('header').html(fileData);
});

function addToCard(){
    var url = ipAddress.ip+'/api/basket';
    var amount = document.getElementById('productQuantity').value;

    $.ajax({
    type: 'POST',
    url: url,
    data: JSON.stringify({
        'amount' : amount,
        'productId' : sessionStorage['productId'],
        'username' : sessionStorage['username'],
    }),
    contentType : 'application/json; charset=utf-8',
    dataType:'json',
    success:function(data){
        console.log("Added to basket");
        window.location.reload();
    },
    error: function (XMLHttpRequest, textStatus, errorThrown){
    $('#message').append('Istifadəçi adı və ya parol yanlışdır')
        console.log("Error")
    }
});
}