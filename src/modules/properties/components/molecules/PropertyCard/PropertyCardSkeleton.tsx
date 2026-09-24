import Skeleton from 'modules/shared/components/atoms/Skeleton/Skeleton';
import './PropertyCardSkeleton.scss';

/**
 * Placeholder de una PropertyCard mientras carga el listado. Imita su forma
 * (imagen + título + ubicación + precio + features) para que no haya salto de
 * layout cuando llegan los datos.
 */
const PropertyCardSkeleton = () => {
  return (
    <div className="property-card-skeleton" aria-hidden="true">
      <Skeleton height="200px" radius="lg" className="property-card-skeleton__image" />
      <div className="property-card-skeleton__content">
        <Skeleton width="80%" height="0.9375rem" />
        <Skeleton width="55%" height="0.8125rem" />
        <Skeleton width="45%" height="1.25rem" />
        <div className="property-card-skeleton__features">
          <Skeleton width="2.5rem" height="0.8125rem" />
          <Skeleton width="2.5rem" height="0.8125rem" />
          <Skeleton width="2.5rem" height="0.8125rem" />
        </div>
      </div>
    </div>
  );
};

export default PropertyCardSkeleton;
