import React, { useState, useEffect } from "react";

function SMS({ tab, handleQr }) {
	const [formData, setFormData] = useState({
		phone: "",
		msg: "",
	});

	const updateSMS = () => {
		let data = '<a href="sms:' + formData.phone.replace(/ /g, "");
		data +=
			"&body=" +
			formData.msg.replace(/ /g, "%20") +
			'">' +
			formData.phone +
			"</a>";
		handleQr({ data: data });
	};

	useEffect(() => updateSMS(), [formData]);

	return (
		<div
			className="mb-3 row tab-change-content accordion-flush"
			style={{ display: tab === "sms" ? "flex" : "none" }}
		>
			<label className="col-2 col-form-label">
				<span className="material-icons md-48 blue700">textsms</span>
			</label>
			<div className="col-10">
				<div className="accordion-item mt-2">
					<h2 className="accordion-header" id="headingURL">
						<button
							className="accordion-button"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#collapseSMS"
						>
							SMS
						</button>
					</h2>
					<div id="collapseSMS" className="accordion-collapse collapse show">
						<div className="accordion-body">
							<div className="mb-3">
								<label className="form-label">Phone number</label>
								<input
									type="phone"
									className="form-control"
									placeholder="+1 555 963 1234"
									onChange={(event) => {
										setFormData({ ...formData, phone: event.target.value });
										updateSMS();
									}}
								/>
							</div>
							<div className="mb-3">
								<label className="form-label">Message</label>
								<input
									type="text"
									className="form-control"
									onChange={(event) => {
										setFormData({ ...formData, msg: event.target.value });
										updateSMS();
									}}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SMS;
