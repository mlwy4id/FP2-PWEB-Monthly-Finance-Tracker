const ProgressBar = ({ dividend, divisor }) => {
  let percentage = Math.ceil((dividend / divisor) * 100);
  percentage = percentage > 100 ? 100 : percentage;

  return (
    <div className="h-3 bg-gray-200 rounded-full">
      <div
        className={`h-3 rounded-full ${
          percentage > 90 ? `bg-red-500` : `bg-blue-600`
        }`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

export default ProgressBar;
