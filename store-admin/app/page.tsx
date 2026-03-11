import { getProducts } from "@/api/products";
import { Orders } from "@/components/orders";
import { Products } from "@/components/products";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, ShoppingCart } from "lucide-react";

export default async function Home() {
  const products = await getProducts();
  return (
    <>
      <Tabs defaultValue="products" className="space-y-6 mt-6">
        <TabsList>
          <TabsTrigger value="products" className="gap-2">
            <Package className="h-4 w-4" />
            Products
          </TabsTrigger>
          <TabsTrigger value="orders" className="gap-2">
            <ShoppingCart className="h-4 w-4" />
            Orders
          </TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="space-y-6">
          <Products initialProducts={products} />
        </TabsContent>
        <TabsContent value="orders" className="space-y-6">
          <Orders />
        </TabsContent>
      </Tabs>
    </>
  );
}
