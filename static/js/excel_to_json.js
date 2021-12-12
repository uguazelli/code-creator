async function uploadFile() {
  document.getElementById("spinner-section").style.display = "block";
  let formData = new FormData();
  formData.append("file0", fileupload.files[0]);

  await fetch("http://localhost:8080/excel-to-json", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("spreadsheetToJsonResult").style.display =
        "block";
      const myJSON = JSON.stringify(data, null, "\t");
      document.getElementById("spreadsheetToJsonResultTextArea").value = myJSON;
    })
    .catch((error) => alert("Unknow error, Please try later"))
    .finally(
      () => (document.getElementById("spinner-section").style.display = "none")
    );
}

function spreadsheetToJsonResultCopyBtn() {
  var copyText = document.getElementById("spreadsheetToJsonResultTextArea");
  /* Select the text field */
  copyText.select();
  copyText.setSelectionRange(0, 99999); /* For mobile devices */
  navigator.clipboard.writeText(copyText.value);
}
