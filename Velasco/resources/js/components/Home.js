import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

function Home() {
    const [profiles, setProfiles] = useState([]);
    const [form, setForm] = useState({ name: "", email: "", bio: "" });

    // Fetch profiles when component loads
    useEffect(() => {
        axios.get("/api/profiles")
            .then(res => setProfiles(res.data))
            .catch(err => console.error("Error fetching profiles:", err));
    }, []);

    // Handle form input changes
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Handle form submit (POST request)
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("/api/profiles", form)
            .then(res => {
                setProfiles([...profiles, res.data]); // add new profile to list
                setForm({ name: "", email: "", bio: "" }); // reset form
            })
            .catch(err => console.error("Error saving profile:", err));
    };

    return (
        <div className="container my-5">
            <h3 className="mb-4 text-center">Profile Manager</h3>

            <div className="row">
                {/* Form Section */}
                <div className="col-md-6">
                    <div className="card shadow-sm">
                        <div className="card-header">Add Profile</div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label>Name</label>
                                    <input type="text" name="name" className="form-control"
                                           value={form.name} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label>Email</label>
                                    <input type="email" name="email" className="form-control"
                                           value={form.email} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label>Bio</label>
                                    <textarea name="bio" className="form-control"
                                              value={form.bio} onChange={handleChange}></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary">Save</button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Profiles List */}
                <div className="col-md-6">
                    <div className="card shadow-sm">
                        <div className="card-header">Profiles</div>
                        <ul className="list-group list-group-flush">
                            {profiles.map(profile => (
                                <li key={profile.id} className="list-group-item">
                                    <strong>{profile.name}</strong> ({profile.email})
                                    <p className="mb-0">{profile.bio}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;

if (document.getElementById("home")) {
    ReactDOM.render(<Home />, document.getElementById("home"));
}
