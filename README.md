# DataChef

## Build Setup

```bash
# install dependencies
$ yarn

# serve with hot reload at localhost:3000
$ yarn run dev

```


## Getting Started + Local Authentication

The frontend makes requests to the API via Bearer Token

You must register for an account at https://www.datachef.io/login

1. Create an account with your Gmail
2. Copy `auth._token.google`, `auth._refresh_token.google`, `auth.strategy`, `auth._refresh_token_expiration.google`, and `auth._token_expiration.google` from local storege for datachef.io to localhost:3000; when you reload the local app, you should now be logged in.
3. Tell Joe F. that you've registered; he will add you to the demo organization so that you may view demo suggestions
4. Create `.env` file with one line `API_URL=https://api.datachef.io` if you are connection to Production API (recommended) or `API_URL=http://127.0.0.1:8000` if you are running backend locally.
