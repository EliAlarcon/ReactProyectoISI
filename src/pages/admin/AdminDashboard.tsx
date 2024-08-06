import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const AdminDashboard: React.FC = () => {
  return (
    <div className="container mt-4">
      <h1>Panel de Administración</h1>
      <Row className="mt-4">
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Total de Usuarios</Card.Title>
              <Card.Text>
                <h2>250</h2>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Cursos Activos</Card.Title>
              <Card.Text>
                <h2>15</h2>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Nuevos Registros</Card.Title>
              <Card.Text>
                <h2>25</h2>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;