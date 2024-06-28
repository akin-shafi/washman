import Image from "next/image"; // Adjust the import if necessary

function getInitials(name) {
	const words = name.split(" ");
	return words.map((word) => word[0]).join("");
}

export default function UserAvatar({ user }) {
	const initials = getInitials(user.name);

	return user.image ? (
		<Image
			width={100}
			height={100}
			src={user.image}
			className="avatar avatar-md-sm rounded-circle border shadow"
			alt={user.name}
		/>
	) : (
		<div
			style={{
				width: "40px",
				height: "40px",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				backgroundColor: "#ccc",
				borderRadius: "50%",
				fontSize: "16px",
				fontWeight: "bold",
				color: "#fff",
				textTransform: "uppercase",
			}}
			className="avatar avatar-md-sm rounded-circle border shadow">
			{initials}
		</div>
	);
}

// Usage example:
// export default function Profile() {
// 	const { data: session } = useSession();

// 	if (!session) {
// 		return <div>Loading...</div>;
// 	}

// 	return <UserAvatar user={session.user} />;
// }
