import {
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Typography,
} from "@mui/material";
import React from "react";
import { RegistryItem } from "../../services/Supabase";

interface Props {
  item: RegistryItem
}

export default function Item({ item }: Props): React.ReactElement {

  return (
    <Card>
      <CardMedia
        component={"img"}
        height={"140"}
        image={item.imageLink}
        alt={"card image"}
      />
      <CardContent>
        <Typography
          align={"center"}
          variant={"h6"}
          sx={{
            textTransform: "uppercase",
            height: 40,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          {item.title}
          {/* 38 MAX */}
        </Typography>

        <Typography
          sx={{
            mt: 4,
            height: 120,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          {item.description}
          {/* 240 Characters MAX */}
        </Typography>
      </CardContent>
      <Divider />
      <CardActions
        sx={{
          margin: 0,
          padding: 0,
        }}
      >
        <ButtonGroup fullWidth>
          <Button
            variant={"contained"}
            sx={{
              borderRadius: 0,
            }}
            href={item.productLink}
            target={'_blank'}
          >
            Link
          </Button>
          <Button
            variant={"contained"}
            sx={{
              borderRadius: 0,
            }}
          >
            Mark as Purchased
          </Button>
        </ButtonGroup>
      </CardActions>
    </Card>
  );
}
