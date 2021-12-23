var module = "squaremodule";
var modulemask = "solidfill";

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
    let textUpload = document.getElementById("textUpload");
    let fileUpload = document.getElementById("fileupload");
    let frontcolor = document.getElementById("frontcolor");
    let backgroudcolor = document.getElementById("backgroudcolor");
    let formData = new FormData();
    formData.append("text", textUpload.value);
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