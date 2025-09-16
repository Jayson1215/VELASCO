import React, { useState } from "react";
import axios from "axios";

export default function ProfileForm({ onProfileAdded }) {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/profiles", {
        first_name,
        last_name,
      });

      setMessage(res.data.message);
      setFirstName("");
      setLastName("");

      if (onProfileAdded) {
        onProfileAdded(res.data.profile);
      }
    } catch (err) {
      setMessage("Error: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div>
      <h2>Add Profile</h2>
      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
