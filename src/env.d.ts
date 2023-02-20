declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string
      PORT: number
      TOKEN: string
      CLIENT_ID: string
      PUBLIC_KEY: string
    }
  }
}

export {}
