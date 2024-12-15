"use client";

import { get } from "@/lib/api-utils";
import { FullClasses } from "@/types/data";
import Link from "next/link";
import { useEffect, useState } from "react";
import moment from "moment";
import DataTable from "@/components/data-table";
import { columns } from "@/components/data-table/classe-list/columns";
moment.locale("fr");

const ClassesList = () => {
  const [data, setData] = useState<FullClasses[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await get<FullClasses[]>("/classes");
        setData(response.data);
      } catch (error: any) {
        if (Object.hasOwn(error, "status")) {
          setError(`Erreur ${error.status} : ${error.message}`);
        } else {
          setError("Erreur inattendue");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          Liste des classes
        </h2>
        <nav>
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/admin" className="font-medium">
                Dashboard /
              </Link>
            </li>
            <li className="font-medium text-primary">Liste des classes</li>
          </ol>
        </nav>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        error={error}
        data={data}
        isLoading={loading}
        enableFilter
        enablePagination
        enableSorting
      />
    </div>
  );
};

export default ClassesList;
