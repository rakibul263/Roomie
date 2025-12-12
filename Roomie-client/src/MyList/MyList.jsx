import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../Context/AuthContext";

const MyList = () => {
  const data = useLoaderData();
  const { user } = useContext(AuthContext);

  const filteredData = data.filter((item) => item.userEmail === user.email);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:3000/mylist/${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          Swal.fire("Deleted!", "Your item has been deleted.", "success");
          window.location.reload();
        } else {
          Swal.fire("Error!", "Failed to delete.", "error");
        }
      } catch (err) {
        console.error(err);
        Swal.fire("Error!", "Something went wrong.", "error");
      }
    }
  };

  return (
    <div className="flex justify-center p-6 min-h-screen max-w-[80%] mx-auto mt-15">
      <div className="w-full bg-white p-6 rounded-2xl shadow-xl overflow-x-auto">
        <h2 className="text-2xl font-bold mb-6 text-[#CA8A5E] flavors-regular text-center">
          My List
        </h2>

        <table className="min-w-full table-auto border border-gray-200 rounded-2xl">
          <thead>
            <tr className="bg-[#CA8A5E] text-white text-left">
              <th className="py-3 px-4 rounded-tl-xl">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Gender</th>
              <th className="py-3 px-4">Budget (BDT)</th>
              <th className="py-3 px-4 text-center rounded-tr-xl">Delete</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <tr
                  key={item._id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-4">{item.name}</td>
                  <td className="py-3 px-4">{item.email}</td>
                  <td className="py-3 px-4">{item.gender}</td>
                  <td className="py-3 px-4">{item.budget}</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyList;
