import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { isMobile } from 'react-device-detect';
import { Paper } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { supabase } from './supabaseClient.js'

let formatter = Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD'
})

export default class MediaCard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            item: props.item,
            width: this.getWidth(),
            height: this.getHeight()
        }
    }

    getWidth() {return isMobile ? 345 : '2000px'}

    getHeight() {return isMobile ? "140" : "300"} 
    
    buy(){
        supabase.from('wedding_reg')
        .update({
            purchased: true, 
            updated_date: (new Date()).toISOString().substring(0,10), 
            updated_time: (new Date()).toISOString().substring(11)
        }, {returning: 'minimal'})
        .eq('id', this.state.item.id)
        .then((d) => {
            this.setState();
            console.log(d)
        });
    }

    render(){
        return (
            <div style={{position:'relative'}}>
                <CheckCircleIcon sx={{ zIndex:3, position: 'absolute', fontSize: '3em', color: 'lightgreen', display: this.state.item.purchased === true ? '' : 'none'}}/>
                <Paper sx={{zIndex: 2, 
                    backgroundColor: 'rgba(0,0,0,0.5)', 
                    width: '100%', height: '100%', 
                    position: 'absolute', 
                    display: this.state.item.purchased === true ? '' : 'none'}} />
                <Card sx={{maxWidth: this.state.width }} >
                    <CardMedia
                        component="img"
                        height={this.state.height}
                        image={this.state.item.imageLink}
                        alt={this.state.item.title}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        {this.state.item.title}
                        </Typography>
                        <Typography varient="h6">
                        {formatter.format(this.state.item.amount ?? 0)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" fontFamily='sans-serif'>
                        {this.state.item.description}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button variant='contained' color='secondary' size="small" target='_self' href={this.state.item.link} sx={{marginRight: '10px'}}>Link</Button>
                        <Button variant='contained' color='secondary' size="small" onClick={() => this.buy()}>Mark As Bought</Button>
                    </CardActions>
                </Card>
            </div>
          );
    }
}