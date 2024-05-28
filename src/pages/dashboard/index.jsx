import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button, IconButton, Typography, useTheme, useMediaQuery } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import ProfitExpenseChart from "../../components/RevenueChart";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check if mobile screen

  const [invoiceData, setInvoiceData] = useState([]);
  const [studentsCount, setStudentsCount] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalProfits, setTotalProfits] = useState(0);

  const backendURL = process.env.REACT_APP_BACKEND_URL;

  const fetchDashboardData = async () => {
    try {
      const studentsResponse = await axios.get(`${backendURL}/students/count`);
      const revenueResponse = await axios.get(`${backendURL}/invoices/revenue`);
      const profitsResponse = await axios.get(`${backendURL}/invoices/profit`);
      const invoicesResponse = await axios.get(`${backendURL}/invoices`);

      console.log(revenueResponse.data);

      setStudentsCount(studentsResponse.data.count);
      setTotalRevenue(revenueResponse.data.totalRevenue);
      setTotalProfits(profitsResponse.data.totalProfit);
      setInvoiceData(invoicesResponse.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const processChartData = () => {
    const months = [
      "Jan", "Feb", "March", "April", "May", "June",
      "July", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    let monthData = months.map(month => ({
      month,
      profit: 0,
      expense: 0
    }));

    invoiceData.forEach(invoice => {
      const date = new Date(invoice.date);
      const monthIndex = date.getMonth();
      const type = invoice.type.toLowerCase();
      const amount = invoice.amount;

      if (type === "profit") {
        monthData[monthIndex].profit += amount;
      } else if (type === "expense") {
        monthData[monthIndex].expense += amount;
      }
    });

    return monthData;
  };

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center" flexDirection={isMobile ? "column" : "row"}>
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        {/* <Box mt={isMobile ? 2 : 0}>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box> */}
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns={isMobile ? "1fr" : "repeat(12, 1fr)"}
        gridAutoRows={isMobile ? "auto" : "140px"}
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn={isMobile ? "span 12" : "span 4"}
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={studentsCount}
            subtitle="All Students"
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "40px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn={isMobile ? "span 12" : "span 4"}
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={totalRevenue}
            subtitle="Revenue Generated"
            progress="0.75"
            // increase="+14%"
            icon={
              <CurrencyRupeeIcon
                sx={{ color: colors.greenAccent[600], fontSize: "40px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn={isMobile ? "span 12" : "span 4"}
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={totalProfits}
            subtitle="Profits Generated"
            progress="0.50"
            increase="+21%"
            icon={
              <AccountBalanceWalletOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "40px" }}
              />
            }
          />
        </Box>
        {/* ROW 2 */}
        <Box
          gridColumn={isMobile ? "span 12" : "span 8"}
          gridRow={isMobile ? "auto" : "span 2"}
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Revenue Generated
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                ₹{totalRevenue}
              </Typography>
            </Box>
            <Box>
              {/* <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton> */}
            </Box>
          </Box>
          <Box height="75%" width="100%" m="0">  {/* Adjust the height here */}
            <ProfitExpenseChart data={processChartData()} />  {/* Adjust the height prop here */}
          </Box>
        </Box>
        <Box
          gridColumn={isMobile ? "span 12" : "span 4"}
          gridRow={isMobile ? "auto" : "span 2"}
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Transactions
            </Typography>
          </Box>
          {mockTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.txId}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.user}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.date}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                ${transaction.cost}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
