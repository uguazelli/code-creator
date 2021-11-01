async function uploadFile() {
  document.getElementById("spinner-section").style.display = "block";

  let form = document.getElementById("fileupload");
  let formData = new FormData();
  formData.append("file", form.files[0]);

  await fetch("http://localhost:5000/image-to-text", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.blob())
    .then((data) => {
      var a = document.createElement("a");
      a.href = window.URL.createObjectURL(data);
      a.download = "result.txt";
      a.click();
    })
    .catch((error) => alert("Unexpected error. Please try later"))
    .finally(
      () => (document.getElementById("spinner-section").style.display = "none")
    );
}
