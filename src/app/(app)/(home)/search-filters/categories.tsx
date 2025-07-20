import { CategoryDropdown } from "./category-dropdown"

interface Props {
  data: any;
}

type Category = {
  id: string;
  name: string;
  slug: string;
  color?: string;
  parent?: string;
  subcategories?: Category[];
  // Add other fields as needed
};

export const Categories=({data}: Props)=> {
  return (
    <div className="relative w-full">
      <div className="flex flex-nowrap items-center">
        {data.map((category: Category)=> (
          <div key={category.id}>
            <CategoryDropdown 
              category={category}
              isActive={false}
              isNavigationHovered={false}
            />
          </div>
        ))}
      </div>
    </div>
  )
}