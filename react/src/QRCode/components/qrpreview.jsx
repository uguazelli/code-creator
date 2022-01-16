import "../QRCode.css";
import QRLogo from "../../assets/img/qr-code.png";
import React, { useEffect, useRef, useState } from "react";
import QRCodeStyling from "qr-code-styling";

const qrCode = new QRCodeStyling();

function QRPreview({ qr }) {
	const [fileExt, setFileExt] = useState("jpg");
	const [data, setUrl] = useState("https://code-creator.net");
	const [dotsOptionsType, setDotsOptionsType] = useState("dots");
	const [cornersSquareOptionsType, setCornersSquareOptionsType] =
		useState("extra-rounded");
	const [cornersDotOptionsType, setCornersDotOptionsType] = useState("dots");
	const [dotsOptionsColor, setDotsOptionsColor] = useState("#1E6674");
	const [backgroundOptionsColor, setBackgroundOptionsColor] =
		useState("#FFFFFF");
	const [cornerColor, setCornerColor] = useState("#A28E11");
	const [cornerDotColor, setCornerDotColor] = useState("#1E6674");
	const [logo, setLogo] = useState(QRLogo);
	const [hideBackgroundDots, setHideBackgroundDots] = useState(true);

	const [logoSize, setLogoSize] = useState(0.4);
	const [logoMargin, setLogoMargin] = useState(5);
	const [qrSize, setQrSize] = useState(300);

	const ref = useRef(null);

	useEffect(() => {
		qrCode.append(ref.current);
	}, []);

	useEffect(() => {
		if (Object.keys(qr).length !== 0) {
			if (qr.hasOwnProperty("data")) setUrl(qr.data);

			if (qr.hasOwnProperty("dotsOptionsType"))
				setDotsOptionsType(qr.dotsOptionsType);

			if (qr.hasOwnProperty("cornersSquareOptionsType"))
				setCornersSquareOptionsType(qr.cornersSquareOptionsType);

			if (qr.hasOwnProperty("cornersDotOptionsType"))
				setCornersDotOptionsType(qr.cornersDotOptionsType);

			if (qr.hasOwnProperty("dotsOptionsColor"))
				setDotsOptionsColor(qr.dotsOptionsColor);

			if (qr.hasOwnProperty("backgroundOptionsColor"))
				setBackgroundOptionsColor(qr.backgroundOptionsColor);

			if (qr.hasOwnProperty("cornerColor")) setCornerColor(qr.cornerColor);

			if (qr.hasOwnProperty("cornerDotColor"))
				setCornerDotColor(qr.cornerDotColor);

			if (qr.hasOwnProperty("logo")) {
				if (qr.logo === null) {
					setLogo(qr.logo);
				} else {
					let reader = new FileReader();
					reader.onloadend = function () {
						setLogo(reader.result);
					};
					reader.readAsDataURL(qr.logo);
				}
			}

			if (qr.hasOwnProperty("hideBackgroundDots"))
				setHideBackgroundDots(qr.hideBackgroundDots);

			if (qr.hasOwnProperty("logoSize")) setLogoSize(qr.logoSize);

			if (qr.hasOwnProperty("logoMargin")) setLogoMargin(qr.logoMargin);

			if (qr.hasOwnProperty("qrSize")) setQrSize(qr.qrSize);
		}
	}, [qr]);

	useEffect(() => {
		qrCode.update({ data: data });
	}, [data]);

	useEffect(() => {
		qrCode.update({ dotsOptions: { type: dotsOptionsType } });
	}, [dotsOptionsType]);

	useEffect(() => {
		qrCode.update({ cornersSquareOptions: { type: cornersSquareOptionsType } });
	}, [cornersSquareOptionsType]);

	useEffect(() => {
		qrCode.update({ cornersDotOptions: { type: cornersDotOptionsType } });
	}, [cornersDotOptionsType]);

	useEffect(() => {
		qrCode.update({ dotsOptions: { color: dotsOptionsColor } });
	}, [dotsOptionsColor]);

	useEffect(() => {
		qrCode.update({ backgroundOptions: { color: backgroundOptionsColor } });
	}, [backgroundOptionsColor]);

	useEffect(() => {
		qrCode.update({ cornersSquareOptions: { color: cornerColor } });
	}, [cornerColor]);

	useEffect(() => {
		qrCode.update({ cornersDotOptions: { color: cornerDotColor } });
	}, [cornerDotColor]);

	useEffect(() => {
		qrCode.update({ image: logo });
	}, [logo]);

	useEffect(() => {
		qrCode.update({ imageOptions: { hideBackgroundDots: hideBackgroundDots } });
	}, [hideBackgroundDots]);

	useEffect(() => {
		qrCode.update({ imageOptions: { imageSize: logoSize } });
	}, [logoSize]);

	useEffect(() => {
		qrCode.update({ imageOptions: { margin: logoMargin } });
	}, [logoMargin]);

	useEffect(() => {
		qrCode.update({ width: qrSize, height: qrSize });
	}, [qrSize]);

	const onExtensionChange = (event) => {
		setFileExt(event.target.value);
	};

	const onDownloadClick = () => {
		qrCode.download({
			extension: fileExt,
		});
	};

	return (
		<div className="col-lg-4 ">
			<div className="my-3 p-3 bg-body rounded shadow-sm sticky-top">
				<div ref={ref} className="text-center" />
				<hr />

				{/*Download Button*/}
				<div className="row">
					<div className="col">
						<button
							type="button"
							className="btn btn-primary btn-lg rounded-0 w-100 border-0 app-main-color"
							onClick={onDownloadClick}
						>
							Download
						</button>
					</div>
					<div className="col">
						<select
							className="form-select form-select-lg"
							onChange={onExtensionChange}
							value={fileExt}
						>
							<option value="png">PNG</option>
							<option value="jpeg">JPEG</option>
							<option value="svg">SVG</option>
							<option value="webp">WEBP</option>
						</select>
					</div>
				</div>
			</div>
		</div>
	);
}

export default QRPreview;
