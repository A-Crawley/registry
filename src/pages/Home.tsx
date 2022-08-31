import { Button, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { AddItem, CreateRegistry } from "../services/Supabase";

export default function Home(): React.ReactElement {
  const [ registryName, setRegistryName ] = useState("");
  const [ registryId, setRegistryId ] = useState("");
  const [ itemName, setItemName ] = useState("");
  const [ itemDescription, setItemDescription ] = useState("");
  const [ productLink, setProductLink ] = useState("");
  const [ imageLink, setImageLink ] = useState("");  
  const [ creating, setCreating ] = useState(false);
  const [ adding, setAdding ] = useState(false);
  const navigate = useNavigate();

  const handleNameInputChange = (event: any) => {
    event.preventDefault();
    setRegistryName(event.target.value);
  };

  const handleRegistryIdChanged = (event: any) => {
    event.preventDefault();
    setRegistryId(event.target.value);
  }

  const handleItemNameChanged = (event: any) => {
    event.preventDefault();
    setItemName(event.target.value);
  }

  const handleItemDescriptionChanged = (event: any) => {
    event.preventDefault();
    setItemDescription(event.target.value);
  }

  const handleProductLinkChanged = (event: any) => {
    event.preventDefault();
    setProductLink(event.target.value);
  }

  const handleImageLinkChanged = (event: any) => {
    event.preventDefault();
    setImageLink(event.target.value);
  }

  const handleCreateRegistry = async (event: any) => {
    event.preventDefault();
    setCreating(true);
    const registry = await CreateRegistry({
      name: registryName,
      id: null,
      createdAt: null,
    });

    if (registry === null) {
      console.error("registry not created");
      setCreating(false);
      return;
    }

    setCreating(false);
    navigate(`/registry?id=${registry?.id}`);
  };

  const handleAddItem = async (event: any) => {
    event.preventDefault();
    setAdding(true);

    await AddItem({
        id: null,
        registryId: registryId,
        title: itemName,
        description: itemDescription,
        productLink: productLink,
        imageLink: imageLink,
        purchased: false,
    });

    setItemName('');
    setItemDescription('');
    setProductLink('');
    setImageLink('');

    setAdding(false);
  }

  return (
    <>
      <p>Home</p>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          width: 250,
          height: 150,
          padding: "16px",
          background: '#88888888'
        }}
      >
        <Typography
            variant={'h6'}
        >
            Create a registry
        </Typography>
        <form onSubmit={handleCreateRegistry}>
          <TextField
            onChange={handleNameInputChange}
            label={"Registry Name"}
            fullWidth
          />
          <Button
            variant={"contained"}
            type={"submit"}
            fullWidth
            disabled={creating}
          >
            Create
          </Button>
        </form>
      </Paper>
      <Paper
        sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            width: 250,
            minHeight: 150,
            padding: "16px",
            background: '#88888888'
          }}
      >
        <Typography
            variant={'h6'}
        >
            Add an item
        </Typography>
        <form onSubmit={handleAddItem}>
            <TextField required fullWidth onChange={handleRegistryIdChanged} label={'Registry Id'}/>
            <TextField required fullWidth onChange={handleItemNameChanged} label={'Name'}/>
            <TextField required fullWidth onChange={handleItemDescriptionChanged} label={'Description'}/>
            <TextField required fullWidth onChange={handleProductLinkChanged} label={'Product Link'}/>
            <TextField required fullWidth onChange={handleImageLinkChanged} label={'Image Link'}/>
            <Button
            variant={"contained"}
            type={"submit"}
            fullWidth
            disabled={adding}
          >
            Add
          </Button>
        </form>

      </Paper>
    </>
  );
}
