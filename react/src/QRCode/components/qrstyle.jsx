function QRStyle({ handleQr }) {
	return (
		<div className="mb-3 row accordion-flush">
			<label className="col-2 col-form-label">
				<span className="material-icons md-48 blue700">qr_code_2</span>
			</label>
			<div className="col-10">
				<div className="accordion-item mt-2">
					<h2 className="accordion-header">
						<button
							className="accordion-button"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#collapseMainStyle"
						>
							QR style
						</button>
					</h2>
					<div id="collapseMainStyle" className="accordion-collapse collapse">
						<div className="accordion-body">
							<div className="row">
								{/*Main Style*/}
								<div className="row mb-3">
									<div className="col-lg-3">Main Style</div>
									<div className="col-lg-9">
										<select
											className="form-select"
											onChange={(event) =>
												handleQr({ dotsOptionsType: event.target.value })
											}
											aria-label="Default select example"
											value={"dots"}
										>
											<option value="dots">Dots</option>
											<option value="square">Square</option>
											<option value="rounded">Roundend</option>
											<option value="extra-rounded">Extra Roundend</option>
											<option value="classy">Classy</option>
											<option value="classy-rounded">Classy Roundend</option>
										</select>
									</div>
								</div>
								{/*Corner Style*/}
								<div className="row mb-3">
									<div className="col-lg-3">Corner Style</div>
									<div className="col-lg-9">
										<select
											className="form-select"
											aria-label="Default select example"
											onChange={(event) =>
												handleQr({
													cornersSquareOptionsType: event.target.value,
												})
											}
											value={"extra-rounded"}
										>
											<option value="square">Square</option>
											<option value="dots">Dots</option>
											<option value="extra-rounded">Extra Roundend</option>
										</select>
									</div>
								</div>
								{/*Dot Style*/}
								<div className="row mb-3">
									<div className="col-lg-3">Corner Dot</div>
									<div className="col-lg-9">
										<select
											className="form-select"
											aria-label="Default select example"
											onChange={(event) =>
												handleQr({
													cornersDotOptionsType: event.target.value,
												})
											}
											value={"dots"}
										>
											<option value="square">Square</option>
											<option value="dots">Dots</option>
										</select>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default QRStyle;
