import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ChangePageButton from './ChangePageButton';

class BerriesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            pageIndex: this.props.match.params.page
        };
        this.berriesList = undefined;
    }

    componentDidMount () {
        axios.get('https://pokeapi.co/api/v2/berry/').then((response) => {
            this.berriesList = response.data.results;
            this.setState({
                loaded: true,
                totalPages: parseInt(response.data.count / 50)
            });
        }).catch((e) => {
            console.log(e);
        });
    }

    handlePrevPage = () => {
        let pathArr = this.props.history.location.pathname.split('/');
        pathArr[pathArr.length - 1]--;
        this.props.history.push(pathArr.join('/'));
        this.setState((prevState) => ({
            pageIndex: --prevState.pageIndex
        }));
    }

    handleNextPage = () => {
        let pathArr = this.props.history.location.pathname.split('/');
        pathArr[pathArr.length - 1]++;
        this.props.history.push(pathArr.join('/'));
        this.setState((prevState) => ({
            pageIndex: ++prevState.pageIndex
        }));
    }

    currentList () {
        let currentList = this.berriesList.slice(this.state.pageIndex * 50, (this.state.pageIndex + 1) * 50);
        return (
            currentList.map((element) => {
                const urlArr = element.url.split('/');
                const id = urlArr[urlArr.length - 2];
                const newUrl = '/berry/' + id;
                return (<li key={element.url}><Link to={newUrl}>{element.name}</Link></li>);
            })
        );
    }

    render() {
        return (this.state.loaded &&
            <div>
                <h1>{this.state.pageIndex} / {this.state.totalPages}</h1>
                {this.state.pageIndex > 0 && <ChangePageButton onClick={this.handlePrevPage} buttonName="Prev Page" />}
                {this.state.pageIndex < this.state.totalPages && <ChangePageButton onClick={this.handleNextPage} buttonName="Next Page" />}
                <ul>{this.currentList()}</ul>
            </div>
        );
    }
}

export default BerriesList;