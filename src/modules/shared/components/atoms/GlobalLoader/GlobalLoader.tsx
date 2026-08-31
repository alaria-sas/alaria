import { useAppSelector } from 'modules/shared/hooks/useAppDispatch';
import CanvasLogo from 'modules/shared/components/atoms/CanvasLogo/CanvasLogo';
import './GlobalLoader.scss';

const GlobalLoader = () => {
  const { loadingCount } = useAppSelector((state) => state.ui);

  if (loadingCount === 0) return null;

  return (
    <div className="global-loader">
      <div className="global-loader__card">
        <CanvasLogo size={110} color="#0B1E24" flutter={10} speed={1.3} />
      </div>
    </div>
  );
};

export default GlobalLoader;
