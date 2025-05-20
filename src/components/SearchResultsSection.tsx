import { Link } from "react-router";

interface Item {
  id: string;
  name?: string;
  title?: string;
}

interface SearchResultSectionProps {
  title: string;
  items: Item[];
  basePath: string;
}

export const SearchResultSection = ({
  title,
  items,
  basePath,
}: SearchResultSectionProps) => {
  if (items.length === 0) return null;

  return (
    <div className="mt-6">
      <h3 className="text-xl font-medium text-[#ddd] mb-2">{title}</h3>
      <ul className="list-disc list-inside space-y-1">
        {items.map((item) => (
          <li key={item.id}>
            <Link
              to={`/${basePath}/${item.id}`}
              className="text-[#9e4f60] underline hover:text-[#b76879] transition-colors duration-150"
            >
              {item.name || item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
