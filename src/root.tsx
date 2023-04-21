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
} from "solid-start";
import "./root.css";
import { Navbar } from "~/components";
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
      </Head>
      <Body>
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
