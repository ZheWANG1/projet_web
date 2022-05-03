import React, { Component } from 'react';
import '../App.css';
import NavigationPannel from './NavigationPannel';
import Message from './Message';
import axios from 'axios';

const api = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:4000/api',
    timeout: 1000,
    headers: { 'Content-Type': 'application/json' }
})

const apimessages = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:4000/apimessages',
    timeout: 1000,
    headers: { 'Content-Type': 'application/json' }
})

class Homepage extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this)
        this.state = {
            messages: []
        }

        // apimessages.get('/allmessage').then(res => {
        //     let tmp = []
        //     for (var i = 0; i < res.data.length; i++) {
        //         tmp.push(<Message message={res.data.allmess[i].message} user={res.data.allmess[i].login} id={res.data.allmess[i]._id}></Message>);
        //     }
        //     this.state.messages = tmp;

        // });
    }

    onSubmit(event) {
        apimessages.post('/message', {
            message: document.getElementsByName('newtext')[0].value
        }).then(res => {
            //console.log(res.data);
            window.location.reload();
        }).catch(err => {
            console.log(err);
        })
    }


    componentDidMount() {
        apimessages.get('/allmessage').then(res => {
            let tmp = []
            for (var i = 0; i < res.data.allmess.length; i++) {
                tmp.push(<Message message={res.data.allmess[i].message} user={res.data.allmess[i].login} date={res.data.allmess[i].date} id={res.data.allmess[i]._id} openProfil={this.props.openProfil}></Message>);
            }
            console.log("tous message ", res.data.allmess[0].message);
            this.setState({ messages: tmp })
        })
    }

    
    render() {
        return (
            <div>
                <NavigationPannel userinfo = {this.props.userinfo} researched = {this.props.researched} setResearch = {this.props.setResearch} getUserInfo ={this.props.getUserInfo} openProfil={this.props.openProfil} setLogin={this.props.setLogin} setSignup={this.props.setSignup} setLogout={this.props.setLogout} connected={this.props.connected}></NavigationPannel>
                <div>
                    <div id="zoneleft">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras laoreet mattis neque, vitae porta ligula semper ac. Suspendisse potenti. In vitae congue felis, venenatis eleifend ipsum. Nam at sapien sed quam semper tempor a et orci. In ullamcorper,
                            enim ac bibendum venenatis, massa diam aliquam eros, vitae gravida odio odio sit amet mi. Maecenas enim sapien, dictum rutrum sem eget, iaculis iaculis elit. Nam mi sem, convallis at dictum in, auctor mollis quam. In sodales sapien ut
                            eros congue vehicula. In elementum, purus ut dapibus venenatis, tellus ante vestibulum nulla, quis cursus urna nisi non ligula. In porttitor sed mauris et feugiat. Maecenas non aliquet arcu, non congue ante. Quisque pellentesque faucibus
                            enim, id luctus lectus consequat eu.</p>
                    </div>
                    <div id="zoneright">
                        <div id="zoneNewC" >
                            <div>
                                <textarea rows="5" cols="80" type="text" name='newtext'></textarea>
                            </div>

                            <div id="newC">
                                <button type="button" classname="btn" onClick={this.onSubmit}>Envoyer</button>
                            </div>
                        </div>
                        <div id="zoneC">
                            <div id="zonemessage">{this.state.messages}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Homepage;