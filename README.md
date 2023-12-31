# Findcaster

### 🦇 Signal

We are looking for users active on farcaster right now who would want to test out ways to find people to follow on Farcaster

## Project Overview

Findcaster is the best place to search for and find people around web3 socials.

We're making it easier to connect with like-minded people on web3 socials.

### Web3 socials integrations

We're starting by indexing all the data in the Farcaster ecosystem, and then we'll expand to other platforms like Lens,
allowing users to search for people in the most extensive possible way.

This repository contains the frontend for the Findcaster application. It interacts with an existing Supabase database,
which contains all the data. The database is updated using
the [Farcaster Indexer](https://github.com/limone-eth/farcaster-indexer) which is a fork of [@gskril's one](https://github.com/gskril/farcaster-indexer).

### On-chain data integrations

We are enriching users' profiles with data about their POAPs, NFTs and token transfers. In the future we will add more onchain data sources. We also plan to have a recommendation system based on the data we have so that we can suggest users the best
people to connect with.

### Tech stack

- [NextJS](https://nextjs.org/)
- [Tailwind](https://tailwindcss.com/)
- [Supabase](https://supabase.com/)
- Typescript
- [Airstack](https://airstack.xyz/)

## Getting Started

To get started, follow these simple steps:

1. Run `yarn install` to install all the required dependencies.
2. Rename `.env.example` to `.env.local` and configure your variables with the proper credentials.
3. Then execute `yarn dev` to launch the application.
