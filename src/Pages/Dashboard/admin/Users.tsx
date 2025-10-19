import { useGetAllUsersQuery, useUpdateUserStatusMutation } from "../../../features/parcel/adminApi";

const AdminUsers = () => {
  const { data: users = [], isLoading } = useGetAllUsersQuery();
  const [updateUserStatus] = useUpdateUserStatusMutation();

  if (isLoading) return <p>Loading users...</p>;

const handleToggleBlock = async (id: string, isBlocked: boolean) => {
  const payload = { id, isblocked: !isBlocked };
  console.log("Payload sending to API:", payload); // ✅ see what is sent
  try {
    const res = await updateUserStatus(payload).unwrap();
    console.log("API response:", res); // ✅ see what API returns
    alert(`User ${!isBlocked ? "Blocked" : "Unblocked"} successfully`);
  } catch (err) {
    console.error(err);
    alert("Failed to update status");
  }
};


  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">All Users</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.data.map((u: any) => (
            <tr key={u._id} className="border-t text-center">
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.isblocked ? "Blocked" : "Active"}</td>
              <td>
                <button
                  onClick={() => handleToggleBlock(u._id, u.isblocked)}
                  className={`px-3 py-1 rounded ${
                    u.isblocked ? "bg-green-500" : "bg-red-500"
                  } text-white`}
                >
                  {u.isblocked ? "Unblock" : "Block"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default AdminUsers