const PageLayout = ({ title, subtitle, children }) => {
  return (
    <div>
      <div className="flex flex-col gap-5 m-8 rounded-2xl h-screen bg-transparent">
        <div className="mb-1">
          <h1 className="font-medium text-3xl mb-1">{title}</h1>
          <p className="text-gray-500">{subtitle}</p>
        </div>
        {children}
      </div>
    </div>
  );
};

export default PageLayout;