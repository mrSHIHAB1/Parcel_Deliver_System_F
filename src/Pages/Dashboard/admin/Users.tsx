import { useGetAllUsersQuery, useUpdateUserStatusMutation } from "../../../features/parcel/adminApi";
import { toast } from "react-hot-toast";
import { useState, useMemo } from "react";

const AdminUsers = () => {
  const { data, isLoading } = useGetAllUsersQuery();
  const [updateUserStatus] = useUpdateUserStatusMutation();

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleToggleBlock = async (id: string, isBlocked: boolean) => {
    const payload = { id, isblocked: !isBlocked };
    try {
      await updateUserStatus(payload).unwrap();
      toast.success(`User ${!isBlocked ? "Blocked" : "Unblocked"} successfully`);
    } catch (err) {
      toast.error("Failed to update status");
    }
  };


  const filteredUsers = useMemo(() => {
    return (
      data?.data.filter((u: any) => {
        const matchesSearch =
          u.name.toLowerCase().includes(search.toLowerCase()) ||
          u.email.toLowerCase().includes(search.toLowerCase());

        const matchesRole = roleFilter === "All" || u.role === roleFilter;
        const matchesStatus =
          statusFilter === "All" ||
          (statusFilter === "Active" && !u.isblocked) ||
          (statusFilter === "Blocked" && u.isblocked);

        return matchesSearch && matchesRole && matchesStatus;
      }) || []
    );
  }, [data, search, roleFilter, statusFilter]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));


  useMemo(() => setCurrentPage(1), [search, roleFilter, statusFilter]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white text-center">
        All Users
      </h2>

      {isLoading && (
        <div className="flex justify-center items-center h-64">
          <div className="w-16 h-16 border-4 border-teal-400 border-dashed rounded-full animate-spin"></div>
        </div>
      )}

 
      {!isLoading && (
        <>
        
          <div className="flex flex-col md:flex-row md:justify-between gap-2 mb-4">
            <input
              type="text"
              placeholder="Search by Name or Email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 border rounded w-full md:w-1/3 focus:ring-2 focus:ring-teal-400"
            />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-4 py-2 border rounded w-full md:w-1/5 focus:ring-2 focus:ring-teal-400"
            >
              <option value="All">All Roles</option>
              <option value="SENDER">Sender</option>
              <option value="ADMIN">Admin</option>
              <option value="RECIVER">Reciver</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border rounded w-full md:w-1/5 focus:ring-2 focus:ring-teal-400"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Blocked">Blocked</option>
            </select>
          </div>

          <div className="hidden md:block overflow-x-auto rounded-lg shadow-xs">
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
                {currentUsers.map((u: any, index: number) => (
                  <tr
                    key={u._id}
                    className={`border-t border-gray-200 dark:border-gray-600 ${
                      index % 2 === 0 ? "bg-gray-50 dark:bg-gray-800" : ""
                    }`}
                  >
                    <td className="px-4 py-3">{u.name}</td>
                    <td className="px-4 py-3">{u.email}</td>
                    <td className="px-4 py-3 text-center">{u.role}</td>
                    <td className="px-4 py-3 text-center">
                      {u.isblocked ? "Blocked" : "Active"}
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

        
          <div className="md:hidden space-y-4">
            {currentUsers.map((u: any) => (
              <div
                key={u._id}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md space-y-2"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-gray-800 dark:text-white">{u.name}</h3>
                  <span>{u.role}</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300">{u.email}</p>
                <div className="flex justify-between items-center">
                  <span>{u.isblocked ? "Blocked" : "Active"}</span>
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

        
          <div className="flex justify-center items-center mt-6 space-x-4">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition"
            >
              Previous
            </button>
            <span className="text-gray-700 dark:text-gray-300">
              Page {currentPage} of {totalPages || 1}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminUsers;
