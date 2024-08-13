import React, { useState, useEffect } from 'react';
import { Table, Form } from 'react-bootstrap';

interface Student {
  id: number;
  nombre: string;
  horario: string;
  tareas: { nombre: string; calificacion: number }[];
}

const ManageNotes: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [students, setStudents] = useState<Student[]>([]);

  // Lista de clases con estudiantes y sus horarios
  const clases = [
    {
      id: 1,
      nombre: 'Matemáticas Avanzadas',
      estudiantes: [
        { id: 1, nombre: 'Juan Pérez', horario: 'Lunes y Miércoles 10:00-12:00', tareas: [{ nombre: 'Proyecto Final', calificacion: 85 }] },
        { id: 2, nombre: 'Ana García', horario: 'Lunes y Miércoles 10:00-12:00', tareas: [{ nombre: 'Proyecto Final', calificacion: 90 }] },
      ],
    },
    {
      id: 2,
      nombre: 'Física Cuántica',
      estudiantes: [
        { id: 3, nombre: 'Carlos Ruiz', horario: 'Martes y Jueves 14:00-16:00', tareas: [{ nombre: 'Ensayo', calificacion: 88 }] },
        { id: 4, nombre: 'Laura Díaz', horario: 'Martes y Jueves 14:00-16:00', tareas: [{ nombre: 'Ensayo', calificacion: 92 }] },
      ],
    },
  ];

  useEffect(() => {
    if (selectedClass) {
      const selectedClassData = clases.find(clase => clase.nombre === selectedClass);
      setStudents(selectedClassData ? selectedClassData.estudiantes : []);
    } else {
      setStudents([]);
    }
  }, [selectedClass]);

  return (
    <div className="container mt-4">
      <h1>Gestionar Notas</h1>
      
      <Form.Group className="mb-3">
        <Form.Label>Clase</Form.Label>
        <Form.Control
          as="select"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          <option value="">Seleccione una clase</option>
          {clases.map((clase) => (
            <option key={clase.id} value={clase.nombre}>
              {clase.nombre}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID del Estudiante</th>
            <th>Nombre del Estudiante</th>
            <th>Horario</th>
            <th>Nombre de la Tarea</th>
            <th>Calificación</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) =>
            student.tareas.map((tarea, index) => (
              <tr key={`${student.id}-${index}`}>
                <td>{student.id}</td>
                <td>{student.nombre}</td>
                <td>{student.horario}</td>
                <td>{tarea.nombre}</td>
                <td>{tarea.calificacion}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default ManageNotes;
