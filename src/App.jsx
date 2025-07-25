import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [phone, setPhone] = useState("");
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const token = "DAmAlcrQjAFVQk4FSdIbnjJ1UvHgn9kfDPf6odhO";
      const res = await axios.get(
        `https://bdcourier.com/api/pub/parcel-stat?_token=${token}&phone=${phone}`,
        {
          headers: {
            Authorization: "Bearer h5QdoQhKNUDWSOJC9TJT1e13ZxILO5nE01YCl0UdmBHDhGURhuQ6oFAOYtD0",
          },
        }
      );
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">ফ্রডচেকার</h1>
      <div className="flex justify-center mb-4">
        <input
          type="text"
          className="p-2 border rounded-l-md w-64"
          placeholder="মোবাইল নম্বর দিন"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded-r-md" onClick={fetchData}>
          Search
        </button>
      </div>
      {data && (
        <div className="text-center bg-white p-6 rounded shadow-md max-w-xl mx-auto">
          <p>মোট অর্ডার: {data.total_parcel}</p>
          <p>মোট ডেলিভারি: {data.success_parcel}</p>
          <p>মোট বাতিল: {data.cancelled_parcel}</p>
          <p>ডেলিভারি রেট: {data.success_ratio}%</p>
        </div>
      )}
    </div>
  );
};

export default App;
