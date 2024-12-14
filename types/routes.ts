import React from "react";

export type SubRouteItem = {
  label: string;
  route: string;
}

export type RouteItem = {
  label: string;
  route?: string;
  icon: React.ReactNode;
  children?: {
    label: string;
    route: string;
  }[];
}

export type Routes = Record<string, RouteItem[]>;
