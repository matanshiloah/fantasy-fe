import React from 'react';
import { FormControl, OverlayTrigger, Tooltip } from 'react-bootstrap';
import '../../styles/style.css';

var Utils = require('../../utils/utils');
var Config = require('../../utils/config');

export default class Filter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            clubs: null
        };

        this._fetchClubs();

        this.onFilterChange = props.onFilterChange;
        this._bindedOnSelectedTeamChange = this._onSelectedTeamChange.bind(this);
        this._bindedOnSortByChange = this._onSortByChange.bind(this);
        this._bindedOnMaxPriceChange = this._onMaxPriceChange.bind(this);

        this.sortByOptions = Config.sortByOptions;
        this.priceRange = [];

        for (var price = Config.maxPrice; price >= Config.minPrice; price -= 0.5) {
            this.priceRange.push(price);
        }
    }

    _fetchClubs() {
        Utils.fetchFromAPI(`${ Config.baseUrl }/clubs`, 'GET', response => {
            this.setState({
                clubs: Utils.sortArrayByKey(Utils.objectToArray(response), 'name')
            });
        });
    }

    _onSelectedTeamChange(event) {
        this.onFilterChange({
            selectedTeam: Utils.parseInt(event.target.value)
        });
    }

    _onMaxPriceChange(event) {
        this.onFilterChange({
            maxPrice: parseFloat(event.target.value)
        });
    }

    _onSortByChange(event) {
        this.onFilterChange({
            sortBy: event.target.value
        });
    }

    render() {
        if (!this.state.clubs) {
            return <div className='playersData-data--filters' />;
        }

        return (
            <div className='playersData-data--filters'>
                <div className='playersData-data--filters-club'>
                    <OverlayTrigger placement='top' overlay={ <Tooltip id='filterByTeam'>Filter by team</Tooltip> }>
                        <FormControl componentClass='select' onChange={ this._bindedOnSelectedTeamChange }>
                            <option key='0' value='0'>Select team</option>
                            {
                                this.state.clubs.map((club, index) => 
                                    <option key={ index } value={ club.id }>{ club.name }</option>
                                )
                            }
                        </FormControl>
                    </OverlayTrigger>
                </div>
                <div className='playersData-data--filters-price'>
                    <OverlayTrigger placement='top' overlay={ <Tooltip id='fiterByPrice'>Filter by max price</Tooltip> }>
                        <FormControl componentClass='select' onChange={ this._bindedOnMaxPriceChange }>
                            {
                                this.priceRange.map((price, index) =>
                                    <option key={ index } value={ price }>{ price }</option>
                                )
                            }
                        </FormControl>
                    </OverlayTrigger>
                </div>
                <div className='playersData-data--filters-sortBy'>
                    <OverlayTrigger placement='top' overlay={ <Tooltip id='sortBy'>Sort players</Tooltip> }>
                        <FormControl componentClass='select' onChange={ this._bindedOnSortByChange }>
                            {
                                this.sortByOptions.map((sortByOption, index) =>
                                    <option key={ index } value={ sortByOption.field }>{ sortByOption.title }</option>
                                )
                            }
                        </FormControl>
                    </OverlayTrigger>
                </div>
            </div>
        );
    }
}