import React from "react";
import { Header } from "./components/organisms/Header";
import { RoomPage } from "./components/pages/RoomPage";
import { SignInPage } from "./components/pages/SignInPage";
import { TopPage } from "./components/pages/TopPage";
import { FirebaseProvider } from "./contexts/firebase";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { RoomProvider } from "./contexts/room";

function App() {
  return (
    <FirebaseProvider>
      <RoomProvider>
        <Router>
          <Header />
          <SignInPage>
            <Switch>
              <Route path="/:roomId">
                <RoomPage />
              </Route>
              <Route path="/">
                <TopPage />
              </Route>
            </Switch>
          </SignInPage>
        </Router>
      </RoomProvider>
    </FirebaseProvider>
  );
}

export default App;
