$(window).ready(function(){
          
    var search_url = ipAddress.ip+'/api/product/filter/'+sessionStorage['subCategoryId'];
    var url = ipAddress.ip+'/api/product';
        
    var filteredProductList = document.getElementById("filtered-product-list");
    var products = "";

    $.ajax({
      type: 'GET',
      url: search_url,
      dataType:'json',
      success:function(data, textStatus, jqXHR){
        console.log("Filtered: "+data);
        var access_token = sessionStorage['access_token'];
        // console.log("Index page: ",access_token);
        // if(data.length > 0){
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
        // }
        // else{
        //     products += `<h4 class="text-center">Axtarışa uyğun məhsul tapılmadı</h4>`;    
        // }
        filteredProductList.innerHTML = products;
      },
      error: function (XMLHttpRequest, textStatus, errorThrown){
        console.log("Yükləyə bilmədi")
      }

    });

  });


  // Load categories
$(window).ready(function(){

    url = ipAddress.ip+'/api/category';
    var categoryList = document.getElementById("category-list");
    var categories = "";
    $.ajax({
        type: 'GET',
        url: url,
        dataType:'json',
        success:function(data, textStatus, request){
            console.log("category: ",data['response']);
            $.each(data['response'], function(index, item){
                categories += `<div class="nav-item dropdown">`;
                categories += `<a href="#" class="nav-link" data-toggle="dropdown">`
                categories += item['categoryName'];
                categories += `<i class="fa fa-angle-down float-right mt-1"></i></a>`
                categories += `<div class="dropdown-menu position-absolute bg-secondary border-0 rounded-0 w-100 m-0">`
                // console.log(item)
                $.each(item['subcategories'], function(key, value){
                    categories += `<a href='#' class="dropdown-item" onclick='filter(`+ value['id'] +`)'>`                    
                    categories += value['subCategoryName']
                    categories += `</a>`
                });
                categories += `</div>`
                categories += `</div>`;
            });  
            categoryList.innerHTML = categories;
        },
        error: function (XMLHttpRequest, textStatus, errorThrown){
        console.log("Category Yükləyə bilmədi")
        }
    });

});

function filter(subCateryId){
    sessionStorage['subCategoryId'] = subCateryId;
    window.location.href = "./filter.html";
}

// Categories end