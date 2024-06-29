import { useState, useEffect } from "react";
import Menu from "../../components/Menu";
import Link from "next/link";
import { Modal, Button, Form } from "react-bootstrap";
import { getSession } from "next-auth/react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function CustomerList({ customers, customerError }) {
	const [currentPage, setCurrentPage] = useState(1);
	const [customersPerPage] = useState(5);
	const [search, setSearch] = useState("");
	const [filteredCustomers, setFilteredCustomers] = useState(customers);
	const [loading, setLoading] = useState(true);

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
				firstName: firstName,
				lastName: lastName,
				email: customerEmail,
				phone: customerPhone,
				address: customerAddress,
			}),
		});
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
		setFirstName(customer.firstName);
		setLastName(customer.lastName);
		setCustomerEmail(customer.email);
		setCustomerPhone(customer.phone);
		setCustomerAddress(customer.address);
		setShowModal(true);
	};

	const handleUpdateCustomer = async (e) => {
		e.preventDefault();

		const END_POINT =
			process.env.NEXT_PUBLIC_NEXT_API_URL || "https://washmanapp.vercel.app/";
		const response = await fetch(
			`${END_POINT}/customers/${selectedCustomer.id}`,
			{
				method: "PUT",
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
			const updatedCustomers = filteredCustomers.filter(
				(customer) => customer.id !== customerId
			);
			setFilteredCustomers(updatedCustomers);
			console.log("Customer deleted:", customerId);
		}
	};

	useEffect(() => {
		if (Array.isArray(customers)) {
			setFilteredCustomers(
				customers.filter((customer) => {
					if (!customer) return false;
					return (
						customer.firstName.toLowerCase().includes(search.toLowerCase()) ||
						customer.lastName.toLowerCase().includes(search.toLowerCase()) ||
						customer.email.toLowerCase().includes(search.toLowerCase()) ||
						customer.phone.includes(search) ||
						customer.address.toLowerCase().includes(search.toLowerCase())
					);
				})
			);
			setLoading(false);
		}
	}, [search, customers]);

	const indexOfLastCustomer = currentPage * customersPerPage;
	const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
	const currentCustomers = Array.isArray(filteredCustomers)
		? filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer)
		: [];

	const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
												setCurrentPage(1);
											}}
										/>
									</div>
								</div>
								{customerError ? (
									<div className="alert alert-danger">{customerError}</div>
								) : loading ? (
									<Skeleton
										count={5}
										height={30}
									/>
								) : (
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
													<tr key={index}>
														<td>{indexOfFirstCustomer + index + 1}</td>
														<td>
															<Link
																className="link-brand"
																href={`customers/${customer.id}`}
																passHref>
																{customer.firstName} {customer.lastName}
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
					<Form onSubmit={handleAddCustomer}>
						<div className="row">
							<div className="col-md-12">
								<Form.Group controlId="formFirstName">
									<Form.Label>First Name</Form.Label>
									<Form.Control
										type="text"
										placeholder="Enter first name"
										value={firstName}
										onChange={(e) => setFirstName(e.target.value)}
									/>
								</Form.Group>
							</div>
							<div className="col-md-12">
								<Form.Group controlId="formLastName">
									<Form.Label>Last Name</Form.Label>
									<Form.Control
										type="text"
										placeholder="Enter last name"
										value={lastName}
										onChange={(e) => setLastName(e.target.value)}
									/>
								</Form.Group>
							</div>
							<div className="col-md-12">
								<Form.Group controlId="formCustomerEmail">
									<Form.Label>Email</Form.Label>
									<Form.Control
										type="email"
										placeholder="Enter email"
										value={customerEmail}
										onChange={(e) => setCustomerEmail(e.target.value)}
									/>
								</Form.Group>
							</div>
							<div className="col-md-12">
								<Form.Group controlId="formCustomerPhone">
									<Form.Label>Phone</Form.Label>
									<Form.Control
										type="text"
										placeholder="Enter phone"
										value={customerPhone}
										onChange={(e) => setCustomerPhone(e.target.value)}
									/>
								</Form.Group>
							</div>
							<div className="col-md-12">
								<Form.Group controlId="formCustomerAddress">
									<Form.Label>Address</Form.Label>
									<Form.Control
										type="text"
										placeholder="Enter address"
										value={customerAddress}
										onChange={(e) => setCustomerAddress(e.target.value)}
									/>
								</Form.Group>
							</div>
						</div>
						<Modal.Footer>
							<Button
								variant="secondary"
								className="text-dark"
								onClick={handleCloseModal}>
								Close
							</Button>
							<Button
								variant="brand"
								type="submit"
								className="btn-brand text-white">
								Add Customer
							</Button>
						</Modal.Footer>
					</Form>
				</Modal.Body>
			</Modal>

			<Modal
				show={showModal}
				onHide={handleCloseEditCustomer}>
				<Modal.Header closeButton>
					<Modal.Title>Edit Customer</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleUpdateCustomer}>
						<Form.Group controlId="formFirstName">
							<Form.Label>First Name</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter first name"
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
							/>
						</Form.Group>
						<Form.Group controlId="formLastName">
							<Form.Label>Last Name</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter last name"
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
							/>
						</Form.Group>
						<Form.Group controlId="formCustomerEmail">
							<Form.Label>Email</Form.Label>
							<Form.Control
								type="email"
								placeholder="Enter email"
								value={customerEmail}
								onChange={(e) => setCustomerEmail(e.target.value)}
							/>
						</Form.Group>
						<Form.Group controlId="formCustomerPhone">
							<Form.Label>Phone</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter phone"
								value={customerPhone}
								onChange={(e) => setCustomerPhone(e.target.value)}
							/>
						</Form.Group>
						<Form.Group controlId="formCustomerAddress">
							<Form.Label>Address</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter address"
								value={customerAddress}
								onChange={(e) => setCustomerAddress(e.target.value)}
							/>
						</Form.Group>
						<Modal.Footer>
							<Button
								variant="secondary"
								className="text-dark"
								onClick={handleCloseEditCustomer}>
								Close
							</Button>
							<Button
								variant="primary"
								type="submit">
								Update Customer
							</Button>
						</Modal.Footer>
					</Form>
				</Modal.Body>
			</Modal>
		</>
	);
}

export async function getServerSideProps(context) {
	const session = await getSession(context);
	const END_POINT =
		process.env.NEXT_PUBLIC_NEXT_API_URL || "https://washmanapp.vercel.app/";

	if (!session) {
		return {
			redirect: {
				destination: "/auth/signin",
				permanent: false,
			},
		};
	}

	const res = await fetch(`${END_POINT}/customers`);
	let customers = [];
	let customerError = null;

	if (res.ok) {
		customers = await res.json();
	} else {
		customerError = "Failed to fetch customers";
	}

	return {
		props: { customers, customerError },
	};
}

export default CustomerList;
