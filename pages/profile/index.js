import { useState, useEffect } from "react";
import Menu from "../../components/Menu";
import Link from "next/link";
import { getSession } from "next-auth/react";

export default function Profile() {
	return (
		<>
			<div className="page-wrapper toggled">
				<Menu />
				{/* <TopMenu /> */}
				<main className="page-content ">
					<div className="container-fluid">
						<div className="layout-specing">
							<div className="card ">Profile</div>
						</div>
					</div>
				</main>
			</div>
		</>
	);
}
