function User({ user }) {
	return (
		<>
			<tr key={user.id}>
				<td>{user.id}</td>
				<td>{user.name}</td>
				<td>{user.username}</td>
				<td>{user.email}</td>
				<td>{user.phone}</td>
				<td>{user.website}</td>
			</tr>
		</>
	);
}

export default User;
