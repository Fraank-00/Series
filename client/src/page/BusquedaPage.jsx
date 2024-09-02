import React, { useState } from 'react';
import Resultado from '../components/Resultado';
import Buscador from '../components/Buscador'; 

function BusquedaPage() {
    const [results, setResults] = useState([]);
    const [query, setQuery] = useState('');

    const handleSearch = async (searchQuery) => {
        setQuery(searchQuery);
        try {
            const response = await fetch(`https://api.themoviedb.org/3/search/tv?api_key=99fa703cc923438e8e7ee0db3a3e7454&language=es-ES&query=${searchQuery}`);
            const data = await response.json();
            setResults(data.results);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    return (
        <div>
            <Buscador onSearch={handleSearch} resetSearch={false} />
            <Resultado results={results} query={query} />
        </div>
    );
}

export default BusquedaPage;
