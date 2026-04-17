"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Mail, Phone, Building2, CalendarClock, UserRound } from "lucide-react";
import toast from "react-hot-toast";
import DocumentLayout from "@/components/layouts/DocumentLayout";
import { connectionApi, StudentConnectionInfoResponse } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

export default function ConnectWithUsPage() {
  const { token } = useAuth();

  const [data, setData] = useState<StudentConnectionInfoResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [requestingConnection, setRequestingConnection] = useState(false);
  const [requestingMeeting, setRequestingMeeting] = useState(false);

  const [meetingNote, setMeetingNote] = useState("");
  const [preferredDateTime, setPreferredDateTime] = useState("");

  const loadConnectionInfo = useCallback(async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await connectionApi.getConnectionInfo(token);
      setData(response);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to load connection details";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    loadConnectionInfo();
  }, [loadConnectionInfo]);

  const handleRequestConnection = async () => {
    if (!token) {
      toast.error("Please login again.");
      return;
    }

    try {
      setRequestingConnection(true);
      await connectionApi.requestConnection(token);
      toast.success("Connection request sent to admin.");
      await loadConnectionInfo();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to send connection request";
      toast.error(message);
    } finally {
      setRequestingConnection(false);
    }
  };

  const handleRequestMeeting = async () => {
    if (!token) {
      toast.error("Please login again.");
      return;
    }

    try {
      setRequestingMeeting(true);
      await connectionApi.requestMeetingWithCounselor(token, {
        note: meetingNote,
        preferredDateTime: preferredDateTime || null,
      });

      toast.success("Meeting request sent to your counselor.");
      setMeetingNote("");
      setPreferredDateTime("");
      await loadConnectionInfo();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to request meeting";
      toast.error(message);
    } finally {
      setRequestingMeeting(false);
    }
  };

  if (loading) {
    return (
      <DocumentLayout>
        <div className="pt-10" />
        <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <p className="text-gray-700 font-medium">
              Loading connection details...
            </p>
          </div>
        </div>
      </DocumentLayout>
    );
  }

  return (
    <DocumentLayout>
      <div className="pt-10" />
      <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        <section className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Connect With Us
          </h1>
          <p className="mt-2 text-gray-600">
            Reach out to our team for personalized help, counselor assignment,
            and application guidance.
          </p>
        </section>

        <section className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Company Contact Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl bg-blue-50 p-4">
              <p className="text-sm text-blue-700 font-medium flex items-center gap-2">
                <Building2 className="w-4 h-4" /> Company
              </p>
              <p className="text-gray-900 font-semibold mt-1">
                {data?.company.companyName}
              </p>
            </div>

            <div className="rounded-xl bg-blue-50 p-4">
              <p className="text-sm text-blue-700 font-medium flex items-center gap-2">
                <Mail className="w-4 h-4" /> Email
              </p>
              <a
                href={`mailto:${data?.company.supportEmail}`}
                className="text-gray-900 font-semibold mt-1 inline-block hover:underline"
              >
                {data?.company.supportEmail}
              </a>
            </div>

            <div className="rounded-xl bg-blue-50 p-4">
              <p className="text-sm text-blue-700 font-medium flex items-center gap-2">
                <Phone className="w-4 h-4" /> Phone / WhatsApp
              </p>
              <p className="text-gray-900 font-semibold mt-1">
                {data?.company.supportPhone}
              </p>
              <p className="text-sm text-gray-600">
                WhatsApp: {data?.company.whatsappNumber}
              </p>
            </div>

            <div className="rounded-xl bg-blue-50 p-4">
              <p className="text-sm text-blue-700 font-medium flex items-center gap-2">
                <CalendarClock className="w-4 h-4" /> Office Hours
              </p>
              <p className="text-gray-900 font-semibold mt-1">
                {data?.company.officeHours}
              </p>
              <p className="text-sm text-gray-600">{data?.company.address}</p>
            </div>
          </div>
        </section>

        <section className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Counselor Connection
          </h2>

          {data?.hasAssignedCounselor && data.assignedCounselor ? (
            <>
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 sm:p-5">
                <p className="text-sm text-emerald-700 font-medium">
                  Assigned Counselor
                </p>
                <p className="text-lg font-semibold text-gray-900 mt-1 flex items-center gap-2">
                  <UserRound className="w-5 h-5" />
                  {data.assignedCounselor.counselor.fullName}
                </p>
                <p className="text-sm text-gray-700 mt-1">
                  Email: {data.assignedCounselor.counselor.email}
                </p>
                {data.assignedCounselor.counselor.phone && (
                  <p className="text-sm text-gray-700">
                    Phone: {data.assignedCounselor.counselor.phone}
                  </p>
                )}
                <p className="text-xs text-gray-600 mt-2">
                  Assigned on{" "}
                  {new Date(data.assignedCounselor.assignedAt).toLocaleString()}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={`mailto:${data.assignedCounselor.counselor.email}`}
                  className="px-4 py-2.5 rounded-lg bg-[#4F46E5] text-white font-semibold hover:opacity-90"
                >
                  Contact Counselor
                </a>

                {data.assignedCounselor.counselor.phone && (
                  <a
                    href={`tel:${data.assignedCounselor.counselor.phone}`}
                    className="px-4 py-2.5 rounded-lg bg-white border border-gray-300 text-gray-800 font-semibold hover:bg-gray-50"
                  >
                    Call Counselor
                  </a>
                )}
              </div>

              <div className="rounded-xl border border-gray-200 p-4 sm:p-5 space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Request Meeting With Counselor
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Date & Time (optional)
                  </label>
                  <input
                    type="datetime-local"
                    value={preferredDateTime}
                    onChange={(e) => setPreferredDateTime(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Note (optional)
                  </label>
                  <textarea
                    value={meetingNote}
                    onChange={(e) => setMeetingNote(e.target.value)}
                    rows={4}
                    placeholder="Share agenda or preferred mode (online/offline)..."
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                  />
                </div>

                <button
                  onClick={handleRequestMeeting}
                  disabled={requestingMeeting}
                  className="px-4 py-2.5 rounded-lg bg-[#2563EB] text-white font-semibold hover:opacity-90 disabled:opacity-70"
                >
                  {requestingMeeting ? "Sending Request..." : "Request Meeting"}
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 sm:p-5">
                <p className="text-amber-800 font-medium">
                  No counselor is assigned yet.
                </p>
                {data?.hasPendingConnectionRequest && (
                  <p className="text-sm text-amber-700 mt-2">
                    Your connection request is pending admin review.
                    {data.lastConnectionRequestedAt && (
                      <>
                        {" "}
                        Last requested on{" "}
                        {new Date(
                          data.lastConnectionRequestedAt,
                        ).toLocaleString()}
                        .
                      </>
                    )}
                  </p>
                )}
              </div>

              <button
                onClick={handleRequestConnection}
                disabled={
                  requestingConnection || data?.hasPendingConnectionRequest
                }
                className="px-5 py-2.5 rounded-lg bg-[#4F46E5] text-white font-semibold hover:opacity-90 disabled:opacity-70"
              >
                {requestingConnection
                  ? "Sending Request..."
                  : data?.hasPendingConnectionRequest
                    ? "Request Already Pending"
                    : "Request Counselor Connection"}
              </button>
            </>
          )}
        </section>
      </div>
    </DocumentLayout>
  );
}
