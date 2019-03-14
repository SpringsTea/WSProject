import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { ResponsiveContainer,PieChart, Pie, Tooltip, Cell } from 'recharts';

class DeckStats extends Component {
  sumCardQuantity(cards, type){
        if(!cards) return [];
	    	return cards.filter( (card) => card.cardtype === type).length;
  }
  
  sumCardColour(cards, colour){
    if(!cards) return [];
    return cards.filter( (card) => card.colour === colour).length;
  }

	countCardLevel(cards, level){
        if(!cards) return [];
		return cards.filter( (card) => card.level === level && card.cardtype !== 'CX' ).length;
  }
  
  countCharacterLevel(cards, level){
    if(!cards) return [];
return cards.filter( (card) => card.level === level && card.cardtype !== 'CX' && card.cardtype !== 'EV' ).length;
}

	render(){
        const { sumCardQuantity, countCardLevel, countCharacterLevel, sumCardColour } = this;
        const { cards, deck } = this.props;

        const quantitydata = [
          { "name": 'Level 0', "value": countCharacterLevel(cards, 0)},
          { "name": 'Level 1', "value": countCharacterLevel(cards, 1)},
          { "name": 'Level 2', "value": countCharacterLevel(cards, 2)},
          { "name": 'Level 3', "value": countCharacterLevel(cards, 3)},
          { "name": 'Event', "value": sumCardQuantity(cards, 'EV')},
          { "name": 'Climax', "value": sumCardQuantity(cards, 'CX')}
        ];

        const typedata = [
          { "name": 'Character', "value": sumCardQuantity(cards, 'CH')},
          { "name": 'Event', "value": sumCardQuantity(cards, 'EV')},
          { "name": 'Climax', "value": sumCardQuantity(cards, 'CX')}
        ];
        
        const colourdata = [
          { "name": 'Red', "value": sumCardColour(cards, 'RED'), "color" : "#E81818"},
          { "name": 'Green', "value": sumCardColour(cards, 'GREEN'), "color" : "#3AA34F"},
          { "name": 'Blue', "value": sumCardColour(cards, 'BLUE'), "color" : "#226FA5"},
          { "name": 'Yellow', "value": sumCardColour(cards, 'YELLOW'), "color" : "#D5BE3D"}
        ]; 
        
        return (
          <Row gutter={8}>
              <h2>Deck Statistics</h2>
              <Col span={8}>
              <div>
                <h4>Breakdown by Card Level and Type</h4>
                <ResponsiveContainer width={350} height={350}>
                <PieChart>
                  <Pie
                    data={quantitydata}
                    dataKey="value"
                    labelLine={false}
                    fill="#8884d8"
                    outerRadius='75%'
                  />
                  <Pie
                    data={typedata}
                    dataKey="value"
                    labelLine={true}
                    fill="#82ca9d"
                    innerRadius='65%'
                    outerRadius='80%'
                    label={true}
                  />
                <Tooltip />
                </PieChart>
                </ResponsiveContainer>
                </div>
                </Col>
              <Col span={8}>
              <div>
                  <h4>Breakdown by Card Color</h4>
                <ResponsiveContainer width={350} height={350}>
                <PieChart>
                  <Pie
                    data={colourdata}
                    dataKey="value"
                    labelLine={false}
                    fill="#8884d8"
                    outerRadius='80%'
                    label={true}
                    labelLine={true}
                  >
                  {
                    colourdata.map((entry, index) => <Cell key={`cell-${index}`} fill={colourdata[index].color} />)
                  }
                  </Pie>
                <Tooltip />
                </PieChart>
                </ResponsiveContainer>
                </div>
              </Col>
          </Row>
          );
	}
}

export default DeckStats;