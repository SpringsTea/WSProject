import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as FillStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as Star } from '@fortawesome/free-regular-svg-icons'

import { favoriteDeck } from 'Utils/api';


class FavoriteIcon extends Component {

	state = {
		favoritecount: 0,
		myfavorite: false
	}

	componentDidMount(){
		const { deck } = this.props;
		this.setState({favoritecount: deck.favoritecount, myfavorite:deck.myfavorite})
	}

	handleFavorite = async() =>{
		const { deck, loggedin } = this.props;

		if( loggedin === 'false' ){
			return false;
		}

		const { success, favoritecount, myfavorite } = await favoriteDeck(deck.deckid)
		if(success === true){
			this.setState({favoritecount, myfavorite});
		}
	}

	render(){
		const { handleFavorite } = this;
		const { loggedin, myfavorite, favoritecount } = this.state;
		return(
			<div className={`deck-favorite ${loggedin === "false" ? '' : 'clickable'}`} onClick={handleFavorite}
				title={`${favoritecount} Favorites`}
			>
				<span className="fa-stack fa-2x">
					<FontAwesomeIcon icon={myfavorite ? FillStar : Star} className="fa-stack-2x" />							
					<strong className={`fa-stack-1x favorite-count ${myfavorite ? 'myfavorite' : ''}`}>{favoritecount}</strong>
				</span>
			</div>
		)
	}
}

export default FavoriteIcon;