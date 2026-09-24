import './Skeleton.scss';

interface SkeletonProps {
  /** Ancho CSS (ej. '100%', '120px', '8rem'). Por defecto 100%. */
  width?: string;
  /** Alto CSS (ej. '1rem', '200px'). Por defecto 1rem. */
  height?: string;
  /** Radio del borde. 'sm' | 'md' | 'lg' | 'circle' | 'pill'. */
  radius?: 'sm' | 'md' | 'lg' | 'circle' | 'pill';
  /** Clase extra para casos puntuales. */
  className?: string;
}

/**
 * Bloque de carga con efecto shimmer. Placeholder neutro que ocupa el mismo
 * espacio que el contenido real, para evitar saltos de layout mientras carga.
 */
const Skeleton = ({ width = '100%', height = '1rem', radius = 'md', className = '' }: SkeletonProps) => {
  return (
    <span
      className={`skeleton skeleton--${radius} ${className}`}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
};

export default Skeleton;
