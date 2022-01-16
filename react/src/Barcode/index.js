import JsBarcode from "jsbarcode";
import { useEffect, useState } from "react";
import "./Barcode.css";
import Settings from "./components/settings";

function Barcode() {
	const [barData, setBarData] = useState("Example 123");
	const [barParams, setBarParams] = useState({
		format: "CODE128",
		width: 2,
		height: 100,
		fontSize: 20,
		displayValue: true,
		textAlign: "center",
		font: "monospace",
		background: "#FFFFFF",
		lineColor: "#000000",
	});
	const [settings, setSettings] = useState({});
	const [display, setDisplay] = useState({ code: "flex", error: "none" });
	const [barcodeLabel, setBarcodeLabel] = useState(
		"It has support for all 128 ASCII characters but does also encode numbers efficiently"
	);
	const formLabels = [
		{
			id: "CODE128",
			value:
				"It has support for all 128 ASCII characters but does also encode numbers efficiently",
		},
		{
			id: "EAN13",
			value:
				"Number only, EAN is used on world wide to marking the identity of products",
		},
		{
			id: "UPC",
			value:
				"Number only, UPC is used on world wide to marking the identity of products",
		},
		{
			id: "EAN8",
			value:
				"Number only, EAN is used on world wide to marking the identity of products",
		},
		{
			id: "EAN5",
			value:
				"Number only, EAN is used on world wide to marking the identity of products",
		},
		{
			id: "EAN2",
			value:
				"Number only, EAN is used on world wide to marking the identity of products",
		},
		{
			id: "CODE39",
			value:
				"CODE39 is an old barcode type that can encode numbers, uppercase letters and a number of special characters (-, ., $, /, +, %, and space). It has been a common barcode type in the past but CODE128 is recommended if not for legacy reasons.",
		},
		{
			id: "ITF14",
			value:
				"ITF-14 (Interleaved Two of Five) is the GS1 implementation of an Interleaved 2 of 5 bar code to encode a Global Trade Item Number. ITF-14 symbols are generally used on packaging levels of a product, such as a case box of 24 cans of soup. The ITF-14 will always encode 14 digits. 	The last digit of an ITF-14 barcode is an checksum. It is normally included but JsBarcode can automatically calculate it for you if it is left out.",
		},
		{
			id: "MSI",
			value:
				"MSI or Modified Plessey is a barcode developed by the MSI Data Corporation and is primarily used for inventory control, marking storage containers and shelves in warehouse environments. It supports digits 0-9. JsBarcode provides automatic checksum calculation of Mod 10, Mod 11, Mod 1010 and Mod 1110.",
		},
		{
			id: "MSI10",
			value:
				"MSI or Modified Plessey is a barcode developed by the MSI Data Corporation and is primarily used for inventory control, marking storage containers and shelves in warehouse environments. It supports digits 0-9. JsBarcode provides automatic checksum calculation of Mod 10, Mod 11, Mod 1010 and Mod 1110.",
		},
		{
			id: "MSI11",
			value:
				"MSI or Modified Plessey is a barcode developed by the MSI Data Corporation and is primarily used for inventory control, marking storage containers and shelves in warehouse environments. It supports digits 0-9. JsBarcode provides automatic checksum calculation of Mod 10, Mod 11, Mod 1010 and Mod 1110.",
		},
		{
			id: "MSI1010",
			value:
				"MSI or Modified Plessey is a barcode developed by the MSI Data Corporation and is primarily used for inventory control, marking storage containers and shelves in warehouse environments. It supports digits 0-9. JsBarcode provides automatic checksum calculation of Mod 10, Mod 11, Mod 1010 and Mod 1110.",
		},
		{
			id: "MSI1110",
			value:
				"MSI or Modified Plessey is a barcode developed by the MSI Data Corporation and is primarily used for inventory control, marking storage containers and shelves in warehouse environments. It supports digits 0-9. JsBarcode provides automatic checksum calculation of Mod 10, Mod 11, Mod 1010 and Mod 1110.",
		},
		{
			id: "pharmacode",
			value:
				"Pharmacode is a barcode used in the pharmaceutical industry. It can encode numbers 3 to 131070.",
		},
		{
			id: "codabar",
			value:
				"Codabar is an old barcode type that can encode numbers and a number of special characters (–, $, :, /, +, .). You can set start and stop characters to A, B, C or D but if no start and stop character is defined A will be used.",
		},
	];

	useEffect(() => {
		try {
			JsBarcode("#barcode", barData, barParams);
			setDisplay({ code: "flex", error: "none" });
		} catch (error) {
			setDisplay({ code: "none", error: "flex" });
		}
	}, [barData]);

	useEffect(() => {
		try {
			let newBarParams = {};
			let key = Object.keys(settings);
			let value = settings[key];
			newBarParams = { ...barParams, [key]: value };

			if (key[0] === "format") {
				let label = formLabels.find((label) => label.id == value);
				setBarcodeLabel(label.value);
			}
			setBarParams(newBarParams);
			JsBarcode("#barcode", barData, newBarParams);
			setDisplay({ code: "flex", error: "none" });
		} catch (error) {
			setDisplay({ code: "none", error: "flex" });
		}
	}, [settings]);

	const downloadBarCode = () => {
		let hiddenElement = document.createElement("a");
		hiddenElement.href = document.getElementById("barcode").currentSrc;
		hiddenElement.download = "barcode.jpg";
		hiddenElement.click();
	};

	return (
		<main className="container">
			<nav className="navbar navbar-expand-lg navbar-dark app-main-color">
				<div className="container-fluid">
					<a className="navbar-brand" href="/">
						<span className="material-icons">developer_board</span>
					</a>
					<a className="navbar-brand" href="/">
						<strong>code-creator.net</strong>
					</a>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarNavAltMarkup"
						aria-controls="navbarNavAltMarkup"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon" />
					</button>
					<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
						<div className="navbar-nav">
							<a className="nav-link active" aria-current="page" href="/qrcode">
								QR Code
							</a>
							<a className="nav-link active" href="/barcode">
								Bar code
							</a>
						</div>
					</div>
				</div>
			</nav>
			<br />
			<div>
				<div className="tab-pane fade show active">
					<div className="row">
						<Settings
							setBarData={setBarData}
							setSettings={setSettings}
							barcodeLabel={barcodeLabel}
						/>
						{/*PREVIEW*/}
						<div className="col-sm-4">
							<div className="my-3 p-3 bg-body rounded shadow-sm sticky-top">
								<div id="qr-backgroudcolor" className="text-center">
									<h3 style={{ color: "red", display: display.error }}>
										Not valid data for this barcode type!
									</h3>
									<img
										id="barcode"
										style={{
											maxWidth: "100%",
											width: "100%",
											height: "100%",
											display: display.code,
										}}
									/>
								</div>
								<hr />
								{/*Download Button*/}
								<div
									className="btn-group"
									role="group"
									aria-label="Basic example"
								>
									<button
										type="button"
										className="btn btn-primary btn-lg rounded-0 w-100 border-0 app-main-color"
										onClick={() => downloadBarCode()}
									>
										Download
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}

export default Barcode;
