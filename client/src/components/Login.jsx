import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, Navigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regexEmail.test(email)) {
      Swal.fire('Email no válido');
      return;
    }
    if (email === '') {
      Swal.fire('El campo de email no puede estar vacío');
      return;
    }
    if (password === '') {
      Swal.fire('El campo de contraseña no puede estar vacío');
      return;
    }

    axios.post('http://localhost:3000/auth/login', { email, password })
      .then(res => {
        Swal.fire('Ingresaste correctamente');
        const tokenRecibido = res.data.token;
        onLogin(tokenRecibido);  // Aquí llamamos a la función onLogin para actualizar el estado en App.js
        navigate('/listado'); // Redirige al usuario a /listado
      })
      .catch(err => {
        console.error(err);
        Swal.fire('Error al enviar los datos', err.response?.data?.message || 'Error en el login', 'error');
      });
  };

  const token = sessionStorage.getItem('token');
  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <Form onSubmit={submitHandler} className="form-container">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="text" placeholder="Enter email" name="email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name="password" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Ingresar
      </Button>
    </Form>
  );
};

export default Login;
