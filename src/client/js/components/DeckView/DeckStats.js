import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';

class DeckStats extends Component {
  sumCardQuantity(cards = [], type) {
    return cards.filter((card) => card.cardtype === type).length;
  }

  sumCardColour(cards = [], colour) {
    return cards.filter((card) => card.colour === colour).length;
  }

  countCardLevel(cards = [], level) {
    return cards.filter((card) => card.level === level && card.cardtype !== 'CX').length;
  }

  renderLevelLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name, short }) => {
    const { cards } = this.props;
    const RADIAN = Math.PI / 180; 
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x  = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy  + radius * Math.sin(-midAngle * RADIAN);
    if(percent > 0.05){
      return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'}  dominantBaseline="central">
          {short}
        </text>
      );
    }
    return '';
  };

  render() {
    const { renderLevelLabel, sumCardQuantity, countCardLevel, sumCardColour } = this;
    const { cards, deck } = this.props;

    const quantitydata = [
      { "name": 'Level 0', "short": "0", "value": countCardLevel(cards, 0) },
      { "name": 'Level 1', "short": "1", "value": countCardLevel(cards, 1) },
      { "name": 'Level 2', "short": "2", "value": countCardLevel(cards, 2) },
      { "name": 'Level 3', "short": "3", "value": countCardLevel(cards, 3) },
      { "name": 'Climax', "short": "CX", "value": sumCardQuantity(cards, 'CX') }
    ];

    const typedata = [
      { "name": 'Character', "value": sumCardQuantity(cards, 'CH') },
      { "name": 'Event', "value": sumCardQuantity(cards, 'EV') },
      { "name": 'Climax', "value": sumCardQuantity(cards, 'CX') }
    ];

    const colourdata = [
      { "name": 'Red', "value": sumCardColour(cards, 'RED'), "color": "#E81818" },
      { "name": 'Green', "value": sumCardColour(cards, 'GREEN'), "color": "#3AA34F" },
      { "name": 'Blue', "value": sumCardColour(cards, 'BLUE'), "color": "#226FA5" },
      { "name": 'Yellow', "value": sumCardColour(cards, 'YELLOW'), "color": "#D5BE3D" }
    ];

    return (
      <Row gutter={8}>
        <h2>Deck Statistics</h2>
        <Col lg={8}>
          <div>
            <h4>Breakdown by Card Level and Type</h4>
            <PieChart width={250} height={250}>
              <Pie
                isAnimationActive={false}
                data={quantitydata}
                dataKey="value"
                labelLine={false}
                label={renderLevelLabel}
                fill="#8884d8"
                outerRadius='75%'
              />
              <Pie
                isAnimationActive={false}
                data={typedata}
                dataKey="value"
                labelLine={true}
                fill="#82ca9d"
                innerRadius='65%'
                outerRadius='80%'
              />
              <Tooltip />
            </PieChart>
          </div>
        </Col>
        <Col lg={8}>
          <div>
            <h4>Breakdown by Card Color</h4>
            <PieChart width={250} height={250}>
              <Pie
                isAnimationActive={false}
                data={colourdata}
                dataKey="value"
                labelLine={false}
                fill="#8884d8"
                outerRadius='80%'
                labelLine={false}
              >
                {
                  colourdata.map((entry, index) => <Cell key={`cell-${index}`} fill={colourdata[index].color} />)
                }
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
        </Col>
      </Row>
    );
  }
}

export default DeckStats;