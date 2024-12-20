export const BASE_URL = {
  POLICY:
    process.env.NEXT_PUBLIC_POLICY_SERVICE_URL ||
    "http://app.4fiveone.com/api/policy/v1",
  LISTING:
    process.env.NEXT_PUBLIC_LISTING_SERVICE_URL ||
    "http://app.4fiveone.com/api/listings",
  BLOGS:
    process.env.BLOGS_SERVICE_URL ||
    "https://public-api.wordpress.com/rest/v1.1/sites/en.blog.wordpress.com",
  OFFERING:
    process.env.NEXT_PUBLIC_OFFERING_SERVICE_URL ||
    "http://app.4fiveone.com/api/offering",
  PORTFOLIO:
    process.env.NEXT_PUBLIC_PORTFOLIO_SERVICE_URL ||
    "http://app.4fiveone.com/api/portfolio/portfolios",
};
