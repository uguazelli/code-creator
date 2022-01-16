import React, { useState } from "react";

function QRLogo({ qr, handleQr }) {
	const [sliderValues, setSliderValues] = useState({
		logoSize: 0.4,
		logoMargin: 5,
		qrSize: 300,
	});
	return (
		<div className="mb-3 row accordion-flush">
			<label className="col-2 col-form-label">
				<span className="material-icons md-48 blue700">image</span>
			</label>
			<div className="col-10">
				<div className="accordion-item mt-2">
					<h2 className="accordion-header">
						<button
							className="accordion-button"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#collapseLogo"
						>
							Logo
						</button>
					</h2>
					<div id="collapseLogo" className="accordion-collapse collapse">
						<div className="accordion-body">
							<div className="row">
								{/*Logo*/}
								<div className="row mb-3">
									<div className="col-md-6">
										<input
											className="form-control"
											type="file"
											onChange={(event) =>
												handleQr({ logo: event.target.files[0] })
											}
										/>
									</div>
									<div className="col-md-6">
										<button
											className="btn btn-primary btn-lg rounded-0 w-100 border-0 app-main-color"
											onClick={() => handleQr({ logo: null })}
										>
											Remove logo
										</button>
									</div>
								</div>
								{/*Hide backgorund Logo*/}
								<div className="row mb-3">
									<div className="col-12 form-check">
										<label className="form-check-label">
											Hide Logo Background Dots
										</label>
										<input
											className="form-check-input"
											type="checkbox"
											defaultChecked
											onChange={(event) =>
												handleQr({ hideBackgroundDots: event.target.checked })
											}
										/>
									</div>
								</div>
								{/*Logo Size*/}
								<div className="row mb-3">
									<div className="row mb-3">
										<div className="col-sm-4">
											<span className="fw-bolder">Logo size</span>
										</div>
										<div className="col-sm-6">
											<input
												type="range"
												className="form-range"
												min="0"
												max="0.9"
												step="0.1"
												defaultValue="0.4"
												onChange={(event) => {
													handleQr({ logoSize: event.target.value });
													setSliderValues({
														...sliderValues,
														logoSize: event.target.value,
													});
												}}
											/>
										</div>
										<div className="col-sm-2">
											<span>{sliderValues.logoSize}</span>
										</div>
									</div>
								</div>
								{/*Logo Margin*/}
								<div className="row mb-3">
									<div className="row mb-3">
										<div className="col-sm-4">
											<span className="fw-bolder">Logo margin</span>
										</div>
										<div className="col-sm-6">
											<input
												type="range"
												className="form-range"
												min={0}
												max={50}
												defaultValue={5}
												onChange={(event) => {
													handleQr({ logoMargin: event.target.value });
													setSliderValues({
														...sliderValues,
														logoMargin: event.target.value,
													});
												}}
											/>
										</div>
										<div className="col-sm-2">
											<span>{sliderValues.logoMargin}</span>
										</div>
									</div>
								</div>
								{/*Size Download*/}
								<div className="row mb-3">
									<div className="row mb-3">
										<div className="col-sm-4">
											<span className="fw-bolder">Download Image size</span>
										</div>
										<div className="col-sm-6">
											<input
												type="range"
												className="form-range"
												min={100}
												max={1000}
												step={10}
												defaultValue={300}
												onChange={(event) => {
													handleQr({ qrSize: event.target.value });
													setSliderValues({
														...sliderValues,
														qrSize: event.target.value,
													});
												}}
											/>
										</div>
										<div className="col-sm-2">
											<span>{sliderValues.qrSize}</span> px
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

export default QRLogo;
