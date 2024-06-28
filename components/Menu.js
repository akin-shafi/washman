import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
// import { getServerSideProps } from "@/pages/dashboard";
import UserAvatar from "./UserAvatar";
import LogoutButton from "./LogoutButton";

function SideBarMenu() {
	const router = useRouter();
	const { data: session, status } = useSession();
	const isLoggedIn = session && session.user;
	// console.log(session);

	const handleSignOut = async (e) => {
		e.preventDefault();
		await signOut({ callbackUrl: "/auth/signout" });
	};

	useEffect(() => {
		const activateSidebarMenu = () => {
			const current = location.pathname.substring(
				location.pathname.lastIndexOf("/") + 1
			);
			if (current !== "" && document.getElementById("sidebar")) {
				const menuItems = document.querySelectorAll("#sidebar a");
				for (let i = 0, len = menuItems.length; i < len; i++) {
					if (menuItems[i].getAttribute("href").indexOf(current) !== -1) {
						menuItems[i].parentElement.className += " active";
						if (menuItems[i].closest(".sidebar-submenu")) {
							menuItems[i].closest(".sidebar-submenu").classList.add("d-block");
						}
						if (menuItems[i].closest(".sidebar-dropdown")) {
							menuItems[i].closest(".sidebar-dropdown").classList.add("active");
						}
					}
				}
			}
		};

		activateSidebarMenu();
	}, [router.pathname]);

	useEffect(() => {
		const toggleSidebar = () => {
			document
				.getElementsByClassName("page-wrapper")[0]
				.classList.toggle("toggled");
		};

		const closeSidebarButton = document.getElementById("close-sidebar");
		if (closeSidebarButton) {
			closeSidebarButton.addEventListener("click", toggleSidebar);
		}

		return () => {
			if (closeSidebarButton) {
				closeSidebarButton.removeEventListener("click", toggleSidebar);
			}
		};
	}, []);
	return (
		<>
			<nav
				id="sidebar"
				className="sidebar-wrapper sidebar-dark">
				<div className="sidebar-content text-white">
					<div className="sidebar-brand">
						<Link href="/dashboard/">
							<Image
								src="/images/logo.png"
								width={100}
								height={60}
								className=""
								alt="big"
							/>
							<span className="sidebar-colored">
								<Image
									src="/images/logo.png"
									width={100}
									height={100}
									className="logo-dark-mode"
									alt="big"
								/>
							</span>
						</Link>
					</div>

					<ul className="sidebar-menu">
						<li className="">
							<Link href="/dashboard/">
								<i className="ti ti-home me-2"></i>Dashboard
							</Link>
						</li>

						<li className="">
							<Link href="/customers/">
								<i className="ti ti-users me-2"></i>Customers
							</Link>
						</li>
						<li className="">
							<Link href="/schedules/">
								<i className="ti ti-motorbike me-2"></i>Scheduled Pickup
							</Link>
						</li>
						<li className="">
							<Link href="/messages/">
								<i className="ti ti-message me-2"></i>Messages
							</Link>
						</li>
						<li className="">
							<Link href="/users/">
								<i className="ti ti-user me-2"></i>Admins
							</Link>
						</li>
					</ul>
					{/* <!-- sidebar-menu  --> */}
				</div>
				{/* <!-- Sidebar Footer --> */}
				<ul className="sidebar-footer sidebar-menu mb-0">
					<li>
						<LogoutButton type="footer" />
						{/* <div
							onClick={handleSignOut}
							className="pointer">
							<i className="ti ti-logout me-2 text-muted"></i>
							<small className="text-muted fw-medium ms-1">Log Out</small>
						</div> */}
					</li>
				</ul>
				{/* <!-- Sidebar Footer --> */}
			</nav>

			<main className="page-content bg-light">
				<div className="top-header">
					<div className="header-bar d-flex justify-content-between">
						<div className="d-flex align-items-center">
							<Link
								href="#"
								className="logo-icon me-3">
								<Image
									src="/images/logo-icon.png"
									width={30}
									height={30}
									className="small"
									alt="small"
								/>
								<span className="big">
									<Image
										src="/images/logo-dark.png"
										width={24}
										height={24}
										className="logo-light-mode"
										alt="small"
									/>
									<Image
										src="/images/logo-light.png"
										width={24}
										height={24}
										className="logo-dark-mode"
										alt="small"
									/>
								</span>
							</Link>
							<div
								id="close-sidebar"
								className="btn btn-icon btn-soft-light">
								<i className="ti ti-menu-2"></i>
							</div>
						</div>

						<ul className="list-unstyled mb-0">
							<li className="list-inline-item mb-0 ms-1">
								<div className="dropdown dropdown-primary">
									<button
										type="button"
										className="btn btn-icon btn-soft-light dropdown-toggle p-0 "
										data-bs-toggle="dropdown"
										aria-haspopup="true"
										aria-expanded="false">
										<i className="ti ti-bell"></i>
									</button>
									<span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle">
										<span className="visually-hidden">New alerts</span>
									</span>

									<div
										className=" dropdown-menu dd-menu shadow rounded border-0 mt-3 p-0"
										style={{ height: "320px", width: "290px" }}>
										<div className="d-flex align-items-center justify-content-between p-3 border-bottom">
											<h6 className="mb-0 text-dark">Notifications</h6>
											<span className="badge bg-soft-danger rounded-pill">
												3
											</span>
										</div>
										<div className="p-3">
											<Link
												href="#!"
												className="dropdown-item features feature-primary key-feature p-0">
												<div className="d-flex align-items-center">
													<div className="icon text-center rounded-circle me-2">
														<i className="ti ti-shopping-cart"></i>
													</div>
													<div className="flex-1">
														<h6 className="mb-0 text-dark title">
															Order Complete
														</h6>
														<small className="text-muted">15 min ago</small>
													</div>
												</div>
											</Link>

											<Link
												href="#!"
												className="dropdown-item features feature-primary key-feature p-0 mt-3">
												<div className="d-flex align-items-center">
													<img
														src="/images/client/04.jpg"
														className="avatar avatar-md-sm rounded-circle border shadow me-2"
														alt=""
													/>
													<div className="flex-1">
														<h6 className="mb-0 text-dark title">
															<span className="fw-bold">Message</span> from Luis
														</h6>
														<small className="text-muted">1 hour ago</small>
													</div>
												</div>
											</Link>
										</div>
									</div>
								</div>
							</li>

							<li className="list-inline-item mb-0 ms-1">
								<div className="dropdown dropdown-primary">
									<button
										type="button"
										className="btn btn-soft-light dropdown-toggle p-0"
										data-bs-toggle="dropdown"
										aria-haspopup="true"
										aria-expanded="false">
										{isLoggedIn ? (
											<UserAvatar user={session.user} />
										) : (
											<Image
												width={100}
												height={100}
												src="/images/client/05.jpg"
												className="avatar avatar-ex-small rounded"
												alt=""
											/>
										)}
									</button>
									<div
										className="dropdown-menu dd-menu dropdown-menu-end shadow border-0 mt-3 py-3"
										style={{ minWidth: "200px" }}>
										<Link
											className="dropdown-item d-flex align-items-center text-dark pb-3"
											href="profile.html">
											{isLoggedIn ? (
												// <span> {session.user.name}</span>
												<UserAvatar user={session.user} />
											) : (
												<Image
													width={100}
													height={100}
													src="/images/client/05.jpg"
													className="avatar avatar-ex-small rounded"
													alt=""
												/>
											)}

											<div className="flex-1 ms-2">
												<span className="d-block">
													{isLoggedIn ? (
														<span> {session.user.name}</span>
													) : (
														<span>Unauthenticated</span>
													)}
												</span>
												<small className="text-muted">
													{isLoggedIn ? (
														<span> {session.user.email}</span>
													) : (
														<span> No email</span>
													)}
												</small>
											</div>
										</Link>
										<Link
											className="dropdown-item text-dark"
											href="/dashboard">
											<span className="mb-0 d-inline-block me-1">
												<i className="ti ti-home"></i>
											</span>
											Dashboard
										</Link>

										<div className="dropdown-divider border-top"></div>
										<LogoutButton type="header" />
										{/* <div
											className="dropdown-item text-dark pointer"
											onClick={handleSignOut}>
											<span className="mb-0 d-inline-block me-1">
												<i className="ti ti-logout"></i>
											</span>
											Log out
										</div> */}
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</main>
		</>
	);
}

export default SideBarMenu;

// export async function getServerSideProps(context) {
// 	const session = await getSession(context);
// 	if (!session) {
// 		return {
// 			redirect: {
// 				destination: `${process.env.DESTINATION_URL}/dashboard`, //redirect to login page
// 				permanent: false,
// 			},
// 		};
// 	}
// }
