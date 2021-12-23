
async function uploadQR() {

  let filesUpload = document.getElementById("fileupload");
  let textUpload = document.getElementById("textUpload").value;


  let formData = new FormData();
  formData.append("file", filesUpload.files[0]);
  formData.append("text", textUpload);
  fetchParams = { method: "POST", body: formData}

  await fetch('qr-code', fetchParams)
    .then((res) => res.blob())
    .then((data) => {
      var a = document.createElement("a");
      a.href = window.URL.createObjectURL(data);
      a.download = result;
      a.click();
    })
    .catch((error) => alert("Unexpected error. Please try later"))
    .finally(
      () => (document.getElementById("spinner-section").style.display = "none")
    );
}


function collapseCard(cardID){
    var card = document.getElementById(cardID);
    var collapseIcon = document.getElementById(cardID+"Collapse");

    var show = card.classList.contains('show');
    if(show){
        collapseIcon.src = "/static/assets/open-iconic-master/svg/plus.svg";
        card.classList.remove("show");
    }
    else{
        collapseIcon.src = "/static/assets/open-iconic-master/svg/minus.svg";
        card.classList.add("show");
    }

}


