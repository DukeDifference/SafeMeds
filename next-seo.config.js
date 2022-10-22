/** @type {import('next-seo').DefaultSeoProps} */
const defaultSEOConfig = {
  title: "SafeMeds",
  titleTemplate: "%s | SafeMeds",
  defaultTitle: "SafeMeds",
  description: "Mapping Drug Interactions",
  canonical: "https://safe-meds.vercel.app",
  openGraph: {
    url: "https://safe-meds.vercel.app",
    title: "SafeMeds",
    description: "Mapping Drug Interactions",
    images: [
      {
        url: "https://og-image.sznm.dev/**nextarter-chakra**.sznm.dev.png?theme=dark&md=1&fontSize=125px&images=https%3A%2F%2Fsznm.dev%2Favataaars.svg&widths=250",
        alt: "safe-meds.vercel.app og-image",
      },
    ],
    site_name: "SafeMeds",
  },
  twitter: {
    handle: "@sozonome",
    cardType: "summary_large_image",
  },
};

export default defaultSEOConfig;
