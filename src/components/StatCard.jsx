import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";

const StatCard = ({ title, value, icon, color = "text.secondary" }) => {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        {/*
          FIX: Changed the layout to prevent text/icon overlap.
          - We use 'gap' for consistent spacing.
          - The Typography component now has 'flexGrow: 1' to fill available space without pushing the icon.
        */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ flexGrow: 1 }}
          >
            {title}
          </Typography>
          <Avatar sx={{ bgcolor: color, width: 40, height: 40 }}>{icon}</Avatar>
        </Box>
        <Typography
          variant="h4"
          component="p"
          sx={{ fontWeight: "bold", mt: 2 }}
        >
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default StatCard;
