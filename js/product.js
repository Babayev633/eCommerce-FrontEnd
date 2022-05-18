$(window).ready(function(){
        
    var url = ipAddress.ip+'/api/subcategory';

    $.ajax({
      type: 'GET',
      url: url,
      dataType:'json',
      success:function(data, textStatus, request){
        console.log(data);
        
        console.log(data['response'][0]['id'])

        $.each(data['response'], function(index, item){
          console.log(item['subCategoryName'])
          $("#subcategory").append(`
            <option id="`+ item['id'] +`" value="`+item['id']+`">`+item['subCategoryName']+`</option>
          `);
          $("#refresh-subcategory").append(`
            <option id="refresh-`+ item['id'] +`" value="`+item['id']+`">`+item['subCategoryName']+`</option>
          `);
        });
      },
      error: function (XMLHttpRequest, textStatus, errorThrown){
        console.log("Yükləyə bilmədi")
      }
    });

    // add header.html into <header>
    $.get("header.html", function(fileData){
      $('header').html(fileData);
    });

});

$(window).ready(function(){
          
    var url = ipAddress.ip+'/api/product/store/'+sessionStorage['storeId'];
    var productList = document.getElementById("product-list");

    $.ajax({
      type: 'GET',
      url: url,
      dataType:'json',
      success:function(data, textStatus, jqXHR){
        console.log(data);
        var access_token = sessionStorage['access_token'];
        console.log("Index page: ",access_token);
        if(data){
            $.each(data, function(index, item){
            // $.each(item, function(key, value){
                $('#product-list').append(
                    getProductItem(item)
                );
            // });
            });
        }
        else{
            $('#product-list').append(
                '<h1>No Products added</h1>'
            );
        }
        
      },
      error: function (XMLHttpRequest, textStatus, errorThrown){
        console.log("Yükləyə bilmədi")
      }

    });

});

function getProductItem(product){
    
    var item = `
    <div class="border-bottom p-3 row d-flex justify-content-between align-items-center mb-2" style="background-color: #ECEFF1;">
        <div class="col-md-2 col-lg-2 col-xl-2" onclick="go(`+product["id"]+`)">
            <img
            src="`+ipAddress.ip+`/api/product/get-product-picture/`+product['photoUrl']+`"
            class="img-fluid rounded-3" alt="`+product['name']+`">
        </div>
        <div class="col-md-8 col-lg-8 col-xl-8" onclick="go(`+product["id"]+`)">
            <div class="row">
                <div class="col-md-3 col-lg-3 col-xl-3">
                    <h6 class="row text-muted">Məhsul adı</h6>
                    <h6 class="row text-black">`+product['name']+`</h6>
                </div>
                <div class="col-md-3 col-lg-3 col-xl-3">
                    <h6 class="row text-muted">Qiymət</h6>
                    <h6 class="row text-black">$ `+ product['cost'] +`</h6>
                </div>
                <div class="col-md-3 col-lg-3 col-xl-3">
                    <h6 class="row text-muted">Miqdarı</h6>
                    <h6 class="row text-black">`+ product['amount'] +`</h6>
                </div>
                <div class="col-md-3 col-lg-3 col-xl-3">
                    <h6 class="row text-muted">Detallar</h6>
                    <h6 class="row text-black">`+product['details']+`</h6>
                </div>
            </div>
        </div>

        <div class="row col-md-2 col-lg-2 col-xl-2">
          <i class="fas fa-edit col-lg-6" onclick="fill(`+product["id"]+`)"></i>
          <i class="fas fa-trash col-lg-6" style="color:red" onclick="deleteProduct(`+product["id"]+`)"></i>   
        </div>

    </div>
    `

    return item;
}

function go(productId){
    sessionStorage['productId'] = productId;     
    $(location).prop('href', "./product_item.html");
}

function fill(id){
    $("#updateProductModal").modal()
    var url = ipAddress.ip+'/api/product/'+id;

    $.ajax({
        type: 'GET',
        url: url,
        dataType:'json',
        success:function(data, textStatus, jqXHR){
            console.log(data);
            document.getElementById("refresh-product-id").value = data['id'];
            document.getElementById("refresh-prod-name").value = data['name'];
            document.getElementById("refresh-cost").value = data['cost'];
            document.getElementById("refresh-amount").value = data['amount'];
            document.getElementById("refresh-details").value = data['details'];
            document.getElementById("refresh-"+data["subcategoryId"]).selected = true;
        },
        error: function (XMLHttpRequest, textStatus, errorThrown){
            console.log("Yükləyə bilmədi")
        }

    });
}

function deleteProduct(id){
    var url = ipAddress.ip+'/api/product/'+id;

    $.ajax({
      type: 'DELETE',
      url: url,
      dataType:'json',
      success:function(data, textStatus, request){
        console.log(data);
        window.location.reload();               
      },
      error: function (XMLHttpRequest, textStatus, errorThrown){
        console.log("Silə bilmədi")
        alert("Məhsul silinmədi!!!")
      }
    });

}