import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:8000/api';  

function Example() {
    const [profiles, setProfiles] = useState([]);
    const [form, setForm] = useState({ name: '', email: '', bio: '' });

    // Fetch profiles on load
    useEffect(() => {
        fetchProfiles();
    }, []);

    const fetchProfiles = async () => {
        try {
            const res = await axios.get('/profiles');
            setProfiles(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/profiles', form);
            setForm({ name: '', email: '', bio: '' }); // reset form
            fetchProfiles(); // refresh list
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-header">Profile Form</div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-2">
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                placeholder="Name"
                                value={form.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                placeholder="Email"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <textarea
                                name="bio"
                                className="form-control"
                                placeholder="Bio"
                                value={form.bio}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </form>
                </div>
            </div>

            <div className="mt-4">
                <h4>Profiles</h4>
                <ul className="list-group">
                    {profiles.map((p) => (
                        <li key={p.id} className="list-group-item">
                            <strong>{p.name}</strong> ({p.email}) - {p.bio}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Example;

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
