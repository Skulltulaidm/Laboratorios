import React, { useState } from "react";
import {
    Table,
    Button,
    Container,
    FormGroup,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Badge,
    Alert,
    Card,
    CardBody,
    CardTitle,
    CardSubtitle,
    Row,
    Col,
    Progress,
    Input,
    Label,
    Form,
    UncontrolledTooltip
} from "reactstrap";

const certificacionesIniciales = [
    {
        id: 1,
        nombre: "AWS Certified Solutions Architect",
        institucion: "Amazon Web Services",
        fechaObtencion: "2023-05-15",
        fechaExpiracion: "2026-05-15",
        estado: "vigente",
        progreso: 100
    },
    {
        id: 2,
        nombre: "Scrum Master Professional",
        institucion: "Scrum Alliance",
        fechaObtencion: "2022-10-20",
        fechaExpiracion: "2024-10-20",
        estado: "por vencer",
        progreso: 100
    },
    {
        id: 3,
        nombre: "Microsoft Azure Fundamentals",
        institucion: "Microsoft",
        fechaObtencion: "2023-02-10",
        fechaExpiracion: "2025-02-10",
        estado: "vigente",
        progreso: 100
    }
];

const cursosIniciales = [
    {
        id: 1,
        nombre: "React Advanced Patterns",
        plataforma: "Udemy",
        fechaInicio: "2023-11-01",
        fechaFinalizacion: "2023-12-15",
        estado: "completado",
        progreso: 100
    },
    {
        id: 2,
        nombre: "Machine Learning Foundations",
        plataforma: "Coursera",
        fechaInicio: "2024-01-10",
        fechaFinalizacion: null,
        estado: "en progreso",
        progreso: 60
    },
    {
        id: 3,
        nombre: "DevOps CI/CD Pipeline",
        plataforma: "Pluralsight",
        fechaInicio: "2024-02-15",
        fechaFinalizacion: null,
        estado: "en progreso",
        progreso: 30
    },
    {
        id: 4,
        nombre: "Ciberseguridad para Desarrolladores",
        plataforma: "LinkedIn Learning",
        fechaInicio: null,
        fechaFinalizacion: null,
        estado: "pendiente",
        progreso: 0
    }
];

// Catálogo de cursos recomendados
const cursosRecomendados = [
    {
        id: 1,
        nombre: "Inteligencia Artificial y Ética",
        plataforma: "Coursera",
        duracion: "8 semanas",
        nivel: "Intermedio",
        compatibilidad: 95
    },
    {
        id: 2,
        nombre: "Arquitectura de Microservicios",
        plataforma: "Udemy",
        duracion: "6 semanas",
        nivel: "Avanzado",
        compatibilidad: 87
    },
    {
        id: 3,
        nombre: "Data Science con Python",
        plataforma: "EdX",
        duracion: "12 semanas",
        nivel: "Intermedio",
        compatibilidad: 82
    },
];

