import React from "react";
import { Button, Container, Jumbotron } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const Form = styled.div`
  margin-top: 100px;
  display: flex;
  justify-content: center;
`;

export function NotFoundPage() {
  const history = useHistory();

  return (
    <Container fluid>
      <Form>
        <Jumbotron style={{ width: 600 }}>
          <h1>Not Found</h1>
          <p>このページは存在しません。URLをご確認ください。</p>
          <p>
            <Button variant="primary" onClick={() => history.push("/")}>
              トップページへ
            </Button>
          </p>
        </Jumbotron>
      </Form>
    </Container>
  );
}
