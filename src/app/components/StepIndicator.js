export default function StepIndicator({ step }) {
  const steps = [1, 2, 3, 4];

  return (
    <div className="flex justify-center gap-6 mb-10">
      {steps.map((s) => (
        <div
          key={s}
          className={`
            h-4 w-4 rounded-full transition-all
            ${s <= step ? "bg-pink-500 scale-110" : "bg-gray-300"}
          `}
        ></div>
      ))}
    </div>
  );
}