const GestionCertificaciones = () => {
    const [certificaciones, setCertificaciones] = useState(certificacionesIniciales);
    const [cursos, setCursos] = useState(cursosIniciales);
    const [certificacionActual, setCertificacionActual] = useState({});
    const [cursoActual, setCursoActual] = useState({});

    const [modalCertificacion, setModalCertificacion] = useState(false);
    const [modalCurso, setModalCurso] = useState(false);
    const [modalRecomendaciones, setModalRecomendaciones] = useState(false);
    const [esEdicion, setEsEdicion] = useState(false);
    const [vistaCertificaciones, setVistaCertificaciones] = useState(true);

    // crud certificaciones
    const agregarCertificacion = () => {
        const nuevaCertificacion = {...certificacionActual};
        nuevaCertificacion.id = certificaciones.length > 0 ? Math.max(...certificaciones.map(c => c.id)) + 1 : 1;
        nuevaCertificacion.progreso = 100;
        nuevaCertificacion.estado = calcularEstadoCertificacion(nuevaCertificacion);

        setCertificaciones([...certificaciones, nuevaCertificacion]);
        setModalCertificacion(false);
    };

    const editarCertificacion = () => {
        const certificacionActualizada = {...certificacionActual};
        certificacionActualizada.estado = calcularEstadoCertificacion(certificacionActualizada);

        const nuevasCertificaciones = certificaciones.map(cert =>
            cert.id === certificacionActualizada.id ? certificacionActualizada : cert
        );

        setCertificaciones(nuevasCertificaciones);
        setModalCertificacion(false);
    };

    const eliminarCertificacion = (id) => {
        const confirmacion = window.confirm("¿Estás seguro que deseas eliminar esta certificación?");
        if (confirmacion) {
            setCertificaciones(certificaciones.filter(cert => cert.id !== id));
        }
    };

    const abrirModalCertificacion = (certificacion = null) => {
        if (certificacion) {
            setCertificacionActual(certificacion);
            setEsEdicion(true);
        } else {
            setCertificacionActual({
                id: "",
                nombre: "",
                institucion: "",
                fechaObtencion: "",
                fechaExpiracion: "",
                estado: "vigente",
                progreso: 100
            });
            setEsEdicion(false);
        }
        setModalCertificacion(true);
    };

    const calcularEstadoCertificacion = (certificacion) => {
        if (!certificacion.fechaExpiracion) return "vigente";

        const hoy = new Date();
        const expiracion = new Date(certificacion.fechaExpiracion);
        const diferenciaMeses = (expiracion - hoy) / (1000 * 60 * 60 * 24 * 30);

        if (expiracion < hoy) {
            return "expirado";
        } else if (diferenciaMeses <= 3) {
            return "por vencer";
        } else {
            return "vigente";
        }
    };

    // crud de cursos
    const agregarCurso = () => {
        const nuevoCurso = {...cursoActual};
        nuevoCurso.id = cursos.length > 0 ? Math.max(...cursos.map(c => c.id)) + 1 : 1;

        if (nuevoCurso.fechaFinalizacion) {
            nuevoCurso.estado = "completado";
            nuevoCurso.progreso = 100;
        } else if (nuevoCurso.fechaInicio) {
            nuevoCurso.estado = "en progreso";
            nuevoCurso.progreso = nuevoCurso.progreso || 0;
        } else {
            nuevoCurso.estado = "pendiente";
            nuevoCurso.progreso = 0;
        }

        setCursos([...cursos, nuevoCurso]);
        setModalCurso(false);
    };

    const editarCurso = () => {
        const cursoActualizado = {...cursoActual};

        if (cursoActualizado.fechaFinalizacion) {
            cursoActualizado.estado = "completado";
            cursoActualizado.progreso = 100;
        } else if (cursoActualizado.fechaInicio) {
            cursoActualizado.estado = "en progreso";
        } else {
            cursoActualizado.estado = "pendiente";
            cursoActualizado.progreso = 0;
        }

        const nuevosCursos = cursos.map(curso =>
            curso.id === cursoActualizado.id ? cursoActualizado : curso
        );

        setCursos(nuevosCursos);
        setModalCurso(false);
    };

    const eliminarCurso = (id) => {
        const confirmacion = window.confirm("¿Estás seguro que deseas eliminar este curso?");
        if (confirmacion) {
            setCursos(cursos.filter(curso => curso.id !== id));
        }
    };

    const abrirModalCurso = (curso = null) => {
        if (curso) {
            setCursoActual(curso);
            setEsEdicion(true);
        } else {
            setCursoActual({
                id: "",
                nombre: "",
                plataforma: "",
                fechaInicio: "",
                fechaFinalizacion: "",
                estado: "pendiente",
                progreso: 0
            });
            setEsEdicion(false);
        }
        setModalCurso(true);
    };

    const actualizarProgresoCurso = (id, nuevoProgreso) => {
        const cursoActualizado = cursos.find(curso => curso.id === id);
        cursoActualizado.progreso = nuevoProgreso;

        if (nuevoProgreso === 100) {
            cursoActualizado.estado = "completado";
            cursoActualizado.fechaFinalizacion = new Date().toISOString().split('T')[0];
        }

        const nuevosCursos = cursos.map(curso =>
            curso.id === id ? cursoActualizado : curso
        );

        setCursos(nuevosCursos);
    };

    const handleInputChange = (e, tipo) => {
        const { name, value } = e.target;

        if (tipo === 'certificacion') {
            setCertificacionActual({
                ...certificacionActual,
                [name]: value
            });
        } else {
            setCursoActual({
                ...cursoActual,
                [name]: value
            });
        }
    };

    const inscribirEnCursoRecomendado = (curso) => {
        const nuevoCurso = {
            id: cursos.length > 0 ? Math.max(...cursos.map(c => c.id)) + 1 : 1,
            nombre: curso.nombre,
            plataforma: curso.plataforma,
            fechaInicio: new Date().toISOString().split('T')[0],
            fechaFinalizacion: null,
            estado: "en progreso",
            progreso: 0
        };

        setCursos([...cursos, nuevoCurso]);
        setModalRecomendaciones(false);
        alert(`¡Te has inscrito en el curso "${curso.nombre}"!`);
    };

    const obtenerColorEstadoCertificacion = (estado) => {
        switch (estado) {
            case 'vigente': return 'success';
            case 'por vencer': return 'warning';
            case 'expirado': return 'danger';
            default: return 'secondary';
        }
    };

    const obtenerColorEstadoCurso = (estado) => {
        switch (estado) {
            case 'completado': return 'success';
            case 'en progreso': return 'info';
            case 'pendiente': return 'secondary';
            default: return 'secondary';
        }
    };

    return (
        <Container className="mt-4">
            <h2 className="mb-4">Gestión de Formación Profesional</h2>

            <div className="mb-4">
                <Button
                    color={vistaCertificaciones ? "primary" : "outline-primary"}
                    className="me-2"
                    onClick={() => setVistaCertificaciones(true)}
                >
                    Certificaciones
                </Button>
                <Button
                    color={!vistaCertificaciones ? "primary" : "outline-primary"}
                    onClick={() => setVistaCertificaciones(false)}
                >
                    Cursos
                </Button>
                <Button
                    color="success"
                    className="float-end"
                    onClick={() => setModalRecomendaciones(true)}
                >
                    Ver Recomendaciones
                </Button>
            </div>

            {vistaCertificaciones ? (
                <>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4>Mis Certificaciones</h4>
                        <Button color="success" onClick={() => abrirModalCertificacion()}>
                            Añadir Certificación
                        </Button>
                    </div>

                    {certificaciones.filter(cert => cert.estado === "por vencer").length > 0 && (
                        <Alert color="warning" className="mb-3">
                            <i className="bi bi-exclamation-triangle-fill me-2"></i>
                            Tienes certificaciones próximas a vencer. Revisa las fechas de renovación.
                        </Alert>
                    )}

                    <Table hover responsive>
                        <thead>
                        <tr>
                            <th>Certificación</th>
                            <th>Institución</th>
                            <th>Fecha Obtención</th>
                            <th>Fecha Expiración</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        {certificaciones.map((certificacion) => (
                            <tr key={certificacion.id}>
                                <td>{certificacion.nombre}</td>
                                <td>{certificacion.institucion}</td>
                                <td>{certificacion.fechaObtencion}</td>
                                <td>{certificacion.fechaExpiracion || "No expira"}</td>
                                <td>
                                    <Badge color={obtenerColorEstadoCertificacion(certificacion.estado)}>
                                        {certificacion.estado.toUpperCase()}
                                    </Badge>
                                </td>
                                <td>
                                    <Button
                                        color="primary"
                                        size="sm"
                                        className="me-2"
                                        onClick={() => abrirModalCertificacion(certificacion)}
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        color="danger"
                                        size="sm"
                                        onClick={() => eliminarCertificacion(certificacion.id)}
                                    >
                                        Eliminar
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        {certificaciones.length === 0 && (
                            <tr>
                                <td colSpan="6" className="text-center">No hay certificaciones registradas</td>
                            </tr>
                        )}
                        </tbody>
                    </Table>
                </>
            ) : (
                <>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4>Mis Cursos</h4>
                        <Button color="success" onClick={() => abrirModalCurso()}>
                            Añadir Curso
                        </Button>
                    </div>

                    <Row>
                        {cursos.map((curso) => (
                            <Col md="6" lg="4" className="mb-4" key={curso.id}>
                                <Card>
                                    <CardBody>
                                        <CardTitle tag="h5">{curso.nombre}</CardTitle>
                                        <CardSubtitle tag="h6" className="mb-2 text-muted">
                                            {curso.plataforma}
                                            <Badge
                                                color={obtenerColorEstadoCurso(curso.estado)}
                                                className="float-end"
                                            >
                                                {curso.estado}
                                            </Badge>
                                        </CardSubtitle>

                                        <div className="mb-3">
                                            <small className="text-muted">
                                                {curso.fechaInicio ? `Inicio: ${curso.fechaInicio}` : "No iniciado"}
                                                {curso.fechaFinalizacion && ` • Finalizado: ${curso.fechaFinalizacion}`}
                                            </small>
                                        </div>

                                        <div className="mb-3">
                                            <div className="d-flex justify-content-between mb-1">
                                                <span>Progreso:</span>
                                                <span>{curso.progreso}%</span>
                                            </div>
                                            <Progress value={curso.progreso} />
                                        </div>

                                        {curso.estado === "en progreso" && (
                                            <div className="mb-3">
                                                <div className="d-flex">
                                                    <Input
                                                        type="range"
                                                        min="0"
                                                        max="100"
                                                        step="5"
                                                        value={curso.progreso}
                                                        onChange={(e) => actualizarProgresoCurso(curso.id, parseInt(e.target.value))}
                                                        className="me-2"
                                                    />
                                                    <Button
                                                        color="success"
                                                        size="sm"
                                                        onClick={() => actualizarProgresoCurso(curso.id, 100)}
                                                    >
                                                        Completar
                                                    </Button>
                                                </div>
                                            </div>
                                        )}

                                        <div className="d-flex justify-content-end">
                                            <Button
                                                color="primary"
                                                size="sm"
                                                className="me-2"
                                                onClick={() => abrirModalCurso(curso)}
                                            >
                                                Editar
                                            </Button>
                                            <Button
                                                color="danger"
                                                size="sm"
                                                onClick={() => eliminarCurso(curso.id)}
                                            >
                                                Eliminar
                                            </Button>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        ))}
                        {cursos.length === 0 && (
                            <Col md="12">
                                <Alert color="info">
                                    No hay cursos registrados. ¡Comienza a aprender añadiendo un curso!
                                </Alert>
                            </Col>
                        )}
                    </Row>
                </>
            )}

            {/* Modal para Certificaciones */}
            <Modal isOpen={modalCertificacion} toggle={() => setModalCertificacion(!modalCertificacion)}>
                <ModalHeader toggle={() => setModalCertificacion(!modalCertificacion)}>
                    {esEdicion ? "Editar Certificación" : "Añadir Nueva Certificación"}
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="nombre">Nombre de la Certificación</Label>
                        <Input
                            type="text"
                            name="nombre"
                            id="nombre"
                            value={certificacionActual.nombre || ""}
                            onChange={(e) => handleInputChange(e, 'certificacion')}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="institucion">Institución Certificadora</Label>
                        <Input
                            type="text"
                            name="institucion"
                            id="institucion"
                            value={certificacionActual.institucion || ""}
                            onChange={(e) => handleInputChange(e, 'certificacion')}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="fechaObtencion">Fecha de Obtención</Label>
                        <Input
                            type="date"
                            name="fechaObtencion"
                            id="fechaObtencion"
                            value={certificacionActual.fechaObtencion || ""}
                            onChange={(e) => handleInputChange(e, 'certificacion')}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="fechaExpiracion">Fecha de Expiración (opcional)</Label>
                        <Input
                            type="date"
                            name="fechaExpiracion"
                            id="fechaExpiracion"
                            value={certificacionActual.fechaExpiracion || ""}
                            onChange={(e) => handleInputChange(e, 'certificacion')}
                        />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={esEdicion ? editarCertificacion : agregarCertificacion}>
                        {esEdicion ? "Actualizar" : "Guardar"}
                    </Button>
                    <Button color="secondary" onClick={() => setModalCertificacion(false)}>
                        Cancelar
                    </Button>
                </ModalFooter>
            </Modal>

            {/* Modal para Cursos */}
            <Modal isOpen={modalCurso} toggle={() => setModalCurso(!modalCurso)}>
                <ModalHeader toggle={() => setModalCurso(!modalCurso)}>
                    {esEdicion ? "Editar Curso" : "Añadir Nuevo Curso"}
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="nombre">Nombre del Curso</Label>
                        <Input
                            type="text"
                            name="nombre"
                            id="nombreCurso"
                            value={cursoActual.nombre || ""}
                            onChange={(e) => handleInputChange(e, 'curso')}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="plataforma">Plataforma o Proveedor</Label>
                        <Input
                            type="text"
                            name="plataforma"
                            id="plataforma"
                            value={cursoActual.plataforma || ""}
                            onChange={(e) => handleInputChange(e, 'curso')}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="fechaInicio">Fecha de Inicio</Label>
                        <Input
                            type="date"
                            name="fechaInicio"
                            id="fechaInicio"
                            value={cursoActual.fechaInicio || ""}
                            onChange={(e) => handleInputChange(e, 'curso')}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="fechaFinalizacion">Fecha de Finalización (dejar en blanco si está en progreso)</Label>
                        <Input
                            type="date"
                            name="fechaFinalizacion"
                            id="fechaFinalizacion"
                            value={cursoActual.fechaFinalizacion || ""}
                            onChange={(e) => handleInputChange(e, 'curso')}
                        />
                    </FormGroup>
                    {esEdicion && cursoActual.estado === "en progreso" && (
                        <FormGroup>
                            <Label for="progreso">Progreso (%)</Label>
                            <Input
                                type="number"
                                name="progreso"
                                id="progreso"
                                min="0"
                                max="100"
                                value={cursoActual.progreso || 0}
                                onChange={(e) => handleInputChange(e, 'curso')}
                            />
                        </FormGroup>
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={esEdicion ? editarCurso : agregarCurso}>
                        {esEdicion ? "Actualizar" : "Guardar"}
                    </Button>
                    <Button color="secondary" onClick={() => setModalCurso(false)}>
                        Cancelar
                    </Button>
                </ModalFooter>
            </Modal>

            {/* Modal para Recomendaciones de Cursos */}
            <Modal isOpen={modalRecomendaciones} toggle={() => setModalRecomendaciones(!modalRecomendaciones)} size="lg">
                <ModalHeader toggle={() => setModalRecomendaciones(!modalRecomendaciones)}>
                    Cursos Recomendados para Tu Carrera
                </ModalHeader>
                <ModalBody>
                    <Alert color="info" className="mb-4">
                        <h5 className="alert-heading">¡Mejora tu perfil profesional!</h5>
                        <p>
                            Estas recomendaciones están basadas en tu perfil profesional, objetivos de carrera
                            y tendencias actuales del mercado.
                        </p>
                    </Alert>

                    <Row>
                        {cursosRecomendados.map((curso) => (
                            <Col md="6" className="mb-3" key={curso.id}>
                                <Card className="h-100 border-primary">
                                    <CardBody>
                                        <div className="d-flex justify-content-between">
                                            <CardTitle tag="h5">{curso.nombre}</CardTitle>
                                            <Badge
                                                color="primary"
                                                pill
                                                className="d-flex align-items-center"
                                                id={`compatibilidad-${curso.id}`}
                                            >
                                                {curso.compatibilidad}%
                                            </Badge>
                                            <UncontrolledTooltip
                                                target={`compatibilidad-${curso.id}`}
                                                placement="top"
                                            >
                                                Compatibilidad con tu perfil
                                            </UncontrolledTooltip>
                                        </div>
                                        <CardSubtitle tag="h6" className="mb-2 text-muted">
                                            {curso.plataforma}
                                        </CardSubtitle>

                                        <div className="my-3">
                                            <div><strong>Duración:</strong> {curso.duracion}</div>
                                            <div><strong>Nivel:</strong> {curso.nivel}</div>
                                        </div>

                                        <Button
                                            color="success"
                                            onClick={() => inscribirEnCursoRecomendado(curso)}
                                            className="mt-2 w-100"
                                        >
                                            Inscribirme
                                        </Button>
                                    </CardBody>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={() => setModalRecomendaciones(false)}>
                        Cerrar
                    </Button>
                </ModalFooter>
            </Modal>
        </Container>
    );
};

export default GestionCertificaciones;