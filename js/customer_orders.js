$(window).ready(function(){
       
    var url = ipAddress.ip+'/api/order/store/'+sessionStorage['storeId'];
    var productCount = 0;
    var costSum = 0;

    $.ajax({
        type: 'GET',
        url: url,
        dataType:'json',
        success:function(data, textStatus, jqXHR){
            console.log("Order check - ", data);
            $.each(data, function(index, item){
                $('#customer-order-list').append(
                    getCustomerOrderItem(item)
                );
                document.getElementById(item["id"]+"-"+item["orderStatus"]).selected = true;
            });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown){
            console.log("No order product found")
        }

    });

});


function getCustomerOrderItem(orderProduct){
    
    var item = `
    <div class="border-bottom p-4 row d-flex justify-content-between align-items-center mb-2" style="background-color: #ECEFF1;">
        <div class="col-md-2 col-lg-2 col-xl-2">
            <img
            src="`+ipAddress.ip+`/api/product/get-product-picture/`+orderProduct['productPhotoUrl']+`"
            class="img-fluid rounded-3" alt="`+orderProduct['productName']+`">
        </div>
        <div class="col-md-10 col-lg-10 col-xl-10">
            <div class="row">
                <div class="col-md-3 col-lg-3 col-xl-3">
                    <h6 class="row text-muted">Məhsul adı</h6>
                    <h6 class="row text-black">`+orderProduct['productName']+`</h6>
                </div>
                <div class="col-md-3 col-lg-3 col-xl-3">
                    <h6 class="row text-muted">Miqdar</h6>
                    <h6 class="row text-black">$ `+ orderProduct['cost'] + ` x ` + orderProduct['orderAmount'] +`</h6>
                </div>
                <div class="col-md-3 col-lg-3 col-xl-3">
                    <h6 class="row text-muted">Sifariş tarixi</h6>
                    <h6 class="row text-black">`+ orderProduct['orderDate'][2] + `-` + orderProduct['orderDate'][1] + `-` + orderProduct['orderDate'][0] + `</h6>
                </div>
                <div class="col-md-3 col-lg-3 col-xl-3">
                    <h6 class="row text-muted">Mağaza adı</h6>
                    <h6 class="row text-black">`+ orderProduct['storeName'] +`</h6>
                </div>
            </div>
            <div class="row mt-3">
                <div class="cocol-md-9 col-lg-9 col-xl-9">
                    <h6 class="row text-muted">İzləmə kodu</h6>
                    <h6 class="row text-black">`+ orderProduct['trackNumber'] +`</h6>
                </div>
                <div class="cocol-md-3 col-lg-3 col-xl-3">
                    <h6 class="row text-muted">Status</h6>
                    <h6 class="row text-black">
                        <select data-id="`+ orderProduct['id'] +`" class="form-control" onchange="updateStatus(`+ orderProduct['id'] +`)">
                            <option id="`+ orderProduct['id'] +`-PLACED" value="PLACED">Qəbul edildi</option>
                            <option id="`+ orderProduct['id'] +`-SHIPPED" value="SHIPPED">Göndərildi</option>
                            <option id="`+ orderProduct['id'] +`-ENROUTE" value="ENROUTE">Yoldadır</option>
                            <option id="`+ orderProduct['id'] +`-ARRIVED" value="ARRIVED" selected>Çatdı</option>
                        </select>
                    </h6>
                </div>
            </div>
        </div>
    </div>
    `

    return item;
}

function updateStatus(id){
    var url = ipAddress.ip+'/api/order';
    $.ajax({
        type: 'PUT',
        url: url,
        data: JSON.stringify({
            "status": document.querySelector('[data-id="'+id+'"]').value,
            "id": id
        }),
        contentType : 'application/json; charset=utf-8',
        success:function(data, textStatus, jqXHR){
            console.log("Status Updated");
            window.location.reload();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown){
            console.log("Could not update status")
        }

    });
}