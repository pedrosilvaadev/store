import { Package } from "lucide-react";

export function Header() {
  return (
    <header className="bg-white border-b ">
      <div className="py-6">
        <div className="flex items-center gap-3">
          <Package className="h-8 w-8 text-blue-600" />

          <div>
            <h1 className="text-3xl font-bold">Store Admin Dashboard</h1>
            <p className="text-gray-600">
              Manage your product catalogue and orders
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
