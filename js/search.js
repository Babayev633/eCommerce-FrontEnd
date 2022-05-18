function search(){
    sessionStorage['searchString'] = document.getElementById('search-text').value;
    if(sessionStorage['searchString'].length != 0)
        window.location.href = "./search.html";
    else   
        alert("Axtarış üçün məlumat daxil edin!")
}

$(window).ready(function(){
          
    var search_url = ipAddress.ip+'/api/product/search/'+sessionStorage['searchString'];
    var url = ipAddress.ip+'/api/product';
        
    var searchedProductList = document.getElementById("searched-product-list");
    var products = "";

    $.ajax({
      type: 'GET',
      url: search_url,
      dataType:'json',
      success:function(data, textStatus, jqXHR){
        console.log(data);
        var access_token = sessionStorage['access_token'];
        // console.log("Index page: ",access_token);
        if(data.length > 0){
            $.each(data, function(index, item){
                if(item["amount"] == 0){
                    products += `
                    <div class="col-lg-4 col-md-6 col-sm-12 pb-1">
                        <div class="card product-item border-0 mb-4">
                            <div class="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                                <img class="img-fluid w-100" style="height: 26em;" src="`+url+`/get-product-picture/`+item['photoUrl']+`" alt="">
                            </div>
                            <div class="card-body border-left border-right text-center p-0 pt-4 pb-3">
                                <h6 class="text-truncate mb-3">`+ item["name"] +`</h6>
                                <h6 class="text-truncate mb-3 text-muted">`+ item["details"] +`</h6>
                                <div class="d-flex justify-content-center">
                                    <h6>$` + item["cost"] + `</h6>
                                </div>
                            </div>
                            <div class="card-footer d-flex justify-content-between bg-light border text-center">
                                <a onclick="go(`+item["id"]+`)" class="btn btn-sm text-dark p-0"><i class="fas fa-eye text-primary mr-1"></i>Məhsulu görüntülə</a>
                            </div>

                        </div>
                    </div>
                    `;
                }      
                else{
                    products += `
                    <div class="col-lg-4 col-md-6 col-sm-12 pb-1">
                        <div class="card product-item border-0 mb-4">
                            <div class="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                                <img class="img-fluid w-100" style="height: 24em;" src="`+url+`/get-product-picture/`+item['photoUrl']+`" alt="">
                            </div>
                            <div class="card-body border-left border-right text-center p-0 pt-4 pb-3">
                                <h6 class="text-truncate mb-3">`+ item["name"] +`</h6>
                                <h6 class="text-truncate mb-3 text-muted">`+ item["details"] +`</h6>
                                <div class="d-flex justify-content-center">
                                    <h6>$` + item["cost"] + `</h6>
                                </div>
                            </div>
                            <div class="card-footer d-flex justify-content-between bg-light border text-center">
                                <a onclick="go(`+item["id"]+`)" class="btn btn-sm text-dark p-0"><i class="fas fa-eye text-primary mr-1"></i>Məhsulu görüntülə</a>
                            </div>
                        </div>
                    </div>
                    `;
                }
                
            });
        }
        else{
            products += `<h4 class="text-center">Axtarışa uyğun məhsul tapılmadı</h4>`;    
        }
        searchedProductList.innerHTML = products;
      },
      error: function (XMLHttpRequest, textStatus, errorThrown){
        console.log("Yükləyə bilmədi")
      }

    });

  });

  function go(productId){
    sessionStorage['productId'] = productId;     
    $(location).prop('href', "./product_item.html");
}