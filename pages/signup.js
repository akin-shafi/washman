import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Image from "next/image";

const SignupPage = () => {
	const [error, setError] = useState("");
	const router = useRouter();
	const { data: session, status: sessionStatus } = useSession();
	const [password, setPassword] = useState("");
	const [passwordFeedback, setPasswordFeedback] = useState("");
	const [feedbackColor, setFeedbackColor] = useState("text-muted");
	const [loading, setLoading] = useState(false); // State to manage loading state of the button

	useEffect(() => {
		if (sessionStatus === "authenticated") {
			router.replace("/dashboard");
		}
	}, [sessionStatus, router]);

	const isValidEmail = (email) => {
		const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
		return emailRegex.test(email);
	};

	const validatePassword = (password) => {
		let feedback = "";
		let color = "text-danger";

		if (password.length < 8) {
			feedback = "Password must be at least 8 characters long";
		} else if (!/[A-Z]/.test(password)) {
			feedback = "Password must contain at least one uppercase letter";
		} else if (!/[a-z]/.test(password)) {
			feedback = "Password must contain at least one lowercase letter";
		} else if (!/\d/.test(password)) {
			feedback = "Password must contain at least one number";
		} else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
			feedback = "Password must contain at least one special character";
		} else {
			feedback = "Password is strong";
			color = "text-success";
		}
		setPasswordFeedback(feedback);
		setFeedbackColor(color);
	};

	const handlePasswordChange = (event) => {
		const newPassword = event.target.value;
		setPassword(newPassword);
		validatePassword(newPassword);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const name = e.target[0].value;
		const email = e.target[1].value;
		const password = e.target[2].value;
		const image = "";

		if (!isValidEmail(email)) {
			setError("Email is invalid");
			return;
		}

		if (password.length < 8) {
			setError("Password must be at least 8 characters long");
			return;
		} else if (!/\d/.test(password)) {
			setError("Password must contain at least one number");
			return;
		} else if (!/[A-Z]/.test(password)) {
			setError("Password must contain at least one uppercase letter");
			return;
		} else if (!/[a-z]/.test(password)) {
			setError("Password must contain at least one lowercase letter");
			return;
		} else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
			setError("Password must contain at least one special character");
			return;
		}

		setLoading(true); // Start loading

		try {
			const res = await fetch("/api/users", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name,
					email,
					password,
					image,
				}),
			});

			if (res.status === 400) {
				setError("This email is already registered");
			} else if (res.status === 201) {
				setError("");
				router.push("/login?message=success");
			}
		} catch (error) {
			setError("Error, try again");
			console.error("Error:", error);
		}

		setLoading(false); // Stop loading
	};

	if (sessionStatus === "loading") {
		return <h1>Loading...</h1>;
	}

	return (
		<>
			<section className="py-3 py-md-5">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-12 col-sm-10 col-md-8 col-lg-7 col-xl-9 col-xxl-6">
							<div className="rounded-3 shadow-sm">
								<div className="card-body p-1">
									<div className="text-center mb-3">
										<Link href="/login">
											<Image
												src="/images/logo.png"
												alt="Logo"
												width={175}
												height={120}
											/>
										</Link>
									</div>
									<h2 className="text-center text-muted">Signup</h2>
									<h2 className="fs-6 fw-normal text-center text-secondary mb-4">
										Fill in your details to Signup
									</h2>
									<form onSubmit={handleSubmit}>
										<div className="form-floating mb-3">
											<label className="form-label text-muted">Name:</label>
											<input
												className="form-control"
												type="text"
												placeholder="Name"
												required
											/>
										</div>
										<div className="form-floating mb-3">
											<label className="form-label text-muted">Email:</label>
											<input
												className="form-control"
												type="email"
												placeholder="Email"
												required
											/>
										</div>
										<div className="form-floating mb-3">
											<label className="form-label text-muted">Password:</label>
											<input
												className="form-control"
												type="password"
												placeholder="Password"
												value={password}
												onChange={handlePasswordChange}
												required
											/>
											<p className={`text-sm mb-4 ${feedbackColor}`}>
												{passwordFeedback}
											</p>
										</div>
										<button
											className="btn btn-lg btn-brand w-100"
											type="submit"
											disabled={loading} // Disable button when loading is true
										>
											{loading ? "Signing up..." : "Sign up"}
										</button>
										<p className="text-danger mb-4">{error}</p>
									</form>
									<div className="text-center text-muted mt-4">- OR -</div>
									<Link
										className="d-block text-center link-brand mt-2"
										href="/login">
										Login with an existing account
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default SignupPage;
