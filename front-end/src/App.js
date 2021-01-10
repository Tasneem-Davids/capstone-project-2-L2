import React, {Component} from 'react';/*These are all the inports I need for the code.*/
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Table from 'react-bootstrap/Table';
import linkedin from './image/linkedin.png';
import play from './image/play.png';
import github from './image/github.png';
import thumb from './image/thumb.png';
import itunes from './image/itunes.jpg';
import apple from './image/apple.jpg';
import loading from './image/loading.gif';
import del from './image/delete.png';
import axios from 'axios';

/*This code is to design the ui of my full stack app. Here I fetch data from the server and display it on the ui.*/
class App extends Component{
    constructor(props){
        super(props)
        this.state={/*Here I set the states I need throughout this code*/
            name: '',
            results: [],
            error: false,
            isLoaded: false,
            type: '',
            favourites: [],
            msg: ''
        }

        /*Here I bind the functions that I used in the code for handling the input from the user and fetching the data.*/
        this.onHandleChange=this.onHandleChange.bind(this);
        this.onSearch=this.onSearch.bind(this);
        this.onMusicSelect=this.onMusicSelect.bind(this);
        this.onMovieSelect=this.onMovieSelect.bind(this);
        this.onAudioBookSelect=this.onAudioBookSelect.bind(this);
        this.onPodcastSelect=this.onPodcastSelect.bind(this);
        this.onTvShowSelect=this.onTvShowSelect.bind(this);
    }

    onHandleChange=(e)=>{/*This is to set the state of name to the user input*/
        this.setState({name: e.target.value});
    }

    onMusicSelect=()=>{/*The code that follows allows the user to choose which media they want thats related to the search by setting the state to that specific media type when the user clicks the option in the dropdown menu.*/
        this.setState({
            type: 'music'
        })
    }

    onMovieSelect=()=>{
        this.setState({
            type: 'movie'
        })
    }

    onAudioBookSelect=()=>{
        this.setState({
            type: 'book'
        })
    }

    onPodcastSelect=()=>{
        this.setState({
            type: 'podcast'
        })
    }

    onTvShowSelect=()=>{
        this.setState({
            type: 'tv show'
        })
    }

    /*Here I define name to the name and type in state and use it as the parameter for the fetch. I Then set the state of
    results to the data that is returned form the promise. I set the state of error as well.*/
    onSearch=()=>{
        const name= `${this.state.name} ${this.state.type}`;

        axios.get("/get/" + name)
        .then((res)=>{
            this.setState({
                results: res.data, 
                isLoaded: true,/* I set the state of loaded to use for the waiting screen*/
                msg: `Search results for ${this.state.name} (${this.state.type})`/*The state msg is used to show what the user search for*/
            })
        }).then((err)=>{
            this.setState({
                error: true
            })
        })
    }

