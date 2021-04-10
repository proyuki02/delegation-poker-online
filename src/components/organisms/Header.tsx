import React, { useContext } from "react";
import { Button, Form, Nav, Navbar } from "react-bootstrap";
import { FirebaseContext } from "../../contexts/firebase";

function Account() {
  const fb = useContext(FirebaseContext);

  if (!fb?.user?.uid) {
    return null;
  }

  return (
    <Form inline>
      <span style={{ color: "#ccc", marginRight: 20 }}>
        ようこそ {fb?.user?.displayName} さん
      </span>
      <Button
        variant="outline-info"
        onClick={() => {
          fb?.auth.signOut();
          window.location.href = "/";
        }}
      >
        ログアウト
      </Button>
    </Form>
  );
}

export function Header() {
  return (
    <Navbar bg="dark" variant="dark">
      <img
        src="/image/logo.png"
        width="30"
        height="30"
        className="d-inline-block align-top"
        alt="Delegation Poker Online"
        style={{ marginRight: 10 }}
      />
      <Navbar.Brand href="/">Delegation Poker Online</Navbar.Brand>
      <Nav className="mr-auto"></Nav>
      <Account />
    </Navbar>
  );
}
