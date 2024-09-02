import React, { useEffect, useState } from 'react';
import { Navigate, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

function Detalle() {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');
    const [serie, setSerie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!token) {
            return;
        }

        const fetchSerieDetails = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=99fa703cc923438e8e7ee0db3a3e7454&language=es-ES`);
                setSerie(response.data);
            } catch (error) {
                console.error('Error fetching serie details:', error);
                setError('Error fetching serie details.');
            } finally {
                setLoading(false);
            }
        };

        fetchSerieDetails();
    }, [id, token]);

    if (!token) {
        return <Navigate to="/" />;
    }

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        navigate('/login');
    };

    const handleFavoriteToggle = () => {
        if (serie) {
            const favorites = JSON.parse(sessionStorage.getItem('favorites')) || [];
            const isFavorite = favorites.some(fav => fav.id === serie.id);
            let updatedFavorites;

            if (isFavorite) {
                updatedFavorites = favorites.filter(fav => fav.id !== serie.id);
            } else {
                updatedFavorites = [...favorites, serie];
            }

            sessionStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        }
    };

    const isFavorite = (serieId) => {
        const favorites = JSON.parse(sessionStorage.getItem('favorites')) || [];
        return favorites.some(fav => fav.id === serieId);
    };

    if (loading) {
        return <div className="container mt-4">Cargando...</div>;
    }

    if (error) {
        return <div className="container mt-4">{error}</div>;
    }

    if (!serie) {
        return <div className="container mt-4">No se encontraron detalles de la serie.</div>;
    }

    return (
        <div className="container mt-4">
            
            <Card className="serie-detail-card">
                <div className="row no-gutters">
                    <div className="col-md-4">
                        <Card.Img 
                            variant="top" 
                            src={serie.poster_path ? `https://image.tmdb.org/t/p/w500${serie.poster_path}` : 'https://via.placeholder.com/150'} 
                            alt={serie.name}
                            className="serie-image" 
                        />
                    </div>
                    <div className="col-md-8">
                        <Card.Body>
                            <Card.Title>{serie.name}</Card.Title>
                            <Card.Text><strong>Descripción:</strong> {serie.overview || 'No hay descripción disponible.'}</Card.Text>
                            <Card.Text><strong>Géneros:</strong> {serie.genres.map(genre => genre.name).join(', ')}</Card.Text>
                            <Card.Text><strong>Lenguaje:</strong> {serie.original_language.toUpperCase()}</Card.Text>
                            <Card.Text><strong>Popularidad:</strong> {serie.popularity.toFixed(1)}</Card.Text>
                            <Card.Text><strong>Compañía de Producción:</strong> {serie.production_companies.map(company => company.name).join(', ')}</Card.Text>
                            <Card.Text><strong>Votación Promedio:</strong> {serie.vote_average} / 10</Card.Text>
                            <Card.Text><strong>Conteo de votos:</strong> {serie.vote_count}</Card.Text>
                            <Button variant="primary" onClick={() => window.history.back()}>Volver</Button>
                            {token && (
                                <Button
                                    variant="link"
                                    onClick={handleFavoriteToggle}
                                    className="favorite-btn"
                                >
                                    {isFavorite(serie.id) ? <FaHeart size={24} color="red" /> : <FaRegHeart size={24} />}
                                </Button>
                            )}
                        </Card.Body>
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default Detalle;
