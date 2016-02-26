import React from 'react';
import {FeatureBoard} from 'app/feature';

const features = [
  {id: 1, title: 'Title 1', description: 'Description 1', priority: 1},
  {id: 2, title: 'Title 2', description: 'Description 2', priority: 2},
  {id: 3, title: 'Title 3', description: 'Description 3', priority: 3},
  {id: 4, title: 'Title 4', description: 'Description 4', priority: 4},
  {id: 5, title: 'Title 5', description: 'Description 5', priority: 5},
  {id: 6, title: 'Title 6', description: 'Description 6', priority: 6},
  {id: 7, title: 'Title 7', description: 'Description 7', priority: 7},
  {id: 8, title: 'Title 7', description: 'Description 7', priority: 7},
  {id: 9, title: 'Title 7', description: 'Description 7', priority: 7},
  {id: 10, title: 'Title 7', description: 'Description 7', priority: 7},
  {id: 11, title: 'Title 7', description: 'Description 7', priority: 7},
  {id: 12, title: 'Title 7', description: 'Description 7', priority: 7},
  {id: 13, title: 'Title 7', description: 'Description 7', priority: 7},
  {id: 14, title: 'Title 7', description: 'Description 7', priority: 7},
  {id: 15, title: 'Title 7', description: 'Description 7', priority: 7},
  {id: 16, title: 'Title 7', description: 'Description 7', priority: 7},
  {id: 17, title: 'Title 7', description: 'Description 7', priority: 7},
  {id: 18, title: 'Title 7', description: 'Description 7', priority: 7},
  {id: 19, title: 'Title 7', description: 'Description 7', priority: 7},
  {id: 20, title: 'Title 7', description: 'Description 7', priority: 7},
  {id: 21, title: 'Title 7', description: 'Description 7', priority: 7},
  {id: 22, title: 'Title 7', description: 'Description 7', priority: 7},
  {id: 23, title: 'Title 7', description: 'Description 7', priority: 7},
];

export function FeatureSection() {
  return (
    <section>
      <FeatureBoard items={features}/>
    </section>
  );
}

export default FeatureSection;
