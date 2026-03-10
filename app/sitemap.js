export default function sitemap() {
  const baseUrl = "https://dcstudios.in";

  // Define service slugs based on your current routes
  const services = [
    "maternity",
    "newborn-photography",
    "baby-toddler",
    "cake-smash",
    "family",
    "child-sibling",
    "fashion"
  ];

  const serviceUrls = services.map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const galleryUrl = {
    url: `${baseUrl}/gallery`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  };

  const aboutUrl = {
    url: `${baseUrl}/about`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  };

  const contactUrl = {
    url: `${baseUrl}/contact`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  };

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    aboutUrl,
    contactUrl,
    galleryUrl,
    ...serviceUrls,
  ];
}
