import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as FillStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as Star } from '@fortawesome/free-regular-svg-icons'


class FavoriteIcon extends Component {

	render(){
		const { loggedin, myfavorite, favoritecount,
			handleFavorite } = this.props;
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