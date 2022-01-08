class BarCode {
    constructor() {
      this.format = "CODE128";
      this.data = "Example 123"
      this.width = 2;
      this.height = 100;
      this.fontSize = 20;
      this.displayValue = true;
      this.textAlign = "center";
      this.font = "monospace";
      this.background = "#FFFFFF";
      this.lineColor = "#000000";
    }
  }


var bcObject = new BarCode();
createBarCode();

var formats = {
    CODE128: { example: "Example 1234", description: "It has support for all 128 ASCII characters but does also encode numbers efficiently"},
    EAN13: { example: "5901234123457", description: "Number only, EAN is used on world wide to marking the identity of products"},
    UPC: { example: "123456789999", description: "Number only, UPC is used on world wide to marking the identity of products"},
    EAN8: { example: "96385074", description: "Number only, EAN is used on world wide to marking the identity of products"},
    EAN5: { example: "54495", description: "Number only, EAN is used on world wide to marking the identity of products"},
    EAN2: { example: "53", description: "Number only, EAN is used on world wide to marking the identity of products"},
    CODE39: { example: "CODE39 Barcode", description: ""},
    ITF14: { example: "12345678901231",description: ""},
    MSI: { example: "1234",description: ""},
    MSI10: { example: "1234",description: ""},
    MSI11: { example: "1234",description: ""},
    MSI1010: { example: "1234",description: ""},
    MSI1110: { example: "1234",description: ""},
    pharmacode: { example: "1234",description: ""},
    codabar: { example: "1234",description: ""},
}

function updateBarData(element){
    bcObject.data = element.value;
    createBarCode();
}

function updateBarWidth(element){
    document.getElementById("barWidth").innerHTML = element.value;
    bcObject.width = element.value;
    createBarCode();
}

function updateBarHeight(element){
    document.getElementById("barHeight").innerHTML = element.value;
    bcObject.height = element.value;
    createBarCode();
}

function updatefontSize(element){
    document.getElementById("fontSize").innerHTML = element.value;
    bcObject.fontSize = element.value;
    createBarCode();
}

function updateDisplayText(element){
    bcObject.displayValue = !bcObject.displayValue;
    createBarCode();
}

function updateTextAlign(element, value){
    for (let e of document.getElementsByClassName("class-align")) {
        e.classList.remove("btn-primary");
    }
    element.classList.add("btn-primary");
    bcObject.textAlign = value;
    createBarCode();
}

function updateFont(element){
    bcObject.font = element.value;
    createBarCode();
}

function updateBackgroundColor(element){
    bcObject.background = element.value;
    createBarCode();
}

function updateLineColor(element){
    bcObject.lineColor = element.value;
    createBarCode();
}

function updateFormat(element, value){
    document.getElementById("formatDropDown").innerText = value;
    document.getElementById("formatDetails").innerHTML = formats[value].description;
    document.getElementById('barData').value = formats[value].example;
    bcObject.format = value;
    bcObject.data = formats[value].example;
    createBarCode();
}


function validateFormat(value, format){
    var barcode = document.getElementById("barcode");
    var notValidBarCode = document.getElementById("notValidBarCode");
    if( format == "CODE128"){
        if (value.length > 55){
            barcode.style.display = 'none';
            notValidBarCode.style.display = 'flex';
        }
    }
}

function createBarCode(){
    try {
        JsBarcode("#barcode", bcObject.data, {
            format: bcObject.format,
            width: bcObject.width,
            height: bcObject.height,
            fontSize: bcObject.fontSize,
            displayValue: bcObject.displayValue,
            textAlign: bcObject.textAlign,
            font: bcObject.font,
            background: bcObject.background,
            lineColor: bcObject.lineColor,

            }
        );
        document.getElementById("barcode").style.display = "flex";
        document.getElementById("notValidBarCode").style.display = "none";
    } catch (error) {
        document.getElementById("barcode").style.display = "none";
        document.getElementById("notValidBarCode").style.display = "flex";
    }

}


