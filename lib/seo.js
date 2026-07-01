export function generateMetadata({ title, description, path, image }) {
  const baseUrl = 'https://hobbyverse.app';
  const fullPath = path || '/';
  const url = `${baseUrl}${fullPath}`;

  return {
    title: title ? `${title} | HobbyVerse` : 'HobbyVerse | Discover Your Next Passion',
    description: description || 'Rent premium hobby equipment and explore new skills without expensive commitments.',
    metadataBase: new URL(baseUrl),
    openGraph: {
      title: title || 'HobbyVerse',
      description: description || 'Discover your passion before making a major investment.',
      url,
      siteName: 'HobbyVerse',
      images: [{ url: image || '/og-image.jpg', width: 1200, height: 630 }],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: title || 'HobbyVerse',
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
  name: 'HobbyVerse',
  url: 'https://hobbyverse.app',
  logo: 'https://hobbyverse.app/logo.png',
  description: 'Rent premium hobby equipment and explore new skills without expensive commitments.',
  foundingDate: '2025',
  sameAs: ['https://twitter.com/hobbyverse', 'https://instagram.com/hobbyverse'],
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
