import CanvasLogo from 'modules/shared/components/atoms/CanvasLogo/CanvasLogo';
import './Loader.scss';

const Loader = () => {
  return (
    <div className="loader">
      <div className="loader__content">
        <CanvasLogo size={160} color="#0B1E24" flutter={10} speed={1.2} />
        <div className="loader__bar">
          <div className="loader__bar-fill" />
        </div>
      </div>
    </div>
  );
};

export default Loader;
