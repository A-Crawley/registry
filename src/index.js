import { useState, useEffect, Component } from 'react';
import ReactDOM from 'react-dom';
import { IconButton, Toolbar, AppBar, Button, Paper, ThemeProvider, createTheme, Container, CssBaseline, Card, Box, CardMedia, ButtonGroup, Typography, CardContent } from '@mui/material';
import MediaCard from './card.js'
import Item from './Item.js';
import MenuIcon from '@mui/icons-material/Menu';
import { AttachMoney, ArrowUpward, ArrowDownward } from '@mui/icons-material'
import { supabase } from './supabaseClient.js'
import Auth from './auth.js'
import Image from './WIN_20211026_08_38_06_Pro (2).jpg'

let theme = createTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#afb38c',
        },
        secondary: {
            main: '#b35f1f',
        },
        background: {
            default: '#faf5e9',
        },
        text: {
            primary: '#98360b',
            secondary: '#283618',
        },
    }, 
    typography: {
        fontFamily: [
            'Prata'
        ]
    }
});

async function fetch(){
    let { error, data } = await supabase.from('wedding_reg').select('*').order('amount','desc');
    console.log('Supabase Call: ', {error, data})
    return data?.map(item => new Item(item.id,item.image_url,item.url,item.title,item.description,item.amount,item.purchased)) ?? []
}

let updateSubscription = null;

function List({ items, priceOrder, showPurchased, sortPrice, showPurchasedFunc }){

    console.log('',{ items, priceOrder, showPurchased, sortPrice, showPurchasedFunc })

    if (items.filter(i => !i.purchased).length > 0){
        return (
            <div>
            <ButtonGroup sx={{marginTop: '15px', marginLeft: '20px', minWidth: '345px'}}>
                <Button variant='contained' onClick={() => {showPurchasedFunc()}}>
                    <Typography variant='body' color={theme.palette.text.secondary}>{showPurchased === true ? 'Hide' : 'Show'}&nbsp;Purchased</Typography>
                </Button>
            </ButtonGroup>
            {items?.map((item) => (
                    <Box key={item.id} sx={{margin: '20px', display: showPurchased === true ? '' : item.purchased === true ? 'none' : ''}}>
                        <MediaCard item={item}/>
                    </Box>
            ))}
            </div>
        );
    } else {
        return (
            <Card sx={{ maxWidth: 'lg', height: '100vh', backgroundColor: theme.palette.background.default, borderRadius: 0 }} elevation={0}>
                <CardMedia
                    component="img"
                    height="400px"
                    image={Image}
                    alt="green iguana"
                />
                <CardContent sx={{textAlign: 'center'}}>
                    <Typography gutterBottom variant="h4" component="div">
                    You did what??
                    </Typography>
                    <Typography variant="body" color="text.secondary" fontFamily='sans-serif'>
                    I cannot believe it, you mad lads have gone and purchased everything on our list<br/>
                    Please give yourselves a pat on the back, you've earnt it!!
                    </Typography>
                </CardContent>
            </Card>
        );
    }
}

function App() {
    const [items, setItems] = useState([]);
    const [priceOrder, setPriceOrder] = useState(false);
    const [showPurchased, setShowPurchased] = useState(false);
    const [session, setSession] = useState(null)

    useEffect(() => {

        setSession(supabase.auth.session())

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        });

        fetch().then(result => {
            setItems(result);
        });
    }, []);

    useEffect(() => {

        const func = () => {
            updateSubscription = supabase.from('wedding_reg').on('UPDATE', payload => {
                let temp = items;
                let index = items.findIndex(i => i.id === payload.new.id);
                console.log('UPDATE: ', {index, items})
                temp[index].refresh(payload.new.id,payload.new.image_url,payload.new.url,payload.new.title,payload.new.description,payload.new.amount,payload.new.purchased);
                setItems([]);
                setItems(temp);
            }).on('INSERT', payload => {
                let temp = items;
                let item = payload.new;
                console.log('UPDATE: ', {payload})
                temp.push(new Item(item.id,item.image_url,item.url,item.title,item.description,item.amount,item.purchased));
                setItems([]);
                setItems(temp);
            })
            .on('DELETE', payload => {
                let temp = items;
                let index = items.findIndex(i => i.id === payload.new.id);
                console.log('UPDATE: ', {index, payload})
                temp.splice(index, 1);
                setItems([]);
                setItems(temp);
            })
            .subscribe((s) => console.log('SUBSCRIBE: ', s));
        }

        if (items.length){
            if (updateSubscription){
                supabase.removeSubscription(updateSubscription).then(() => func());
            } else {
                func();
            }
            
        }
    }, [items]);

    const sortPrice = () => {
        if (priceOrder === true)
            items.sort((f,s) => {return f.amount < s.amount ? -1 : 1});
        else
            items.sort((f,s) => {return f.amount > s.amount ? -1 : 1});

        setPriceOrder(!priceOrder);
    };

    const showPurchasedFunc = () => {
        setShowPurchased(!showPurchased)
    };

    return (
            <ThemeProvider theme={theme}>
                <AppBar position="sticky">
                <Toolbar>
                    <Typography color={theme.palette.text.secondary} variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Wedding Registry
                    </Typography>
                    <IconButton variant='text' onClick={() => {sortPrice()}}>
                        <AttachMoney/>
                        {priceOrder === true ? <ArrowUpward/> : <ArrowDownward/>}
                    </IconButton>
                </Toolbar>
                </AppBar>
                <CssBaseline />
                {!session ? <Auth /> :
                <Container>
                    <Paper elevation={0} sx={{height:'100%', backgroundColor: 'rgba(0,0,0,0)' }}>
                        <List items={items} priceOrder={priceOrder} showPurchased={showPurchased} sortPrice={sortPrice} showPurchasedFunc={showPurchasedFunc}/>
                    </Paper>
                </Container>}
            </ThemeProvider>
    );
    
}

ReactDOM.render(<App />, document.querySelector('#app'));