import React, {useEffect, useState} from "react";
import "./assets/estilo.css"

function formatNumber(num) {
  return num.toLocaleString('en-US');
}

function App(){
  const [asteroids, setAsteroids] = useState([]);

  useEffect(()=>{
    let url = 'https://api.nasa.gov/neo/rest/v1/feed?start_date=2023-08-01&end_date=2023-08-08&api_key=DEMO_KEY';

    fetch(url)
      .then((r) => r.json())
      .then((json) => {
        setAsteroids(json);
      });
  }, []);

  return (
    <div className="container-asteroids">
      <h1 className="titulo-asteroids">Dados dos Asteroides</h1>
      <p className='texto'>Bem-vindo ao nosso site dedicado à exploração dos asteroides próximos à Terra...</p>
      <div className="container-asteroids-list">
        {asteroids && asteroids.near_earth_objects ? (
          Object.keys(asteroids.near_earth_objects).map(date => (
            <div key={date} className="data-group">
              <h2 className="data-date">{date}</h2>
              {asteroids.near_earth_objects[date].map(asteroid => (
                <div key={asteroid.id} className="cartao-asteroid">
                  <h3 className="titulo-asteroid">{asteroid.name}</h3>
                  <p className="descricao-asteroid">
                    <strong>Diâmetro (m): </strong>
                    {formatNumber(asteroid.estimated_diameter.meters.estimated_diameter_max)}
                  </p>
                  <p className="descricao-asteroid">
                    <strong>Velocidade (km/h): </strong>
                    {formatNumber(parseFloat(asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour))}
                  </p>
                  <p className="descricao-asteroid">
                    <strong>Distância mínima (km): </strong>
                    {formatNumber(parseFloat(asteroid.close_approach_data[0].miss_distance.kilometers))}
                  </p>
                </div>
              ))}
            </div>
          ))
        ) : (
          <p className="sem-asteroids">Nenhum dado disponível no momento.</p>
        )}
      </div>
    </div>
  );
}

export default App;
