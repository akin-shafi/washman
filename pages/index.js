import React, { useState, useEffect } from "react";
import Header from "../components/header";
import axios from "axios";
import { Modal, Form } from "react-bootstrap";
// export default function Home({ servicesRecord }) {
const Home = ({ services, error }) => {
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		address: "",
		pickupDate: "",
		deliveryDate: "",
		comment: "",
	});

	// useEffect(() => {
	// 	async function fetchServiceData() {
	// 		try {
	// 			const API = process.env.NEXT_PUBLIC_API_URL;
	// 			const response = await axios.get(`${API}/services`);
	// 			const data = response.data;
	// 			setServiceData(data);
	// 		} catch (error) {
	// 			console.error("Error fetching service data:", error);
	// 		} finally {
	// 			setIsLoading(false);
	// 		}
	// 	}
	// 	fetchServiceData();
	// }, []);

	// if (isLoading) {
	// 	return <h2 className="text-white">Loading...</h2>;
	// }

	const openModal = () => {
		setModalIsOpen(true);
	};

	const closeModal = () => {
		setModalIsOpen(false);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const API = process.env.NEXT_PUBLIC_API_URL;
		try {
			const response = await fetch(`${API}/services`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			if (!response.ok) {
				throw new Error("Network response was not ok");
			}

			const result = await response.json();
			console.log("Form submitted successfully:", result);
			// You can add more actions here, such as closing the modal or showing a success message.
		} catch (error) {
			console.error("Error submitting form:", error);
			// Handle the error appropriately in your UI.
		}
	};
	return (
		<>
			<div
				id="main-wrapper"
				className="front">
				<div id="home">
					<Header />

					<div className="intro1 section-padding">
						<div className="container">
							<div className="row justify-content-between align-items-center">
								<div className="col-xl-12 col-lg-6 col-12">
									<div className="intro-slider">
										<div className="slider-item text-center">
											<img
												src="../images/slide.png"
												alt=""
												width="800"
												className="img-fluid"
											/>
										</div>
									</div>
								</div>
								<div className="col-xl-12 col-lg-6 col-12 text-center">
									<div className="intro-content my-5">
										<h1 className="mb-3">
											<span>
												You Leave it, We
												<span className="link-brand">Clean</span> it!
											</span>
										</h1>
										<p>...More than just a laundry service</p>
										<div>
											<button
												className="btn btn-brand"
												onClick={openModal}>
												Schedule a pickup
											</button>
										</div>
										<Modal
											className="text-white"
											size=""
											show={modalIsOpen}
											onHide={() => setModalIsOpen(false)}
											backdrop={true}>
											<Modal.Header closeButton={false}>
												<Modal.Title id="main-modal-title">
													Schedule a Pickup
												</Modal.Title>
											</Modal.Header>
											<Modal.Body>
												<form
													onSubmit={handleSubmit}
													className="row">
													<div className="mb-3">
														<label
															htmlFor="name"
															className="form-label">
															Name:
														</label>
														<input
															type="text"
															className="form-control"
															id="name"
															name="name"
															value={formData.name}
															onChange={handleChange}
															required
														/>
													</div>

													<div className="mb-3 col-6">
														<label
															htmlFor="email"
															className="form-label">
															Email:
														</label>
														<input
															type="email"
															className="form-control"
															id="email"
															name="email"
															value={formData.email}
															onChange={handleChange}
															required
														/>
													</div>

													<div className="mb-3 col-6">
														<label
															htmlFor="phone"
															className="form-label">
															Phone:
														</label>
														<input
															type="tel"
															className="form-control"
															id="phone"
															name="phone"
															value={formData.phone}
															onChange={handleChange}
															required
														/>
													</div>

													<div className="mb-3">
														<label
															htmlFor="address"
															className="form-label">
															Address:
														</label>
														<input
															type="text"
															className="form-control"
															id="address"
															name="address"
															value={formData.address}
															onChange={handleChange}
															required
														/>
													</div>

													<div className="mb-3 col-6">
														<label
															htmlFor="pickupDate"
															className="form-label">
															Pickup Date:
														</label>
														<input
															type="date"
															className="form-control"
															id="pickupDate"
															name="pickupDate"
															value={formData.pickupDate}
															onChange={handleChange}
															required
														/>
													</div>

													<div className="mb-3 col-6">
														<label
															htmlFor="deliveryDate"
															className="form-label">
															Delivery Date:
														</label>
														<input
															type="date"
															className="form-control"
															id="deliveryDate"
															name="deliveryDate"
															value={formData.deliveryDate}
															onChange={handleChange}
															required
														/>
													</div>

													<div className="mb-3">
														<label
															htmlFor="comment"
															className="form-label">
															Comment:
														</label>
														<textarea
															className="form-control"
															id="comment"
															name="comment"
															rows="3"
															value={formData.comment}
															onChange={handleChange}></textarea>
													</div>

													<div className="d-grid gap-2 d-md-flex justify-content-md-center">
														<button
															type="button"
															className="btn btn-outline-dark me-md-2"
															onClick={closeModal}>
															Cancel
														</button>
														<button
															type="submit"
															className="btn btn-brand">
															Submit
														</button>
													</div>
												</form>
											</Modal.Body>
										</Modal>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div
					id="services"
					className="notable-drops section-padding ">
					<div className="container">
						<div className="row">
							<div className="col-xl-12">
								<div className="section-title text-center mb-3">
									<h2 className="text-white">Our Services</h2>
								</div>
							</div>
						</div>

						<div className="row d-flex justify-content-center">
							{/* service goes here */}
							{error ? (
								<div className="col-12">
									<div
										className="alert alert-danger"
										role="alert">
										{error}
									</div>
								</div>
							) : (
								services.map((service) => (
									<div
										className="col-xl-4 col-lg-6 col-md-6"
										key={service.id}>
										<div
											className="card border-0"
											style={{ position: "relative" }}>
											<div
												className="p-4"
												style={{ marginBottom: "-40px", zIndex: "100" }}>
												<img
													className="img-fluid card-img-top"
													src={`../images/items/${service.file}`}
													alt=""
												/>
											</div>
											<div className="card-body text-center pt-4">
												<div className="notable-drops-content-img"></div>
												<h4 className="card-title pt-3">{service.heading}</h4>
												<p>{service.text}</p>
											</div>
										</div>
									</div>
								))
							)}
						</div>
					</div>
				</div>
				<div
					id="coming-soon"
					className="notable-drops section-padding  my-5 py-5">
					<div className="container text-center text-white">
						<p>Home Cleaning Service</p>
						<h1 className="text-center text-white">Coming Soon</h1>
						<div className="progress">
							<div
								className="progress-bar"
								role="progressbar"
								style={{ width: "50%" }}
								aria-valuenow="50"
								aria-valuemin="0"
								aria-valuemax="100">
								50%
							</div>
						</div>
					</div>
				</div>
				<div
					id="how"
					className="notable-drops section-padding ">
					<div className="container">
						<div className="row d-flex justify-content-center text-center text-white">
							<div className="col-xl-4 col-lg-6 col-md-6">
								<div className="align-items-center">
									<img
										src="../images/items/phone.png"
										alt=""
										width="150"
									/>
									<h4 className="text-white">1</h4>
									<p>
										Choose where and when you’d like us to collect and deliver
										your laundry. Chat us directly or give us a call.
									</p>
								</div>
							</div>

							<div className="col-xl-4 col-lg-6 col-md-6">
								<div className="align-items-center">
									<img
										src="../images/items/basket.png"
										alt=""
										width="150"
									/>
									<h4 className="text-white">2</h4>
									<p>
										We’ll collect your bag, invoice you and clean your items
										according to your requirements.
									</p>
								</div>
							</div>

							<div className="col-xl-4 col-lg-6 col-md-6">
								<div className="align-items-center">
									<img
										src="../images/items/pickup.png"
										alt=""
										width="100"
									/>
									<h4 className="text-white">3</h4>
									<p>
										We deliver your items, cleaned within 24hrs or, within the
										time required per service.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div
					id="about"
					className="notable-drops section-padding my-5">
					<div className="container">
						<div className="row">
							<div className="col-xl-12">
								<div className="section-title text-center text-white mb-3">
									<h2 className="text-white">Why Choose Us</h2>
									<p>
										At wash with kings, we understand that you have options when
										it comes to laundry and dry cleaning services
									</p>

									<div>
										<img
											src="../images/items/value.png"
											width="800"
											className="img-fluid"
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div
					id="contact"
					className="notable-drops section-padding my-5">
					<div className="container">
						<div className="row">
							<div className="col-xl-12">
								<div className="section-title  text-white mb-3">
									<div className="text-center">
										<h2 className="text-white">Contact Us</h2>
										<p className="mx-auto w-50">
											At wash with kings, we understand that you have options
											when it comes to laundry and dry cleaning services
										</p>
									</div>
									<div className="container my-5">
										<div className="row">
											<div className=" col-4 d-flex align-items-center">
												<div className="card ">
													<div className="card-body">
														<img
															className="img-fluid"
															src="../images/items/map.png"
															width=""
														/>
													</div>
												</div>
											</div>
											<div className="col-8">
												<div className="card">
													<div className="card-body">
														<h3 className="text-dark text-center">
															Get in Touch
														</h3>
														<p className="text-dark text-center mx-auto w-50">
															Contact us today for the best customer service and
															expert help with all your laundry needs.
														</p>
														<div className="row">
															<div className="col-lg-4 card text-white text-center pt-4 p-2">
																<h6 className="text-white">Business Hour</h6>
																<p> Mon -Sat: 9:00 Am to 8:00 Pm</p>
																<p>Sunday: Closed</p>
															</div>
															<div className="col-lg-4 card text-white text-center pt-4 p-2">
																<h6 className="text-white">Contact Us</h6>
																<p>Washwithkingsdrycleaningservice@gmail.com</p>
																<p>08182906741</p>
																<p>09162610067</p>
															</div>
															<div className="col-lg-4 card text-white text-center pt-4 p-2">
																<h6 className="text-white">Our location</h6>
																<p>
																	Plot 2248 block 34 Festac link road opposite
																	Diamond estate Amuwo Odofin
																</p>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="container">
										<h3 className="text-white text-center">Write a message</h3>
										<div className="row justify-content-center">
											<div className="col-md-6">
												<form
													className="row"
													onSubmit={handleSubmit}>
													<div className="mb-3 col-6">
														<label
															htmlFor="fullName"
															className="form-label">
															Full Name
														</label>
														<input
															type="text"
															className="form-control"
															id="fullName"
															placeholder="Enter your full name"
														/>
													</div>
													<div className="mb-3 col-6">
														<label
															htmlFor="email"
															className="form-label">
															Email address
														</label>
														<input
															type="email"
															className="form-control"
															id="email"
															placeholder="name@example.com"
														/>
													</div>
													<div className="mb-3 col-6">
														<label
															htmlFor="phone"
															className="form-label">
															phone
														</label>
														<input
															type="text"
															className="form-control"
															id="phone"
															placeholder="081-xxxx-xxx-xxx"
														/>
													</div>

													<div className="mb-3 col-6">
														<label
															htmlFor="subject"
															className="form-label">
															subject
														</label>
														<input
															type="text"
															className="form-control"
															id="subject"
															placeholder=""
														/>
													</div>
													<div className="mb-3 col-12">
														<label
															htmlFor="message"
															className="form-label">
															Message
														</label>
														<textarea
															className="form-control"
															id="message"
															rows="5"
															placeholder="Enter your message"></textarea>
													</div>
													<div className="text-center">
														<button
															type="submit"
															className="btn btn-brand">
															Send Message
														</button>
													</div>
												</form>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;

export async function getServerSideProps() {
	const END_POINT = process.env.NEXT_PUBLIC_API_URL;
	try {
		const response = await axios.get(`${END_POINT}/services`);
		const data = response.data;
		return {
			props: {
				services: data,
				error: null,
			},
		};
	} catch (error) {
		console.error("Error fetching data:", error);
		let errorMessage = "Error fetching data from the database.";
		if (error.response) {
			// The request was made and the server responded with a status code
			// that falls out of the range of 2xx
			errorMessage += ` Server responded with ${error.response.status} ${error.response.statusText}`;
		} else if (error.request) {
			// The request was made but no response was received
			errorMessage += " No response received from the server";
		} else {
			// Something happened in setting up the request that triggered an Error
			errorMessage += ` Error setting up request: ${error.message}`;
		}
		return {
			props: {
				services: [],
				error: errorMessage,
			},
		};
	}
}
