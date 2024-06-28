import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

function Header() {
	const { data: session } = useSession();

	return (
		<>
			<div className="header landing">
				<div className="container">
					<div className="row">
						<div className="col-xl-12">
							<div className="navigation">
								<nav className="navbar navbar-expand-lg navbar-light">
									<div className="brand-logo">
										<Link href="/">
											<img
												src="/images/logo.png"
												alt=""
												width="90"
												className="logo-primary"
											/>
											<img
												src="/images/logo.png"
												alt=""
												className="logo-white"
											/>
										</Link>
									</div>
									<button
										className="navbar-toggler"
										type="button"
										data-bs-toggle="collapse"
										data-bs-target="#navbarSupportedContent"
										aria-controls="navbarSupportedContent"
										aria-expanded="false"
										aria-label="Toggle navigation">
										<span className="navbar-toggler-icon"></span>
									</button>
									<div
										className="collapse navbar-collapse"
										id="navbarSupportedContent">
										<ul className="navbar-nav me-auto">
											<li className="nav-item dropdown">
												<Link
													href="#home"
													className="nav-link">
													Home
												</Link>
											</li>
											<li className="nav-item">
												<Link
													href="#services"
													className="nav-link">
													Services
												</Link>
											</li>
											<li className="nav-item">
												<Link
													href="#about"
													className="nav-link">
													About
												</Link>
											</li>
											<li className="nav-item">
												<a
													className="nav-link"
													href="#contact">
													Contact
												</a>
											</li>
										</ul>
									</div>
									<div className="signin-btn d-flex align-items-center">
										<div className="dark-light-toggle theme-switch">
											<span className="dark">
												<i className="ri-moon-line"></i>
											</span>
											<span className="light">
												<i className="ri-sun-line"></i>
											</span>
										</div>
										<Link
											href="#contact"
											className="btn btn-outline-brand me-2">
											Contact Us
										</Link>
										{session ? (
											<>
												{/* <button
													className="btn btn-brand"
													onClick={() => signOut()}>
													Sign Out
												</button> */}
												<Link
													href="/dashboard"
													className="btn btn-brand ms-2">
													Dashboard
												</Link>
											</>
										) : (
											<Link
												href="/login"
												className="btn btn-brand">
												Login
											</Link>
										)}
									</div>
								</nav>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Header;
