import ClassesList from "@/components/pages/admin/ClassesList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gestion des classes"
}

export default function ClassesPage(){
  return (
    <>
      <ClassesList/>
    </>
  )
}