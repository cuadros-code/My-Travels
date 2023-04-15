// @refresh reload
import { Suspense } from "solid-js";
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

export default function Root() {
  
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
