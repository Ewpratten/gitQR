// ==UserScript==
// @name     GitQR
// @version  1
// @grant    none
// @author   Evan Pratten <ewpratten>
// @require  https://raw.githubusercontent.com/davidshimjs/qrcodejs/master/qrcode.min.js
// ==/UserScript==

// Consts
var zip_path = "/archive/master.zip"


// Print out startup message and add button to website
console.log("Loaded GitQR");

console.log("Injecting QR generator option into website");

document.getElementsByClassName("reponav")[0].innerHTML += '<a class="js-selected-navigation-item reponav-item"  href="#" id="gitQRButton"> GitQR</a> <div id="qrcode"></div>'
document.getElementById("gitQRButton").addEventListener("click", gitQR);

// Get the repo info
var reponame = document.title.split(":")[0];
var zip_link = "https://github.com/" + reponame + zip_path
console.log("Detected repo: "+ reponame)


function arrayBufferToBase64( buffer ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
}



function gitQR(){
  console.log("Generating QR code for repo");
  
  // Get the ZIP file
  console.log("Loading ZIP file");
  var req = new XMLHttpRequest();
  req.open("GET", zip_link, true);
  req.responseType = "arraybuffer";

  req.onload = function (oEvent) {
    var data = arrayBufferToBase64(req.response); 
    data = "temp data"
    
    console.log(data);
    
    // Gen QR code
    console.log("Creating QR code");
    var qrcode = new QRCode(document.getElementById("qrcode"), {
      text: data,
      colorDark : "#000000",
      colorLight : "#ffffff",
    });
    
    
    
	};
  
  req.send(null);
  
  
  
}
