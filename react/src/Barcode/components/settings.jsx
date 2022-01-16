import { useState } from "react";
import Select from "react-select";

function Settings({ setBarData, setSettings, barcodeLabel }) {
	const options = [
		{ value: "CODE128", label: "CODE128" },
		{ value: "EAN13", label: "EAN13" },
		{ value: "UPC", label: "UPC" },
		{ value: "EAN8", label: "EAN8" },
		{ value: "EAN5", label: "EAN5" },
		{ value: "EAN2", label: "EAN2" },
		{ value: "CODE39", label: "CODE39" },
		{ value: "ITF14", label: "ITF14" },
		{ value: "MSI10", label: "MSI10" },
		{ value: "MSI11", label: "MSI11" },
		{ value: "MSI1010", label: "MSI1010" },
		{ value: "MSI1110", label: "MSI1110" },
		{ value: "pharmacode", label: "PHARMACODE" },
		{ value: "codabar", label: "CODABAR" },
	];

	const [rangeValues, setRangeValues] = useState({
		width: 2,
		height: 100,
		fontSize: 20,
		textAlign: "center",
	});

	return (
		<div className="col-sm-8 my-3 p-3 bg-body rounded shadow-sm">
			<h2 className="border-bottom pb-2 mb-0">Bar Code Builder</h2>
			<div
				className="mb-3 row tab-change-content accordion-flush"
				style={{ display: "flex" }}
			>
				<label className="col-2 col-form-label">
					<span className="material-icons md-48 blue700">subtitles</span>
				</label>
				<div className="col-10">
					<div className="accordion-item mt-2">
						<h2 className="accordion-header">
							<button
								className="accordion-button"
								type="button"
								data-bs-toggle="collapse"
								data-bs-target="#collapseData"
							>
								Data
							</button>
						</h2>
						<div id="collapseData" className="accordion-collapse collapse show">
							<div className="accordion-body">
								{/*INPUT*/}
								<div className="row  mb-3">
									<div className="col-md-8">
										<input
											type="text"
											className="form-control"
											aria-label="Text input with dropdown button"
											defaultValue="Example 123"
											onChange={(event) => setBarData(event.target.value)}
										/>
									</div>
									<div className="col-md-4">
										<Select
											options={options}
											defaultValue={{ value: "CODE128", label: "CODE128" }}
											onChange={(value) => setSettings({ format: value.value })}
										/>
									</div>

									<label
										id="formatDetails"
										className="form-label mb-3"
										style={{ color: "orange" }}
									>
										{barcodeLabel}
									</label>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div
				className="mb-3 row tab-change-content accordion-flush"
				style={{ display: "flex" }}
			>
				<label className="col-2 col-form-label">
					<span className="material-icons md-48 blue700">code</span>
				</label>
				<div className="col-10">
					<div className="accordion-item mt-2">
						<h2 className="accordion-header">
							<button
								className="accordion-button"
								type="button"
								data-bs-toggle="collapse"
								data-bs-target="#collapseSttings"
							>
								Settings
							</button>
						</h2>
						<div id="collapseSttings" className="accordion-collapse collapse">
							<div className="accordion-body">
								<div className="row tab-change-content">
									<div className="input-group">
										<label htmlFor="customRange2" className="form-label">
											<span className="fw-bolder">Bar Width</span>
											<span> {rangeValues.width} </span>
										</label>
										<input
											type="range"
											className="form-range"
											min={1}
											max={4}
											step={1}
											defaultValue={2}
											onChange={(event) => {
												setRangeValues({
													...rangeValues,
													width: event.target.value,
												});
												setSettings({ width: event.target.value });
											}}
										/>
									</div>
									<div className="input-group">
										<label htmlFor="customRange2" className="form-label">
											<span className="fw-bolder">Height</span>
											<span> {rangeValues.height}</span>
										</label>
										<input
											type="range"
											className="form-range"
											min={10}
											max={150}
											step={5}
											defaultValue={100}
											onChange={(event) => {
												setRangeValues({
													...rangeValues,
													height: event.target.value,
												});
												setSettings({ height: event.target.value });
											}}
										/>
									</div>
									<div className="input-group">
										<label htmlFor="customRange2" className="form-label">
											<span className="fw-bolder">Font Size</span>
											<span> {rangeValues.fontSize}</span>
										</label>
										<input
											type="range"
											className="form-range"
											min={8}
											max={36}
											defaultValue={20}
											onChange={(event) => {
												setRangeValues({
													...rangeValues,
													fontSize: event.target.value,
												});
												setSettings({ fontSize: event.target.value });
											}}
										/>
									</div>
									<div className="row mb-3 mt-3">
										<div className="row mb-3 ms-1">
											<div className="form-check form-switch ">
												<input
													className="form-check-input"
													type="checkbox"
													defaultValue="on"
													role="switch"
													defaultChecked
													onChange={(event) =>
														setSettings({ displayValue: event.target.checked })
													}
												/>
												<label className="form-check-label">Show Text</label>
											</div>
										</div>
										<div className="row mb-3">
											<div className="col-lg-3">Text Align</div>
											<div className="col-lg-9">
												<div
													className="btn-group"
													role="group"
													aria-label="Basic outlined example"
												>
													<button
														type="button"
														className={
															"btn class-align " +
															(rangeValues.textAlign == "left"
																? "btn-primary"
																: "btn-outline-primary")
														}
														onClick={(event) => {
															setRangeValues({
																...rangeValues,
																textAlign: "left",
															});
															setSettings({ textAlign: "left" });
														}}
													>
														Left
													</button>
													<button
														type="button"
														className={
															"btn class-align " +
															(rangeValues.textAlign == "center"
																? "btn-primary"
																: "btn-outline-primary")
														}
														onClick={(event) => {
															setRangeValues({
																...rangeValues,
																textAlign: "center",
															});
															setSettings({ textAlign: "center" });
														}}
													>
														Middle
													</button>
													<button
														type="button"
														className={
															"btn class-align " +
															(rangeValues.textAlign == "right"
																? "btn-primary"
																: "btn-outline-primary")
														}
														onClick={(event) => {
															setRangeValues({
																...rangeValues,
																textAlign: "right",
															});
															setSettings({ textAlign: "right" });
														}}
													>
														Right
													</button>
												</div>
											</div>
										</div>
									</div>
									<div className="row mb-3">
										<div className="row mb-3">
											<div className="col-lg-3">Font</div>
											<div className="col-lg-9">
												<select
													className="form-select"
													aria-label="Default select example"
													onChange={(event) =>
														setSettings({ font: event.target.value })
													}
												>
													<option value="monospace">Monospace</option>
													<option value="sans-serif">Sans-serif</option>
													<option value="serif">Serif</option>
													<option value="fantasy">Fantasy</option>
													<option value="cursive">Cursive</option>
												</select>
											</div>
										</div>
									</div>
									<div className="row mb-3">
										<div className="row mb-3">
											<div className="col-6">
												<label htmlFor="color" className="form-label">
													Background
												</label>
												<input
													type="color"
													className="form-control form-control-color"
													defaultValue="#FFFFFF"
													onChange={(event) =>
														setSettings({ background: event.target.value })
													}
												/>
											</div>
											<div className="col-6">
												<label htmlFor="backgroudcolor" className="form-label">
													Line Color
												</label>
												<input
													type="color"
													className="form-control form-control-color"
													defaultValue="#000000"
													onChange={(event) =>
														setSettings({ lineColor: event.target.value })
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
		</div>
	);
}

export default Settings;
