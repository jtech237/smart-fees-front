"use client";

import { get } from "@/lib/api-utils";
import { FullClasses } from "@/types/data";
import Link from "next/link";
import { useEffect, useState } from "react";
import moment from "moment";
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
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200 dark:border-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="border border-gray-200 px-4 py-2 text-left dark:border-gray-700">
                #
              </th>
              <th className="border border-gray-200 px-4 py-2 text-left dark:border-gray-700">
                Nom de la classe
              </th>
              <th className="border border-gray-200 px-4 py-2 text-left dark:border-gray-700">
                Classe parente
              </th>
              <th className="border border-gray-200 px-4 py-2 text-left dark:border-gray-700">
                Dernière mise à jour
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="text-center p-4">
                  Chargement des données...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={4} className="text-center p-4 text-red-500">
                  {error}
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center p-4">
                  Pas de classe disponible.
                </td>
              </tr>
            ) : (
              data.map((classe) => (
                <tr key={`classe-${classe.id}`}>
                  <td className="border border-gray-200 px-4 py-2 text-left dark:border-gray-700">
                    {classe.id}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-left dark:border-gray-700">
                    {classe.name}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-left dark:border-gray-700">
                    {classe.parent ? classe.parent.name : "-/-"}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-left dark:border-gray-700">
                    {moment(classe.updated_at).fromNow()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClassesList;
