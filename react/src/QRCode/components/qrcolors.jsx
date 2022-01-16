function QRColors({ handleQr }) {
	return (
		<div className="mb-3 row accordion-flush">
			<label className="col-2 col-form-label">
				<span className="material-icons md-48 blue700">palette</span>
			</label>
			<div className="col-10">
				<div className="accordion-item mt-2">
					<h2 className="accordion-header">
						<button
							className="accordion-button"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#collapseCollors"
						>
							Colors
						</button>
					</h2>
					<div id="collapseCollors" className="accordion-collapse collapse">
						<div className="accordion-body">
							<div className="row">
								{/*Colors*/}
								<div className="row mb-3">
									{/*Colors*/}
									<div className="row">
										<div className="col-6">
											<label htmlFor="color" className="form-label">
												Main Color
											</label>
											<input
												type="color"
												className="form-control form-control-color"
												defaultValue="#1E6674"
												title="Choose your color"
												onChange={(event) =>
													handleQr({ dotsOptionsColor: event.target.value })
												}
											/>
										</div>
										<div className="col-6">
											<label htmlFor="backgroudcolor" className="form-label">
												Background Color
											</label>
											<input
												type="color"
												className="form-control form-control-color"
												defaultValue="#FFFFFF"
												title="Choose your color"
												onChange={(event) =>
													handleQr({
														backgroundOptionsColor: event.target.value,
													})
												}
											/>
										</div>
									</div>
									{/*Colors*/}
									<div className="row  mb-3">
										<div className="col-6">
											<label htmlFor="color" className="form-label">
												Corner Color
											</label>
											<input
												type="color"
												className="form-control form-control-color"
												defaultValue="#A28E11"
												title="Choose your color"
												onChange={(event) =>
													handleQr({
														cornerColor: event.target.value,
													})
												}
											/>
										</div>
										<div className="col-6">
											<label htmlFor="backgroudcolor" className="form-label">
												Corner Dot Color
											</label>
											<input
												type="color"
												className="form-control form-control-color"
												defaultValue="#1E6674"
												title="Choose your color"
												onChange={(event) =>
													handleQr({
														cornerDotColor: event.target.value,
													})
												}
											/>
										</div>
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

export default QRColors;
