import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Banner from "../components/registry/Banner";
import Item from "../components/registry/Item";
import { GetList, GetRegistry } from "../services/Supabase";

export default function Registry(): React.ReactElement {
  const location = useLocation();
  const [registryId, setRegistryId] = useState("");
  const [registry, setRegistry] = useState(null as any);
  const [items, setItems] = useState([] as any[])

  useEffect(() => {
    setRegistryId(new URLSearchParams(location.search).get("id") as string);
  }, [location])

  useEffect(() => {
    if(registryId !== null && registryId !== undefined && registryId !== ""){
      GetRegistry(registryId).then(data => {
        setRegistry(data);
      });
    }
  }, [registryId]);

  useEffect(() => {
    if ((items === null || items.length === 0) && registry !== null){
      GetList(registry.id).then(data => {
        setItems(data ?? [])
      });
    }
  }, [registry, items])

  return (
    <div>
      <Banner title={registry?.name}/>
      <Grid container spacing={3} padding={3}>
        {items.map((item, index) => {
          return (
            <Grid item key={index} xs={12} sm={3}>
              <Item item={item} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
