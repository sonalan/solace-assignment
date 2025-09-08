"use client";

import { useEffect, useState } from "react";
import Advocate from "../types/advocate"
import AdvocateList from "./components/advocate-list";

export default function Home() {
  
  return (
    <main className="m-6">
      <h1 className="mb-4">Solace Advocates</h1>
      <AdvocateList />
    </main>
  );
}
