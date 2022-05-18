$(window).ready(function(){
       
    var url = ipAddress.ip+'/api/order/'+sessionStorage['username'];
    var productCount = 0;
    var costSum = 0;

    $.ajax({
        type: 'GET',
        url: url,
        dataType:'json',
        success:function(data, textStatus, jqXHR){
            console.log("Order check - ", data);
            $.each(data, function(index, item){
                $('#basket-list').append(
                    getOrderItem(item)
                );
            });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown){
            console.log("No order product found")
        }

    });

});


function getOrderItem(product){
    
    var item = `
    <div class="row d-flex justify-content-between align-items-center">
        <div class="col-md-2 col-lg-2 col-xl-2">
            <img
            src="`+ipAddress.ip+`/api/product/get-product-picture/`+product['productPhotoUrl']+`"
            class="img-fluid rounded-3" alt="`+product['productName']+`">
        </div>
        <div class="col-md-10 col-lg-10 col-xl-10">
            <div class="row">
                <div class="col-md-3 col-lg-3 col-xl-3">
                    <h6 class="row text-muted">Məhsul adı</h6>
                    <h6 class="row text-black mb-0">`+product['productName']+`</h6>
                </div>
                <div class="col-md-3 col-lg-3 col-xl-3">
                    <h6 class="row text-muted">Miqdar</h6>
                    <h6 class="row text-black mb-0">$ `+ product['cost'] + ` x ` + product['orderAmount'] +`</h6>
                </div>
                <div class="col-md-3 col-lg-3 col-xl-3">
                    <h6 class="row text-muted">Sifariş tarixi</h6>
                    <h6 class="row text-black mb-0">`+ product['orderDate'][2] + `-` + product['orderDate'][1] + `-` + product['orderDate'][0] + `</h6>
                </div>
                <div class="col-md-3 col-lg-3 col-xl-3">
                    <h6 class="row text-muted">Mağaza adı</h6>
                    <h6 class="row text-black mb-0">`+ product['storeName'] +`</h6>
                </div>
            </div>
            <div class="row mt-3">
                <div class="cocol-md-10 col-lg-10 col-xl-10">
                    <h6 class="row text-muted">İzləmə kodu</h6>
                    <h6 class="row text-black mb-0">`+ product['trackNumber'] +`</h6>
                </div>
            </div>
        </div>
    </div>
    `
    + 
    getItemStatus(product['orderStatus'])

    return item;
}

function getItemStatus(orderStatus){

    shipped = "";
    enroute = "";
    arrived = "";

    switch(orderStatus) {
        case "SHIPPED":
            shipped = "active";
            break;
        case "ENROUTE":
            shipped = "active";
            enroute = "active";
            break;
        case "ARRIVED":
            shipped = "active";
            enroute = "active";
            arrived = "active";
            break;
    }

    itemStatus = `
    <div class="row d-flex justify-content-center">
        <ul id="progressbar" class="text-center">
        <li class="active step0">
            <div class="icon-content"> 
            <img class="icon" src="./img/order_processed.png">
            <div class="d-flex flex-column">
                <p class="font-weight-bold">Sifariş<br>qəbul edildi</p>
            </div>
            </div>
        </li>
        <li class="` + shipped + ` step0">
            <div class="icon-content"> <img class="icon" src="./img/order_shipped.png">
            <div class="d-flex flex-column">
                <p class="font-weight-bold">Sifariş<br>göndərildi</p>
            </div>
            </div>
        </li>
        <li class="` + enroute + ` step0">
            <div class="icon-content"> 
            <img class="icon" src="./img/order_sent.png">
            <div class="d-flex flex-column">
                <p class="font-weight-bold">Sifariş<br>yoldadır</p>
            </div>
        </div>
        </li>
        <li class="` + arrived + ` step0">
            <div class="icon-content"> <img class="icon" src="./img/order_arrived.png">
            <div class="">
                <p class="font-weight-bold">Sifariş<br>çatdırıldı</p>
            </div>
            </div>
        </li>
        </ul>
    </div>
    <hr class="my-4">
    `
    return itemStatus
}