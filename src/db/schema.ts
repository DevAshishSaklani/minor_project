import { pgTable, text, timestamp, integer, boolean, decimal } from "drizzle-orm/pg-core";
import { users } from "./users-schema";

// Campaigns table
export const campaigns = pgTable("campaigns", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  detailedDescription: text("detailed_description"), // Detailed explanation for creators
  brandName: text("brand_name").notNull(),
  brandId: text("brand_id"), // Link to the user who created the campaign
  budget: decimal("budget", { precision: 10, scale: 2 }).notNull(),
  deadline: timestamp("deadline").notNull(),
  status: text("status").notNull().default("active"), // active, completed, draft
  contentFormat: text("content_format").notNull(), // video, image, article, etc.
  objective: text("objective").notNull(),
  // Eligibility criteria
  minFollowers: integer("min_followers").default(0),
  requiredNiche: text("required_niche"),
  requiredPlatform: text("required_platform"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Creators table
export const creators = pgTable("creators", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  bio: text("bio"),
  avatarUrl: text("avatar_url"),
  niche: text("niche").notNull(), // tech, lifestyle, fitness, etc.
  platform: text("platform").notNull(), // youtube, instagram, tiktok, etc.
  audienceSize: integer("audience_size").notNull().default(0),
  verified: boolean("verified").notNull().default(false),
  rating: decimal("rating", { precision: 3, scale: 2 }).default("0.00"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Submissions table (links creators to campaigns)
export const submissions = pgTable("submissions", {
  id: text("id").primaryKey(),
  campaignId: text("campaign_id")
    .notNull()
    .references(() => campaigns.id),
  creatorId: text("creator_id")
    .notNull()
    .references(() => creators.id),
  status: text("status").notNull().default("pending"), // pending, approved, rejected
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
  contentUrl: text("content_url"),
  views: integer("views").default(0),
  engagement: decimal("engagement", { precision: 5, scale: 2 }).default("0.00"),
});

// Campaign Applications table (for creators to apply)
export const campaignApplications = pgTable("campaign_applications", {
  id: text("id").primaryKey(),
  campaignId: text("campaign_id")
    .notNull()
    .references(() => campaigns.id),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  proposal: text("proposal").notNull(), // Creator's pitch/proposal
  status: text("status").notNull().default("pending"), // pending, accepted, rejected
  appliedAt: timestamp("applied_at").defaultNow().notNull(),
});

// Stats table for dashboard
export const stats = pgTable("stats", {
  id: text("id").primaryKey(),
  publishedCampaigns: integer("published_campaigns").notNull().default(0),
  trackedTransactions: decimal("tracked_transactions", { precision: 12, scale: 2 }).notNull().default("0.00"),
  verifiedPerformance: decimal("verified_performance", { precision: 5, scale: 2 }).notNull().default("0.00"),
  activeCreators: integer("active_creators").notNull().default(0),
  repeatBookings: decimal("repeat_bookings", { precision: 5, scale: 2 }).notNull().default("0.00"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Campaign = typeof campaigns.$inferSelect;
export type Creator = typeof creators.$inferSelect;
export type Submission = typeof submissions.$inferSelect;
export type CampaignApplication = typeof campaignApplications.$inferSelect;
export type Stats = typeof stats.$inferSelect;

// Re-export user tables
export { users, sessions } from "./users-schema";
export type { User, Session } from "./users-schema";
