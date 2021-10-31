async function convertJsonToExcel() {
  var spinner = document.getElementById("spinner-section");
  spinner.style.display = "block";

  let textarea = document.getElementById("jsonToExcelTextArea").value;
  console.log(textarea);

  await fetch("http://localhost:5000/json-to-excel", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(textarea),
  })
    .then((res) => res.blob())
    .then((blob) => {
      var file = window.URL.createObjectURL(blob);
      window.location.assign(file);
    })
    .catch((error) => {
      alert("Please try later");
    })
    .finally(() => (spinner.style.display = "none"));
}
