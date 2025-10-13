// components/progress-tracker/ProgressHeader.tsx
"use client";

import React from "react";
import Link from "next/link";

type BreadcrumbItem = { label: string; href?: string };

export default function ProgressHeader({
  title,
  breadcrumb,
  description,
}: {
  title: string;
  breadcrumb?: BreadcrumbItem[];
  description?: string;
}) {
  return (
    <header>
      <div className="text-sm text-gray-500">
        {breadcrumb?.map((b, i) => (
          <span key={i} className="inline-flex items-center gap-2">
            {b.href ? <Link href={b.href} className="hover:underline">{b.label}</Link> : <span>{b.label}</span>}
            {i < (breadcrumb?.length || 0) - 1 && <span className="mx-1">›</span>}
          </span>
        ))}
      </div>

      <h1 className="mt-2 text-2xl md:text-3xl font-semibold text-gray-900">{title}</h1>
      {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
    </header>
  );
}
