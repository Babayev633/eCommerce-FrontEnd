function login(){
    clearBox("message")
    var url = ipAddress.ip+'/api/login';

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    console.log("Clicked!!!")

    if(username.length == "") {
      document.getElementById("message").innerHTML = "İstifadəçi adı xanası boş qala bilməz"
      return 0;
    }

    else if(password.length == "") {
      document.getElementById("message").innerHTML = "Parol xanası boş qala bilməz"
      return 0;
    }

    $.ajax({
      type: 'POST',
      url: url,
      data: JSON.stringify({
        'username':username,
        'password':password
      }),
      dataType:'json',
      success:function(data, textStatus, request){
        var access_token = data['response']['accessToken'];
        var userCred = parseJwt(access_token);
        var username = userCred['sub'];
        var role = userCred['roles'][0];
        
        sessionStorage['access_token'] = access_token;
        sessionStorage['username'] = username;
        sessionStorage['role'] = role;
        
        $(location).prop('href', "./index.html");
        
      },
      error: function (XMLHttpRequest, textStatus, errorThrown){
        $('#message').append('İstifadəçi adı və ya parol səhvdir!')
        console.log("Error")
      }
    });
  }

  function parseJwt(token) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  function clearBox(elementID)
  {
      document.getElementById(elementID).innerHTML = "";
  }