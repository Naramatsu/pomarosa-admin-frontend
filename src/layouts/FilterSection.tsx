export interface FilterSectionProps {
  title: string;
  isGrid?: boolean;
  children: React.ReactNode;
}

export const FilterSection: React.FC<FilterSectionProps> = ({
  title,
  isGrid = false,
  children,
}) => (
  <div className="filter-section">
    <div className="filter-section-header">
      <h3 className="filter-section-title">{title}</h3>
    </div>
    <div className={`filter-section-content ${isGrid ? "prices-grid" : ""}`}>
      {children}
    </div>
  </div>
);
