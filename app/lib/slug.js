// Generate URL-friendly slug from title
export function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Find community by slug
export function findCommunityBySlug(communities, slug) {
  return communities.find((c) => generateSlug(c.title) === slug);
}
