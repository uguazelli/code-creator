import React, { useState, useEffect } from "react";

function WiFi({ tab, handleQr }) {
	const [formData, setFormData] = useState({
		type: "WPA",
		ssid: "",
		password: "",
	});

	const updateWiFi = () => {
		let data =
			"WIFI:T:" +
			formData.type +
			";S:" +
			formData.ssid +
			";P:" +
			formData.password +
			";;";
		handleQr({ data: data });
	};

	useEffect(() => updateWiFi(), [formData]);

	return (
		<div
			className="mb-3 row tab-change-content accordion-flush"
			style={{ display: tab === "wifi" ? "flex" : "none" }}
		>
			<label className="col-2 col-form-label">
				<span className="material-icons md-48 blue700">call</span>
			</label>
			<div className="col-10">
				<div className="accordion-item mt-2">
					<h2 className="accordion-header" id="headingWIFI">
						<button
							className="accordion-button"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#collapseWifi"
						>
							WIFI
						</button>
					</h2>
					<div id="collapseWifi" className="accordion-collapse collapse show">
						<div className="accordion-body">
							<div className="mb-3">
								<label className="form-label">Wireless SSID</label>
								<input
									type="text"
									className="form-control"
									onChange={(event) => {
										setFormData({ ...formData, ssid: event.target.value });
										updateWiFi();
									}}
								/>
							</div>
							<div className="mb-3">
								<label className="form-label">Password</label>
								<input
									type="password"
									className="form-control"
									onChange={(event) => {
										setFormData({ ...formData, password: event.target.value });
										updateWiFi();
									}}
								/>
							</div>
							<div className="mb-3">
								<label className="form-label">Encryption</label>
								<select
									id="wifi-encryption"
									className="form-select"
									aria-label="WPA"
									onChange={(event) => {
										setFormData({ ...formData, type: event.target.value });
										updateWiFi();
									}}
								>
									<option value="WPA">WPA</option>
									<option value="WPE">WEP</option>
									<option value="nyanpass">No Encryption</option>
								</select>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default WiFi;
