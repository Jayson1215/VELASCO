import React, { useState, useEffect } from "react";

export default function Home() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // Fetch profiles
  const fetchProfiles = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/profiles");
      const data = await response.json();
      setProfiles(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName) {
      setMessage("❌ Please fill in both fields");
      return;
    }

    const url = editingId
      ? `http://127.0.0.1:8000/api/profiles/${editingId}`
      : "http://127.0.0.1:8000/api/profiles";

    const method = editingId ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ first_name: firstName, last_name: lastName }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(editingId ? "✏️ Profile updated!" : "✅ Profile saved!");
        setFirstName("");
        setLastName("");
        setEditingId(null);
        fetchProfiles();
      } else {
        setMessage("❌ " + data.message);
      }
    } catch (err) {
      setMessage("❌ Something went wrong");
      console.error(err);
    }
  };

  const handleEdit = (profile) => {
    setEditingId(profile.id);
    setFirstName(profile.first_name);
    setLastName(profile.last_name);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure?")) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/profiles/${id}`, {
        method: "DELETE",
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setMessage("🗑️ Profile deleted!");
        fetchProfiles();
      } else {
        setMessage("❌ Failed to delete");
      }
    } catch (err) {
      setMessage("❌ Something went wrong");
      console.error(err);
    }
  };

  return (
    <div className="home-container">
      <h1>Jason's Profiles Manager</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <button type="submit">{editingId ? "Update" : "Save"}</button>
      </form>

      {message && (
        <p
          className={`message ${
            message.includes("✅") || message.includes("✏️") ? "success" : "error"
          }`}
        >
          {message}
        </p>
      )}

      <ul className="profiles">
        {profiles.length > 0 ? (
          profiles.map((p) => (
            <li key={p.id}>
              <span>
                {p.first_name} {p.last_name}
              </span>
              <div className="actions">
                <button className="edit" onClick={() => handleEdit(p)}>
                  ✏️ Edit
                </button>
                <button className="delete" onClick={() => handleDelete(p.id)}>
                  🗑️ Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <p style={{ gridColumn: "1/-1", textAlign: "center", color: "#666" }}>
            No profiles yet. Add one above!
          </p>
        )}
      </ul>
    </div>
  );
}
