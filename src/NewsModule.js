import React, { Component } from 'react';
import "./NewsModule.css";

class NewsModule extends Component {
	
	constructor(props){
		super( props );
		this.state = {
			data: {
				title : "",
				link : "",
				pubDate : "",
				description : "",
				url : "",
			},
			backgroundStyle: ""
		}
	}
	
	fetchData(){
		const context = this;
		fetch( "http://localhost:3000/api/v1/news", {method: 'get'} )
			.then( function ( response ){
				return response.json();
            } )
            .then( function ( json ){
                const rand = Math.floor(Math.random() * Math.floor(json.data.length - 1));
                return JSON.stringify(json.data[rand]);
            })
            .then( function( data ){
                return data.replace('media:content', 'mediaContent');
            })
			.then( function ( data ){
                const json = JSON.parse(data);
				let obj = {
                    title : json.title._text,
                    link : json.link._text,
                    pubDate : json.pubDate._text,
                    description : json.description._text,
                    url : json.mediaContent._attributes.url,
                } 
				context.setState( {data: obj, backgroundStyle: { backgroundImage : "url("+obj.url+")"}} );
			} );
	}
	
	componentDidMount(){
		this.fetchData();
		this.timerID = setInterval(
			() => this.fetchData(),
			60000
		);
	}
	
	componentWillUnmount(){
		clearInterval(this.timerID);
	}
	
	render(){
        const {title, url, description, pubDate} = this.state.data;
        const backgroundStyle = this.state.backgroundStyle;
		
		return (
			<div className="App-widget" backgroundimage={backgroundStyle}>
				<div>{title}</div>
				<div>{description}</div>
				<div>{pubDate}</div>
				<div><img src={url} /></div>
			</div>
		);
	}
}

export default NewsModule;