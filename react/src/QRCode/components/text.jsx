function Text({ tab, handleQr }) {
	return (
		<div
			className="mb-3 row tab-change-content accordion-flush"
			style={{ display: tab === "text" ? "flex" : "none" }}
		>
			<label className="col-2 col-form-label">
				<span className="material-icons md-48 blue700">description</span>
			</label>
			<div className="col-10">
				<div className="accordion-item mt-2">
					<h2 className="accordion-header" id="headingText">
						<button
							className="accordion-button"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#collapseText"
						>
							TEXT
						</button>
					</h2>
					<div id="collapseText" className="accordion-collapse collapse show">
						<div className="accordion-body">
							<label className="form-label">Enter a TEXT below</label>
							<textarea
								className="form-control"
								placeholder="Somenting amazing!!!"
								defaultValue={""}
								onChange={(event) => handleQr({ data: event.target.value })}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Text;
