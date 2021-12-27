var module = "squaremodule";
var modulemask = "solidfill";
var selectedTab = "url-tab";

var urlUpload = document.getElementById("urlUpload");
var text = "QR CODE FAILED";

var fileUpload = document.getElementById("fileupload");
var frontcolor = document.getElementById("frontcolor");
var backgroudcolor = document.getElementById("backgroudcolor");

function selectModule(id){
    module = id;
    for (let element of document.getElementsByClassName("qrmodule")) {
        element.classList.remove("border");
        element.classList.remove("border-success");
        element.classList.remove("border-5");

    }
    document.getElementById(id).classList.add("border");
    document.getElementById(id).classList.add("border-success");
    document.getElementById(id).classList.add("border-5");
}

function selectModuleMask(id){
    modulemask = id;
    for (let element of document.getElementsByClassName("qrmodulemask")) {
        element.classList.remove("border");
        element.classList.remove("border-primary");
        element.classList.remove("border-5");
    }
    document.getElementById(id).classList.add("border");
    document.getElementById(id).classList.add("border-primary");
    document.getElementById(id).classList.add("border-5");

}

function showQRTab(id) {
    selectedTab = id;
    for (let element of document.getElementsByClassName("nav-tab-link")) {
        element.classList.remove("active");
    }
    document.getElementById(id).classList.add("active")

    for (let element of document.getElementsByClassName("tab-change-content")) {
        element.style.display = "none";
    }
    document.getElementById(id + "-content").style.display = "flex";
}

async function createQR() {
    var qrResult = document.getElementById("qr-result");
    var qrCodeLoader = document.getElementById("qr-code-loader");

    qrResult.style.display = "none";
    qrCodeLoader.style.display = "flex";

    if (selectedTab == "url-tab") {
        text = document.getElementById("urlUpload").value;

    } else if (selectedTab == "text-tab"){
        text = document.getElementById("textUpload").value;

    } else if (selectedTab == "email-tab"){
        emailTO = document.getElementById("emailTO").value;
        emailSubject = document.getElementById("emailSubject").value;
        emailMessage = document.getElementById("emailMessage").value;
        text = '<a href="mailto:' + emailTO + '?'
        // name1@rapidtables.com?cc=name2@rapidtables.com&bcc=name3@rapidtables.com
        text += 'subject=' + emailSubject.replace(/ /g, '%20')
        text += '&body=' + emailMessage.replace(/ /g, '%20') + '">Send Email</a>'

    } else if(selectedTab == "phone-tab"){
        phone = document.getElementById("phoneUpload").value;
        text = '<a href="tel:'
        text += phone.replace(/ /g, '')
        text += '">'
        text += phone
        text += '</a>'

    } else if(selectedTab == "sms-tab"){
        phone = document.getElementById("SMSPhone").value;
        message = document.getElementById("SMSMessage").value;
        text = '<a href="sms:'
        text += phone.replace(/ /g, '')
        text +='&body='
        text += message.replace(/ /g, '%20')
        text +='">'
        text += phone
        text += '</a>'

    } else if (selectedTab == "wifi-tab"){
        ssid = document.getElementById("ssid").value;
        password = document.getElementById("wifi-password").value;
        type = document.getElementById("wifi-encryption").value;
        text = 'WIFI:T:' + type + ';S:' + ssid + ';P:' + password + ';;';
    }

    else{
        text = "QR CODE FAILED";
    }

    console.log(text)

    let formData = new FormData();
    formData.append("text", text);
    formData.append("file", fileUpload.files[0]);
    formData.append("frontcolor", frontcolor.value);
    formData.append("backgroudcolor", backgroudcolor.value);
    formData.append("module", module);
    formData.append("modulemask", modulemask)

    fetchParams = { method: "POST", body: formData }

    await fetch("/qr-code", fetchParams)
        .then((res) => res.blob())
        .then((data) => {
            let a = document.createElement("a");
            a.href = window.URL.createObjectURL(data);
            document.getElementById("qr-result").src = a.href;
            a.download = "result.png";
            a.click();
        })
        .catch((error) => console.log(error))
        .finally(() => {
            qrCodeLoader.style.display = "none";
            qrResult.style.display = "flex";
        })
}


//let fcolor = document.getElementById("qr-frontcolor");
//
//let bgcolorselector = document.getElementById("backgroudcolor");
//let bgcolor = document.getElementById("qr-backgroudcolor");
//
//bgcolorselector.addEventListener("input",(event)=>{
//    bgcolor.style.backgroundColor = bgcolorselector.value;
//    fcolor.style.backgroundColor = bgcolorselector.value;
//    // You can also do it with the event object as event object holds the value of the current color
//    //  backRGB.style.backgroundColor = event.target.value;
// });