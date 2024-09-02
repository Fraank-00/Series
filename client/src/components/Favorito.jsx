import { useEffect, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import Swal from 'sweetalert2';

function Favoritos() {
    const [favorites, setFavorites] = useState([]);
    const token = sessionStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            return;
        }

        const storedFavorites = JSON.parse(sessionStorage.getItem('favorites')) || [];
        setFavorites(storedFavorites);
    }, [token]);

    const handleFavoriteToggle = (seriesItem) => {
        const isCurrentlyFavorite = favorites.some(fav => fav.id === seriesItem.id);
        let updatedFavorites;

        if (isCurrentlyFavorite) {
          
            updatedFavorites = favorites.filter(fav => fav.id !== seriesItem.id);
            Swal.fire({
                icon: 'info',
                title: '¡Eliminado!',
                text: 'Se eliminó de favoritos',
                timer: 1500,
                showConfirmButton: false
            });
        } else {
            
            updatedFavorites = [...favorites, seriesItem];
            Swal.fire({
                icon: 'success',
                title: '¡Agregado!',
                text: 'Se agregó a favoritos',
                timer: 1500,
                showConfirmButton: false
            });
        }

        sessionStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        setFavorites(updatedFavorites);
    };

    const isFavorite = (seriesId) => {
        return favorites.some(fav => fav.id === seriesId);
    };

    if (!token) {
        return <Navigate to="/" />;
    }

    return (
        <div className="container mt-4 favorite-container">
            <h2>Favoritos</h2>
            <div className="row mt-4">
                {favorites.length > 0 ? (
                    favorites.map(seriesItem => (
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
                                        <Button
                                            variant="link"
                                            onClick={() => handleFavoriteToggle(seriesItem)}
                                            className="favorite-btn"
                                        >
                                            {isFavorite(seriesItem.id) ? <FaHeart size={24} color="red" /> : <FaRegHeart size={24} />}
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    ))
                ) : (
                    <p>No tienes series en favoritos.</p>
                )}
            </div>
        </div>
    );
}

export default Favoritos;
