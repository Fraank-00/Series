import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Buscador({ onSearch, resetSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };


  useEffect(() => {
    if (resetSearch) {
      setQuery('');
    }
  }, [resetSearch]);

  return (
    <Form onSubmit={handleSubmit} className="d-flex align-items-center">
      <Row className="align-items-center">
        <Col xs="auto">
          <Form.Control
            type="text"
            placeholder="Buscar"
            value={query}
            onChange={handleChange}
          />
        </Col>
        <Col xs="auto">
          <Button type="submit">Buscar</Button>
        </Col>
      </Row>
    </Form>
  );
}

export default Buscador;
