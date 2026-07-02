export function generateMetadata({ title, description, path, image }) {
  const baseUrl = 'https://nexthobby.app';
  const fullPath = path || '/';
  const url = `${baseUrl}${fullPath}`;

  return {
    title: title ? `${title} | Next Hobby` : 'Next Hobby | Discover Your Next Passion',
    description: description || 'Rent premium hobby equipment and explore new skills without expensive commitments.',
    metadataBase: new URL(baseUrl),
    openGraph: {
      title: title || 'Next Hobby',
      description: description || 'Discover your passion before making a major investment.',
      url,
      siteName: 'Next Hobby',
      images: [{ url: image || '/og-image.jpg', width: 1200, height: 630 }],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: title || 'Next Hobby',
      description: description || 'Discover your passion before making a major investment.',
      images: [image || '/og-image.jpg'],
    },
    robots: { index: true, follow: true },
    alternates: { canonical: url },
  };
}

export const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Next Hobby',
  url: 'https://nexthobby.app',
  logo: 'https://nexthobby.app/logo.png',
  description: 'Rent premium hobby equipment and explore new skills without expensive commitments.',
  foundingDate: '2025',
  sameAs: ['https://twitter.com/nexthobby', 'https://instagram.com/nexthobby'],
};

export const productStructuredData = (product) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: product.name,
  description: product.description,
  category: product.category,
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'MAD',
    lowPrice: product.daily,
    highPrice: product.monthly,
    availability: 'https://schema.org/InStock',
  },
});
