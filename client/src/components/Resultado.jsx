// Resultado.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function Resultado({ results, query }) {
    return (
        <div>
            <h2>Buscaste: {query}</h2>
            <div className="row">
                {results.map(result => (
                    <div className="col-12 col-md-6 col-lg-4 mb-4" key={result.id}>
                        <div className="card">
                            <img src={`https://image.tmdb.org/t/p/w500${result.poster_path}`} className="card-img-top" alt={result.name} />
                            <div className="card-body">
                                <h5 className="card-title">{result.name}</h5>
                                <p className="card-text">{result.overview}</p>
                                <Link to={`/detalle/${result.id}`}>
                                    <Button variant="primary">Ver Más</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Resultado;
