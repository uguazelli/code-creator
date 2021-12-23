async function uploadFile(action) {
  params = fetchParameters(action);
  document.getElementById("spinner-section").style.display = "block";

  let form = document.getElementById("fileupload");
  let textUpload = document.getElementById("textUpload").value;
  let formData = new FormData();

  for (let i = 0; i < form.files.length; i++) {
    formData.append("file" + i, form.files[i]);
    formData.append("text", textUpload);
  }

  await fetch(params.url, {
    method: "POST",
    body: formData,
  })
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
        url: "http://127.0.0.1:8080/pdf-split",
        downloadName: "result.zip",
      };
    case "pdfJoin":
      return {
        url: "http://127.0.0.1:8080/pdf-join",
        downloadName: "result.pdf",
      };
    case "csvToExcel":
      return {
        url: "http://127.0.0.1:8080/csv-to-excel",
        downloadName: "result.xlsx",
      };
    case "excelToCSV":
      return {
        url: "http://127.0.0.1:8080/excel-to-csv",
        downloadName: "result.csv",
      };
    case "imgToText":
      return {
        url: "http://127.0.0.1:8080/image-to-text",
        downloadName: "result.txt",
      };
    case "pdfToText":
      return {
        url: "http://127.0.0.1:8080/pdf-to-text",
        downloadName: "result.txt",
      };
    case "qrGenerator":
      return {
        url: "http://127.0.0.1:8080/qr-generator",
        downloadName: "result.jpg",
      };
  }
}