    render(){
        const {results, isLoaded, favourites, msg} = this.state;/*Here I define the state of results and isLoaded*/

       const onHandleClick=(result)=>{/*This code is for saving to favourites. Here I am setting the state of the favourites array to the result object that I mapped through in the code below to display the songs, movies etc*/
        this.setState({favourites: [...this.state.favourites, result]})/*Adding the ... before you specify the state in the square brackets, will keep what already in state and add the new result to it instead of replacing the result.*/
       }

       const onHandleDelete=(favourite)=>{/*This is for deleting a favourite of your choice*/
        for(var i = 0; i < favourites.length; i++){/*Here I loop through favourites in order to find the trackIds of each index in favourites and I specify that if any of the trackIds in the favourites array matches the trackId of the favourite you want to delete, it will remove that favourite.*/
            if(favourites[i].trackId === favourite.trackId){
                favourites.splice(i, 1)/*I do this by using the splice method on favourites if the if statement is true*/
            }
            this.setState({/*I then set the state of favourites to the newly updated favourites array that has been spliced.*/
                favourites: favourites
            })
        }
       }

       const displayFavs=favourites.map(function(favourite){/*Here I map through the favourites array so I can specify what in the array I would like to display and how.*/
           return <tr>
                <td>
                <img className="FavImg" src={favourite.artworkUrl100}/>
                <h5 className="FavSong">{favourite.artistName} - {favourite.trackName || favourite.trackCensoredName} <img src={del} onClick={onHandleDelete.bind(this, favourite)} className="Delete"/></h5>{/*This image is where I call the onHandleDelete function*/}
                </td>
                </tr>
       })

        /*In the code that follows, I map through the results array and return a card, where I then assign some 
        information from the data i fetched, to specififc parts of the card to display them. For the image of the card I
        used the "artworkUrl100" key from the data which has a value of the url to the image of the song etc. The rest of 
        the code I used in that same way, by using the keys. I have created a unique output based on the type of media 
        requested by the user, by using if else statements and using the result.kind key as an argument because it
        specifies the type of media that the result is.*/
        const displayResults=results.map(function(result){

            if(result.kind === "song"){
                return <td>
                {/*I tried really hard to style using App.css but the styling did not show up on the web page no 
                matter what I did. I had no choice but to use inline styling but I know it is an incorrect way of 
                styling your webpage. I have had to use inline styling for most but not all, parts of the following 
                code*/}
                <Card bg={"white"} style={{width: "350px",height: "250px",marginLeft: "20px",marginTop: "100px",border: "1px solid white",marginBottom: "100px",textAlign: "left"}}>
                    <Card.Img variant="top" src={result.artworkUrl100} style={{height: "200px",width: "200px",marginLeft: "45px",marginBottom: "30px"}}/>
                    <Card.Body>
                        <Card.Title>{result.artistName}</Card.Title>
                        <Card.Text>
                            <b>media:</b> {result.kind}
                            <br/>
                            <b>song:</b> {result.trackName || result.trackCensoredName}
                            <br/>
                            <b>album:</b> {result.collectionName || result.collectionCensoredName}
                            <br/>
                            <b>genre:</b> {result.primaryGenreName}
                            <br/>
                            <a href={result.previewUrl}><img className="Play" src={play}/><Button style={{marginTop: "15px",backgroundColor: "lightBlue",border: "lightBlue",color: "rgb(32, 137, 241)"}}>Play Preview</Button></a>
                        </Card.Text>
                        <img className="Thumb" src={thumb}/><Button onClick={onHandleClick.bind(this, result)} style={{backgroundColor: "rgb(255, 156, 222)",border: "rgb(255, 156, 222)",color: "rgb(216, 72, 168)"}}>Add To Favourites</Button>
                    </Card.Body>{/*The button above is where I add to favourites and I add these button to the rest of the media types as well as you can see below*/}
                </Card>
            </td>
            }else if(result.kind === "feature-movie"){
                return <td>
                <Card bg={"white"} style={{width: "350px",height: "250px",marginLeft: "20px",marginTop: "100px",border: "1px solid white",marginBottom: "100px",textAlign: "left"}}>
                    <Card.Img variant="top" src={result.artworkUrl100} style={{height: "200px",width: "200px",marginLeft: "45px",marginBottom: "30px"}}/>
                    <Card.Body>
                        <Card.Title>{result.artistName}</Card.Title>
                        <Card.Text>
                            <b>media:</b> {result.kind}
                            <br/>
                            <b>movie:</b> {result.trackName || result.trackCensoredName}
                            <br/>
                            <b>collection:</b> {result.collectionName || result.collectionCensoredName}
                            <br/>
                            <b>genre:</b> {result.primaryGenreName}
                            <br/>
                            <b>description:</b> {result.shortDescription}...
                            <br/>
                            <a href={result.previewUrl}><img className="Play" src={play}/><Button style={{marginTop: "15px",backgroundColor: "lightBlue",border: "lightBlue",color: "rgb(32, 137, 241)"}}>Play Preview</Button></a>
                        </Card.Text>
                        <img className="Thumb" src={thumb}/><Button onClick={onHandleClick.bind(this, result)} style={{backgroundColor: "rgb(255, 156, 222)",border: "rgb(255, 156, 222)",color: "rgb(216, 72, 168)"}}>Add To Favourites</Button>
                    </Card.Body>
                </Card>
            </td>
            }else if(result.wrapperType === "audiobook"){
                return <td>
                <Card bg={"white"} style={{width: "350px",height: "250px",marginLeft: "20px",marginTop: "100px",border: "1px solid white",marginBottom: "100px",textAlign: "left"}}>
                    <Card.Img variant="top" src={result.artworkUrl100} style={{height: "200px",width: "200px",marginLeft: "45px",marginBottom: "30px"}}/>
                    <Card.Body>
                        <Card.Title>{result.artistName}</Card.Title>
                        <Card.Text>
                            <b>media:</b> {result.kind}
                            <br/>
                            <b>title:</b> {result.trackName || result.trackCensoredName}
                            <br/>
                            <b>collection:</b> {result.collectionName || result.collectionCensoredName}
                            <br/>
                            <b>genre:</b> {result.primaryGenreName}
                            <br/>
                            <a href={result.previewUrl}><img className="Play" src={play}/><Button style={{marginTop: "15px",backgroundColor: "lightBlue",border: "lightBlue",color: "rgb(32, 137, 241)"}}>Play Preview</Button></a>
                        </Card.Text>
                        <img className="Thumb" src={thumb}/><Button onClick={onHandleClick.bind(this, result)} style={{backgroundColor: "rgb(255, 156, 222)",border: "rgb(255, 156, 222)",color: "rgb(216, 72, 168)"}}>Add To Favourites</Button>
                    </Card.Body>
                </Card>
            </td>
            }else if(result.kind === "podcast"){
                return <td>
                <Card bg={"white"} style={{width: "350px",height: "250px",marginLeft: "20px",marginTop: "100px",border: "1px solid white",marginBottom: "100px",textAlign: "left"}}>
                    <Card.Img variant="top" src={result.artworkUrl100} style={{height: "200px",width: "200px",marginLeft: "45px",marginBottom: "30px"}}/>
                    <Card.Body>
                        <Card.Title>{result.artistName}</Card.Title>
                        <Card.Text>
                            <b>media:</b> {result.kind}
                            <br/>
                            <b>title:</b> {result.trackName || result.trackCensoredName}
                            <br/>
                            <b>collection:</b> {result.collectionName || result.collectionCensoredName}
                            <br/>
                            <b>genre:</b> {result.primaryGenreName}
                            <br/>
                            <a href={result.previewUrl}><img className="Play" src={play}/><Button style={{marginTop: "15px",backgroundColor: "lightBlue",border: "lightBlue",color: "rgb(32, 137, 241)"}}>Play Preview</Button></a>
                        </Card.Text>
                        <img className="Thumb" src={thumb}/><Button onClick={onHandleClick.bind(this, result)} style={{backgroundColor: "rgb(255, 156, 222)",border: "rgb(255, 156, 222)",color: "rgb(216, 72, 168)"}}>Add To Favourites</Button>
                    </Card.Body>
                </Card>
            </td>
            }else if(result.kind === "tv-episode"){
                return <td>
                <Card bg={"white"} style={{width: "350px",height: "250px",marginLeft: "20px",marginTop: "100px",border: "1px solid white",marginBottom: "100px",textAlign: "left"}}>
                    <Card.Img variant="top" src={result.artworkUrl100} style={{height: "200px",width: "200px",marginLeft: "45px",marginBottom: "30px"}}/>
                    <Card.Body>
                        <Card.Title>{result.artistName}</Card.Title>
                        <Card.Text>
                            <b>media:</b> {result.kind}
                            <br/>
                            <b>episode:</b> {result.trackName || result.trackCensoredName}
                            <br/>
                            <b>season:</b> {result.collectionName || result.collectionCensoredName}
                            <br/>
                            <b>genre:</b> {result.primaryGenreName}
                            <br/>
                            <b>description:</b> {result.shortDescription}...
                            <br/>
                            <a href={result.previewUrl}><img className="Play" src={play}/><Button style={{marginTop: "15px",backgroundColor: "lightBlue",border: "lightBlue",color: "rgb(32, 137, 241)"}}>Play Preview</Button></a>
                        </Card.Text>
                        <img className="Thumb" src={thumb}/><Button onClick={onHandleClick.bind(this, result)} style={{backgroundColor: "rgb(255, 156, 222)",border: "rgb(255, 156, 222)",color: "rgb(216, 72, 168)"}}>Add To Favourites</Button>
                    </Card.Body>
                </Card>
            </td>
            }
        })
        
        /* The following code is for the UI itself from the heading to the input field, button, links etc.*/
        return(
            <div className="App">
                <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home" style={{fontSize: "19px"}}>iTunes & Apple Books </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href="https://www.apple.com/za/itunes/"><img src={itunes} className="Itunes"/></Nav.Link>
                <Nav.Link href="https://www.apple.com/apple-books/"><img src={apple} className="Apple"/></Nav.Link>
                </Nav>
                <Form inline>
                <Form.Control style={{width: "600px",border: "2px solid violet"}} type="text" placeholder="Search Library" onChange={this.onHandleChange} className="mr-sm-2"/>
                <DropdownButton className="Select" variant="light" title="Select Media">{/*This dropdown uses the functions created at the beginning of the code to help the user choose a media type by click on the option in the dropdown menu.*/}
                <Dropdown.Item onClick={this.onMusicSelect}>Music</Dropdown.Item>
                <Dropdown.Item onClick={this.onMovieSelect}>Movie</Dropdown.Item>
                <Dropdown.Item onClick={this.onAudioBookSelect}>Audio Book</Dropdown.Item>
                <Dropdown.Item onClick={this.onPodcastSelect}>Podcast</Dropdown.Item>
                <Dropdown.Item onClick={this.onTvShowSelect}>Tv Show</Dropdown.Item>
                </DropdownButton>
                <Button className="Submit" variant="light" onClick={this.onSearch} style={{border: "2px solid violet"}}>Search</Button>
                </Form>
                </Navbar.Collapse>
                </Navbar>
                <br/>
                <h1 className="Heading">Welcome to my iTunes Store and Apple Books Store search engine</h1>
                <h4 className="Subheading">Search anything from music, movies, audio books and more. Scroll right for more options and have fun!</h4>
                <br/>
                {/*I mentioned above that I struggled with making the styling show up on the webpage and the same happened 
                with the following cod as well.*/}
                
                {/*This code is to make sure that until the results have loaded, it shows a waiting screen and when the 
                results are fully loaded the waitng screen goes away and the search results shows up allong with the 
                favourites bar*/
                isLoaded != true ? 
                   <div>
                    <h3 className="Wait">Waiting for your request...</h3>
                    <br/>
                    <img className="Loading"src={loading}/>{/*This is a gif I used for the loading screen that I 
                    imported*/}
                    <div className="Divv">
                    <br/>
                    <Navbar bg="light">
                    <p className="NavProfile">My Github & LinkedIn </p>{/*I added my github and linkedIn links here. I've added a navbar with the links to the waiting screen and then once the results appear due to spacing*/}
                    <Nav.Link href="https://github.com/Tasneem-Davids"><img className="Github" href="" src={github}/></Nav.Link>
                    <Nav.Link href="https://www.linkedin.com/in/tazneem-davids-12b56b1b4/"><img className="LinkedIn" src={linkedin}/></Nav.Link>
                    </Navbar>
                    </div>
                    </div> :
                    <div>
                        <h4 className="Msg">{msg}</h4>
                        <br/>
                        <hr/>
                        <br/>
                    <table className="Result">
                        <tbody>
                            <tr>{displayResults}</tr>{/*Here is where the results are displayed*/}
                        </tbody>
                    </table>
                    <br/>
                   <div className="Div">
                   <Navbar bg="light">
                   <p className="NavProfile">My Github & LinkedIn </p>{/*I added my github and linkedIn links here for the results*/}
                   <Nav.Link href="https://github.com/Tasneem-Davids"><img className="Github" href="" src={github}/></Nav.Link>
                   <Nav.Link href="https://www.linkedin.com/in/tazneem-davids-12b56b1b4/"><img className="LinkedIn" src={linkedin}/></Nav.Link>
                   </Navbar>
                   </div>
                    <br/>
                   <Table className="Favourites">{/*This is the table for the favourites*/}
                    <thead>
                        <tr>
                            <th className="FavsHeading"><h4 className="FavsHeading">Favourites</h4></th>
                        </tr>
                    </thead>
                    <tbody className="TableR">
                        {displayFavs}
                    </tbody>
                </Table>
            </div>
            }
        </div>
        )
    }
}

export default App;
