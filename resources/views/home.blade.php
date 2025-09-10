<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Laravel Profile</title>
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- React + ReactDOM + Axios + Babel -->
    <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body>
<div class="container mt-4">
    <h2>JAYSON T. VELASCO BSIT-32</h2>

    <div id="example"></div>
</div>

@verbatim
<script type="text/babel">
const { useState, useEffect } = React;
axios.defaults.baseURL = 'http://127.0.0.1:8000/api';

function Example() {
    const [profiles, setProfiles] = useState([]);
    const [form, setForm] = useState({ first_name: '', last_name: '' });
    const [success, setSuccess] = useState(false);

    useEffect(() => { fetchProfiles(); }, []);

    const fetchProfiles = async () => {
        try {
            const res = await axios.get('/profiles');
            setProfiles(res.data);
        } catch (error) { console.error(error); }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setSuccess(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/profiles', form);
            if(res.status === 201) setSuccess(true);
            setForm({ first_name: '', last_name: '' });
            fetchProfiles();
        } catch (error) {
            console.error(error);
            alert('Error saving profile. Check console.');
        }
    };

    return (
        <div style={{ padding:'20px', maxWidth:'600px' }}>
            <h3>Profile Form</h3>
            {success && <div className="alert alert-success">Profile saved successfully!</div>}

            <form onSubmit={handleSubmit}>
                <input type="text" name="first_name" placeholder="First Name" value={form.first_name} onChange={handleChange} required className="form-control mb-2"/>
                <input type="text" name="last_name" placeholder="Last Name" value={form.last_name} onChange={handleChange} required className="form-control mb-2"/>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>

            <h4 className="mt-4">Profiles</h4>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {profiles.map((p) => (
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{p.first_name}</td>
                            <td>{p.last_name}</td>
                            <td>{new Date(p.created_at).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('example'));
root.render(<Example />);
</script>
@endverbatim
</body>
</html>
