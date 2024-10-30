# Scoop_Haven  
Scoop Haven is a Next.js-based e-commerce website for an ice cream shop, featuring user authentication, item management, and order processing. With MongoDB and AWS S3 integrations, it offers a seamless shopping experience with both card and cash payment options.
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Scope
Scoop Haven targets online ice cream ordering, allowing customers to view the menu, place orders, and manage their profiles. Admin users have additional privileges for managing menu items, viewing orders, and handling customer data.  

## Features

- **Authentication:** Google and credential-based user login
- **Accounts:** Customer and admin panel separation
- **Home Page:** Menu browsing with an interactive and user-friendly GUI
- **Payment Mode:** Secure cart and payment options (online/offline)
- **Profile Details:** Profile management with saved address details for quick checkout
- **Administration:** Admin functionalities for user, order, and menu management

## Technology Stack

- Next.js (JavaScript)
- CSS (For Styling)
- HTML (Frontend Development)
- MongoDB (MongoDB Atlas)
- Amazon AWS (image hosting)
- NextAuth (authentication)

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

## Conclusion
With a user-friendly interface and comprehensive admin controls, Scoop Haven enhances online ordering for both customers and shop administrators, offering a streamlined and secure e-commerce solution for an ice cream shop.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
