import { useState, useEffect } from "react";
import Menu from "../../components/Menu";
import Link from "next/link";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

function MessageList({ messages, categories, messageError }) {
	const [currentPage, setCurrentPage] = useState(1);
	const router = useRouter();
	const [messagesPerPage] = useState(5);
	const [search, setSearch] = useState("");
	const [filteredMessages, setFilteredMessages] = useState(messages);

	useEffect(() => {
		setFilteredMessages(
			messages.filter(
				(message) =>
					message.name.toLowerCase().includes(search.toLowerCase()) ||
					message.email.toLowerCase().includes(search.toLowerCase()) ||
					message.phone.includes(search) ||
					message.subject.toLowerCase().includes(search.toLowerCase())
			)
		);
	}, [search, messages]);

	// Get current messages
	const indexOfLastMessage = currentPage * messagesPerPage;
	const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
	const currentMessages = filteredMessages.slice(
		indexOfFirstMessage,
		indexOfLastMessage
	);

	// Change page
	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	// Calculate total pages for pagination
	const pageNumbers = [];
	for (
		let i = 1;
		i <= Math.ceil(filteredMessages.length / messagesPerPage);
		i++
	) {
		pageNumbers.push(i);
	}

	const fetchSubject = async (subject) => {
		const api = NEXT_PUBLIC_API_URL;
		const response = await fetch(`${api}/messages?subject=${subject}`);
		if (response.ok) {
			const data = await response.json();

			setFilteredMessages(data);
			router.push(`/messages?subject=${subject}`, undefined, { shallow: true });
		} else {
			console.error("Failed to fetch messages:", response.statusText);
		}
	};

	return (
		<>
			<div className="page-wrapper toggled">
				<Menu />
				{/* <TopMenu /> */}
				<main className="page-content ">
					<div className="container-fluid">
						<div className="layout-specing">
							{categories.map(({ subject, count }) => (
								<button
									key={subject}
									className="btn btn-sm btn-brand mb-4 me-3"
									onClick={() => fetchSubject(subject)}>
									{subject} ({count})
								</button>
							))}

							<div className="card ">
								<div className="d-flex justify-content-between">
									<h5 className="mb-0 text-white p-4">
										Messages ({filteredMessages.length})
									</h5>
									<div className=" p-4">
										<input
											type="text"
											className="form-control"
											placeholder="Search messages..."
											value={search}
											onChange={(e) => {
												setSearch(e.target.value);
												setCurrentPage(1); // Reset to first page on search
											}}
										/>
									</div>
								</div>
								{messageError ? (
									<div className="alert alert-danger">{messageError}</div>
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
													<th>Subject</th>
												</tr>
											</thead>
											<tbody>
												{currentMessages.map((message, index) => (
													<tr key={message.id}>
														<td>{indexOfFirstMessage + index + 1}</td>
														<td>
															<Link
																className="link-brand"
																href={`messages/${message.id}`}
																passHref>
																{message.name}
															</Link>
														</td>
														<td>{message.email}</td>
														<td>{message.phone}</td>
														<td>{message.subject}</td>
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
		</>
	);
}

export default MessageList;

export async function getServerSideProps(context) {
	try {
		const session = await getSession(context);
		const email = session?.user?.email;
		if (!session || session.user.status === "2FA") {
			return {
				redirect: {
					destination: `${process.env.VERIFY_URL}?email=${email}`,
					permanent: false,
				},
			};
		}

		const api = process.env.NEXT_PUBLIC_API_URL;
		const { query } = context;
		const { subject } = query;
		const queryString = subject ? subject : "";

		const response = await fetch(`${api}/messages?subject=${queryString}`);
		if (!response.ok) {
			throw new Error("Failed to fetch messages");
		}
		const data = await response.json();

		// Extract unique subjects from messages
		// Create a map to count subjects
		const subjectCounts = data.reduce((acc, message) => {
			acc[message.subject] = (acc[message.subject] || 0) + 1;
			return acc;
		}, {});

		// Convert to array format suitable for the component
		const uniqueSubjects = Object.entries(subjectCounts).map(
			([subject, count]) => {
				return { subject, count };
			}
		);

		return {
			props: {
				messages: data,
				categories: uniqueSubjects,
				messageError: null,
			},
		};
	} catch (error) {
		return {
			props: {
				messages: [],
				categories: [],
				messageError: "Error fetching messages: " + error.message,
			},
		};
	}
}
