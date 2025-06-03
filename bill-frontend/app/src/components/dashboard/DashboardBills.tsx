import { AppDispatch, RootState } from "@/redux/store";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getRecenetBills } from "@/redux/dashboard/dashboardThunk";
import { RecentBillsData } from "@/types/statType";
import FormattedDate from "../FormattedDate";

const DashboardBills = () => {
  // Sample data for the table
  const {recentBillsData} = useSelector((state: RootState) => state.dashboard);


  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getRecenetBills())
  }, [dispatch])
  
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="font-semibold text-2xl">Recent Bills</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="bg-gray-100 p-4">Bill No</TableHead>
                <TableHead className="bg-gray-100 p-4">Name</TableHead>
                <TableHead className="bg-gray-100 p-4">Billing Date</TableHead>
                <TableHead className="bg-gray-100 p-4">Lot No</TableHead>
                <TableHead className="bg-gray-100 p-4">Recieved Date</TableHead>
                <TableHead className="bg-gray-100 p-4">Contact No</TableHead>
                <TableHead className="bg-gray-100 p-4">Pan Id</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                recentBillsData?.map((item: RecentBillsData) => (
              <TableRow key={item.billNo} className="hover:bg-gray-50 cursor-pointer transition-all duration-200 ease-in-out">
                <TableCell className="p-4">{item.billNo}</TableCell>
                <TableCell className="p-4">{item.name}</TableCell>
                <TableCell className="p-4"><FormattedDate date={item.billingDate} /></TableCell>
                <TableCell className="p-4">{item.lotNo}</TableCell>
                <TableCell className="p-4"><FormattedDate date={item.receivedDate} /></TableCell>
                <TableCell className="p-4">{item.contactNo}</TableCell>
                <TableCell className="p-4">{item.panId}</TableCell>
              </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
};

export default DashboardBills;
