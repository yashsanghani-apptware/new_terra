### Renaming the Terra Backend Proxy: "Terraflow"

The Terra system’s backend proxy will be renamed to **Terraflow**, as it serves as the orchestrator that securely navigates and coordinates data across various services and endpoints. Terraflow provides a unified interface for interacting with external services, including WordPress, MongoDB, document management systems, and API-driven platforms, while ensuring secure communication, validation, and data management for user-facing operations.



### **Terraflow: Endpoints and Services**

Terraflow interacts with multiple services to render different views and execute workflows for users with varying roles, such as investors, farm managers, campaign managers, and administrators. Below are the updated services that Terraflow will interact with:



### **1. Listings Service**
- **Purpose**: Manage available farmland listings for investors and buyers.

**Endpoints**:
- `GET /listings`: Retrieve all listings.
- `GET /listings/:id`: Retrieve a specific listing by ID.
- `POST /listings`: Create a new listing (admin action).
- `PUT /listings/:id`: Update an existing listing.
- `DELETE /listings/:id`: Delete a listing (admin action, restricted).

**Interaction Flow**:
- The **Listing Service** integrates with third-party sources (e.g., MLS databases) and stores the data in **DocumentDB**.
- Terraflow pulls the listings to display them in the investor dashboard or buyer’s portal.



### **2. Offerings Service**
- **Purpose**: Manage investment offerings associated with farmland listings.

**Endpoints**:
- `GET /offerings`: Retrieve all offerings.
- `GET /offerings/:id`: Retrieve details of a specific offering.
- `POST /offerings`: Create a new offering.
- `PUT /offerings/:id`: Update offering details.
- `DELETE /offerings/:id`: Delete an offering.

**Interaction Flow**:
- Investors can view the available offerings, explore the details (returns, risk profiles, documents), and choose to invest.
- Campaign managers use the offerings to create marketing campaigns targeting specific investor profiles.



### **3. Campaigns Service**
- **Purpose**: Manage and track marketing campaigns for new investment opportunities.

**Endpoints**:
- `GET /campaigns`: Retrieve all campaigns.
- `GET /campaigns/:id`: Retrieve details of a specific campaign.
- `POST /campaigns`: Create a new marketing campaign.
- `PUT /campaigns/:id`: Update campaign details.
- `DELETE /campaigns/:id`: Delete a campaign.

**Interaction Flow**:
- **Campaign Managers** launch campaigns to promote new offerings to interested investors.
- Terraflow tracks campaign metrics (views, engagement) and reports the performance back to the campaign manager dashboard.



### **4. Datarooms Service**
- **Purpose**: Provide a secure space to store and share documents related to farmland due diligence, legal, and investment documents.

**Endpoints**:
- `GET /datarooms`: Retrieve all datarooms.
- `GET /datarooms/:id`: Retrieve a specific dataroom and its documents.
- `POST /datarooms`: Create a new dataroom for a farm or offering.
- `PUT /datarooms/:id`: Update dataroom permissions or documents.
- `DELETE /datarooms/:id`: Delete a dataroom (admin action).

**Interaction Flow**:
- Farm SMEs, legal teams, and investors access datarooms for reviewing sensitive documents such as due diligence reports or legal contracts.
- Permissions are role-based, with restricted access for different roles (Farm SME, Farm Manager, Investor).



### **5. Portfolios Service**
- **Purpose**: Manage and view investors’ portfolio details, including active and past investments.

**Endpoints**:
- `GET /portfolios`: Retrieve all portfolios.
- `GET /portfolios/:id`: Retrieve details of a specific portfolio.
- `POST /portfolios`: Create a new portfolio entry.
- `PUT /portfolios/:id`: Update a portfolio with new investments or returns.
- `DELETE /portfolios/:id`: Delete a portfolio (admin action).

**Interaction Flow**:
- Investors access their **portfolios** to see detailed information about their current and past investments, returns, and performance metrics.
- Financial analysts and farm managers can update portfolios with performance reports and yield calculations.



### **6. User and Access Control**
- **Purpose**: Manage users, roles, and permissions across the platform.

**Endpoints**:
- `GET /users`: Retrieve all users.
- `GET /users/:id`: Retrieve a specific user.
- `POST /users`: Create a new user with specific roles and permissions.
- `PUT /users/:id`: Update user details (e.g., KYC, role changes).
- `DELETE /users/:id`: Remove a user from the platform.

**Interaction Flow**:
- The **User Service** supports role-based access control (RBAC) to ensure different roles have distinct access to various services (e.g., Investors have portfolio access, but not the ability to modify listings).
- Administrators manage the roles and permissions via the User Service.



### **Terraflow Interaction Flow**

#### **1. Investor Viewing Listings and Offerings**
- The investor logs in via the front-end.
- Terraflow validates the JWT token via the User Service.
- **Navigator** fetches listings from the Listings Service and active offerings from the Offerings Service.
- The front-end renders the listings and offerings based on investor interests.

**Interaction Diagram**:
```
[Front-End] --> [Terraflow] --> [Listings Service]
                                  --> [Offerings Service]
                                  --> [User Service (auth)]
```



#### **2. Campaign Manager Creating a Marketing Campaign**
- The campaign manager logs in and accesses the campaign creation dashboard.
- Terraflow pulls investor profiles from the User Service and available offerings from the Offerings Service.
- **Navigator** creates a campaign using the Campaigns Service, targeting specific investor profiles.

**Interaction Diagram**:
```
[Front-End] --> [Terraflow] --> [Campaigns Service]
                                  --> [Offerings Service]
                                  --> [User Service]
```



#### **3. Investor Accessing a Dataroom**
- The investor logs in and selects an offering.
- Terraflow checks permissions via the User Service.
- **Navigator** fetches the dataroom content from the Datarooms Service.
- Documents are rendered in a secure document viewer for the investor.

**Interaction Diagram**:
```
[Front-End] --> [Terraflow] --> [Datarooms Service]
                                  --> [User Service (permissions)]
```



#### **4. Administrator Managing a Listing**
- The administrator logs in and selects a listing to modify.
- Terraflow verifies admin privileges via the User Service.
- **Navigator** updates the listing in the Listings Service and syncs any related offerings.

**Interaction Diagram**:
```
[Front-End] --> [Terraflow] --> [Listings Service]
                                  --> [User Service (auth)]
```



### Summary

**Terraflow** is the backbone of the Terra system’s interactions, handling authentication, data aggregation, secure document management, and user role validation. By coordinating multiple services, including Listings, Offerings, Campaigns, Datarooms, and Portfolios, the Navigator ensures that users with different roles can interact with the platform in a secure, efficient, and seamless way.
