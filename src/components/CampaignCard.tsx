"use client";

import { useState, useEffect } from "react";
import type { Campaign } from "@/db/schema";

interface CampaignCardProps {
  campaign: Campaign;
}

export default function CampaignCard({ campaign }: CampaignCardProps) {
  const [showModal, setShowModal] = useState(false);
  const [proposal, setProposal] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState<string | null>(null);

  useEffect(() => {
    // Check if user has already applied
    checkApplicationStatus();
  }, [campaign.id]);

  const checkApplicationStatus = async () => {
    try {
      const response = await fetch(`/api/campaigns/${campaign.id}/apply`);
      if (response.ok) {
        const data = await response.json();
        if (data) {
          setHasApplied(true);
          setApplicationStatus(data.status);
        }
      }
    } catch (err) {
      // Silently fail - user probably not logged in
    }
  };

  const handleApply = async () => {
    if (!proposal.trim()) {
      setError("Please write a proposal");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/campaigns/${campaign.id}/apply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ proposal }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to submit application");
        setLoading(false);
        return;
      }

      setSuccess(true);
      setHasApplied(true);
      setApplicationStatus("pending");
      setTimeout(() => {
        setShowModal(false);
        setSuccess(false);
        setProposal("");
      }, 2000);
    } catch (err) {
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  const meetsEligibility = () => {
    // This is client-side check - server will validate too
    return true; // For now, always show button
  };

  const getStatusBadge = () => {
    if (!hasApplied) return null;
    
    const statusColors: Record<string, { bg: string; text: string }> = {
      pending: { bg: "var(--sage)", text: "var(--text-on-light)" },
      accepted: { bg: "var(--lavender)", text: "var(--text-on-light)" },
      rejected: { bg: "var(--muted)", text: "var(--white)" },
    };

    const status = applicationStatus || "pending";
    const colors = statusColors[status] || statusColors.pending;

    return (
      <div
        className="px-3 py-1 rounded-full text-xs font-medium"
        style={{
          background: colors.bg,
          color: colors.text,
        }}
      >
        {status === "pending" && "✓ Applied"}
        {status === "accepted" && "✓ Accepted"}
        {status === "rejected" && "✗ Not Selected"}
      </div>
    );
  };

  return (
    <>
      <div
        className="p-6 rounded-2xl space-y-4 hover:shadow-lg transition-shadow"
        style={{
          background: "var(--white)",
          border: "1px solid var(--line)",
        }}
      >
        <div className="flex items-start justify-between">
          <div
            className="px-3 py-1 rounded-full text-xs font-medium"
            style={{
              background: "var(--sage)",
              color: "var(--text-on-light)",
            }}
          >
            {campaign.contentFormat}
          </div>
          <div className="text-sm font-bold" style={{ color: "var(--orange)" }}>
            ${parseFloat(campaign.budget).toLocaleString()}
          </div>
        </div>

        <h3
          className="text-xl font-bold"
          style={{
            fontFamily: "var(--font-space-grotesk)",
            color: "var(--text-on-light)",
          }}
        >
          {campaign.title}
        </h3>

        <p
          className="text-sm leading-relaxed line-clamp-3"
          style={{ color: "var(--muted-on-light)" }}
        >
          {campaign.description}
        </p>

        {campaign.detailedDescription && (
          <details className="mt-2">
            <summary
              className="text-xs font-semibold cursor-pointer hover:underline"
              style={{ color: "var(--orange)" }}
            >
              View Full Brief →
            </summary>
            <p
              className="text-sm leading-relaxed mt-3 pt-3 whitespace-pre-line"
              style={{
                color: "var(--muted-on-light)",
                borderTop: "1px solid var(--line)",
              }}
            >
              {campaign.detailedDescription}
            </p>
          </details>
        )}

        {/* Eligibility Criteria */}
        {(campaign.minFollowers || campaign.requiredNiche || campaign.requiredPlatform) && (
          <div
            className="p-3 rounded-xl space-y-2"
            style={{
              background: "var(--paper)",
              border: "1px solid var(--line)",
            }}
          >
            <p
              className="text-xs font-semibold"
              style={{ color: "var(--text-on-light)" }}
            >
              Requirements:
            </p>
            <div className="flex flex-wrap gap-2">
              {campaign.minFollowers && campaign.minFollowers > 0 && (
                <span
                  className="text-xs px-2 py-1 rounded"
                  style={{
                    background: "var(--white)",
                    color: "var(--muted-on-light)",
                  }}
                >
                  👥 {campaign.minFollowers.toLocaleString()}+ followers
                </span>
              )}
              {campaign.requiredNiche && (
                <span
                  className="text-xs px-2 py-1 rounded"
                  style={{
                    background: "var(--white)",
                    color: "var(--muted-on-light)",
                  }}
                >
                  📂 {campaign.requiredNiche}
                </span>
              )}
              {campaign.requiredPlatform && (
                <span
                  className="text-xs px-2 py-1 rounded"
                  style={{
                    background: "var(--white)",
                    color: "var(--muted-on-light)",
                  }}
                >
                  📱 {campaign.requiredPlatform}
                </span>
              )}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-2">
          <div>
            <p className="text-xs" style={{ color: "var(--muted-on-light)" }}>
              By {campaign.brandName}
            </p>
            <p className="text-xs" style={{ color: "var(--muted-on-light)" }}>
              Deadline: {new Date(campaign.deadline).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {hasApplied ? (
            getStatusBadge()
          ) : (
            <button
              onClick={() => setShowModal(true)}
              className="w-full px-4 py-2.5 rounded-full font-semibold text-sm"
              style={{
                background: "var(--orange)",
                color: "var(--white)",
              }}
            >
              Apply Now →
            </button>
          )}
        </div>
      </div>

      {/* Application Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0, 0, 0, 0.5)" }}
          onClick={() => setShowModal(false)}
        >
          <div
            className="max-w-2xl w-full p-8 rounded-3xl space-y-6"
            style={{
              background: "var(--white)",
              border: "1px solid var(--line)",
              boxShadow: "var(--shadow)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <h2
                className="text-2xl font-bold"
                style={{
                  fontFamily: "var(--font-space-grotesk)",
                  color: "var(--text-on-light)",
                }}
              >
                Apply to Campaign
              </h2>
              <p
                className="text-sm mt-2"
                style={{ color: "var(--muted-on-light)" }}
              >
                {campaign.title}
              </p>
            </div>

            {error && (
              <div
                className="p-4 rounded-xl text-sm"
                style={{
                  background: "#fee",
                  border: "1px solid #fcc",
                  color: "#c00",
                }}
              >
                {error}
              </div>
            )}

            {success && (
              <div
                className="p-4 rounded-xl text-sm"
                style={{
                  background: "#efe",
                  border: "1px solid #cfc",
                  color: "#060",
                }}
              >
                ✓ Application submitted successfully!
              </div>
            )}

            <div className="space-y-2">
              <label
                htmlFor="proposal"
                className="text-sm font-semibold"
                style={{ color: "var(--text-on-light)" }}
              >
                Your Proposal *
              </label>
              <textarea
                id="proposal"
                value={proposal}
                onChange={(e) => setProposal(e.target.value)}
                rows={8}
                className="w-full px-4 py-3 rounded-xl"
                style={{
                  border: "1px solid var(--line)",
                  color: "var(--text-on-light)",
                }}
                placeholder="Explain why you're a great fit for this campaign:
- Your relevant experience
- Content ideas you have
- Your audience demographics
- Why you're passionate about this brand
- Links to previous work (optional)"
                disabled={loading || success}
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-6 py-3 rounded-full font-semibold"
                style={{
                  border: "1px solid var(--line)",
                  color: "var(--text-on-light)",
                }}
                disabled={loading || success}
              >
                Cancel
              </button>
              <button
                onClick={handleApply}
                className="flex-1 px-6 py-3 rounded-full font-semibold"
                style={{
                  background: loading || success ? "var(--muted)" : "var(--orange)",
                  color: "var(--white)",
                }}
                disabled={loading || success}
              >
                {loading ? "Submitting..." : success ? "Submitted!" : "Submit Application"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
