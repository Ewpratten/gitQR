// ==UserScript==
// @name     GitQR
// @version  1
// @grant    none
// @author   Evan Pratten <ewpratten>
// @require  https://cdnjs.cloudflare.com/ajax/libs/qrious/4.0.2/qrious.min.js
// ==/UserScript==

// Consts
var zip_path = "/archive/master.zip"


// Print out startup message and add button to website
console.log("Loaded GitQR");

console.log("Injecting QR generator option into website");

// Add Hooks for QR code generation button
//document.getElementsByClassName("reponav")[0].innerHTML += '<canvas id="qrcode"></canvas>'
document.getElementsByClassName("btn btn-outline get-repo-btn")[0].parentElement.innerHTML += '<a class="btn btn-outline get-repo-btn" href="#"  id="gitQRButton">GitQR</a> <canvas id="qrcode"></canvas>'
document.getElementById("gitQRButton").addEventListener("click", gitQR);

// Get the repo info
var reponame = document.title.split(":")[0];
var zip_link = "https://github.com/" + reponame + zip_path
console.log("Detected repo: "+ reponame)

// Buffer to b64
function arrayBufferToBase64( buffer ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
  //return binary;
}


function imToBlob(a){
  // atob to base64_decode the data-URI
    var image_data = atob(a.split(',')[1]);
    // Use typed arrays to convert the binary data to a Blob
    var arraybuffer = new ArrayBuffer(image_data.length);
    var view = new Uint8Array(arraybuffer);
    for (var i=0; i<image_data.length; i++) {
        view[i] = image_data.charCodeAt(i) & 0xff;
    }
    try {
        // This is the recommended method:
        var blob = new Blob([arraybuffer], {type: 'application/octet-stream'});
    } catch (e) {
        // The BlobBuilder API has been deprecated in favour of Blob, but older
        // browsers don't know about the Blob constructor
        // IE10 also supports BlobBuilder, but since the `Blob` constructor
        //  also works, there's no need to add `MSBlobBuilder`.
        var bb = new (window.WebKitBlobBuilder || window.MozBlobBuilder);
        bb.append(arraybuffer);
        var blob = bb.getBlob('application/octet-stream'); // <-- Here's the Blob
    }

    // Use the URL object to create a temporary URL
    return  (window.webkitURL || window.URL).createObjectURL(blob);
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
    
    // Gen QR code
    console.log("Creating QR code");
    var qrcode = new QRious({
      element: document.getElementById("qrcode"), 
      value: data,
      size: 400,
      level: "M",
      padding: 5
    });
    
    //console.log(qrcode.toDataURL());
    
    console.log("GitQR finished");
    //window.open(qrcode.toDataURL()).focus();
    //location.href = imToBlob(qrcode.toDataURL());
    
    
    
	};
  
  req.send(null);
  
  
  
}
