# Step 1: Use the official Node.js image as the base image
FROM node:20-alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Build the Next.js application
RUN npm run build

# Step 7: Expose the port Next.js runs on (default is 3000)
EXPOSE 3000

# Step 8: Start the Next.js application
CMD ["npm", "start"]
