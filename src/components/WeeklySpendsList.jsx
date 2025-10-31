import DeleteIcon from "@mui/icons-material/Delete";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import {
  Avatar,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useBudget } from "../context/BudgetContext";
import { isDateInCurrentWeek } from "../utils/dateUtils";
import { formatCurrency } from "../utils/formatters";

export default function WeeklySpendsList() {
  const { extraSpends, deleteExtraSpend } = useBudget();
  const spendsThisWeek = extraSpends
    .filter((spend) => isDateInCurrentWeek(spend.date))
    .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by most recent

  return (
    <Paper sx={{ p: { xs: 2, md: 3 } }}>
      <Typography variant="h5" gutterBottom>
        This Week's Spending Log
      </Typography>
      <List>
        {spendsThisWeek.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography variant="h6" color="text.secondary">
              No spending recorded yet this week.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Click the '+' button to add your first expense!
            </Typography>
          </Box>
        ) : (
          spendsThisWeek.map((spend) => (
            <ListItem key={spend.id} divider sx={{ py: 1.5 }}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "primary.light" }}>
                  <ReceiptLongIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={spend.item}
                secondary={new Date(spend.date).toLocaleDateString()}
              />
              <ListItemSecondaryAction>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    {formatCurrency(spend.price)}
                  </Typography>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => deleteExtraSpend(spend.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              </ListItemSecondaryAction>
            </ListItem>
          ))
        )}
      </List>
    </Paper>
  );
}
