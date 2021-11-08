async function uploadFile(action) {
  params = fetchParameters(action);
  document.getElementById("spinner-section").style.display = "block";

  let form = document.getElementById("fileupload");
  let formData = new FormData();

  for (let i = 0; i < form.files.length; i++) {
    formData.append("file" + i, form.files[i]);
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
        url: "http://127.0.0.1:5000/pdf-split",
        downloadName: "result.zip",
      };
    case "pdfJoin":
      return {
        url: "http://127.0.0.1:5000/pdf-join",
        downloadName: "result.pdf",
      };
    case "csvToExcel":
      return {
        url: "http://localhost:5000/csv-to-excel",
        downloadName: "result.xlsx",
      };
    case "excelToCSV":
      return {
        url: "http://localhost:5000/excel-to-csv",
        downloadName: "result.csv",
      };
    case "imgToText":
      return {
        url: "http://localhost:5000/image-to-text",
        downloadName: "result.txt",
      };
  }
}
