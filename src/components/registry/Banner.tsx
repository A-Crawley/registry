import { Typography, styled } from "@mui/material";
import React, { CSSProperties } from "react";

const CustomTypography = styled(Typography)(({ theme }) => ({
    [theme.breakpoints.down("md")]: {
      fontSize: "xxx-Large",
    },
}));

interface Props{
  title: string
}

export default function Banner({ title }: Props): React.ReactElement {
    const bannerStyle = {
      height: 250,
      background: "#888888",
      marginBottom: 16,
    } as CSSProperties;
  
    return (
      <div style={bannerStyle}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            height: "100%",
          }}
        >
          <CustomTypography
            variant={"h1"}
            color={"inherit"}
            align={"center"}
            sx={{
              my: "auto",
              overflowWrap: "normal",
              textTransform: "uppercase",
            }}
          >
            { title }
            {/* (50 max chars) */}
          </CustomTypography>
        </div>
      </div>
    );
  }