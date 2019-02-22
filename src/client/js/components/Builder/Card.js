import React, {Component} from 'react';
import {Row, Icon} from 'antd';
import Img from 'react-image';

import Property from '../partials/Builder/Card/Property';

import {generateCardImageLink} from 'Utils/cardshorthands';

class Card extends Component {
  render() {
    const {data} = this.props;
    return (
      <div className="container-card">
        {
                    data ?
                        <div className="card">
                          <a target="_blank" href={`https://heartofthecards.com/code/cardlist.html?card=WS_${data.set}/${data.side}${data.release}-${data.sid}`}>
                            <h2>{data.name || 'NaN'}</h2>
                          </a>
                          <div className='cardimage'>
                            <Img
                              src={[
                                generateCardImageLink(data),
                              ]}
                              unloader={<Icon className="image-not-found" type="question-circle" />}
                            />
                          </div>
                          {
                            data.ability && data.ability.length > 0 &&
                                    <div className="cardtext">
                                      { data.ability.map( (ability) => <div key={ability}>{ability}</div> ) }
                                    </div>
                          }
                          <div className="extra">
                            <Row type='flex'>
                              <Property name='Level' value={data.level} />
                              <Property name='Cost' value={data.cost} />
                              <Property name='Trigger' value={ data.trigger.join(', ') } />
                              <Property name='Color' value={data.colour} />
                              <Property name='Power' value={data.power} />
                              <Property name='Soul' value={data.soul} />
                              {
                                data.attributes.map( (attribute) => <Property key={attribute} name='Trait' value={attribute} />)
                              }
                              <Property name='Card No' value={`${data.set}/${data.side}${data.release}-${data.sid}`} />
                            </Row>
                          </div>
                        </div>
                        : <span>No card found</span>
        }
      </div>
    );
  }
}

export default Card;
