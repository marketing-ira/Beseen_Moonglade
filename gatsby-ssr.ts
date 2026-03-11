import React from "react";
import type { GatsbySSR } from "gatsby";

export const onRenderBody: GatsbySSR["onRenderBody"] = ({
  setHtmlAttributes,
  setHeadComponents,
  setPreBodyComponents,
}) => {
  setHtmlAttributes({ lang: "en" });

  const schemas = [];

  schemas.push({
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Moonglade by Ira Realty & EInfra",
    "url": "https://beseen.moonglade.life",
    "logo": "https://beseen.moonglade.life/logo.png",
    "image": "https://beseen.moonglade.life/hero-image.jpg",
    "description":
      "Moonglade | Luxury 3 & 4 BHK apartments in Narsingi Kokapet near ORR. Spacious 1400–3950 sft homes by Ira Realty & EInfra with premium amenities.",
    "identifier": {
      "@type": "PropertyValue",
      "propertyID": "RERA Registration Number",
      "value": "P02400009267",
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "98JX+H45, Manchirevula",
      "addressLocality": "Narsingi",
      "addressRegion": "Telangana",
      "postalCode": "500089",
      "addressCountry": "IN",
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 17.381669089810618,
      "longitude": 78.34789245767122,
    },
    "hasMap": "https://maps.app.goo.gl/xWRr9qSPgaRE8bJZ6?g_st=ipc",
    "telephone": "+91 90915 99599",
    "openingHours": "Mo-Su 10:00-18:30",
    "areaServed": {
      "@type": "Place",
      "name": "Narsingi, Kokapet, Hyderabad",
    },
    "keywords": [
      "Moonglade",
      "Luxury Flats in Narsingi",
      "3 BHK Kokapet",
      "4 BHK Kokapet",
      "Premium Apartments Hyderabad",
      "Ira Realty Einfra",
    ],
  });

  schemas.push({
    "@context": "https://schema.org",
    "@type": "ApartmentComplex",
    "name": "Moonglade Kokapet",
    "alternateName": "Moonglade Luxury Apartments by E-Infra & IRA Realty",
    "url": "https://beseen.moonglade.life/",
    "logo": "https://beseen.moonglade.life/logo.png",
    "image": [
      "https://beseen.moonglade.life/hero-image.jpg",
      "https://beseen.moonglade.life/clubhouse-image.jpg",
      "https://beseen.moonglade.life/tower-view.jpg"
    ],
    "description":
      "Moonglade - Premium 3 & 4 BHK luxury apartments in Kokapet, Hyderabad. 1400-3950 sq.ft homes with 135,000 sq.ft clubhouse, 7 towers on 14 acres. RERA approved P02400009267.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Manchirevula, Kokapet",
      "addressLocality": "Narsingi",
      "addressRegion": "Telangana",
      "postalCode": "500089",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 17.381669089810618,
      "longitude": 78.34789245767122
    },
    "hasMap": "https://maps.app.goo.gl/xWRr9qSPgaRE8bJZ6",
    "telephone": "+919091599599",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"
        ],
        "opens": "10:00",
        "closes": "18:30"
      }
    ],
    "numberOfAccommodationUnits": 2489,
    "numberOfBedrooms": "3-4",
    "amenityFeature": [
      { "@type": "LocationFeatureSpecification", "name": "Starlight Clubhouse", "value": "135000 sqft" },
      { "@type": "LocationFeatureSpecification", "name": "Swimming Pool", "value": "Men, Women, Kids" },
      { "@type": "LocationFeatureSpecification", "name": "Gym & Fitness Center", "value": "true" },
      { "@type": "LocationFeatureSpecification", "name": "Indoor Games", "value": "Badminton, Squash" }
    ],
    "identifier": {
      "@type": "PropertyValue",
      "propertyID": "RERA",
      "value": "P02400009267"
    },
    "containsPlace": {
      "@type": "Place",
      "name": "Kokapet Financial District Area"
    },
    "sameAs": [
      "https://www.facebook.com/moonglade.life",
      "https://www.instagram.com/moonglade.life",
      "https://www.youtube.com/@moonglade_life"
    ]
  });

  schemas.push({
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": "https://beseen.moonglade.life/#3bhk-apartments",
    "name": "3 BHK Luxury Apartments at Moonglade Kokapet",
    "description": "Spacious 3 BHK apartments ranging from 1400 to 2740 sq.ft in Kokapet, Hyderabad.",
    "image": "https://beseen.moonglade.life/3bhk-floor-plan.jpg",
    "brand": { "@type": "Brand", "name": "E-Infra & IRA Realty" },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "INR",
      "lowPrice": "12600000",
      "url": "https://beseen.moonglade.life/"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "327"
    }
  });

  schemas.push({
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": "https://beseen.moonglade.life/#4bhk-apartments",
    "name": "4 BHK Luxury Apartments at Moonglade Kokapet",
    "description": "Ultra-spacious 4 BHK apartments from 3535 to 3950 sq.ft in Kokapet.",
    "image": "https://beseen.moonglade.life/4bhk-floor-plan.jpg",
    "brand": { "@type": "Brand", "name": "E-Infra & IRA Realty" },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "INR",
      "lowPrice": "12600000",
      "url": "https://beseen.moonglade.life/"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "347"
    }
  });

  schemas.push({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "E-Infra IRA Ventures",
    "alternateName": ["E-Infra", "IRA Realty"],
    "url": "https://beseen.moonglade.life/",
    "logo": "https://beseen.moonglade.life/logo.png",
    "description":
      "Leading real estate developers in Hyderabad specializing in luxury residential projects.",
    "foundingDate": "2017"
  });

  schemas.push({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Where is Moonglade located?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Moonglade is located in Kokapet, opposite ORR Exit 18A."
        }
      },
      {
        "@type": "Question",
        "name": "What is the price of 3 BHK flats?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "3 BHK apartments start from ₹1.26 Crore."
        }
      }
    ]
  });

  schemas.push({
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Moonglade Sales Office",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Opp. ORR Exit 18A, Brindavan Colony",
      "addressLocality": "Kokapet",
      "addressRegion": "Telangana",
      "postalCode": "500075",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 17.381669089810618,
      "longitude": 78.34789245767122
    },
    "telephone": "+919091599599"
  });


  const gtmHead = `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-KJSLTFS4');
  `;

  const gtmNoScript = `
    <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KJSLTFS4"
    height="0" width="0" style="display:none;visibility:hidden" sandbox="allow-scripts allow-same-origin allow-storage-access"></iframe>
  `.replace(/\s+/g, " ");



  // Build head components array
  const headComponents: React.ReactElement[] = [];

  headComponents.push(
    React.createElement("script", {
      key: "gtm-head",
      dangerouslySetInnerHTML: { __html: gtmHead },
    })
  );

  headComponents.push(
    React.createElement("link", {
      key: "favicon",
      rel: "icon",
      href: "/favicon.svg",
    }),

    React.createElement("meta", {
      key: "permissions-policy",
      httpEquiv: "Permissions-Policy",
      content: "storage-access=('self' 'https://www.googletagmanager.com' 'https://do8wl071qiuy9.cloudfront.net'), interest-cohort=()",
    }),

    React.createElement("script", {
      key: "jsonld",
      type: "application/ld+json",
      dangerouslySetInnerHTML: { __html: JSON.stringify(schemas) },
    })
  );

  setHeadComponents(headComponents);



  const preBody: React.ReactElement[] = [];
  preBody.push(
    React.createElement("noscript", {
      key: "gtm-noscript",
      dangerouslySetInnerHTML: { __html: gtmNoScript },
    })
  );

  setPreBodyComponents(preBody);
};
