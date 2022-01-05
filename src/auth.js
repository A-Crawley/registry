import { supabase } from './supabaseClient'
import { Button, ThemeProvider, createTheme, Container, CssBaseline, Box, Typography, TextField, Avatar } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const theme = createTheme();

export default function Auth() {
  const email = "crawleyandrew3@gmail.com"

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    
    let password = data.get('password');
    console.log('INFO: ', {password})
    const { error } = await supabase.auth.signIn({ email, password })
    if (error) alert(error.error_description || error.message)
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}