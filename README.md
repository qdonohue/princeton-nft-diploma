# Endpoints

## Frontend

### `/`

Home page with CAS login and FAQs

### `/create/[session]`

Page that handles the creation flow of an NFT. On this page, users will be prompted to connect a metamask wallet, customize their NFT, and then finally mint their NFT and send it to their wallet. The session key is a unique identifier used to track a user after they log in with CAS - it is invalidated and re-issued on each new session. (This is to prevent a user from posing as another if for example we used something like `/create/my_net_id` as the slug)

### `/me/[session]`

This page will display your NFT after you've minted it. If you've previously minted an NFT on the site, you will be redirected to this page upon login.

### `/help`

A page to provide information on how to transfer your NFT into your metamask wallet.

### `/error`

Let's hope you never see this page.

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

## Authentication

### `/api/auth/login`

This endpoint will redirect the request to the CAS login, with our service callback URL appended (`/api/auth/callback`).

### `/api/auth/callback`

This endpoint is hit by the user after a succesful CAS login. It will strip the CAS ticket from the query parameters (`ticket=...`) and then validate the ticket via the validation URL.

Upon succesful validation, it will create the user object if one doesn't already exist, create or replace the existing user session, and then redirect the user to `/create/[session]` (if no NFT has been made yet - TODO: Handle NFT has been made case).

# NFT Content

The NFT has the following fields:

```
"name" : string
"major" : string
"year" : string
"message" : string
"image" : string
"address" : string (Wallet address - not on IPFS)
```

# Getting Started:

To run the codebase locally, you will need:
An env file with DB access URL via `DB_URI` (make your own postgres or ask us)

`localhost:3000` aliased to `localhost.princeton.edu:3000`

(CAS is annoying and won't let localhost work). (See https://linuxize.com/post/how-to-edit-your-hosts-file/#modify-hosts-file-in-macos)

## Installation

Install all packages with

`yarn install`

Then start the server with:

`yarn dev`

You can view the DB on localhost:5555 by running

`yarn prisma studio`
