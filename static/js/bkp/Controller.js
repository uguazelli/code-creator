async function uploadFile(action) {
  params = fetchParameters(action);
  document.getElementById("spinner-section").style.display = "block";

  let fetchParams;
  let form = document.getElementById("fileupload");
  let textUpload = document.getElementById("textUpload").value;


  if(action == "qrGenerator" && form.value == ""){
    fetchParams = {
      method: "POST",
      body: JSON.stringify(textUpload),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    }
  }else{
    let formData = new FormData();
    for (let i = 0; i < form.files.length; i++) {
      formData.append("file" + i, form.files[i]);
      formData.append("text", textUpload);
    }
    fetchParams = { method: "POST", body: formData}
  }


  await fetch(params.url, fetchParams)
    .then((res) => res.blob())
    .then((data) => {
      var a = document.createElement("a");
      a.href = window.URL.createObjectURL(data);
      a.download = params.downloadName;
      a.click();
    })
    .catch((error) => alert("Unexpected error. Please try later"))
    .finally(
      () => (document.getElementById("spinner-section").style.display = "none")
    );
}

function fetchParameters(action) {

  switch (action) {
    case "pdfSplit":
      return {
        url: "/pdf-split",
        downloadName: "result.zip",
      };
    case "pdfJoin":
      return {
        url: "/pdf-join",
        downloadName: "result.pdf",
      };
    case "csvToExcel":
      return {
        url: "/csv-to-excel",
        downloadName: "result.xlsx",
      };
    case "excelToCSV":
      return {
        url: "/excel-to-csv",
        downloadName: "result.csv",
      };
    case "imgToText":
      return {
        url: "/image-to-text",
        downloadName: "result.txt",
      };
    case "pdfToText":
      return {
        url: "/pdf-to-text",
        downloadName: "result.txt",
      };
    case "qrGenerator":
      return {
        url: "/qr-generator",
        downloadName: "result.jpg",
      };
  }
}
