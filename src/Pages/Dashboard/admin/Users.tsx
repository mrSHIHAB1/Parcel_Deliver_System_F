import { useGetAllUsersQuery, useUpdateUserStatusMutation } from "../../../features/parcel/adminApi";
import { toast } from "react-hot-toast";
import { useState, useMemo } from "react";

const AdminUsers = () => {
  const { data, isLoading } = useGetAllUsersQuery();
  const [updateUserStatus] = useUpdateUserStatusMutation();

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const handleToggleBlock = async (id: string, isBlocked: boolean) => {
    const payload = { id, isblocked: !isBlocked };
    try {
      await updateUserStatus(payload).unwrap();
      toast.success(`User ${!isBlocked ? "Blocked" : "Unblocked"} successfully`);
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  // --- Filtered & searched data ---
  const filteredUsers = useMemo(() => {
    return data?.data.filter((u: any) => {
      const matchesSearch =
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase());

      const matchesRole = roleFilter === "All" || u.role === roleFilter;
      const matchesStatus =
        statusFilter === "All" ||
        (statusFilter === "Active" && !u.isblocked) ||
        (statusFilter === "Blocked" && u.isblocked);

      return matchesSearch && matchesRole && matchesStatus;
    }) || [];
  }, [data, search, roleFilter, statusFilter]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white text-center">
        All Users
      </h2>

      {/* Show loading spinner */}
      {isLoading && (
        <div className="flex justify-center items-center h-64">
          <div className="w-16 h-16 border-4 border-teal-400 border-dashed rounded-full animate-spin"></div>
        </div>
      )}

      {/* Render content only when data is loaded */}
      {!isLoading && (
        <>
          {/* Filters */}
          <div className="flex flex-col md:flex-row md:justify-between gap-2 mb-4">
            <input
              type="text"
              placeholder="Search by Name or Email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 border rounded w-full md:w-1/3"
            />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-4 py-2 border rounded w-full md:w-1/5"
            >
              <option value="All">All Roles</option>
              <option value="SENDER">Sender</option>
              <option value="ADMIN">Admin</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border rounded w-full md:w-1/5"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Blocked">Blocked</option>
            </select>
          </div>

          {/* Table for md+ */}
          <div className="hidden md:block overflow-x-auto rounded-lg shadow-md">
            <table className="w-full table-auto border-collapse border border-gray-300 dark:border-gray-600 dark:text-white">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-center">Role</th>
                  <th className="px-4 py-2 text-center">Status</th>
                  <th className="px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u: any, index: number) => (
                  <tr
                    key={u._id}
                    className={`border-t border-gray-200 dark:border-gray-600 ${
                      index % 2 === 0 ? "bg-gray-50 dark:bg-gray-800" : ""
                    }`}
                  >
                    <td className="px-4 py-3">{u.name}</td>
                    <td className="px-4 py-3">{u.email}</td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`px-2 py-1 rounded-full text-black font-semibold text-sm dark:text-white`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`px-2 py-1 rounded-full text-black font-semibold text-sm dark:text-white`}
                      >
                        {u.isblocked ? "Blocked" : "Active"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center space-x-2">
                      <button
                        onClick={() => handleToggleBlock(u._id, u.isblocked)}
                        className={`px-3 py-1 rounded text-white font-medium transition ${
                          u.isblocked
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-red-500 hover:bg-red-600"
                        }`}
                      >
                        {u.isblocked ? "Unblock" : "Block"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Card layout for mobile */}
          <div className="md:hidden space-y-4">
            {filteredUsers.map((u: any) => (
              <div
                key={u._id}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md space-y-2"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-gray-800 dark:text-white">{u.name}</h3>
                  <span
                    className={`px-2 py-1 rounded-full text-black font-semibold text-sm `}
                  >
                    {u.role}
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300">{u.email}</p>
                <div className="flex justify-between items-center">
                  <span
                    className={`px-2 py-1 rounded-full text-black font-semibold text-sm `}
                  >
                    {u.isblocked ? "Blocked" : "Active"}
                  </span>
                  <button
                    onClick={() => handleToggleBlock(u._id, u.isblocked)}
                    className={`px-3 py-1 rounded text-white font-medium transition ${
                      u.isblocked
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-red-500 hover:bg-red-600"
                    }`}
                  >
                    {u.isblocked ? "Unblock" : "Block"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminUsers;
