import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const OverviewCard = ({
  title,
  children,
  logo,
  logoBg,
}) => {
  return (
    <Card className={`min-w-90 min-h-36`}>
      <CardHeader className={`flex items-center -mb-3`}>
        <div
          className={`p-2 rounded-lg flex items-center justify-center ${logoBg}`}
        >
          {logo}
        </div>
        <CardTitle>
          <h1 className={`text-md font-normal text-gray-700`}>{title}</h1>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

export default OverviewCard;
