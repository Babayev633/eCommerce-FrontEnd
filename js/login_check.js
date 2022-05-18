$(window).ready(function(){
    
    var in_block = document.getElementById("in_block");
    var out_block = document.getElementById("out_block");
    var access_token = sessionStorage['access_token'];

    if(access_token){    
        console.log("Logged in! ",access_token);
        in_block.style.display = "inline";
        out_block.style.display = "none";
    }
    else{
        console.log("Logged out! ",access_token);
        out_block.style.display = "inline";
        in_block.style.display = "none";
    }

    document.getElementById("header-profile-image").src = ipAddress.ip + "/api/user/get-profile-picture/"+sessionStorage['username'];
});

function signOut(){
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('storeId');
    location.href = "./login.html"
}