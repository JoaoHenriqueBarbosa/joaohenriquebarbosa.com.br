import React from 'react';
import podcastPlataformsData from '../content/data/podcastPlataformsData';

const PodcastPlataforms = () => {
  return (
    <div className="listeningPlatforms">
      {
        podcastPlataformsData.map(plataform => (
          <div className="wrapper" key={plataform.text}>
            <a href={plataform.link} target="_blank" rel="noopener noreferrer">
              <div className="iconWrapper">
                <img
                  src={plataform.img}
                  alt={plataform.alt}
                  height="28"
                  width="28"
                />
                <p className="text">{plataform.text}</p>
              </div>
            </a>
          </div>
        ))
      }
    </div>
  )
}

export default PodcastPlataforms;
