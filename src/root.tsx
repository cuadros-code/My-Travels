// @refresh reload
import { Suspense, createEffect } from "solid-js";
import {
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
  useNavigate,
} from "solid-start";
import "./root.css";
import { Alert, Navbar } from "~/components";
import { authListener } from '~/store/authStore';


export default function Root() {
  
  createEffect(() => {
    authListener()
  })
  
  return (
    <Html lang="en">
      <Head>
        <Title>Mis Viajes</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Comme:wght@300;400;500;600&display=swap" rel="stylesheet"></link>
      </Head>
      <Body>
        <Alert />
          <Suspense>
            <ErrorBoundary>
              <Navbar />
              <Routes>
                  <FileRoutes />
              </Routes>
            </ErrorBoundary>
          </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}
