import { useState, useEffect, Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, Paper, ThemeProvider, createTheme, Container, CssBaseline, Card, Box, CardMedia, ButtonGroup, Typography, CardContent } from '@mui/material';
import MediaCard from './card.js'
import Item from './Item.js';
import { AttachMoney, ArrowUpward, ArrowDownward, SettingsInputAntennaTwoTone } from '@mui/icons-material'
import { supabase } from './supabaseClient.js'

let theme = createTheme();

class MainContainer extends Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    render(){
        return(
            <Container maxWidth="lg" sx={{height: '100vh'}}>
                {this.props.children}
            </Container>
        );
    }
}

async function fetch(){
    let { error, data } = await supabase.from('wedding_reg').select('*').order('amount');
    console.log('Supabase Call: ', {error, data})
    return data?.map(item => new Item(item.id,item.image_url,item.url,item.title,item.description,item.amount,item.purchased)) ?? []
}

let updateSubscription = null;

function List({ items, priceOrder, showPurchased, sortPrice, showPurchasedFunc }){

    console.log('',{ items, priceOrder, showPurchased, sortPrice, showPurchasedFunc })

    if (items.filter(i => !i.purchased).length > 0){
        return (
            <div>
            <ButtonGroup sx={{marginTop: '15px', marginLeft: '20px'}}>
                <Button variant='contained' onClick={() => {sortPrice()}}>
                    <AttachMoney/>
                    {priceOrder === true ? <ArrowUpward/> : <ArrowDownward/>}
                </Button>
                <Button variant='contained' onClick={() => {showPurchasedFunc()}}>
                    {showPurchased === true ? 'Hide' : 'Show'}&nbsp;Purchased
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
            <Card sx={{ maxWidth: 'lg', height: '100vh' }}>
                <CardMedia
                    component="img"
                    height="400px"
                    image="/static/images/cards/contemplative-reptile.jpg"
                    alt="green iguana"
                />
                <CardContent sx={{textAlign: 'center'}}>
                    <Typography gutterBottom variant="h5" component="div">
                    You did what??
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    I cannot believe it, you mad lads have gone and purchased everything on our list<br/>
                    Please give your selves a pat on the back, you've earnt it
                    </Typography>
                </CardContent>
            </Card>
        );
    }
}

function App() {
    const [items, setItems] = useState([]);
    const [priceOrder, setPriceOrder] = useState(true);
    const [showPurchased, setShowPurchased] = useState(false);

    useEffect(() => {
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
            }).subscribe((s) => console.log('SUBSCRIBE: ', s));
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
                <MainContainer>
                    <CssBaseline />
                    <Paper elevation={0} sx={{width: '100%', height:'100%' }}>
                        <List items={items} priceOrder={priceOrder} showPurchased={showPurchased} sortPrice={sortPrice} showPurchasedFunc={showPurchasedFunc}/>
                    </Paper>
                </MainContainer>
            </ThemeProvider>
    );
    
}

ReactDOM.render(<App />, document.querySelector('#app'));