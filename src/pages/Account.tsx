import { Button, Divider, Paper, TextField, Typography } from "@mui/material";
import React from "react";
import { GetUserState } from "../services/Supabase";

export default function Account(): React.ReactElement {
  console.log(GetUserState()?.id);

  if (GetUserState()?.id === null || GetUserState()?.id === undefined) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <Paper
          sx={{
            mx: "auto",
            width: "400px",
            height: "500px",
            background: "white",
            padding: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              height: "75px",
            }}
          >
            <Typography variant={"h4"} align="center">
              Registry Login
            </Typography>
          </div>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <TextField required fullWidth label={"Email"} type={"email"} />
            <TextField
              required
              sx={{ mt: 2 }}
              fullWidth
              label={"Password"}
              type={"password"}
            />
            <Divider sx={{ mt: 2 }} />
            <Button sx={{ mt: 2 }} variant={"contained"} fullWidth>
              Login
            </Button>
            <Button sx={{ mt: 2 }} variant={"contained"} fullWidth>
              Register
            </Button>
            <Button sx={{ mt: 2 }} variant={"contained"} fullWidth>
              Forgot Password
            </Button>
            <div style={{ flexGrow: 1 }}></div>
          </form>
        </Paper>
      </div>
    );
  }

  return <></>;
}
