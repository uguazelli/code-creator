import "./css/default.css";
import "./css/style.css";
import "./css/Home.css";

function Home() {
	return (
		<div>
			<nav className="navbar navbar-expand-lg navbar-dark app-main-color">
				<div className="container-fluid">
					<a className="navbar-brand" href="/">
						<span className="material-icons">developer_board</span>
					</a>
					<a className="navbar-brand" href="/">
						<strong>code-creator.net</strong>
					</a>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarNavAltMarkup"
						aria-controls="navbarNavAltMarkup"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon" />
					</button>
					<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
						<div className="navbar-nav">
							<a className="nav-link active" aria-current="page" href="/qrcode">
								QR Code
							</a>
							<a className="nav-link active" href="/barcode">
								Barcode
							</a>
						</div>
					</div>
				</div>
			</nav>
			<br />
			{/*====== SLIDER PART START ======*/}
			<section id="home" className="slider_area">
				<div className="carousel slide" data-ride="carousel">
					<div className="carousel-inner">
						<div className="carousel-item active">
							<div className="container">
								<div className="row">
									<div className="col-lg-6">
										<div className="slider-content">
											<h1 className="title">CODE CREATOR</h1>
											<p className="text">
												Design QR Code or Barcode online, for free.
											</p>
											<ul className="slider-btn rounded-buttons">
												<li>
													<a className="main-btn rounded-two" href="/qrcode">
														QR Code
													</a>
												</li>
												<li>
													<a className="main-btn rounded-two" href="/barcode">
														Barcode
													</a>
												</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			{/*====== SLIDER PART ENDS ======*/}
			{/*====== FEATRES TWO PART START ======*/}
			<section id="services" className="features-area">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-lg-6 col-md-10">
							<div className="section-title text-center pb-10">
								<h3 className="title">Our Services</h3>
								<p className="text">
									Design your code for free, no software required
								</p>
							</div>
							{/* row */}
						</div>
					</div>
					{/* row */}
					<div className="row justify-content-center">
						<div className="col-lg-4 col-md-7 col-sm-9">
							<div className="single-features mt-40">
								<div className="features-title-icon d-flex justify-content-between">
									<h4 className="features-title">
										<a href="/qrcode">QR Code</a>
									</h4>
									<div className="features-icon">
										<i className="lni lni-brush" />
										<span className="material-icons">qr_code</span>
									</div>
								</div>
								<div className="features-content">
									<p className="text">
										A QR code (an initialism for Quick Response code) is a type
										of matrix barcode (or two-dimensional barcode)
									</p>
									<a className="features-btn" href="/qrcode">
										Design QR code
									</a>
								</div>
							</div>
							{/* single features */}
						</div>
						<div className="col-lg-4 col-md-7 col-sm-9">
							<div className="single-features mt-40">
								<div className="features-title-icon d-flex justify-content-between">
									<h4 className="features-title">
										<a href="/barcode">Barcode</a>
									</h4>
									<div className="features-icon">
										<i className="lni lni-layout" />
										<span className="material-icons">analytics</span>
									</div>
								</div>
								<div className="features-content">
									<p className="text">
										A barcode or bar code is a method of representing data in a
										visual, machine-readable form. Initially, barcodes
										represented data by varying the widths and spacings of
										parallel lines.
									</p>
									<a className="features-btn" href="/barcode">
										Design Barcode
									</a>
								</div>
							</div>
							{/* single features */}
						</div>
					</div>
					{/* row */}
				</div>
				{/* container */}
			</section>
			{/*====== FEATRES TWO PART ENDS ======*/}

			{/*====== CONTACT PART START ======

			<section id="contact" className="contact-area">
				<div className="container">
					<div className="row">
						<div className="col-lg-12">
							<div className="contact-wrapper form-style-two pt-115">
								<h4 className="contact-title pb-10">
									<i className="lni lni-envelope" /> Leave
									<span>A Message.</span>
								</h4>
								<form
									id="contact-form"
									action="assets/contact.php"
									method="post"
								>
									<div className="row">
										<div className="col-md-6">
											<div className="form-input mt-25">
												<label>Name</label>
												<div className="input-items default">
													<input name="name" type="text" placeholder="Name" />
													<i className="lni lni-user" />
												</div>
											</div>

										</div>
										<div className="col-md-6">
											<div className="form-input mt-25">
												<label>Email</label>
												<div className="input-items default">
													<input
														type="email"
														name="email"
														placeholder="Email"
													/>
													<i className="lni lni-envelope" />
												</div>
											</div>

										</div>
										<div className="col-md-12">
											<div className="form-input mt-25">
												<label>Massage</label>
												<div className="input-items default">
													<textarea
														name="massage"
														placeholder="Massage"
														defaultValue={""}
													/>
													<i className="lni lni-pencil-alt" />
												</div>
											</div>

										</div>
										<p className="form-message" />
										<div className="col-md-12">
											<div className="form-input light-rounded-buttons mt-30">
												<button className="main-btn light-rounded-two">
													Send Message
												</button>
											</div>

										</div>
									</div>

								</form>
							</div>

						</div>
					</div>

				</div>

			</section>

			/*====== CONTACT PART ENDS ======*/}
			{/*====== FOOTER PART START ======*/}
			<section className="footer-area footer-dark">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-lg-6">
							<div className="footer-support text-center">
								<span className="mail">guazelli.ugo@gmail.com</span>
							</div>
							<div className="copyright text-center mt-35">
								<p className="text">
									Designed by Ugo Guazelli and Built-with
									<a rel="nofollow" href="https://reactjs.org/">
										React
									</a>
								</p>
							</div>
							{/*  copyright */}
						</div>
					</div>
					{/* row */}
				</div>
				{/* container */}
			</section>
			{/*====== FOOTER PART ENDS ======*/}
		</div>
	);
}

export default Home;
