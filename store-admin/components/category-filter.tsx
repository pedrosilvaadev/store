import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      <span className="text-sm font-medium text-gray-700">
        Filter by category:
      </span>
      <Button
        variant={selectedCategory === null ? "default" : "outline"}
        size="sm"
        onClick={() => onCategoryChange(null)}
      >
        All Products
        {selectedCategory === null && (
          <Badge className="ml-2" variant="secondary">
            Active
          </Badge>
        )}
      </Button>
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          size="sm"
          onClick={() => onCategoryChange(category)}
          className="capitalize"
        >
          {category}
          {selectedCategory === category && (
            <Badge className="ml-2" variant="secondary">
              Active
            </Badge>
          )}
        </Button>
      ))}
    </div>
  );
}
