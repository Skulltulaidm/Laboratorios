import React from "react";
import { Container, Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import GestionCertificaciones from "./GestionCertificaciones";
import Manager from "./Manager";

const App = () => {
    const [seccionActual, setSeccionActual] = React.useState("certificaciones");

    return (
        <div>
            <Navbar color="dark" dark expand="md">
                <Container>
                    <NavbarBrand href="/">Sistema de Gestión de Empleados</NavbarBrand>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink
                                href="#"
                                onClick={() => setSeccionActual("empleados")}
                                active={seccionActual === "empleados"}
                            >
                                Empleados
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                href="#"
                                onClick={() => setSeccionActual("certificaciones")}
                                active={seccionActual === "certificaciones"}
                            >
                                Certificaciones y Cursos
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Container>
            </Navbar>

            <Container className="mt-4">
                {seccionActual === "empleados" ? <Manager /> : <GestionCertificaciones />}
            </Container>
        </div>
    );
};

export default App;