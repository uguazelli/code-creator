import React, { useState, useEffect } from "react";

function Email({ tab, handleQr }) {
	const [formData, setFormData] = useState({
		to: "",
		subject: "",
		msg: "",
	});

	const updateEmail = () => {
		let data = '<a href="mailto:' + formData.to;
		data += "?subject=" + formData.subject.replace(/ /g, "%20");
		data += "&body=" + formData.msg.replace(/ /g, "%20") + '">Send Email</a>';
		handleQr({ data: data });
	};

	useEffect(() => updateEmail(), [formData]);

	return (
		<div
			className="mb-3 row tab-change-content accordion-flush"
			style={{ display: tab === "email" ? "flex" : "none" }}
		>
			<label className="col-2 col-form-label">
				<span className="material-icons md-48 blue700">email</span>
			</label>
			<div className="col-10">
				<div className="accordion-item mt-2">
					<h2 className="accordion-header" id="headingText">
						<button
							className="accordion-button"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#collapseEmail"
						>
							EMAIL
						</button>
					</h2>
					<div id="collapseEmail" className="accordion-collapse collapse show">
						<div className="accordion-body">
							<div className="mb-3">
								<label className="form-label">Email address to:</label>
								<input
									type="email"
									className="form-control"
									placeholder="name@example.com"
									onChange={(event) => {
										setFormData({ ...formData, to: event.target.value });
										updateEmail();
									}}
								/>
							</div>
							<div className="mb-3">
								<label className="form-label">Subject:</label>
								<input
									type="text"
									className="form-control"
									onChange={(event) => {
										setFormData({
											...formData,
											subject: event.target.value,
										});
										updateEmail();
									}}
								/>
							</div>
							<div className="mb-3">
								<label className="form-label">Message:</label>
								<textarea
									className="form-control"
									rows={3}
									onChange={(event) => {
										setFormData({
											...formData,
											msg: event.target.value,
										});
										updateEmail();
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

export default Email;
