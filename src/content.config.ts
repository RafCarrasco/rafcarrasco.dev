import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projectSchema = z.object({
  title: z.string(),
  slug: z.string(),
  featured: z.boolean().default(false),
  order: z.number(),
  year: z.number(),
  stack: z.array(z.string()),
  description: z.string(),
  heroImage: z.string().optional(),
  links: z
    .object({
      github: z.url().optional(),
      demo: z.url().optional(),
      article: z.url().optional(),
    })
    .default({}),
});

const certificateSchema = z.object({
  title: z.string(),
  issuer: z.string(),
  date: z.string(), // YYYY-MM ou '—'
  order: z.number(),
  image: z.string().optional(),
  verifyUrl: z.url().optional(),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: projectSchema,
});

const certificates = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/certificates' }),
  schema: certificateSchema,
});

export const collections = { projects, certificates };
export type Project = z.infer<typeof projectSchema>;
export type Certificate = z.infer<typeof certificateSchema>;
