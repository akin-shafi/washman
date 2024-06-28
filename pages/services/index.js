import { useState, useEffect } from "react";
import Menu from "../../components/Menu";
// import TopMenu from "../../components/top-menu";
import Link from "next/link";
import { Modal, Button, Form } from "react-bootstrap";

function UserList({ services }) {
	const [currentPage, setCurrentPage] = useState(1);
	const [servicesPerPage] = useState(5);
	const [search, setSearch] = useState("");
	const [filteredServices, setFilteredServices] = useState(services);

	const [isModalOpen, setModalOpen] = useState(false);
	const handleOpenModal = () => {
		setFullName("");
		setUserEmail("");
		setModalOpen(true);
	};
	const handleCloseModal = () => setModalOpen(false);

	const [showModal, setShowModal] = useState(false);
	const [selectedUser, setSelectedUser] = useState(null);

	const [fullName, setFullName] = useState("");
	const [userEmail, setUserEmail] = useState("");

	const handleAddUser = async (event) => {
		event.preventDefault();
		const response = await fetch("/api/services", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: fullName,
				email: userEmail,
			}),
		});

		// const data = await response.json();
		if (response.ok) {
			const updatedServices = await fetchUpdatedServices();
			setFilteredServices(updatedServices);
			setModalOpen(false);
		} else {
			const errorData = await response.json();
			alert(errorData.error);
		}
	};
	const handleCloseEditUser = () => setShowModal(false);
	const handleEditUser = (user) => {
		setSelectedUser(user);
		setFullName(user.name);
		setUserEmail(user.email);
		setShowModal(true);
	};

	const handleUpdateUser = async (e) => {
		e.preventDefault();
		// Add logic to handle updating user data
		const api = NEXT_PUBLIC_API_URL;
		const response = await fetch(`${api}/services/${selectedUser.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: fullName,
				email: userEmail,
			}),
		});

		if (response.ok) {
			const updatedServices = await fetchUpdatedServices();
			setFilteredServices(updatedServices);
			setShowModal(false);
		} else {
			const errorData = await response.json();
			alert(errorData.error);
		}
	};

	const fetchUpdatedServices = async () => {
		const response = await fetch("/api/services");
		if (response.ok) {
			const data = await response.json();
			return data;
		} else {
			alert("Failed to fetch services");
			return filteredServices;
		}
	};

	const handleDeleteUser = (userId) => {
		if (window.confirm("Are you sure you want to delete this user?")) {
			// Here, simulate the deletion logic
			const updatedServices = filteredServices.filter(
				(user) => user.id !== userId
			);
			setFilteredServices(updatedServices);
			// Typically, here you would also send a request to the backend to delete the user
			console.log("user deleted:", userId);
		}
	};

	useEffect(() => {
		setFilteredServices(
			services.filter(
				(user) =>
					user.name.toLowerCase().includes(search.toLowerCase()) ||
					user.email.toLowerCase().includes(search.toLowerCase())
			)
		);
	}, [search, services]);

	// Get current services
	const indexOfLastUser = currentPage * servicesPerPage;
	const indexOfFirstUser = indexOfLastUser - servicesPerPage;
	const currentservices = filteredServices.slice(
		indexOfFirstUser,
		indexOfLastUser
	);

	// Change page
	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	// Calculate total pages for pagination
	const pageNumbers = [];
	for (
		let i = 1;
		i <= Math.ceil(filteredServices.length / servicesPerPage);
		i++
	) {
		pageNumbers.push(i);
	}

	return (
		<>
			<div className="page-wrapper toggled">
				<Menu />
				{/* <TopMenu /> */}
				<main className="page-content ">
					<div className="container-fluid">
						<div className="layout-specing">
							<div className="d-flex justify-content-end m-2">
								<button
									className="btn btn-sm btn-brand"
									onClick={handleOpenModal}>
									<i className="ti ti-plus me-2"></i> Add user
								</button>
							</div>
							<div className="card ">
								<div className="d-flex justify-content-between">
									<h5 className="mb-0 text-white p-4">
										services ({filteredServices.length})
									</h5>
									<div className=" p-4">
										<input
											type="text"
											className="form-control"
											placeholder="Search services..."
											value={search}
											onChange={(e) => {
												setSearch(e.target.value);
												setCurrentPage(1); // Reset to first page on search
											}}
										/>
									</div>
								</div>
								<div className="table-responsive p-4">
									<table className="table">
										<thead>
											<tr>
												<th>SN</th>
												<th>Name</th>
												<th>Email</th>

												<th>Action</th>
											</tr>
										</thead>
										<tbody>
											{currentservices.map((user, index) => (
												<tr key={user.id}>
													<td>{indexOfFirstUser + index + 1}</td>
													<td>{user.name}</td>
													<td>{user.email}</td>

													<td>
														<div className="btn-group">
															<button
																className="btn btn-sm btn-outline-warning"
																onClick={() => handleEditUser(user)}>
																<i className="ti ti-edit"></i>
															</button>
															<button
																className="btn btn-sm btn-danger ml-2"
																onClick={() => handleDeleteUser(user.id)}>
																<i className="ti ti-trash"></i>
															</button>
														</div>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>

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
					<Modal.Title id="main-modal-title">Add new services</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form
						onSubmit={handleAddUser}
						className="row">
						<div className="col-6 form-group mb-2">
							<label className="control-label">First Name:</label>
							<input
								className="form-control"
								type="text"
								value={fullName}
								onChange={(e) => setFullName(e.target.value)}
								placeholder="Enter name"
							/>
						</div>

						<div className="col-6 form-group mb-2">
							<label className="control-label">Email:</label>
							<input
								className="form-control"
								type="email"
								value={userEmail}
								onChange={(e) => setUserEmail(e.target.value)}
								placeholder="Enter email"
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
			{/* Edit user */}
			<Modal
				className="text-white"
				show={showModal}
				backdrop="static"
				onHide={() => setShowModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Edit user</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleUpdateUser}>
						<Form.Group controlId="fullName">
							<Form.Label>Full Name:</Form.Label>
							<Form.Control
								type="text"
								value={fullName}
								onChange={(e) => setFullName(e.target.value)}
							/>
						</Form.Group>

						<Form.Group controlId="formEmail">
							<Form.Label>Email:</Form.Label>
							<Form.Control
								type="email"
								value={userEmail}
								onChange={(e) => setUserEmail(e.target.value)}
							/>
						</Form.Group>

						<div className="mt-4 d-flex justify-content-center">
							<button
								type="button"
								variant="primary"
								className="btn btn-secondary  me-3"
								onClick={handleCloseEditUser}>
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

export default UserList;

export async function getServerSideProps() {
	const END_POINT = process.env.NEXT_PUBLIC_API_URL;

	const response = await fetch(`${END_POINT}/services`);
	const data = await response.json();

	console.log(data);
	return {
		props: {
			services: data,
		},
	};
}
