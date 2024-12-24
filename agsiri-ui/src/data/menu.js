import { Clipboard, Home, Layers, Link, MapPin, User, Zap } from "react-feather";

export const MainNavMenuItems = [
  {
    title: "HOME",
    icon: <Home />,
    type: "link",
    path: "/listings",
    // path: "/listing/grid-view/3-grid/no-sidebar",
    children: [],
   
  },
  {
    title: "Investsss",
    icon: <Clipboard />,
    type: "link",
    path: "/offering",
    children: [],
  },
  {
    title: "Portfolio",
    icon: <Clipboard />,
    type: "link",
    path: "/portfolio",
    children: [],
  },
  {
    title: "Resources",
    icon: <Zap />,
    type: "sub",
    children: [
      {
        path: "/modules/button",
        title: "Button",
        type: "link",
      },
      { path: "/modules/label", title: "Label", type: "link" },
      { path: "/modules/title", title: "Title", type: "link" },
    ],
  },
  {
    title: "Company",
    icon: <Zap />,
    type: "sub",
    children: [
      {
        path: "/modules/button",
        title: "Button",
        type: "link",
      },
      { path: "/modules/label", title: "Label", type: "link" },
      { path: "/modules/title", title: "Title", type: "link" },
    ],
  },
  {
    title: "AGENT",
    icon: <User />,
    type: "sub",
    children: [
      {
        path: "/agent/agent-profile",
        title: "Agent Profile",
        type: "link",
      },
      { path: "/agent/agent-grid", title: "Agent Grid", type: "link" },
      { path: "/agent/agent-list", title: "Agent List", type: "link" },
      {
        path: "/agent/submit-property",
        title: "Submit Property",
        type: "link",
        tag: "New",
      },
    ],
  },
  {
    title: "JOURNAL",
    icon: <MapPin />,
    type: "link",
    path: "/blogs",
    // path: "/pages/blog-page/no-sidebar",
    children: [],
  },
  {
    title: "CONTACT",
    icon: <MapPin />,
    type: "sub",
    children: [
      {
        path: "/contact/contact-us-1",
        title: "Contact Us 1",
        type: "link",
      },
      { path: "/contact/contact-us-2", title: "Contact Us 2", type: "link" },
      { path: "/contact/contact-us-3", title: "Contact Us 3", type: "link" },
    ],
  },
];

export const languageDropDownData = [
  { lang: "en", language: "English" },
  // { lang: "fr", language: "French" },
  // { lang: "ar", language: "Arabic" },
  // { lang: "es", language: "Spanish" },
];

export const RightNavMenuItem = [
  {
    title: "language"
  },
  {
    title: "cart",
  },
  {
    title: "currency",
    type: [
      {
        currency: "USD",
        name: "dollar",
        symbol: "$",
        value: 1,
      },
      {
        currency: "EUR",
        name: "euro",
        symbol: "€",
        value: 0.997,
      },
      {
        currency: "GBP",
        name: "pound",
        symbol: "£",
        value: 0.847,
      },
      {
        currency: "IND",
        name: "rupees",
        symbol: "₹",
        value: 79.9,
      },
    ],
  },
  { title: "user" },
];
