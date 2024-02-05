import { Card, Spinner, Typography } from "@material-tailwind/react";
import { useGetSellHistoryQuery } from "../../../redux/features/sales/salesApi";
import { useState } from "react";
import {
  parseISO,
  isSameDay,
  isSameWeek,
  isSameMonth,
  isSameYear,
} from "date-fns";

const TABLE_HEAD = [
  "Product Id",
  "Product Name",
  "Quantity",
  "BuyerName",
  "Date",
];
const SalesHistory = () => {
  const [selectedHistory, setSelectedHistory] = useState("all");
  const { data, error, isLoading, refetch } = useGetSellHistoryQuery();
  if (isLoading) {
    return <Spinner className="h-16 mx-auto w-16 text-gray-900/50" />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const filteredData = data.data.filter((item) => {
    const itemDate = parseISO(item.date);
    const currentDate = new Date();

    switch (selectedHistory) {
      case "all":
        return true
      case "daily":
        return isSameDay(itemDate, currentDate);
      case "weekly":
        return isSameWeek(itemDate, currentDate);
      case "monthly":
        return isSameMonth(itemDate, currentDate);
      case "yearly":
        return isSameYear(itemDate, currentDate);
      default:
        return false;
    }
  });

  return (
    <div>
      <div className="flex justify-center mt-5">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Filter by date</span>
            <span className="label-text-alt">Sales History</span>
          </div>

          <select
            onChange={(e) => setSelectedHistory(e.target.value)}
            className="select select-bordered w-full max-w-xs"
          >
            <option value="all">All</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </label>
      </div>
      <Card className="h-full w-8/12 mx-auto mt-5 overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((history, index) => (
              <tr key={index} className="even:bg-blue-gray-50/50">
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {history.productId}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {history.productName}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {history.quantity}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    as="a"
                    href="#"
                    variant="small"
                    color="blue-gray"
                    className="font-medium"
                  >
                    {history.buyerName}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    as="a"
                    href="#"
                    variant="small"
                    color="blue-gray"
                    className="font-medium"
                  >
                    {history.date}
                  </Typography>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default SalesHistory;
