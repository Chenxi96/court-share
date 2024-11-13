# Court-Share



## Installation
1. Clone the repository.
2. Install dependencies with `npm install`.
3. Install docker `https://docs.docker.com/get-docker/`

## Running App locally
1. Create a `.env`, add `POSTGRES_PRISMA_URL` with an string value of `postgresql://postgres:password@localhost:5432/court-share?schema=public`
2. Prompt `npx prisma migrate dev` to update the prisma schema with the new url.
3. To run application, prompt `npm run local` to run postgres in a local docker container then open up prisma studio.(Make sure Docker is running to execute this.)
4. In your .env file Set `Next_PUBLIC_USE_AUTH` to `true` to have the auth work locally (this will bypass auth login).
5. Run `npm run stop-local` to stop and remove the container from docker.

## Implementing Google Oauth
Links:
    - https://authjs.dev/getting-started/authentication/oauth
    - https://authjs.dev/getting-started/migrating-to-v5
    - https://authjs.dev/getting-started/installation
I used auth.js to implement authentication with google provider.
