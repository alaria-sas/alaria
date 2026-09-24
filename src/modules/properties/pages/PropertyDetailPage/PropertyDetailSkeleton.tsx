import Skeleton from 'modules/shared/components/atoms/Skeleton/Skeleton';
import './PropertyDetailSkeleton.scss';

/**
 * Placeholder del detalle de inmueble mientras carga. Imita el layout real
 * (galería grande + columna de info + sidebar con CTA y mapa) para evitar el
 * salto de "Cargando inmueble..." a la página completa.
 */
const PropertyDetailSkeleton = () => {
  return (
    <div className="property-detail-skeleton" aria-hidden="true">
      <Skeleton width="140px" height="1.25rem" className="property-detail-skeleton__back" />

      {/* Galería */}
      <div className="property-detail-skeleton__gallery">
        <Skeleton height="100%" radius="lg" className="property-detail-skeleton__main" />
        <div className="property-detail-skeleton__thumbs">
          <Skeleton height="100%" radius="md" />
          <Skeleton height="100%" radius="md" />
          <Skeleton height="100%" radius="md" />
        </div>
      </div>

      <div className="property-detail-skeleton__content">
        {/* Info */}
        <div className="property-detail-skeleton__info">
          <Skeleton width="70%" height="2rem" />
          <Skeleton width="40%" height="1rem" />
          <Skeleton width="35%" height="1.75rem" />
          <div className="property-detail-skeleton__features">
            <Skeleton height="4rem" radius="md" />
            <Skeleton height="4rem" radius="md" />
            <Skeleton height="4rem" radius="md" />
            <Skeleton height="4rem" radius="md" />
          </div>
          <Skeleton width="30%" height="1.25rem" />
          <Skeleton height="5rem" radius="md" />
        </div>

        {/* Sidebar */}
        <div className="property-detail-skeleton__sidebar">
          <Skeleton height="12rem" radius="lg" />
          <Skeleton height="10rem" radius="lg" />
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailSkeleton;
