import { Grid } from "@mui/material";
import React from "react";
import { useBudget } from "../context/BudgetContext";
import { isDateInCurrentWeek } from "../utils/dateUtils";
import { formatCurrency } from "../utils/formatters";
import StatCard from "./StatCard";

import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

export default function SummaryDashboard() {
  const { monthlyEarnings, monthlyExpenses, extraSpends } = useBudget();

  // --- Calculations ---
  const totalMonthlyExpenses = monthlyExpenses.reduce(
    (total, exp) => total + exp.price,
    0
  );
  const weeklyEarnings = monthlyEarnings / 4;
  const weeklyExpenses = totalMonthlyExpenses / 4;
  const weeklyAllowance = weeklyEarnings - weeklyExpenses;
  const totalExtraSpendsThisWeek = extraSpends
    .filter((spend) => isDateInCurrentWeek(spend.date))
    .reduce((total, spend) => total + spend.price, 0);
  const availableToSpend = weeklyAllowance - totalExtraSpendsThisWeek;

  const availableColor = availableToSpend >= 0 ? "success.main" : "error.main";

  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {/* 
        FIX: Adjusted grid columns for better balance.
        - The main card takes 7 columns on medium screens (md={7}).
        - The secondary cards take the remaining 5 columns (md={5}).
      */}
      <Grid item xs={12} md={7}>
        <StatCard
          title="Available to Spend This Week"
          value={formatCurrency(availableToSpend)}
          icon={<AccountBalanceWalletIcon />}
          color={availableColor}
        />
      </Grid>

      <Grid item xs={12} md={5}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <StatCard
              title="Weekly Earnings"
              value={formatCurrency(weeklyEarnings)}
              icon={<TrendingUpIcon />}
              color="primary.main"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <StatCard
              title="Weekly Recurring"
              value={formatCurrency(weeklyExpenses)}
              icon={<TrendingDownIcon />}
              color="warning.main"
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
