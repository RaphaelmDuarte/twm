import React from "react";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.min.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import 'font-awesome/css/font-awesome.css';
import Alunos from "../cadastros/Aluno.jsx";
import Cursos from "../cadastros/Curso.jsx";
import Professores from "../cadastros/Professor.jsx";
import Vinculo from "../cadastros/Vincula.jsx";
import "./style.css";

function Menu() {
  const history = useNavigate();
  return (
    <>
      <SideNav
        onSelect={(selected) => {
          history(selected);
        }}
      >
        {/* fa fa-fw fa-address-book */}
        <SideNav.Toggle />
        <SideNav.Nav defaultSelected="home">
          <NavItem eventKey="home">
            <NavIcon>
              <i
                className="fa fa-fw fa-address-book"
                style={{ fontSize: "1.75em" }}
              />
            </NavIcon>
            <NavText>Cadastro</NavText>
            <NavItem eventKey="/aluno">
              <NavText>Aluno</NavText>
            </NavItem>
            <NavItem eventKey="/curso">
              <NavText>Curso</NavText>
            </NavItem>
            <NavItem eventKey="/professor">
              <NavText>Professor</NavText>
            </NavItem>
            <NavItem eventKey="/vinculo">
              <NavText>Vínculo</NavText>
            </NavItem>
          </NavItem>
        </SideNav.Nav>
      </SideNav>
      <Routes>
        <Route path="/aluno" element={<Alunos />} />
        <Route path="/curso" element={<Cursos />} />
        <Route path="/professor" element={<Professores />} />
        <Route path="/vinculo" element={<Vinculo />} />
      </Routes>
    </>
  );
}

export default Menu;
