/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_VITE_APP_PUBLIC_KEY: string;
  readonly PUBLIC_VITE_APP_SERVICE_ID: string;
  readonly PUBLIC_VITE_APP_TEMPLATE_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
