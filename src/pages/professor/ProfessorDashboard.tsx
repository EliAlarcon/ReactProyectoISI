import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const ProfessorDashboard: React.FC = () => {
  return (
    <div className="container mt-4">
      <h1>Panel del Profesor</h1>
      <Row className="mt-4">
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Clases Activas</Card.Title>
              <Card.Text>
                <h2>5</h2>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Estudiantes Totales</Card.Title>
              <Card.Text>
                <h2>120</h2>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Tareas Pendientes</Card.Title>
              <Card.Text>
                <h2>15</h2>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProfessorDashboard;