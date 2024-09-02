import { useEffect, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import axios from 'axios';
import Resultado from './Resultado';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

function Listado({ searchResults = [], setSearchResults, resetSearch, setResetSearch }) {
    const [series, setSeries] = useState([]);
    const token = sessionStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            return;
        }

        const fetchSeries = async () => {
            try {
                const response = await axios.get("https://api.themoviedb.org/3/discover/tv?api_key=99fa703cc923438e8e7ee0db3a3e7454&language=es-ES&page=1");
                setSeries(response.data.results);
              
            } catch (error) {
                console.error("Error fetching the series:", error);
            }
        };

        fetchSeries();
    }, [token]);

    const handleFavoriteToggle = (seriesItem) => {
        const favorites = JSON.parse(sessionStorage.getItem('favorites')) || [];
        const isFavorite = favorites.some(fav => fav.id === seriesItem.id);
        let updatedFavorites;

        if (isFavorite) {
            updatedFavorites = favorites.filter(fav => fav.id !== seriesItem.id);
        } else {
            updatedFavorites = [...favorites, seriesItem];
        }

        sessionStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    const isFavorite = (seriesId) => {
        const favorites = JSON.parse(sessionStorage.getItem('favorites')) || [];
        return favorites.some(fav => fav.id === seriesId);
    };

    const handleResetSearch = () => {
       
        setSearchResults([]);
        setResetSearch(false); 
    };

    if (!token) {
        return <Navigate to="/" />;
    }

   

    return (
        <div className="container mt-4">
            {searchResults.length > 0 ? (
                <>
                    <Resultado results={searchResults} query="Consulta de Búsqueda" />
                    <Button variant="secondary" onClick={handleResetSearch} className="mt-4">Volver a la lista completa</Button>
                </>
            ) : (
                <div className="row mt-4">
                    {series.length > 0 ? (
                        series.map(seriesItem => (
                            <div className="col-12 col-md-6 col-lg-4 mb-4" key={seriesItem.id}>
                                <Card>
                                    <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${seriesItem.poster_path}`} alt={seriesItem.name} />
                                    <Card.Body>
                                        <Card.Title>{seriesItem.name}</Card.Title>
                                        <Card.Text>{seriesItem.overview}</Card.Text>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <Link to={`/detalle/${seriesItem.id}`}>
                                                <Button variant="primary">Ver Más</Button>
                                            </Link>
                                            {token && (
                                                <Button
                                                    variant="link"
                                                    onClick={() => handleFavoriteToggle(seriesItem)}
                                                    className="favorite-btn"
                                                >
                                                    {isFavorite(seriesItem.id) ? <FaHeart size={24} color="red" /> : <FaRegHeart size={24} />}
                                                </Button>
                                            )}
                                        </div>
                                    </Card.Body>
                                </Card>
                            </div>
                        ))
                    ) : (
                        <p>No se encontraron resultados.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default Listado;
