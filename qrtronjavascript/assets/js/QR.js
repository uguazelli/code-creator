class QR {
    constructor() {
      this.qrData = "qr-tron.com";
      this.image = null;
      this.frontColor = "#59CCE1";
      this.backColor = "#ffffff";
      this.cornerColor = "#0e2e62";
      this.dotsOptionsType = "dots";
      this.cornersSquareType = "square";
      this.insideCornerStyle ="square";
      this.insideCornerColor = "#a70606";
      this.width = 300;
      this.height = 300;
      this.ext = "png";
    }
  }




  var selectedTab = "url-tab";
  function showQRTab(id) {
      selectedTab = id;
      for (let element of document.getElementsByClassName("nav-tab-link")) {
          element.classList.remove("active");
      }
      document.getElementById(id).classList.add("active");

      for (let element of document.getElementsByClassName("tab-change-content")) {
          element.style.display = "none";
      }
      document.getElementById(id + "-content").style.display = "flex";
  }

  var qr = new QR();

  function selectQRExt(element, ext) {
      qr.ext = ext;
      for (let element of document.getElementsByClassName("qr-extention")) {
          element.checked = false;
      }
      element.checked = true;
  }

  function updateSize(element) {
      this.width = element.value;
      this.height = element.value;
  }

  function encodeImageFileAsURL(element) {
      var reader = new FileReader();
      reader.onloadend = function () {
          qr.image = reader.result;
          createQR();
      }
      reader.readAsDataURL(element.files[0]);
  }

  function updateQR(element) {
      qr[element.id] = element.value;
      createQR();
  }

  function updateEmail(element) {
      emailTO = document.getElementById("emailTO").value;
      emailSubject = document.getElementById("emailSubject").value;
      emailMessage = document.getElementById("emailMessage").value;
      qr.qrData = '<a href="mailto:' + emailTO + '?';
      qr.qrData += 'subject=' + emailSubject.replace(/ /g, '%20');
      qr.qrData += '&body=' + emailMessage.replace(/ /g, '%20') + '">Send Email</a>';
      createQR();
  }

  function updatePhone(element) {
      phone = document.getElementById("phoneUpload").value;
      qr.qrData = '<a href="tel:' + phone.replace(/ /g, '') + '">' + phone + '</a>';
      createQR();
  }

  function updateSMS(element) {
      phone = document.getElementById("SMSPhone").value;
      message = document.getElementById("SMSMessage").value;
      qr.qrData = '<a href="sms:' + phone.replace(/ /g, '');
      qr.qrData += '&body=' + message.replace(/ /g, '%20') + '">' + phone + '</a>';
      createQR();
  }

  function updateWIFI(element) {
      ssid = document.getElementById("ssid").value;
      password = document.getElementById("wifi-password").value;
      type = document.getElementById("wifi-encryption").value;
      qr.qrData = 'WIFI:T:' + type + ';S:' + ssid + ';P:' + password + ';;';
      createQR();
  }

  function setQRStyle(prop, value) {
      qr[prop] = value;
      createQR();
  }

  async function createQR(download = false) {

      if (qr.data == "") {
          alert("Missing");
          return;
      }

      const qrCode = new QRCodeStyling({
          width: qr.width,
          height: qr.height,
          type: "svg",
          data: qr.qrData,
          image: qr.image,
          qrOptions: {
              errorCorrectionLevel: "H"
          },
          imageOptions: {
              crossOrigin: "anonymous",
              imageSize: 0.5,
              margin: 20
          },
          dotsOptions: {
              color: qr.frontColor,
              type: qr.dotsOptionsType
          },
          dotsOptionsHelper: {
              colorType: {
                  single: true,
                  gradient: false
              },
              gradient: {
                  linear: true,
                  radial: false,
                  color1: "#6a1a4c",
                  color2: "#6a1a4c",
                  rotation: "0"
              }
          },
          backgroundOptions: {
              color: qr.backColor,
          },

          cornersSquareOptions: {
              color: qr.cornerColor,
              type: qr.cornersSquareType
          },
          cornersSquareOptionsHelper: {
              colorType: {
                  single: true,
                  gradient: false
              },
              gradient: {
                  linear: true,
                  radial: false,
                  color1: "#000000",
                  color2: "#000000",
                  rotation: "0"
              }
          },
          cornersDotOptions: {
              color: qr.insideCornerColor,
              type: qr.insideCornerStyle
          },
          cornersDotOptionsHelper: {
              colorType: {
                  single: true,
                  gradient: false
              },
              gradient: {
                  linear: true,
                  radial: false,
                  color1: "#000000",
                  color2: "#000000",
                  rotation: "0"
              }
          },
          backgroundOptionsHelper: {
              colorType: {
                  single: true,
                  gradient: false
              },
              gradient: {
                  linear: true,
                  radial: false,
                  color1: "#ffffff",
                  color2: "#ffffff",
                  rotation: "0"
              }
          }
      });

      //qrCode.append(document.getElementById("canvas"));

      var data = await qrCode.getRawData();
      let a = await document.createElement("a");
      a.href = window.URL.createObjectURL(data);
      document.getElementById("qr-result").src = a.href;

      if (download) {
          qrCode.download({ name: "qr", extension: qr.ext });
      }
  }
