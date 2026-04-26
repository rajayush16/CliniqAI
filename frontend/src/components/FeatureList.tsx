type FeatureListProps = {
  features: string[];
};

export function FeatureList({ features }: FeatureListProps) {
  return (
    <div className="rounded-lg border border-[#d8e5e0] bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold">Starter modules</h2>
      <ul className="mt-4 space-y-3 text-[#60746e]">
        {features.map((feature) => (
          <li key={feature} className="flex gap-3">
            <span className="mt-2 h-2 w-2 flex-none rounded-full bg-[#2d8a70]" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

