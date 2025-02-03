# FINT Kontroll

## Setup environment

## Create a `.env` file in root directory.

```sh
BASE_PATH=/beta/fintlabs-no
PORT=3000
USER_API_URL=http://localhost:8062
ROLE_API_URL=http://localhost:8064
RESOURCE_API_URL=http://localhost:8063
ASSIGNMENT_API_URL=http://localhost:8061
ACCESS_MANAGEMENT_API_URL=http://localhost:53989
ORG_UNIT_API_URL=http://localhost:8060
LOG_LEVEL=debug
CYPRESS_TESTS=false
```

## Development

### Start locally:

1. **Start Port Forwarding**  
   Run portall in package.json
1. **Start React**  
   Run the provided script:

```sh
npm run dev
```

A bearer token is necessary for local connection to backend.

## Testing

### Run tests

```bash
cypress run
```

Open tests in browser:

```bash
cypress open
```

## Styling

Tailwind, Aksel, and Novari-theme

## Deployment

Maunual deploy on github

- [Remix Docs](https://remix.run/docs)
