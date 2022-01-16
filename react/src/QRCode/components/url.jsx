function URL({ tab, handleQr }) {
	return (
		<div
			className="mb-3 row tab-change-content accordion-flush"
			style={{ display: tab === "url" ? "flex" : "none" }}
		>
			<label className="col-2 col-form-label">
				<span className="material-icons md-48 blue700">http</span>
			</label>
			<div className="col-10">
				<div className="accordion-item mt-2">
					<h2 className="accordion-header" id="headingURL">
						<button
							className="accordion-button"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#collapseURL"
						>
							URL
						</button>
					</h2>
					<div id="collapseURL" className="accordion-collapse collapse show">
						<div className="accordion-body">
							<label className="form-label">Enter a URL below</label>
							<input
								type="text"
								className="form-control"
								onChange={(event) => handleQr({ data: event.target.value })}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default URL;
