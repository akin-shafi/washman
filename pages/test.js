import React, { useState, useEffect } from "react";
import Header from "../components/header";
import axios from "axios";
import { Modal, Form } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Home = ({ services, error, endpoint }) => {
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
	const [loading, setLoading] = useState(true);
	const [logoLoaded, setLogoLoaded] = useState(false);
    useEffect(() => {
		if (services.length > 0 || error) {
			setLoading(false);
		}
	}, [services, error]);
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
		const API = process.env.NEXT_PUBLIC_NEXT_API_URL;
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

	const handleLogoLoad = () => {
		setLogoLoaded(true);
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
											{!logoLoaded && (
												<Skeleton
													height={200}
													width={800}
												/>
											)}
											<img
												src="../images/slide.png"
												alt=""
												width="800"
												className={`img-fluid ${logoLoaded ? "" : "d-none"}`}
												onLoad={handleLogoLoad}
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
											onHide={closeModal}
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
							<div className="row d-flex justify-content-center">
								{loading ? (
									<Skeleton
										count={5}
										height={50}
										style={{ marginBottom: "10px" }}
									/>
								) : (
									services.map((service, index) => (
										<div
											className="col-xl-4 col-lg-6 col-md-6"
											key={index}>
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
				</div>
			</div>
		</>
	);
};

export default Home;

export async function getServerSideProps() {
	const END_POINT =
		process.env.NEXT_PUBLIC_NEXT_API_URL || "https://washmanapp.vercel.app/api";
	try {
		const response = await axios.get(`${END_POINT}/services`);
		const data = response.data;
		return {
			props: {
				endpoint: END_POINT,
				services: data,
				error: null,
			},
		};
	} catch (error) {
		console.error("Error fetching data see:", error);
		let errorMessage = `Error fetching data from the database. ${error}`;
		if (error.response) {
			// The request was made and the server responded with a status code
			// that falls out of the range of 2xx
			errorMessage += ` Server responded with ${error.response.status} ${error.response.statusText}`;
		} else if (error.request) {
			// The request was made but no response was received
			errorMessage += ` No response received from the server ${error.request}`;
		} else {
			// Something happened in setting up the request that triggered an Error
			errorMessage += ` Error setting up request: ${error.message}`;
		}
		return {
			props: {
				endpoint: END_POINT,
				services: [],
				error: errorMessage,
			},
		};
	}
}
