export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-500">404 - Page introuvable</h1>
      <p className="mt-4 text-lg text-gray-700">
        Cette page n'existe pas dans la section admin.
      </p>
      <a
        href="/admin"
        className="mt-6 text-blue-500 hover:underline"
      >
        Retour au dashboard
      </a>
    </div>
  );
}
