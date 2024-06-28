import { useState, useEffect } from "react";
import Menu from "../../components/Menu";
import Link from "next/link";
import { getSession } from "next-auth/react";

function ScheduleList({ schedules }) {
	const [currentPage, setCurrentPage] = useState(1);
	const [schedulesPerPage] = useState(5);
	const [search, setSearch] = useState("");
	const [filteredSchedules, setFilteredSchedules] = useState(schedules);

	useEffect(() => {
		setFilteredSchedules(
			schedules.filter(
				(schedule) =>
					schedule.name.toLowerCase().includes(search.toLowerCase()) ||
					schedule.phone.includes(search) ||
					schedule.address.toLowerCase().includes(search.toLowerCase()) ||
					schedule.date.toLowerCase().includes(search.toLowerCase())
			)
		);
	}, [search, schedules]);

	// Get current schedules
	const indexOfLastSchedule = currentPage * schedulesPerPage;
	const indexOfFirstSchedule = indexOfLastSchedule - schedulesPerPage;
	const currentSchedules = filteredSchedules.slice(
		indexOfFirstSchedule,
		indexOfLastSchedule
	);

	// Change page
	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	// Calculate total pages for pagination
	const pageNumbers = [];
	for (
		let i = 1;
		i <= Math.ceil(filteredSchedules.length / schedulesPerPage);
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
							<div className="card ">
								<div className="d-flex justify-content-between">
									<h5 className="mb-0 text-white p-4">
										Scheduled Pickup ({filteredSchedules.length})
									</h5>
									<div className=" p-4">
										<input
											type="text"
											className="form-control"
											placeholder="Search schedules..."
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
												<th>Phone</th>
												<th>Address</th>
												<th>Date</th>
											</tr>
										</thead>
										<tbody>
											{currentSchedules.map((schedule, index) => (
												<tr key={schedule.id}>
													<td>{indexOfFirstSchedule + index + 1}</td>
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
													<td>{schedule.pickup_date}</td>
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
		</>
	);
}

export default ScheduleList;

export async function getServerSideProps(context) {
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
	const response = await fetch(`${END_POINT}/schedules`);
	const data = await response.json();
	return {
		props: {
			schedules: data,
		},
	};
}
