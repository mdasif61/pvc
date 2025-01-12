import { Outlet } from "react-router";
import Container from "../components/Container";

const Layout = () => {
  return (
    <Container>
      <Outlet />
    </Container>
  );
};

export default Layout;
