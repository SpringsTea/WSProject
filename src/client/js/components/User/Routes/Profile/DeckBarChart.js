import React, { PureComponent } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

export default function DeckBarChart ({decks}){

  let data = []; 
  decks.map((deck) => {//put all the neo sets into an array
    if(!!deck.neo_sets){
      deck.neo_sets.map((neo) => data.push(neo.name))
    }    
  })

  data = data.reduce((acc, curr) => {//reduce the neo sets down to 1 element per set, and the frequency count
    acc[curr] ??= { name: curr, Count:0};
    acc[curr].Count = acc[curr].Count + 1;
    
    return acc;
  }, {})

  return (
      <ResponsiveContainer
        width={400}
        height={300}
      >
        <BarChart
          data={Object.values(data).sort((x,y) => y.Count - x.Count).slice(0,5)}//Convert to array and sort / top 5 results
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="Count" fill="#D4D884" />
        </BarChart>
      </ResponsiveContainer>
    );
}
