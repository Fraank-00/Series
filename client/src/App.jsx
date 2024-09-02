import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Login from './components/Login';
import Register from './components/Register';
import Listado from './components/Listado';
import Detalle from './components/Detalle';
import Favoritos from './components/Favorito';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/app.css';

function App() {
    const [user, setUser] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [resetSearch, setResetSearch] = useState(false);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            setUser({ token });
        }
    }, []);

    const handleLogin = (token) => {
        setUser({ token });
        sessionStorage.setItem('token', token);
    };

    const handleLogout = () => {
        setUser(null);
        sessionStorage.removeItem('token');
    };

    const handleSearch = async (query) => {
        if (!query) return;
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=99fa703cc923438e8e7ee0db3a3e7454&language=es-ES&query=${query}`);
            setSearchResults(response.data.results);
            setResetSearch(true);
            setSearchQuery(query); 
        } catch (error) {
            console.error("Error searching tv:", error);
        }
    };

    const handleResetSearch = () => {
        setSearchResults([]);
        setResetSearch(false);
    };

    return (
        <Router>
            <Header user={user} onSearch={handleSearch} onLogout={handleLogout} />
            <Routes>
                <Route path="/" element={user ? <Navigate to="/listado" /> : <Login onLogin={handleLogin} />} />
                <Route path="/register" element={user ? <Navigate to="/listado" /> : <Register />} />
                <Route 
                  path="/listado" 
                  element={
                    <Listado 
                      searchResults={searchResults} 
                      setSearchResults={setSearchResults}
                      resetSearch={resetSearch}
                      setResetSearch={setResetSearch}
                    />
                  } 
                />
                <Route path="/detalle/:id" element={user ? <Detalle /> : <Navigate to="/" />} />
                <Route path="/favoritos" element={user ? <Favoritos /> : <Navigate to="/" />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;
