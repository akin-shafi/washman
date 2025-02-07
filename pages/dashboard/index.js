import React, { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import withAuth from "@/hoc/withAuth";
import Menu from "@/components/Menu";
import Link from "next/link";
import { Modal } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Joyride from "react-joyride";

function Dashboard({
	customers,
	schedules,
	messages,
	customerError,
	scheduleError,
	messageError,
}) {
	const { data: session, status } = useSession();
	const loading = status === "loading";

	const [isModalOpen, setModalOpen] = useState(false);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [customerEmail, setCustomerEmail] = useState("");
	const [customerPhone, setCustomerPhone] = useState("");
	const [customerAddress, setCustomerAddress] = useState("");

	const handleOpenModal = () => setModalOpen(true);
	const handleCloseModal = () => setModalOpen(false);

	const handleAddCustomer = async (event) => {
		event.preventDefault();
		const response = await fetch("/api/customers", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				firstName: firstName,
				lastName: lastName,
				email: customerEmail,
				phone: customerPhone,
				address: customerAddress,
			}),
		});

		if (response.ok) {
			setModalOpen(false);
			setFirstName("");
			setLastName("");
			setCustomerEmail("");
			setCustomerPhone("");
			setCustomerAddress("");
		} else {
			alert("Failed to add customer");
		}
	};

	useEffect(() => {
		if (!loading && !session) {
			signIn("github", { callbackUrl: "/dashboard" });
		}
	}, [loading, session]);

	if (loading) {
		return <Skeleton count={10} />;
	}

	if (!session) {
		return null; // Avoid rendering anything while redirecting
	}

	const isLoggedIn = session && session.user;

	const joyrideSteps = [
		{
			target: ".welcome-text",
			content:
				"Welcome to the Dashboard! Here you can manage your customers, schedules, and messages.",
			disableBeacon: true,
		},
		{
			target: ".add-customer-btn",
			content: "Click here to add a new customer.",
		},
		{
			target: ".view-all-schedules-link",
			content: "View all schedules to manage pickups and deliveries.",
		},
		{
			target: ".view-all-messages-link",
			content: "Explore all messages from customers and staff.",
		},
	];

	const joyrideStyles = {
		options: {
			primaryColor: "#FF5733", // Customize this color to your preferred button color
		},
		buttonNext: {
			backgroundColor: "#fdd05c", // Customize this color to your preferred button color
			color: "#000", // Customize text color
		},
		buttonBack: {
			color: "#000", // Customize this color to your preferred button color
		},
		buttonSkip: {
			color: "#000", // Customize this color to your preferred button color
		},
	};

	const [joyrideOpen, setJoyrideOpen] = useState(false);

	const handleJoyrideCallback = (data) => {
		const { action, index, type, status } = data;
		const finishedStatuses = ["finished", "skipped"];

		if (finishedStatuses.includes(status)) {
			setJoyrideOpen(false);
			// Store that the user has completed the tour
			localStorage.setItem("hasCompletedTour", "true");
		}

		if (action === "reset" || action === "close") {
			setJoyrideOpen(false);
		}
	};

	const startJoyride = () => {
		setJoyrideOpen(true);
	};

	useEffect(() => {
		// Check if the user has completed the tour
		const hasCompletedTour = localStorage.getItem("hasCompletedTour");
		if (!hasCompletedTour) {
			startJoyride();
		}
	}, []); // Empty dependency array ensures this effect runs only once on mount

	return (
		<>
			<Joyride
				steps={joyrideSteps}
				run={joyrideOpen}
				continuous={true}
				showProgress={true}
				showSkipButton={true}
				callback={handleJoyrideCallback}
				styles={joyrideStyles} // Pass the custom styles here
			/>

			<Modal
				className="text-white"
				size=""
				show={isModalOpen}
				onHide={() => setModalOpen(false)}
				backdrop="static">
				<Modal.Header closeButton={false}>
					<Modal.Title id="main-modal-title">Add new Customer</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form
						onSubmit={handleAddCustomer}
						className="row">
						<div className="col-6 form-group mb-2">
							<label className="control-label">First Name:</label>
							<input
								className="form-control"
								type="text"
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
								placeholder="Enter name"
							/>
						</div>
						<div className="col-6 form-group mb-2">
							<label className="control-label">Last Name:</label>
							<input
								className="form-control"
								type="text"
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
								placeholder="Enter name"
							/>
						</div>
						<div className="col-6 form-group mb-2">
							<label className="control-label">Email:</label>
							<input
								className="form-control"
								type="email"
								value={customerEmail}
								onChange={(e) => setCustomerEmail(e.target.value)}
								placeholder="Enter email"
							/>
						</div>
						<div className="col-6 form-group mb-2">
							<label className="control-label">Phone:</label>
							<input
								className="form-control"
								type="tel"
								value={customerPhone}
								onChange={(e) => setCustomerPhone(e.target.value)}
								placeholder="Enter phone"
							/>
						</div>
						<div className="col-12 form-group mb-2">
							<label className="control-label">Address:</label>
							<input
								className="form-control"
								type="text"
								value={customerAddress}
								onChange={(e) => setCustomerAddress(e.target.value)}
								placeholder="Enter address"
							/>
						</div>

						<div className="mt-2 d-flex justify-content-center">
							<button
								type="button"
								className="btn btn-secondary me-3"
								onClick={handleCloseModal}>
								Cancel
							</button>
							<button
								type="submit"
								className="btn btn-brand">
								Add
							</button>
						</div>
					</form>
				</Modal.Body>
			</Modal>

			{/* Dashboard content */}
			<div className="page-wrapper toggled">
				<Menu />
				<main className="page-content ">
					<div className="container-fluid">
						{/* Content sections */}
						{/* Welcome message */}
						<div className="layout-specing">
							<div className="card">
								<h5 className="welcome-text mb-0 text-white p-4">
									{isLoggedIn ? (
										<p>Welcome {session.user.name}</p>
									) : (
										<p>Welcome Admin</p>
									)}
								</h5>
							</div>

							{/* Customer section */}
							<div className="row">
								{/* Add customer button */}
								<div className="col-lg-5 mt-4">
									<div className="card border-0 rounded shadow p-4">
										<h5 className="mb-0 mb-3 text-white">
											Total Customers ({customers.length})
										</h5>
										{customerError ? (
											<div className="alert alert-danger">{customerError}</div>
										) : (
											<div className="text-muted mb-0 text-center">
												<img
													src={`../images/${
														customers.length === 0
															? "avatar.png"
															: "avatar-colored.png"
													}`}
													className="img-fluid"
													width={100}
												/>
												{/* Placeholder */}
												<div className="h6 py-1">
													No recently added Customers
												</div>
												<div className="py-1">
													<button
														className="add-customer-btn btn btn-lg btn-brand"
														onClick={handleOpenModal}>
														<i className="ti ti-plus me-2"></i> Add Customer
													</button>
												</div>
												<Link
													href="/customers/"
													className="py-2 link-brand">
													View all <i className="ti ti-arrow-right ms-2"></i>
												</Link>
											</div>
										)}
									</div>
								</div>

								{/* Schedule section */}
								<div className="col-lg-7 mt-4">
									<div className="card border-0 rounded shadow p-4">
										<div className="d-flex justify-content-between">
											<h5 className="mb-0 mb-3 text-white">
												Schedules Pickup - ({schedules.length})
											</h5>
											<div className="view-all-schedules-link">
												<Link
													href="/schedules/"
													className="link-brand">
													View all <i className="ti ti-arrow-right ms-2"></i>
												</Link>
											</div>
										</div>
										{scheduleError ? (
											<div className="alert alert-danger">{scheduleError}</div>
										) : (
											<div className="text-muted mb-0">
												{schedules.length === 0 ? (
													<div
														className="d-flex justify-content-center align-items-center card"
														style={{ minHeight: "220px" }}>
														<img
															src="../images/calendar.png"
															className="img-fluid"
															width={100}
														/>
														{/* Placeholder */}
														<div className="h6">No activity to report now</div>
													</div>
												) : (
													<table className="table">
														<thead>
															<tr>
																<th>#</th>
																<th>Name</th>
																<th>Phone</th>
																<th>Address</th>
																<th>Date</th>
															</tr>
														</thead>
														<tbody>
															{schedules.map((schedule, index) => (
																<tr key={index}>
																	<td>{index + 1}</td>
																	<td>
																		<Link
																			className="link-brand"
																			href={`schedules/${schedule.id}`}
																			passHref>
																			{schedule.name}
																		</Link>
																	</td>
																	<td>{schedule.phone}</td>
																	<td>{schedule.address}</td>
																	<td>{schedule.date}</td>
																</tr>
															))}
														</tbody>
													</table>
												)}
											</div>
										)}
									</div>
								</div>
								{/* Messages section */}
								<div className="col-12 mt-4">
									<div className="card border-0 rounded shadow p-4">
										<div className="d-flex justify-content-between">
											<h5 className="mb-0 mb-3 text-white">
												Messages ({messages.length})
											</h5>
											<div className="view-all-messages-link">
												<Link
													href="/messages/"
													className="link-brand">
													View all <i className="ti ti-arrow-right ms-2"></i>
												</Link>
											</div>
										</div>
										{messageError ? (
											<div className="alert alert-danger">{messageError}</div>
										) : (
											<div className="text-muted mb-0">
												{messages.length === 0 ? (
													<div
														className="d-flex justify-content-center align-items-center card"
														style={{ minHeight: "220px" }}>
														<img
															src="../images/message.png"
															className="img-fluid"
															width={100}
														/>
														<div className="h6">No data to report now</div>
													</div>
												) : (
													<table className="table">
														<thead>
															<tr>
																<th>#</th>
																<th>Name</th>
																<th>Phone</th>
																<th>Subject</th>
																<th>Message</th>
															</tr>
														</thead>
														<tbody>
															{messages.map((message, index) => (
																<tr key={index}>
																	<td>{index + 1}</td>
																	<td>{message.name}</td>
																	<td>{message.phone}</td>
																	<td>{message.subject}</td>
																	<td className="ellipsis">
																		<Link
																			className="link-brand"
																			href={`messages/${message.id}`}
																			passHref>
																			{message.body}
																		</Link>
																	</td>
																</tr>
															))}
														</tbody>
													</table>
												)}
											</div>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</main>
			</div>
		</>
	);
}

export default withAuth(Dashboard);

import { getSession } from "next-auth/react";

export async function getServerSideProps(context) {
	const session = await getSession(context);
	const END_POINT =
		process.env.NEXT_PUBLIC_NEXT_API_URL || "https://washmanapp.vercel.app/api";
	const email = session?.user?.email;
	console.log("Show Email:", email);
	if (!session || session.user.status == "2FA") {
		return {
			redirect: {
				destination: `${process.env.VERIFY_URL}?email=${email}`, //redirect to login page
				permanent: false,
			},
		};
	}

	try {
		// Fetch customers data
		const customerResponse = await fetch(`${END_POINT}/customers`);
		const customerData = await customerResponse.json();

		// Fetch schedules data
		const scheduleResponse = await fetch(`${END_POINT}/schedules`);
		const scheduleData = await scheduleResponse.json();
		// Only keep the last 3 schedules
		const limitedScheduleData = scheduleData.slice(-3);

		// Fetch messages data
		const messageResponse = await fetch(`${END_POINT}/messages`);
		const messageData = await messageResponse.json();
		const limitedMessageData = messageData.slice(-3);

		return {
			props: {
				customers: customerData,
				schedules: limitedScheduleData,
				messages: limitedMessageData,
				customerError: null,
				scheduleError: null,
				messageError: null,
			},
		};
	} catch (error) {
		// If an error occurs during fetching, set error states for each data source
		return {
			props: {
				customers: [],
				schedules: [],
				messages: [],
				customerError:
					"Error fetching customer data: " + error.message + `${END_POINT}`,
				scheduleError:
					"Error fetching schedule data: " + error.message + `${END_POINT}`,
				messageError:
					"Error fetching message data: " + error.message + `${END_POINT}`,
			},
		};
	}
}
