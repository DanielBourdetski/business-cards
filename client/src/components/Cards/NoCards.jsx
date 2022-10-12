import Button from '../common/Button';
import noCards from '../../media/no-cards.png';
import { useNavigate } from 'react-router-dom';

const NoCards = () => {
  const navigate = useNavigate();
  return (
    <div className="w-2/3 mx-auto flex justify-center items-center mt-10">
      <img className="h-80" src={noCards} alt="hand holding a card" />
      <div className="flex flex-col items-center">
        <h2 className="text-3xl tracking-wide text-justify">
          Looks like <br /> you don't <br /> have any <br /> cards yet.
        </h2>
        <Button
          label="Create one here"
          className="w-40 h-10 -translate-x-1"
          type="button"
          callback={() => navigate('/my-cards/add-card')}
        />
      </div>
    </div>
  );
};

export default NoCards;
