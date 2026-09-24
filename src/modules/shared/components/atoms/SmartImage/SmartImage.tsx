import { useState } from 'react';
import './SmartImage.scss';

interface SmartImageProps {
  src: string;
  alt: string;
  className?: string;
  /** Carga diferida nativa. Por defecto 'lazy'. */
  loading?: 'lazy' | 'eager';
}

/**
 * Imagen con carga suave: mientras baja, se ve un placeholder con shimmer del
 * mismo tamaño (el contenedor reserva el espacio), y la imagen aparece con un
 * fade-in cuando termina de cargar. Evita la sensación de que la foto "aparece
 * por partes" o pega un salto de layout al llegar.
 */
const SmartImage = ({ src, alt, className = '', loading = 'lazy' }: SmartImageProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <span className={`smart-image ${loaded ? 'smart-image--loaded' : ''} ${className}`}>
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        className="smart-image__img"
        onLoad={() => setLoaded(true)}
      />
    </span>
  );
};

export default SmartImage;
