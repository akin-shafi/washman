import { useState, useEffect } from "react";
import Menu from "../../components/Menu";
import Link from "next/link";
import { Modal, Button, Form } from "react-bootstrap";
import { getSession } from "next-auth/react";

function CustomerList({ customers, customerError }) {
	const [currentPage, setCurrentPage] = useState(1);
	const [customersPerPage] = useState(5);
	const [search, setSearch] = useState("");
	const [filteredCustomers, setFilteredCustomers] = useState(customers);

	const [isModalOpen, setModalOpen] = useState(false);
	const handleOpenModal = () => {
		setFirstName("");
		setLastName("");
		setCustomerEmail("");
		setCustomerPhone("");
		setCustomerAddress("");
		setModalOpen(true);
	};
	const handleCloseModal = () => setModalOpen(false);

	const [showModal, setShowModal] = useState(false);
	const [selectedCustomer, setSelectedCustomer] = useState(null);

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [customerEmail, setCustomerEmail] = useState("");

	const [customerPhone, setCustomerPhone] = useState("");
	const [customerAddress, setCustomerAddress] = useState("");

	const handleAddCustomer = async (event) => {
		event.preventDefault();
		const response = await fetch("/api/customers", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				first_name: firstName,
				last_name: lastName,
				email: customerEmail,
				phone: customerPhone,
				address: customerAddress,
			}),
		});
		// const data = await response.json();
		if (response.ok) {
			const updatedCustomers = await fetchUpdatedCustomers();
			setFilteredCustomers(updatedCustomers);
			setModalOpen(false);
		} else {
			const errorData = await response.json();
			alert(errorData.error);
		}
	};

	const fetchUpdatedCustomers = async () => {
		const response = await fetch("/api/customers");
		if (response.ok) {
			const data = await response.json();
			return data;
		} else {
			alert("Failed to fetch customers");
			return filteredCustomers;
		}
	};

	const handleCloseEditCustomer = () => setShowModal(false);
	const handleEditCustomer = (customer) => {
		setSelectedCustomer(customer);
		setFirstName(customer.first_name);
		setLastName(customer.last_name);
		setCustomerEmail(customer.email);
		setCustomerPhone(customer.phone);
		setCustomerAddress(customer.address);
		setShowModal(true);
	};

	const handleUpdateCustomer = async (e) => {
		e.preventDefault();

		// Add logic to handle updating customer data
		const END_POINT = process.env.NEXT_PUBLIC_API_URL;
		const response = await fetch(
			`${END_POINT}/customers/${selectedCustomer.id}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					first_name: firstName,
					last_name: lastName,
					email: customerEmail,
					phone: customerPhone,
					address: customerAddress,
				}),
			}
		);

		if (response.ok) {
			const updatedCustomers = await fetchUpdatedCustomers();
			setFilteredCustomers(updatedCustomers);
			setShowModal(false);
		} else {
			const errorData = await response.json();
			alert(errorData.error);
		}
	};

	const handleDeleteCustomer = (customerId) => {
		if (window.confirm("Are you sure you want to delete this customer?")) {
			// Here, simulate the deletion logic
			const updatedCustomers = filteredCustomers.filter(
				(customer) => customer.id !== customerId
			);
			setFilteredCustomers(updatedCustomers);
			// Typically, here you would also send a request to the backend to delete the customer
			console.log("Customer deleted:", customerId);
		}
	};

	useEffect(() => {
		// Check if customers is an array before setting filteredCustomers
		if (Array.isArray(customers)) {
			setFilteredCustomers(
				customers.filter(
					(customer) =>
						customer.first_name.toLowerCase().includes(search.toLowerCase()) ||
						customer.last_name.toLowerCase().includes(search.toLowerCase()) ||
						customer.email.toLowerCase().includes(search.toLowerCase()) ||
						customer.phone.includes(search) ||
						customer.address.toLowerCase().includes(search.toLowerCase())
				)
			);
		}
	}, [search, customers]);

	// Get current customers
	const indexOfLastCustomer = currentPage * customersPerPage;
	const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
	// Ensure filteredCustomers is an array before calling slice
	const currentCustomers = Array.isArray(filteredCustomers)
		? filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer)
		: [];

	// Change page
	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	// Calculate total pages for pagination
	const pageNumbers = [];
	for (
		let i = 1;
		i <= Math.ceil(filteredCustomers.length / customersPerPage);
		i++
	) {
		pageNumbers.push(i);
	}

	return (
		<>
			<div className="page-wrapper toggled">
				<Menu />
				<main className="page-content ">
					<div className="container-fluid">
						<div className="layout-specing">
							<div className="d-flex justify-content-end m-2">
								<button
									className="btn btn-sm btn-brand"
									onClick={handleOpenModal}>
									<i className="ti ti-plus me-2"></i> Add Customer
								</button>
							</div>
							<div className="card ">
								<div className="d-flex justify-content-between">
									<h5 className="mb-0 text-white p-4">
										Customers ({filteredCustomers.length})
									</h5>
									<div className=" p-4">
										<input
											type="text"
											className="form-control"
											placeholder="Search customers..."
											value={search}
											onChange={(e) => {
												setSearch(e.target.value);
												setCurrentPage(1); // Reset to first page on search
											}}
										/>
									</div>
								</div>
								{customerError ? (
									<div className="alert alert-danger">{customerError}</div>
								) : (
									// Render the component content
									<div className="table-responsive p-4">
										<table className="table">
											<thead>
												<tr>
													<th>SN</th>
													<th>Name</th>
													<th>Email</th>
													<th>Phone</th>
													<th>Address</th>
													<th>Action</th>
												</tr>
											</thead>
											<tbody>
												{currentCustomers.map((customer, index) => (
													<tr key={customer.id}>
														<td>{indexOfFirstCustomer + index + 1}</td>
														<td>
															<Link
																className="link-brand"
																href={`customers/${customer.id}`}
																passHref>
																{customer.first_name} {customer.last_name}
															</Link>
														</td>
														<td>{customer.email}</td>
														<td>{customer.phone}</td>
														<td>{customer.address}</td>
														<td>
															<div className="btn-group">
																<button
																	className="btn btn-sm btn-outline-warning"
																	onClick={() => handleEditCustomer(customer)}>
																	<i className="ti ti-edit"></i>
																</button>
																<button
																	className="btn btn-sm btn-dark ml-2"
																	onClick={() =>
																		handleDeleteCustomer(customer.id)
																	}>
																	<i className="ti ti-trash"></i>
																</button>
															</div>
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								)}

								<nav className="p-3 d-flex justify-content-center">
									<ul className="pagination">
										{pageNumbers.map((number) => (
											<li
												key={number}
												className={`page-item ${
													currentPage === number ? "active" : ""
												}`}>
												<a
													onClick={() => paginate(number)}
													className="page-link">
													{number}
												</a>
											</li>
										))}
									</ul>
								</nav>
							</div>
						</div>
					</div>
				</main>
			</div>

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
								className="btn btn-secondary me-4"
								onClick={handleCloseModal}>
								cancel
							</button>

							<button
								type="submit"
								className="btn btn-brand ">
								Add
							</button>
						</div>
					</form>
				</Modal.Body>
			</Modal>
			{/* Edit Customer */}
			<Modal
				className="text-white"
				show={showModal}
				backdrop="static"
				onHide={() => setShowModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Edit Customer</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleUpdateCustomer}>
						<Form.Group controlId="formFirstName">
							<Form.Label>First Name:</Form.Label>
							<Form.Control
								type="text"
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
							/>
						</Form.Group>
						<Form.Group controlId="formLastName">
							<Form.Label>Last Name:</Form.Label>
							<Form.Control
								type="text"
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
							/>
						</Form.Group>
						<Form.Group controlId="formEmail">
							<Form.Label>Email:</Form.Label>
							<Form.Control
								type="email"
								value={customerEmail}
								onChange={(e) => setCustomerEmail(e.target.value)}
							/>
						</Form.Group>
						<Form.Group controlId="formPhone">
							<Form.Label>Phone:</Form.Label>
							<Form.Control
								type="tel"
								value={customerPhone}
								onChange={(e) => setCustomerPhone(e.target.value)}
							/>
						</Form.Group>
						<Form.Group controlId="formAddress">
							<Form.Label>Address:</Form.Label>
							<Form.Control
								type="text"
								value={customerAddress}
								onChange={(e) => setCustomerAddress(e.target.value)}
							/>
						</Form.Group>
						<div className="mt-4 d-flex justify-content-center">
							<button
								type="button"
								variant="primary"
								className="btn btn-secondary  me-3"
								onClick={handleCloseEditCustomer}>
								Cancel
							</button>
							<button
								variant="primary"
								className="btn btn-brand"
								type="submit">
								Save
							</button>
						</div>
					</Form>
				</Modal.Body>
			</Modal>
		</>
	);
}

export default CustomerList;

export async function getServerSideProps(context) {
	try {
		const session = await getSession(context);
		const email = session?.user?.email;
		if (!session || session.user.status === "2FA") {
			return {
				redirect: {
					destination: `${process.env.VERIFY_URL}?email=${email}`, //redirect to login page
					permanent: false,
				},
			};
		}

		const END_POINT = process.env.NEXT_PUBLIC_API_URL;
		const response = await fetch(`${END_POINT}/customers`);
		const data = await response.json();

		return {
			props: {
				customers: data,
			},
		};
	} catch (error) {
		return {
			props: {
				customers: [],
				customerError: "Error fetching customers: " + error.message,
			},
		};
	}
}
