import React from "react";
import { Alert } from "react-bootstrap";

export function ErrorMessage(props: { text?: string }) {
  if (!props.text) return null;
  return <Alert variant="danger">{props.text}</Alert>;
}
