import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
 
  const [index, setIndex] = useState(0);

  const byDateDesc = data?.focus.slice().sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  ) || [] // Valeur par défaut;
  useEffect (() => {
    const intervalId = setInterval (() => {
      setIndex ((prevIndex) => (prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0));
  }, 5000);
  
    // Nettoyage de l'intervalle pour éviter les fuites de mémoire
    return () => clearInterval(intervalId);
  }, [byDateDesc.length]);

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
  
          <div
            key={event.date}> 
             <div className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt={event.title} />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                
                <input
                  key={`${_.date}`}  // Clé unique pour chaque élément de pagination`}
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx}
                  onChange={() => setIndex (radioIdx)}
                  title={`Go to slide ${radioIdx + 1}`}
                  aria-label={`Slide ${radioIdx + 1}`}
                />
              ))}
            </div>
          </div>
       </div>
      ))};
    </div>
  );
};

export default Slider;
