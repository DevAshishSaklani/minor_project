"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function CreateCampaignPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    detailedDescription: "",
    budget: "",
    deadline: "",
    contentFormat: "video",
    objective: "",
    minFollowers: "",
    requiredNiche: "",
    requiredPlatform: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/campaigns", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          budget: parseFloat(formData.budget),
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to create campaign");
      }

      // Redirect to campaigns page on success
      router.push("/campaigns");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main>
      <Navigation />

      <section
        className="px-4 md:px-8 lg:px-12 py-16 md:py-20 lg:py-24"
        style={{ background: "var(--paper)", minHeight: "calc(100vh - 200px)" }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="mb-12 space-y-4">
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold"
              style={{
                fontFamily: "var(--font-space-grotesk)",
                color: "var(--ink)",
              }}
            >
              Create Campaign
            </h1>
            <p className="text-lg md:text-xl" style={{ color: "var(--muted)" }}>
              Launch your brand partnership opportunity
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-8 rounded-3xl space-y-6"
            style={{
              background: "var(--white)",
              border: "1px solid var(--line)",
              boxShadow: "var(--shadow)",
            }}
          >
            {error && (
              <div
                className="p-4 rounded-xl text-sm"
                style={{
                  background: "var(--orange)",
                  color: "var(--white)",
                }}
              >
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label
                htmlFor="title"
                className="text-sm font-semibold"
                style={{ color: "var(--text-on-light)" }}
              >
                Campaign Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl"
                style={{
                  border: "1px solid var(--line)",
                  color: "var(--text-on-light)",
                }}
                placeholder="e.g., Summer Product Launch Campaign"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="description"
                className="text-sm font-semibold"
                style={{ color: "var(--text-on-light)" }}
              >
                Short Description *
              </label>
              <textarea
                id="description"
                name="description"
                required
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 rounded-xl"
                style={{
                  border: "1px solid var(--line)",
                  color: "var(--text-on-light)",
                }}
                placeholder="Brief overview of your campaign (shown in listings)"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="detailedDescription"
                className="text-sm font-semibold"
                style={{ color: "var(--text-on-light)" }}
              >
                Detailed Campaign Brief
              </label>
              <textarea
                id="detailedDescription"
                name="detailedDescription"
                value={formData.detailedDescription}
                onChange={handleChange}
                rows={8}
                className="w-full px-4 py-3 rounded-xl"
                style={{
                  border: "1px solid var(--line)",
                  color: "var(--text-on-light)",
                }}
                placeholder="Provide detailed instructions for creators:
- What content should they create?
- What are the key messages to include?
- What is the brand voice and style?
- Are there specific hashtags or mentions required?
- What deliverables do you expect?
- Any dos and don'ts?"
              />
              <p
                className="text-xs"
                style={{ color: "var(--muted-on-light)" }}
              >
                This detailed description will help creators understand exactly what you need
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="budget"
                  className="text-sm font-semibold"
                  style={{ color: "var(--text-on-light)" }}
                >
                  Budget ($) *
                </label>
                <input
                  type="number"
                  id="budget"
                  name="budget"
                  required
                  min="0"
                  step="0.01"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl"
                  style={{
                    border: "1px solid var(--line)",
                    color: "var(--text-on-light)",
                  }}
                  placeholder="5000"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="deadline"
                  className="text-sm font-semibold"
                  style={{ color: "var(--text-on-light)" }}
                >
                  Deadline *
                </label>
                <input
                  type="date"
                  id="deadline"
                  name="deadline"
                  required
                  value={formData.deadline}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl"
                  style={{
                    border: "1px solid var(--line)",
                    color: "var(--text-on-light)",
                  }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="contentFormat"
                className="text-sm font-semibold"
                style={{ color: "var(--text-on-light)" }}
              >
                Content Format *
              </label>
              <select
                id="contentFormat"
                name="contentFormat"
                required
                value={formData.contentFormat}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl"
                style={{
                  border: "1px solid var(--line)",
                  color: "var(--text-on-light)",
                }}
              >
                <option value="video">Video</option>
                <option value="image">Image</option>
                <option value="article">Article</option>
                <option value="reel">Reel/Short</option>
                <option value="story">Story</option>
                <option value="post">Social Post</option>
              </select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="objective"
                className="text-sm font-semibold"
                style={{ color: "var(--text-on-light)" }}
              >
                Campaign Objective *
              </label>
              <input
                type="text"
                id="objective"
                name="objective"
                required
                value={formData.objective}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl"
                style={{
                  border: "1px solid var(--line)",
                  color: "var(--text-on-light)",
                }}
                placeholder="e.g., Brand Awareness, Product Launch, Engagement"
              />
            </div>

            {/* Eligibility Criteria Section */}
            <div className="pt-6 space-y-4">
              <div
                className="pb-2"
                style={{ borderBottom: "1px solid var(--line)" }}
              >
                <h3
                  className="text-lg font-bold"
                  style={{
                    fontFamily: "var(--font-space-grotesk)",
                    color: "var(--text-on-light)",
                  }}
                >
                  Eligibility Criteria (Optional)
                </h3>
                <p
                  className="text-xs mt-1"
                  style={{ color: "var(--muted-on-light)" }}
                >
                  Set requirements for creators who can apply
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="minFollowers"
                    className="text-sm font-semibold"
                    style={{ color: "var(--text-on-light)" }}
                  >
                    Minimum Followers
                  </label>
                  <input
                    type="number"
                    id="minFollowers"
                    name="minFollowers"
                    min="0"
                    value={formData.minFollowers}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl"
                    style={{
                      border: "1px solid var(--line)",
                      color: "var(--text-on-light)",
                    }}
                    placeholder="e.g., 10000"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="requiredPlatform"
                    className="text-sm font-semibold"
                    style={{ color: "var(--text-on-light)" }}
                  >
                    Required Platform
                  </label>
                  <select
                    id="requiredPlatform"
                    name="requiredPlatform"
                    value={formData.requiredPlatform}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl"
                    style={{
                      border: "1px solid var(--line)",
                      color: "var(--text-on-light)",
                    }}
                  >
                    <option value="">Any Platform</option>
                    <option value="youtube">YouTube</option>
                    <option value="instagram">Instagram</option>
                    <option value="tiktok">TikTok</option>
                    <option value="twitter">Twitter/X</option>
                    <option value="facebook">Facebook</option>
                    <option value="linkedin">LinkedIn</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="requiredNiche"
                  className="text-sm font-semibold"
                  style={{ color: "var(--text-on-light)" }}
                >
                  Required Niche
                </label>
                <select
                  id="requiredNiche"
                  name="requiredNiche"
                  value={formData.requiredNiche}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl"
                  style={{
                    border: "1px solid var(--line)",
                    color: "var(--text-on-light)",
                  }}
                >
                  <option value="">Any Niche</option>
                  <option value="tech">Technology</option>
                  <option value="lifestyle">Lifestyle</option>
                  <option value="fitness">Fitness & Health</option>
                  <option value="beauty">Beauty & Fashion</option>
                  <option value="gaming">Gaming</option>
                  <option value="food">Food & Cooking</option>
                  <option value="travel">Travel</option>
                  <option value="business">Business & Finance</option>
                  <option value="education">Education</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 px-6 py-3 rounded-full font-semibold"
                style={{
                  border: "1px solid var(--line)",
                  color: "var(--text-on-light)",
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 rounded-full font-semibold"
                style={{
                  background: loading ? "var(--muted)" : "var(--orange)",
                  color: "var(--white)",
                }}
              >
                {loading ? "Creating..." : "Create Campaign"}
              </button>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}
