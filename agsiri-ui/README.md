This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


# Agsiri UI Setup

## Frontend Setup

1. Clone the repository: `git clone https://github.com/coretical/terra`
2. Checkout to the terra_setup branch: `git checkout terra_setup`
3. Navigate to the agsiri-ui folder: `cd agsiri-ui`
4. Install dependencies: `npm install`
5. Run the development server: `npm run dev`

`The frontend will run on http://localhost:3000.`

## Backend Setup

### Listing Service Setup
1. Clone the nova repository: `git clone https://github.com/coretical/nova`
2. Checkout the ui_testing branch: `git checkout ui_testing`
3. Navigate to the listing folder: `cd listing`
4. Update the port in src/index.ts to 3002.
5. Install dependencies and run the service: `npm install`, `npm run dev`
`The listing service will run on port 3002`

### Policy Service Setup (Pola)
1. Clone the pola repository: `git clone https://github.com/coretical/pola`
2. Navigate to the policy-service folder: `cd policy-service/`
3. Start the policy service using Docker: `docker-compose up --build`
`The policy service will run on port 4000`

### Dataroom Service Setup
1. Clone the greenshoots repository: `git clone https://github.com/coretical/greenshoots`
2. Navigate to the dataroom-service folder: `cd platform/services/dataroom-service/`
3. Update the port in src/index.ts to 3001
4. Install dependencies and run the service: `npm install`, `npm run dev`
`The dataroom service will run on port 3001.`

## Usage Instructions

### If listings are already present:
`Open the frontend at http://localhost:3000`

### If listing not present
1. Create a User in the Pola Service
```
curl --location 'http://localhost:4000/v1/users' \
--header 'Authorization: Bearer <token>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Amol Thite",
    "givenName": "Amol",
    "familyName": "Thite",
    "email": "amol@example.com",
    "username": "amolthite",
    "password": "password123"
}'
```

2. Login
```
curl --location 'http://localhost:4000/v1/auth/login' \
--header 'Content-Type: application/json' \
--data '{
    "username": "amolthite",
    "password": "password123"
}'
```

3. Create a Listing
```
curl --location 'http://localhost:3002/api/listings' \
--header 'Authorization: Bearer <token>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Test Listing",
    "address": { "city": "Springfield", "state": "IL" },
    "property_description": "Test description"
}'
```

4. Upload Images to the Listing
```
curl --location 'http://localhost:3002/api/listings/media/<listing_id>/image' \
--header 'Authorization: Bearer <token>' \
--form 'image=@"/path/to/your/image.jpg"'
```

`Now refresh the page http://localhost:3000 to view the uploaded media.`


# Docker Setup Guide
This guide will walk you through the Docker setup for the following services:

- agsiri-ui
- dataroom-service
- listing
- policy-service

### Each service will be run in a Docker container, and all containers will be connected using a shared network.

### Prerequisites
Docker installed on your machine
Docker Compose installed
Internet connection to pull required dependencies
Shared Network Setup

### First, create a shared Docker network so that all services can communicate:
`docker network create shared-network`

### Step-by-Step Service Setup
1. agsiri-ui
Repository: [agsiri-ui](https://github.com/coretical/terra/tree/terra_setup/agsiri-ui)
Branch: terra_setup
Steps:
```
git clone https://github.com/coretical/terra.git
cd terra/agsiri-ui
git checkout terra_setup
docker-compose up --build
```

2. dataroom-service
Repository: [dataroom-service](https://github.com/coretical/greenshoots/tree/develop/platform/services/dataroom-service)
Branch: develop
Steps:
```
git clone https://github.com/coretical/greenshoots.git
cd greenshoots/platform/services/dataroom-service
git checkout develop
docker-compose up --build
```

3. listing
Repository: [listing](https://github.com/coretical/nova/tree/ui-testing/listing)
Branch: ui-testing
Steps:
```
git clone https://github.com/coretical/nova.git
cd nova/listing
git checkout ui-testing
docker-compose up --build
```

4. policy-service
Repository: [policy-service](https://github.com/coretical/pola/tree/main/policy-service)
Branch: main
Steps:
```
git clone https://github.com/coretical/pola.git
cd pola/policy-service
git checkout main
docker-compose up --build
```

### Common Commands
- To start all services: `docker-compose up`
- To stop services: `docker-compose down`
- To rebuild services: `docker-compose up --build`

Ensure that all services are up and running, and properly connected to the shared network created earlier.
