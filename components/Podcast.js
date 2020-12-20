import React, { useState } from 'react';
import Image from 'next/image';
import AudioPlayer from 'react-h5-audio-player';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';

const ReadMoreDesc = ({ desc }) => {
  const [readMore, setReadMore] = useState(false);
  return (
    <>
      <div className="descricao" dangerouslySetInnerHTML={{ __html: readMore ? desc : desc.substr(0, 200) + "..." }} />
      <button className="btn-leia-mais" onClick={() => setReadMore(rm => !rm)}>{readMore ? "Esconder" : "Leia mais"}</button>
    </>
  )
}

const Podcast = ({ podcastData }) => {

  const [episodio, setEpisodio] = useState(podcastData.items[0]);

  return (
    <div className="podcast">
      {podcastData.items.map(ep => (
        <div className="episodio" key={ep.created}>
          <div className="capa-holder" onClick={() => setEpisodio(ep)}>
            <div className={"capa-play " + (episodio === ep ? "active" : "")}>
              <svg xmlns="http://www.w3.org/2000/svg" focusable="false" style={{ transform: "rotate(360deg)" }} width="50px" height="50px" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M10 16.5v-9l6 4.5M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2z" fill="currentColor"></path></svg>
            </div>
            <Image className="capa" src={ep.itunes_image} width={100} height={100} layout="fixed" />
          </div>
          <div className="metadata">
            <p className="titulo">{ep.title}</p>
            <p className="data">Publicado em {format(ep.created, "dd 'de' MMMM 'de' yyyy", { locale: pt })}</p>
            {ep.description.length <= 200 && (<div className="descricao" dangerouslySetInnerHTML={{ __html: ep.description }} />)}
            {ep.description.length > 200 && (<ReadMoreDesc desc={ep.description} />)}
          </div>
        </div>
      ))}
      <div className="player">
        <div className="tocando">
          <Image className="capa" src={episodio.itunes_image} width={60} height={60} layout="fixed" />
          <div className="titulo-holder">
            <p title={episodio.title} className="titulo">{episodio.title}</p>
          </div>
        </div>
        <AudioPlayer src={episodio.enclosures[0].url} />
      </div>
    </div>
  )
}

export default Podcast;
