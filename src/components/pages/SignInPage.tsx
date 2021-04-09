import React from "react";
import LoadingOverlay from "react-loading-overlay";
import styled from "styled-components";
import { FirebaseContext } from "../../contexts/firebase";
import { ErrorMessage } from "../atoms/ErrorMessage";
import FirebaseUIAuth from "react-firebaseui-localized";
import firebase from "firebase";
import { Button } from "react-bootstrap";
import { Margin } from "../atoms/Margin";

const SignInForm = styled.div`
  height: calc(100vh - 56px);
  display: flex;
  padding-top: 200px;
  justify-content: center;
`;

export function SignInPage(props: { children: React.ReactNode }) {
  const config = {
    signInSuccessUrl: "/",
    signInFlow: "popup",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false,
    },
  };
  const allowDomain = process.env.REACT_APP_ALLOW_DOMAIN || "";

  return (
    <FirebaseContext.Consumer>
      {(fb) => {
        if (fb.user) {
          return props.children;
        }

        return (
          <LoadingOverlay active={!fb.loaded} spinner text="Now Loading...">
            <SignInForm>
              <div style={{ textAlign: "center" }}>
                {allowDomain
                  ? allowDomain + " のアカウントでログインしてください"
                  : ""}
                <Margin height={20} />
                {!fb.error ? (
                  <FirebaseUIAuth
                    lang="ja"
                    version="4.7.3"
                    config={config}
                    auth={fb.auth}
                    firebase={firebase}
                  />
                ) : (
                  <>
                    <ErrorMessage text={fb.error} />
                    <Margin height={40} />
                    <Button
                      variant="primary"
                      onClick={() => window.location.reload()}
                    >
                      ログインに戻る
                    </Button>
                  </>
                )}
              </div>
            </SignInForm>
          </LoadingOverlay>
        );
      }}
    </FirebaseContext.Consumer>
  );
}
