import React, { useState } from "react";

function Phone({ tab, handleQr }) {
	return (
		<div
			className="mb-3 row tab-change-content accordion-flush"
			style={{ display: tab === "phone" ? "flex" : "none" }}
		>
			<label className="col-2 col-form-label">
				<span className="material-icons md-48 blue700">call</span>
			</label>
			<div className="col-10">
				<div className="accordion-item mt-2">
					<h2 className="accordion-header">
						<button
							className="accordion-button"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#collapsePhone"
						>
							Phone
						</button>
					</h2>
					<div id="collapsePhone" className="accordion-collapse collapse show">
						<div className="accordion-body">
							<label className="form-label">Enter a phone number</label>
							<input
								type="phone"
								className="form-control"
								placeholder="+1 555 963 1234"
								onChange={(event) => {
									handleQr({ data: event.target.value });
								}}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Phone;
