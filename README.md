# Endpoints

## Frontend

### `/`

Home page with CAS login and FAQs

### `/create/[session]`

Page that handles the creation flow of an NFT. On this page, users will be prompted to connect a metamask wallet, customize their NFT, and then finally mint their NFT and send it to their wallet. The session key is a unique identifier used to track a user after they log in with CAS - it is invalidated and re-issued on each new session. (This is to prevent a user from posing as another if for example we used something like `/create/my_net_id` as the slug)

### `/discover`

Page that will display NFTs that have been minted. Users can view those that their friends have uploaded.

## Backend

### `/api/mint`

The POST call on this endpoint is used for minting an NFT for a given user. The endpoint will validate that a user does not already have an NFT issued, and then will use the data from the body to create one. The expected data is of the form:

```
{
    "session": Session slug (string)
    "name": User name for Diploma (string)
    "image": URL string for image (string - should be IPFS)
    "description": Description text for Diploma (string)
    "wallet": Wallet address for NFT to be transfered to (string)
}
```

If the user already has an NFT created, it will respond with a `400`. Upon succesful creation the user will be given a `201`.

### TODO: `/api/image`

The POST call on this endpoint is used for creating an IPFS image, and will return the string url for the image. It's expecting `multipart/form-data` (`FormData` in ts)

```

```

Upon failure, it will respond with a `500` - or `201` + the url in JSON if succesful.

## Authentication

### `/api/auth/login`

This endpoint will redirect the request to the CAS login, with our service callback URL appended (`/api/auth/callback`).

### `/api/auth/callback`

This endpoint is hit by the user after a succesful CAS login. It will strip the CAS ticket from the query parameters (`ticket=...`) and then validate the ticket via the validation URL.

Upon succesful validation, it will create the user object if one doesn't already exist, create or replace the existing user session, and then redirect the user to `/create/[session]` (if no NFT has been made yet - TODO: Handle NFT has been made case).

# Getting Started:

To run the codebase locally, you will need:
An env file with:

- DB access URL via `DB_URI` (make your own postgres or ask us)
- `CAS_BASE_URL="https://fed.princeton.edu/cas/"`

## Installation

Install all packages with

`yarn install`

Then start the server with:

`yarn dev`

You can view the DB on localhost:5555 by running

`yarn prisma studio`
