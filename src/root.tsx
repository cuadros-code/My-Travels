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
  
  const navigate = useNavigate();
  
  createEffect(() => {
    authListener()
  })

  console.log({navigate});
  

  
  return (
    <Html lang="en">
      <Head>
        <Title>Mis Viajes</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
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
