import React, { Component } from 'react';
import { Row, Col } from 'antd';

import CardSlot from "./CardSlot";
import Level from "./Level";
import Clock from "./Clock";
import Hand from "./Hand";
import "Styles/Playtester.less";

class Playtester extends Component {

	state = {

	}

	componentDidMount() {
    	
  	}

	render(){
		return(
			<div className="container-playtester">
				<div className="container-field">
					<span className="field">
						<Row className="stage">
								<Col span={5}>
									<CardSlot name="Stock" rested={true} />
								</Col>
								<Col span={19}>
									<Row className="front-stage">
										<CardSlot />
										<CardSlot />
										<CardSlot />
									</Row>
									<Row className="back-stage">
										<CardSlot />
										<CardSlot />
									</Row>
								</Col>
						</Row>
						<Row className="damage">
							<Level />
							<Clock />
						</Row>
					</span>
					<span className="zones">
						<CardSlot name="Memory" rested={true} />
						<CardSlot name="Deck" />
						<CardSlot name="WaitingRoom" />
					</span>
				</div>
				<Hand />
			</div>
		)
	}
}

export default Playtester;