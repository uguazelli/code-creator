import "./QRCode.css";
import URL from "./components/url";
import Text from "./components/text";
import React, { useState } from "react";
import Email from "./components/email";
import SMS from "./components/sms";
import WiFi from "./components/wifi";
import Phone from "./components/phone";
import QRStyle from "./components/qrstyle";
import QRColors from "./components/qrcolors";
import QRLogo from "./components/qrlogo";
import QRPreview from "./components/qrpreview";

function QRCode() {
	const [tab, handleTab] = useState("url");
	const [qr, handleQr] = useState({});

	const navClass = "nav-link nav-tab-link";
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
								Barcode
							</a>
						</div>
					</div>
				</div>
			</nav>
			<br />
			<nav>
				<div
					className="nav nav-tabs navbar-dark app-main-color"
					id="nav-tab"
					role="tablist"
				>
					<button
						className={tab === "url" ? navClass + " active" : navClass}
						onClick={() => handleTab("url")}
					>
						URL
					</button>
					<button
						className={tab === "text" ? navClass + " active" : navClass}
						onClick={() => handleTab("text")}
					>
						TEXT
					</button>
					<button
						className={tab === "email" ? navClass + " active" : navClass}
						onClick={() => handleTab("email")}
					>
						EMAIL
					</button>
					<button
						className={tab === "phone" ? navClass + " active" : navClass}
						onClick={() => handleTab("phone")}
					>
						PHONE
					</button>
					<button
						className={tab === "sms" ? navClass + " active" : navClass}
						onClick={() => handleTab("sms")}
					>
						SMS
					</button>
					<button
						className={tab === "wifi" ? navClass + " active" : navClass}
						onClick={() => handleTab("wifi")}
					>
						WIFI
					</button>
				</div>
			</nav>
			<div>
				{/*TABS*/}
				<div className="tab-pane fade show active">
					<div className="row">
						<div className="col-lg-8 my-3 p-3 bg-body rounded shadow-sm">
							<h2 className="border-bottom pb-2 mb-0">QR Code Builder</h2>

							<URL tab={tab} handleQr={handleQr} />

							<Text tab={tab} handleQr={handleQr} />

							<Email tab={tab} handleQr={handleQr} />

							<Phone tab={tab} handleQr={handleQr} />

							<SMS tab={tab} handleQr={handleQr} />

							<WiFi tab={tab} handleQr={handleQr} />

							<QRStyle handleQr={handleQr} />

							<QRColors handleQr={handleQr} />

							<QRLogo qr={qr} handleQr={handleQr} />
						</div>

						<QRPreview qr={qr} />
					</div>
				</div>
			</div>
		</main>
	);
}

export default QRCode;
