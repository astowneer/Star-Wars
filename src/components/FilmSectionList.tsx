import { Fragment } from "react/jsx-runtime";

type FilmSectionItem = {
  label: string;
  items: string[];
};

interface FilmSectionListProps {
  sections: FilmSectionItem[];
}

export const FilmSectionList = ({ sections }: FilmSectionListProps) => {
  return (
    <div className="mt-4">
      {sections.map((section) => (
        <Fragment key={section.label}>
          <h4 className="text-[#ddd] font-medium mb-1 capitalize">
            {section.label}
          </h4>
          <ul className="list-disc list-inside text-[#aaa]">
            {section.items.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </Fragment>
      ))}
    </div>
  );
};
